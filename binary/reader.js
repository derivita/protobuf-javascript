// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://protobuf.dev/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 * @fileoverview This file contains utilities for converting binary,
 * wire-format protocol buffers into Javascript data structures.
 *
 * jspb's BinaryReader class wraps the BinaryDecoder class to add methods
 * that understand the protocol buffer syntax and can do the type checking and
 * bookkeeping necessary to parse trees of nested messages.
 *
 * Major caveat - Users of this library _must_ keep their Javascript proto
 * parsing code in sync with the original .proto file - presumably you'll be
 * using the typed jspb code generator, but if you bypass that you'll need
 * to keep things in sync by hand.
 *
 * @suppress {missingRequire} TODO(b/152540451): this shouldn't be needed
 * @author aappleby@google.com (Austin Appleby)
 */

import * as asserts from '../asserts.js';

import * as BinaryConstants from './constants.js';
import { BinaryDecoder } from './decoder.js';
import * as utils from './utils.js';

goog.declareModuleId('jspb.binary.reader');

/**
 * Whether to enforce that string fields are valid utf8.
 *
 * <p>Currently set to `ALWAYS`, can be set to `DEPRECATED_PROTO3_ONLY` to only
 * enforce utf8 for proto3 string fields, for proto2 string fields it will use
 * replacement characters when encoding errors are found.
 *
 * <p>TODO: Remove the flag, simplify BinaryReader to remove
 * readStringRequireUtf8 and related support in the code generator et. al.
 *
 * @define {string}
 */
const ENFORCE_UTF8 = goog.define('jspb.binary.ENFORCE_UTF8', 'ALWAYS');

// Constrain the set of values to only these two.
asserts.assert(
  ENFORCE_UTF8 === 'DEPRECATED_PROTO3_ONLY' || ENFORCE_UTF8 === 'ALWAYS');

const /** boolean */ UTF8_PARSING_ERRORS_ARE_FATAL = ENFORCE_UTF8 === 'ALWAYS';



/**
 * BinaryReader implements the decoders for all the wire types specified in
 * https://protobuf.dev/programming-guides/encoding/.
 *
 * @param {BinaryConstants.ByteSource=} opt_bytes The bytes we're reading from.
 * @param {number=} opt_start The optional offset to start reading at.
 * @param {number=} opt_length The optional length of the block to read -
 *     we'll throw an assertion if we go off the end of the block.
 * @constructor
 * @struct
 * @export
 */
export function BinaryReader(opt_bytes, opt_start, opt_length) {
  /**
     * Wire-format decoder.
     * @private {!BinaryDecoder}
     */
  this.decoder_ = BinaryDecoder.alloc(opt_bytes, opt_start, opt_length);

  /**
   * Cursor immediately before the field tag.
   * @private {number}
   */
  this.fieldCursor_ = this.decoder_.getCursor();

  /**
   * Field number of the next field in the buffer, filled in by nextField().
   * @private {number}
   */
  this.nextField_ = BinaryConstants.INVALID_FIELD_NUMBER;

  /**
     * Wire type of the next proto field in the buffer, filled in by
     * nextField().
     * @private {BinaryConstants.WireType}
     */
  this.nextWireType_ = BinaryConstants.WireType.INVALID;

  /**
   * Set to true if this reader encountered an error due to corrupt data.
   * @private {boolean}
   */
  this.error_ = false;

  /**
     * User-defined reader callbacks.
     * @private {?Object<string, function(!BinaryReader):*>}
     */
  this.readCallbacks_ = null;
}


/**
 * Global pool of BinaryReader instances.
 * @private {!Array<!BinaryReader>}
 */
BinaryReader.instanceCache_ = [];


/**
 * @export
 */
BinaryReader.clearInstanceCache = function() {
  BinaryReader.instanceCache_ = [];
}

/**
   @return {number}
 * @export
 */
BinaryReader.getInstanceCacheLength = function() {
  return BinaryReader.instanceCache_.length;
}


/**
 * Pops an instance off the instance cache, or creates one if the cache is
 * empty.
 * @param {BinaryConstants.ByteSource=} opt_bytes The bytes we're reading from.
 * @param {number=} opt_start The optional offset to start reading at.
 * @param {number=} opt_length The optional length of the block to read -
 *     we'll throw an assertion if we go off the end of the block.
 * @return {!BinaryReader}
 * @export
 */
BinaryReader.alloc = function(opt_bytes, opt_start, opt_length) {
  if (BinaryReader.instanceCache_.length) {
    var newReader = BinaryReader.instanceCache_.pop();
    if (opt_bytes) {
      newReader.decoder_.setBlock(opt_bytes, opt_start, opt_length);
    }
    return newReader;
  } else {
    return new BinaryReader(opt_bytes, opt_start, opt_length);
  }
};


/**
 * Alias for the above method.
 * @param {BinaryConstants.ByteSource=} opt_bytes The bytes we're reading from.
 * @param {number=} opt_start The optional offset to start reading at.
 * @param {number=} opt_length The optional length of the block to read -
 *     we'll throw an assertion if we go off the end of the block.
 * @return {!BinaryReader}
 * @export
 */
BinaryReader.prototype.alloc = BinaryReader.alloc;


/**
 * Puts this instance back in the instance cache.
 * @export
 */
BinaryReader.prototype.free = function() {
  this.decoder_.clear();
  this.nextField_ = BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = BinaryConstants.WireType.INVALID;
  this.error_ = false;
  this.readCallbacks_ = null;

  if (BinaryReader.instanceCache_.length < 100) {
    BinaryReader.instanceCache_.push(this);
  }
};


/**
 * Returns the cursor immediately before the current field's tag.
 * @return {number} The internal read cursor.
 * @export
 */
BinaryReader.prototype.getFieldCursor = function() {
  return this.fieldCursor_;
};


/**
 * Returns the internal read cursor.
 * @return {number} The internal read cursor.
 * @export
 */
BinaryReader.prototype.getCursor = function() {
  return this.decoder_.getCursor();
};


/**
 * Returns the raw buffer.
 * @return {?Uint8Array} The raw buffer.
 * @export
 */
BinaryReader.prototype.getBuffer = function() {
  return this.decoder_.getBuffer();
};


/**
 * @return {number} The field number of the next field in the buffer, or
 *     INVALID_FIELD_NUMBER if there is no next field.
 * @export
 */
BinaryReader.prototype.getFieldNumber = function() {
  return this.nextField_;
};


/**
 * @return {BinaryConstants.WireType} The wire type of the next field
 *     in the stream, or WireType.INVALID if there is no next field.
 * @export
 */
BinaryReader.prototype.getWireType = function() {
  return this.nextWireType_;
};


/**
 * @return {boolean} Whether the current wire type is a delimited field. Used to
 * conditionally parse packed repeated fields.
 * @export
 */
BinaryReader.prototype.isDelimited = function() {
  return this.nextWireType_ == BinaryConstants.WireType.DELIMITED;
};


/**
 * @return {boolean} Whether the current wire type is an end-group tag. Used as
 * an exit condition in decoder loops in generated code.
 * @export
 */
BinaryReader.prototype.isEndGroup = function() {
  return this.nextWireType_ == BinaryConstants.WireType.END_GROUP;
};


/**
 * Returns true if this reader hit an error due to corrupt data.
 * @return {boolean}
 * @export
 */
BinaryReader.prototype.getError = function() {
  return this.error_ || this.decoder_.getError();
};


/**
 * Points this reader at a new block of bytes.
 * @param {!Uint8Array} bytes The block of bytes we're reading from.
 * @param {number} start The offset to start reading at.
 * @param {number} length The length of the block to read.
 * @export
 */
BinaryReader.prototype.setBlock = function(bytes, start, length) {
  this.decoder_.setBlock(bytes, start, length);
  this.nextField_ = BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = BinaryConstants.WireType.INVALID;
};


/**
 * Rewinds the stream cursor to the beginning of the buffer and resets all
 * internal state.
 * @export
 */
BinaryReader.prototype.reset = function() {
  this.decoder_.reset();
  this.nextField_ = BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = BinaryConstants.WireType.INVALID;
};


/**
 * Advances the stream cursor by the given number of bytes.
 * @param {number} count The number of bytes to advance by.
 * @export
 */
BinaryReader.prototype.advance = function(count) {
  this.decoder_.advance(count);
};


/**
 * Reads the next field header in the stream if there is one, returns true if
 * we saw a valid field header or false if we've read the whole stream.
 * Throws an error if we encountered a deprecated START_GROUP/END_GROUP field.
 * @return {boolean} True if the stream contains more fields.
 * @export
 */
BinaryReader.prototype.nextField = function() {
  // If we're at the end of the block, there are no more fields.
  if (this.decoder_.atEnd()) {
    return false;
  }

  // If we hit an error decoding the previous field, stop now before we
  // try to decode anything else
  if (this.getError()) {
    asserts.fail('Decoder hit an error');
    return false;
  }

  // Otherwise just read the header of the next field.
  this.fieldCursor_ = this.decoder_.getCursor();
  var header = this.decoder_.readUnsignedVarint32();

  var nextField = header >>> 3;
  var nextWireType = /** @type {BinaryConstants.WireType} */
      (header & 0x7);

  // If the wire type isn't one of the valid ones, something's broken.
  if (nextWireType != BinaryConstants.WireType.VARINT &&
      nextWireType != BinaryConstants.WireType.FIXED32 &&
      nextWireType != BinaryConstants.WireType.FIXED64 &&
      nextWireType != BinaryConstants.WireType.DELIMITED &&
      nextWireType != BinaryConstants.WireType.START_GROUP &&
      nextWireType != BinaryConstants.WireType.END_GROUP) {
    asserts.fail(
        'Invalid wire type: %s (at position %s)', nextWireType,
        this.fieldCursor_);
    this.error_ = true;
    return false;
  }

  this.nextField_ = nextField;
  this.nextWireType_ = nextWireType;

  return true;
};


/**
 * Winds the reader back to just before this field's header.
 * @export
 */
BinaryReader.prototype.unskipHeader = function() {
  this.decoder_.unskipVarint((this.nextField_ << 3) | this.nextWireType_);
};


/**
 * Skips all contiguous fields whose header matches the one we just read.
 * @export
 */
BinaryReader.prototype.skipMatchingFields = function() {
  var field = this.nextField_;
  this.unskipHeader();

  while (this.nextField() && (this.getFieldNumber() == field)) {
    this.skipField();
  }

  if (!this.decoder_.atEnd()) {
    this.unskipHeader();
  }
};


/**
 * Skips over the next varint field in the binary stream.
 * @export
 */
BinaryReader.prototype.skipVarintField = function() {
  if (this.nextWireType_ != BinaryConstants.WireType.VARINT) {
    asserts.fail('Invalid wire type for skipVarintField');
    this.skipField();
    return;
  }

  this.decoder_.skipVarint();
};


/**
 * Skips over the next delimited field in the binary stream.
 * @export
 */
BinaryReader.prototype.skipDelimitedField = function() {
  if (this.nextWireType_ != BinaryConstants.WireType.DELIMITED) {
    asserts.fail('Invalid wire type for skipDelimitedField');
    this.skipField();
    return;
  }

  var length = this.decoder_.readUnsignedVarint32();
  this.decoder_.advance(length);
};


/**
 * Skips over the next fixed32 field in the binary stream.
 * @export
 */
BinaryReader.prototype.skipFixed32Field = function() {
  if (this.nextWireType_ != BinaryConstants.WireType.FIXED32) {
    asserts.fail('Invalid wire type for skipFixed32Field');
    this.skipField();
    return;
  }

  this.decoder_.advance(4);
};


/**
 * Skips over the next fixed64 field in the binary stream.
 * @export
 */
BinaryReader.prototype.skipFixed64Field = function() {
  if (this.nextWireType_ != BinaryConstants.WireType.FIXED64) {
    asserts.fail('Invalid wire type for skipFixed64Field');
    this.skipField();
    return;
  }

  this.decoder_.advance(8);
};


/**
 * Skips over the next group field in the binary stream.
 * @export
 */
BinaryReader.prototype.skipGroup = function() {
  var previousField = this.nextField_;
  do {
    if (!this.nextField()) {
      asserts.fail('Unmatched start-group tag: stream EOF');
      this.error_ = true;
      return;
    }
    if (this.nextWireType_ == BinaryConstants.WireType.END_GROUP) {
      // Group end: check that it matches top-of-stack.
      if (this.nextField_ != previousField) {
        asserts.fail('Unmatched end-group tag');
        this.error_ = true;
        return;
      }
      return;
    }
    this.skipField();
  } while (true);
};


/**
 * Skips over the next field in the binary stream - this is useful if we're
 * decoding a message that contain unknown fields.
 * @export
 */
BinaryReader.prototype.skipField = function() {
  switch (this.nextWireType_) {
    case BinaryConstants.WireType.VARINT:
      this.skipVarintField();
      break;
    case BinaryConstants.WireType.FIXED64:
      this.skipFixed64Field();
      break;
    case BinaryConstants.WireType.DELIMITED:
      this.skipDelimitedField();
      break;
    case BinaryConstants.WireType.FIXED32:
      this.skipFixed32Field();
      break;
    case BinaryConstants.WireType.START_GROUP:
      this.skipGroup();
      break;
    default:
      asserts.fail('Invalid wire encoding for field.');
  }
};


/**
 * Registers a user-defined read callback.
 * @param {string} callbackName
 * @param {function(!BinaryReader):*} callback
 * @export
 */
BinaryReader.prototype.registerReadCallback = function(
    callbackName, callback) {
  if (this.readCallbacks_ === null) {
    this.readCallbacks_ = {};
  }
  asserts.assert(!this.readCallbacks_[callbackName]);
  this.readCallbacks_[callbackName] = callback;
};


/**
 * Runs a registered read callback.
 * @param {string} callbackName The name the callback is registered under.
 * @return {*} The value returned by the callback.
 * @export
 */
BinaryReader.prototype.runReadCallback = function(callbackName) {
  asserts.assert(this.readCallbacks_ !== null);
  var callback = this.readCallbacks_[callbackName];
  asserts.assert(callback);
  return callback(this);
};


/**
 * Reads a field of any valid non-message type from the binary stream.
 * @param {BinaryConstants.FieldType} fieldType
 * @return {BinaryConstants.AnyFieldType}
 */
BinaryReader.prototype.readAny = function(fieldType) {
  this.nextWireType_ = BinaryConstants.FieldTypeToWireType(fieldType);
  var fieldTypes = BinaryConstants.FieldType;
  switch (fieldType) {
    case fieldTypes.DOUBLE:
      return this.readDouble();
    case fieldTypes.FLOAT:
      return this.readFloat();
    case fieldTypes.INT64:
      return this.readInt64();
    case fieldTypes.UINT64:
      return this.readUint64();
    case fieldTypes.INT32:
      return this.readInt32();
    case fieldTypes.FIXED64:
      return this.readFixed64();
    case fieldTypes.FIXED32:
      return this.readFixed32();
    case fieldTypes.BOOL:
      return this.readBool();
    case fieldTypes.STRING:
      return this.readString();
    case fieldTypes.GROUP:
      asserts.fail('Group field type not supported in readAny()');
    case fieldTypes.MESSAGE:
      asserts.fail('Message field type not supported in readAny()');
    case fieldTypes.BYTES:
      return this.readBytes();
    case fieldTypes.UINT32:
      return this.readUint32();
    case fieldTypes.ENUM:
      return this.readEnum();
    case fieldTypes.SFIXED32:
      return this.readSfixed32();
    case fieldTypes.SFIXED64:
      return this.readSfixed64();
    case fieldTypes.SINT32:
      return this.readSint32();
    case fieldTypes.SINT64:
      return this.readSint64();
    case fieldTypes.FHASH64:
      return this.readFixedHash64();
    case fieldTypes.VHASH64:
      return this.readVarintHash64();
    default:
      asserts.fail('Invalid field type in readAny()');
  }
  return 0;
};


/**
 * Deserialize a proto into the provided message object using the provided
 * reader function. This function is templated as we currently have one client
 * who is using manual deserialization instead of the code-generated versions.
 * @template T
 * @param {T} message
 * @param {function(T, !BinaryReader)} reader
 * @export
 */
BinaryReader.prototype.readMessage = function(message, reader) {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.DELIMITED);

  // Save the current endpoint of the decoder and move it to the end of the
  // embedded message.
  var oldEnd = this.decoder_.getEnd();
  var length = this.decoder_.readUnsignedVarint32();
  var newEnd = this.decoder_.getCursor() + length;
  this.decoder_.setEnd(newEnd);

  // Deserialize the embedded message.
  reader(message, this);

  // Advance the decoder past the embedded message and restore the endpoint.
  this.decoder_.setCursor(newEnd);
  this.decoder_.setEnd(oldEnd);
};


/**
 * Deserialize a proto into the provided message object using the provided
 * reader function, assuming that the message is serialized as a group
 * with the given tag.
 * @template T
 * @param {number} field
 * @param {T} message
 * @param {function(T, !BinaryReader)} reader
 * @export
 */
BinaryReader.prototype.readGroup = function(field, message, reader) {
  // Ensure that the wire type is correct.
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.START_GROUP);
  // Ensure that the field number is correct.
  asserts.assert(this.nextField_ == field);

  // Deserialize the message. The deserialization will stop at an END_GROUP tag.
  reader(message, this);

  if (!this.error_ &&
      this.nextWireType_ != BinaryConstants.WireType.END_GROUP) {
    asserts.fail('Group submessage did not end with an END_GROUP tag');
    this.error_ = true;
  }
};


/**
 * Return a decoder that wraps the current delimited field.
 * @return {!BinaryDecoder}
 * @export
 */
BinaryReader.prototype.getFieldDecoder = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.DELIMITED);

  var length = this.decoder_.readUnsignedVarint32();
  var start = this.decoder_.getCursor();
  var end = start + length;

  var innerDecoder =
      BinaryDecoder.alloc(this.decoder_.getBuffer(), start, length);
  this.decoder_.setCursor(end);
  return innerDecoder;
};


/**
 * Reads a signed 32-bit integer field from the binary stream, or throws an
 * error if the next field in the stream is not of the correct wire type.
 *
 * @return {number} The value of the signed 32-bit integer field.
 * @export
 */
BinaryReader.prototype.readInt32 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint32();
};


/**
 * Reads a signed 32-bit integer field from the binary stream, or throws an
 * error if the next field in the stream is not of the correct wire type.
 *
 * Returns the value as a string.
 *
 * @return {string} The value of the signed 32-bit integer field as a decimal
 * string.
 * @export
 */
BinaryReader.prototype.readInt32String = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint32String();
};


/**
 * Reads a signed 64-bit integer field from the binary stream, or throws an
 * error if the next field in the stream is not of the correct wire type.
 *
 * @return {number} The value of the signed 64-bit integer field.
 * @export
 */
BinaryReader.prototype.readInt64 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64();
};


/**
 * Reads a signed 64-bit integer field from the binary stream, or throws an
 * error if the next field in the stream is not of the correct wire type.
 *
 * Returns the value as a string.
 *
 * @return {string} The value of the signed 64-bit integer field as a decimal
 * string.
 * @export
 */
BinaryReader.prototype.readInt64String = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64String();
};


/**
 * Reads an unsigned 32-bit integer field from the binary stream, or throws an
 * error if the next field in the stream is not of the correct wire type.
 *
 * @return {number} The value of the unsigned 32-bit integer field.
 * @export
 */
BinaryReader.prototype.readUint32 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint32();
};


/**
 * Reads an unsigned 32-bit integer field from the binary stream, or throws an
 * error if the next field in the stream is not of the correct wire type.
 *
 * Returns the value as a string.
 *
 * @return {string} The value of the unsigned 32-bit integer field as a decimal
 * string.
 * @export
 */
BinaryReader.prototype.readUint32String = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint32String();
};


/**
 * Reads an unsigned 64-bit integer field from the binary stream, or throws an
 * error if the next field in the stream is not of the correct wire type.
 *
 * @return {number} The value of the unsigned 64-bit integer field.
 * @export
 */
BinaryReader.prototype.readUint64 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint64();
};


/**
 * Reads an unsigned 64-bit integer field from the binary stream, or throws an
 * error if the next field in the stream is not of the correct wire type.
 *
 * Returns the value as a string.
 *
 * @return {string} The value of the unsigned 64-bit integer field as a decimal
 * string.
 * @export
 */
BinaryReader.prototype.readUint64String = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint64String();
};


/**
 * Reads a signed zigzag-encoded 32-bit integer field from the binary stream,
 * or throws an error if the next field in the stream is not of the correct
 * wire type.
 *
 * @return {number} The value of the signed 32-bit integer field.
 * @export
 */
BinaryReader.prototype.readSint32 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readZigzagVarint32();
};


/**
 * Reads a signed zigzag-encoded 64-bit integer field from the binary stream,
 * or throws an error if the next field in the stream is not of the correct
 * wire type.
 *
 * @return {number} The value of the signed 64-bit integer field.
 * @export
 */
BinaryReader.prototype.readSint64 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readZigzagVarint64();
};


/**
 * Reads a signed zigzag-encoded 64-bit integer field from the binary stream,
 * or throws an error if the next field in the stream is not of the correct
 * wire type.
 *
 * @return {string} The value of the signed 64-bit integer field as a decimal
 *     string.
 * @export
 */
BinaryReader.prototype.readSint64String = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readZigzagVarint64String();
};


/**
 * Reads an unsigned 32-bit fixed-length integer fiield from the binary stream,
 * or throws an error if the next field in the stream is not of the correct
 * wire type.
 *
 * @return {number} The value of the double field.
 * @export
 */
BinaryReader.prototype.readFixed32 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED32);
  return this.decoder_.readUint32();
};


/**
 * Reads an unsigned 64-bit fixed-length integer fiield from the binary stream,
 * or throws an error if the next field in the stream is not of the correct
 * wire type.
 *
 * @return {number} The value of the float field.
 * @export
 */
BinaryReader.prototype.readFixed64 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED64);
  return this.decoder_.readUint64();
};


/**
 * Reads a signed 64-bit integer field from the binary stream as a string, or
 * throws an error if the next field in the stream is not of the correct wire
 * type.
 *
 * Returns the value as a string.
 *
 * @return {string} The value of the unsigned 64-bit integer field as a decimal
 * string.
 * @export
 */
BinaryReader.prototype.readFixed64String = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED64);
  return this.decoder_.readUint64String();
};


/**
 * Reads a signed 32-bit fixed-length integer fiield from the binary stream, or
 * throws an error if the next field in the stream is not of the correct wire
 * type.
 *
 * @return {number} The value of the signed 32-bit integer field.
 * @export
 */
BinaryReader.prototype.readSfixed32 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED32);
  return this.decoder_.readInt32();
};


/**
 * Reads a signed 32-bit fixed-length integer fiield from the binary stream, or
 * throws an error if the next field in the stream is not of the correct wire
 * type.
 *
 * @return {string} The value of the signed 32-bit integer field as a decimal
 * string.
 * @export
 */
BinaryReader.prototype.readSfixed32String = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED32);
  return this.decoder_.readInt32().toString();
};


/**
 * Reads a signed 64-bit fixed-length integer fiield from the binary stream, or
 * throws an error if the next field in the stream is not of the correct wire
 * type.
 *
 * @return {number} The value of the sfixed64 field.
 * @export
 */
BinaryReader.prototype.readSfixed64 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED64);
  return this.decoder_.readInt64();
};


/**
 * Reads a signed 64-bit fixed-length integer fiield from the binary stream, or
 * throws an error if the next field in the stream is not of the correct wire
 * type.
 *
 * Returns the value as a string.
 *
 * @return {string} The value of the sfixed64 field as a decimal string.
 * @export
 */
BinaryReader.prototype.readSfixed64String = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED64);
  return this.decoder_.readInt64String();
};


/**
 * Reads a 32-bit floating-point field from the binary stream, or throws an
 * error if the next field in the stream is not of the correct wire type.
 *
 * @return {number} The value of the float field.
 * @export
 */
BinaryReader.prototype.readFloat = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED32);
  return this.decoder_.readFloat();
};


/**
 * Reads a 64-bit floating-point field from the binary stream, or throws an
 * error if the next field in the stream is not of the correct wire type.
 *
 * @return {number} The value of the double field.
 * @export
 */
BinaryReader.prototype.readDouble = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED64);
  return this.decoder_.readDouble();
};


/**
 * Reads a boolean field from the binary stream, or throws an error if the next
 * field in the stream is not of the correct wire type.
 *
 * @return {boolean} The value of the boolean field.
 * @export
 */
BinaryReader.prototype.readBool = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return !!this.decoder_.readUnsignedVarint32();
};


/**
 * Reads an enum field from the binary stream, or throws an error if the next
 * field in the stream is not of the correct wire type.
 *
 * @return {number} The value of the enum field.
 * @export
 */
BinaryReader.prototype.readEnum = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64();
};


/**
 * Reads a string field from the binary stream, or throws an error if the next
 * field in the stream is not of the correct wire type.
 *
 * @return {string} The value of the string field.
 * @export
 */
BinaryReader.prototype.readString = function() {
  // delegate to the other reader so that inlining can eliminate this method
  // in the common case.
  if (UTF8_PARSING_ERRORS_ARE_FATAL) {
    return this.readStringRequireUtf8();
  }

  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.DELIMITED);
  var length = this.decoder_.readUnsignedVarint32();
  return this.decoder_.readString(length, /*requireUtf8=*/ false);
};

/**
 * Reads a string field from the binary stream, or throws an error if the next
 * field in the stream is not of the correct wire type, or if the string is
 * not valid utf8.
 *
 * @return {string} The value of the string field.
 */
BinaryReader.prototype.readStringRequireUtf8 = function () {
  asserts.assert(this.nextWireType_ == BinaryConstants.WireType.DELIMITED);
  const length = this.decoder_.readUnsignedVarint32();
  return this.decoder_.readString(length, /*requireUtf8=*/ true);
};


/**
 * Reads a length-prefixed block of bytes from the binary stream, or returns
 * null if the next field in the stream has an invalid length value.
 *
 * @return {!Uint8Array} The block of bytes.
 * @export
 */
BinaryReader.prototype.readBytes = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.DELIMITED);
  var length = this.decoder_.readUnsignedVarint32();
  return this.decoder_.readBytes(length);
};


/**
 * Reads a 64-bit varint or fixed64 field from the stream and returns it as an
 * 8-character Unicode string for use as a hash table key, or throws an error
 * if the next field in the stream is not of the correct wire type.
 *
 * @return {string} The hash value.
 * @export
 */
BinaryReader.prototype.readVarintHash64 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readVarintHash64();
};


/**
 * Reads an sint64 field from the stream and returns it as an 8-character
 * Unicode string for use as a hash table key, or throws an error if the next
 * field in the stream is not of the correct wire type.
 *
 * @return {string} The hash value.
 * @export
 */
BinaryReader.prototype.readSintHash64 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readZigzagVarintHash64();
};


/**
 * Reads a 64-bit varint field from the stream and invokes `convert` to produce
 * the return value, or throws an error if the next field in the stream is not
 * of the correct wire type.
 *
 * @param {function(number, number): T} convert Conversion function to produce
 *     the result value, takes parameters (lowBits, highBits).
 * @return {T}
 * @template T
 * @export
 */
BinaryReader.prototype.readSplitVarint64 = function(convert) {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readSplitVarint64(convert);
};


/**
 * Reads a 64-bit zig-zag varint field from the stream and invokes `convert` to
 * produce the return value, or throws an error if the next field in the stream
 * is not of the correct wire type.
 *
 * @param {function(number, number): T} convert Conversion function to produce
 *     the result value, takes parameters (lowBits, highBits).
 * @return {T}
 * @template T
 * @export
 */
BinaryReader.prototype.readSplitZigzagVarint64 = function(convert) {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.VARINT);
  return this.decoder_.readSplitVarint64(function(lowBits, highBits) {
    return utils.fromZigzag64(lowBits, highBits, convert);
  });
};


/**
 * Reads a 64-bit varint or fixed64 field from the stream and returns it as a
 * 8-character Unicode string for use as a hash table key, or throws an error
 * if the next field in the stream is not of the correct wire type.
 *
 * @return {string} The hash value.
 * @export
 */
BinaryReader.prototype.readFixedHash64 = function() {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED64);
  return this.decoder_.readFixedHash64();
};


/**
 * Reads a 64-bit fixed64 field from the stream and invokes `convert`
 * to produce the return value, or throws an error if the next field in the
 * stream is not of the correct wire type.
 *
 * @param {function(number, number): T} convert Conversion function to produce
 *     the result value, takes parameters (lowBits, highBits).
 * @return {T}
 * @template T
 * @export
 */
BinaryReader.prototype.readSplitFixed64 = function(convert) {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.FIXED64);
  return this.decoder_.readSplitFixed64(convert);
};


/**
 * Reads a packed scalar field using the supplied raw reader function.
 * @param {function(this:BinaryDecoder)} decodeMethod
 * @return {!Array}
 * @private
 */
BinaryReader.prototype.readPackedField_ = function(decodeMethod) {
  asserts.assert(
      this.nextWireType_ == BinaryConstants.WireType.DELIMITED);
  var length = this.decoder_.readUnsignedVarint32();
  var end = this.decoder_.getCursor() + length;
  var result = [];
  while (this.decoder_.getCursor() < end) {
    // TODO(aappleby): .call is slow
    result.push(decodeMethod.call(this.decoder_));
  }
  return result;
};


/**
 * Reads a packed int32 field, which consists of a length header and a list of
 * signed varints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedInt32 = function() {
  return this.readPackedField_(this.decoder_.readSignedVarint32);
};


/**
 * Reads a packed int32 field, which consists of a length header and a list of
 * signed varints. Returns a list of strings.
 * @return {!Array<string>}
 * @export
 */
BinaryReader.prototype.readPackedInt32String = function() {
  return this.readPackedField_(this.decoder_.readSignedVarint32String);
};


/**
 * Reads a packed int64 field, which consists of a length header and a list of
 * signed varints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedInt64 = function() {
  return this.readPackedField_(this.decoder_.readSignedVarint64);
};


/**
 * Reads a packed int64 field, which consists of a length header and a list of
 * signed varints. Returns a list of strings.
 * @return {!Array<string>}
 * @export
 */
BinaryReader.prototype.readPackedInt64String = function() {
  return this.readPackedField_(this.decoder_.readSignedVarint64String);
};


/**
 * Reads a packed uint32 field, which consists of a length header and a list of
 * unsigned varints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedUint32 = function() {
  return this.readPackedField_(this.decoder_.readUnsignedVarint32);
};


/**
 * Reads a packed uint32 field, which consists of a length header and a list of
 * unsigned varints. Returns a list of strings.
 * @return {!Array<string>}
 * @export
 */
BinaryReader.prototype.readPackedUint32String = function() {
  return this.readPackedField_(this.decoder_.readUnsignedVarint32String);
};


/**
 * Reads a packed uint64 field, which consists of a length header and a list of
 * unsigned varints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedUint64 = function() {
  return this.readPackedField_(this.decoder_.readUnsignedVarint64);
};


/**
 * Reads a packed uint64 field, which consists of a length header and a list of
 * unsigned varints. Returns a list of strings.
 * @return {!Array<string>}
 * @export
 */
BinaryReader.prototype.readPackedUint64String = function() {
  return this.readPackedField_(this.decoder_.readUnsignedVarint64String);
};


/**
 * Reads a packed sint32 field, which consists of a length header and a list of
 * zigzag varints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedSint32 = function() {
  return this.readPackedField_(this.decoder_.readZigzagVarint32);
};


/**
 * Reads a packed sint64 field, which consists of a length header and a list of
 * zigzag varints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedSint64 = function() {
  return this.readPackedField_(this.decoder_.readZigzagVarint64);
};


/**
 * Reads a packed sint64 field, which consists of a length header and a list of
 * zigzag varints.  Returns a list of strings.
 * @return {!Array<string>}
 * @export
 */
BinaryReader.prototype.readPackedSint64String = function() {
  return this.readPackedField_(this.decoder_.readZigzagVarint64String);
};


/**
 * Reads a packed fixed32 field, which consists of a length header and a list
 * of unsigned 32-bit ints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedFixed32 = function() {
  return this.readPackedField_(this.decoder_.readUint32);
};


/**
 * Reads a packed fixed64 field, which consists of a length header and a list
 * of unsigned 64-bit ints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedFixed64 = function() {
  return this.readPackedField_(this.decoder_.readUint64);
};


/**
 * Reads a packed fixed64 field, which consists of a length header and a list
 * of unsigned 64-bit ints.  Returns a list of strings.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedFixed64String = function() {
  return this.readPackedField_(this.decoder_.readUint64String);
};


/**
 * Reads a packed sfixed32 field, which consists of a length header and a list
 * of 32-bit ints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedSfixed32 = function() {
  return this.readPackedField_(this.decoder_.readInt32);
};


/**
 * Reads a packed sfixed64 field, which consists of a length header and a list
 * of 64-bit ints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedSfixed64 = function() {
  return this.readPackedField_(this.decoder_.readInt64);
};


/**
 * Reads a packed sfixed64 field, which consists of a length header and a list
 * of 64-bit ints.  Returns a list of strings.
 * @return {!Array<string>}
 * @export
 */
BinaryReader.prototype.readPackedSfixed64String = function() {
  return this.readPackedField_(this.decoder_.readInt64String);
};


/**
 * Reads a packed float field, which consists of a length header and a list of
 * floats.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedFloat = function() {
  return this.readPackedField_(this.decoder_.readFloat);
};


/**
 * Reads a packed double field, which consists of a length header and a list of
 * doubles.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedDouble = function() {
  return this.readPackedField_(this.decoder_.readDouble);
};


/**
 * Reads a packed bool field, which consists of a length header and a list of
 * unsigned varints.
 * @return {!Array<boolean>}
 * @export
 */
BinaryReader.prototype.readPackedBool = function() {
  return this.readPackedField_(this.decoder_.readBool);
};


/**
 * Reads a packed enum field, which consists of a length header and a list of
 * unsigned varints.
 * @return {!Array<number>}
 * @export
 */
BinaryReader.prototype.readPackedEnum = function() {
  return this.readPackedField_(this.decoder_.readEnum);
};


/**
 * Reads a packed varint hash64 field, which consists of a length header and a
 * list of varint hash64s.
 * @return {!Array<string>}
 * @export
 */
BinaryReader.prototype.readPackedVarintHash64 = function() {
  return this.readPackedField_(this.decoder_.readVarintHash64);
};


/**
 * Reads a packed fixed hash64 field, which consists of a length header and a
 * list of fixed hash64s.
 * @return {!Array<string>}
 * @export
 */
BinaryReader.prototype.readPackedFixedHash64 = function() {
  return this.readPackedField_(this.decoder_.readFixedHash64);
};

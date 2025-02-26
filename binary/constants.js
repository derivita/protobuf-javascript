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
 * @fileoverview This file contains constants and typedefs used by
 * jspb.BinaryReader and BinaryWriter.
 * @suppress {missingRequire} TODO(b/152540451): this shouldn't be needed
 *
 * @author aappleby@google.com (Austin Appleby)
 */

const { BinaryReader } = goog.requireType('jspb.binary.reader');
const { BinaryWriter } = goog.requireType('jspb.binary.writer');
const { Message } = goog.requireType('jspb.message');


/**
 * Base interface class for all const messages.
 * @interface
 * @export
 */
export function ConstBinaryMessage() {}

/**
 * Generate a debug string for this proto that is in proto2 text format.
 * @return {string} The debug string.
 * @export
 */
ConstBinaryMessage.prototype.toDebugString;

/**
 * Helper to generate a debug string for this proto at some indent level. The
 * first line is not indented.
 * @param {number} indentLevel The number of spaces by which to indent lines.
 * @return {string} The debug string.
 * @protected
 */
ConstBinaryMessage.prototype.toDebugStringInternal;

/**
 * Base interface class for all messages. Does __not__ define any methods, as
 * doing so on a widely-used interface defeats dead-code elimination.
 * @interface
 * @extends {ConstBinaryMessage}
 */
export function BinaryMessage() {}


/**
 * The types convertible to Uint8Arrays. Strings are assumed to be
 * base64-encoded.
 * @typedef {ArrayBuffer|Uint8Array|Array<number>|string}
 */
export var ByteSource;


/**
 * A scalar field in jspb can be a boolean, number, or string.
 * @typedef {boolean|number|string}
 */
export var ScalarFieldType;


/**
 * A repeated field in jspb is an array of scalars, blobs, or messages.
 * @typedef {!Array<ScalarFieldType>|
             !Array<!Uint8Array>|
             !Array<!ConstBinaryMessage>|
             !Array<!BinaryMessage>}
 */
export var RepeatedFieldType;


/**
 * A field in jspb can be a scalar, a block of bytes, another proto, or an
 * array of any of the above.
 * @typedef {ScalarFieldType|
             RepeatedFieldType|
             !Uint8Array|
             !ConstBinaryMessage|
             !BinaryMessage}
 */
export var AnyFieldType;


/**
 * A builder function creates an instance of a message object.
 * @typedef {function():!BinaryMessage}
 */
export var BuilderFunction;


/**
 * A cloner function creates a deep copy of a message object.
 * @typedef {function(ConstBinaryMessage):BinaryMessage}
 */
export var ClonerFunction;


/**
 * A recycler function destroys an instance of a message object.
 * @typedef {function(!BinaryMessage):void}
 */
export var RecyclerFunction;


/**
 * A reader function initializes a message using data from a BinaryReader.
 * @typedef {function(!BinaryMessage, !BinaryReader):void}
 */
export var ReaderFunction;


/**
 * A writer function serializes a message to a BinaryWriter.
 * @typedef {function((!Message|!ConstBinaryMessage),
 *                    !BinaryWriter):void}
 */
export var WriterFunction;


/**
 * A pruner function removes default-valued fields and empty submessages from a
 * message and returns either the pruned message or null if the entire message
 * was pruned away.
 * @typedef {function(?BinaryMessage):?BinaryMessage}
 */
export var PrunerFunction;


/**
 * A comparer function returns true if two protos are equal.
 * @typedef {function(?ConstBinaryMessage,
 *                     ?ConstBinaryMessage):boolean}
 */
export var ComparerFunction;


/**
 * Field type codes, taken from proto2/public/wire_format_lite.h.
 * @enum {number}
 */
export var FieldType = {
  INVALID: -1,
  DOUBLE: 1,
  FLOAT: 2,
  INT64: 3,
  UINT64: 4,
  INT32: 5,
  FIXED64: 6,
  FIXED32: 7,
  BOOL: 8,
  STRING: 9,
  GROUP: 10,
  MESSAGE: 11,
  BYTES: 12,
  UINT32: 13,
  ENUM: 14,
  SFIXED32: 15,
  SFIXED64: 16,
  SINT32: 17,
  SINT64: 18,

  // Extended types for Javascript

  FHASH64: 30, // 64-bit hash string, fixed-length encoding.
  VHASH64: 31  // 64-bit hash string, varint encoding.
};


/**
 * Wire-format type codes, taken from proto2/public/wire_format_lite.h.
 * @enum {number}
 */
export var WireType = {
  INVALID: -1,
  VARINT: 0,
  FIXED64: 1,
  DELIMITED: 2,
  START_GROUP: 3,
  END_GROUP: 4,
  FIXED32: 5
};


/**
 * Translates field type to wire type.
 * @param {FieldType} fieldType
 * @return {WireType}
 */
export function FieldTypeToWireType(fieldType) {
  var fieldTypes = FieldType;
  var wireTypes = WireType;
  switch (fieldType) {
    case fieldTypes.INT32:
    case fieldTypes.INT64:
    case fieldTypes.UINT32:
    case fieldTypes.UINT64:
    case fieldTypes.SINT32:
    case fieldTypes.SINT64:
    case fieldTypes.BOOL:
    case fieldTypes.ENUM:
    case fieldTypes.VHASH64:
      return wireTypes.VARINT;

    case fieldTypes.DOUBLE:
    case fieldTypes.FIXED64:
    case fieldTypes.SFIXED64:
    case fieldTypes.FHASH64:
      return wireTypes.FIXED64;

    case fieldTypes.STRING:
    case fieldTypes.MESSAGE:
    case fieldTypes.BYTES:
      return wireTypes.DELIMITED;

    case fieldTypes.FLOAT:
    case fieldTypes.FIXED32:
    case fieldTypes.SFIXED32:
      return wireTypes.FIXED32;

    case fieldTypes.INVALID:
    case fieldTypes.GROUP:
    default:
      return wireTypes.INVALID;
  }
}


/**
 * Flag to indicate a missing field.
 * @const {number}
 */
export var INVALID_FIELD_NUMBER = -1;


/**
 * The smallest denormal float32 value.
 * @const {number}
 */
export var FLOAT32_EPS = 1.401298464324817e-45;


/**
 * The smallest normal float64 value.
 * @const {number}
 */
export var FLOAT32_MIN = 1.1754943508222875e-38;


/**
 * The largest finite float32 value.
 * @const {number}
 */
export var FLOAT32_MAX = 3.4028234663852886e+38;


/**
 * The smallest denormal float64 value.
 * @const {number}
 */
export var FLOAT64_EPS = 5e-324;


/**
 * The smallest normal float64 value.
 * @const {number}
 */
export var FLOAT64_MIN = 2.2250738585072014e-308;


/**
 * The largest finite float64 value.
 * @const {number}
 */
export var FLOAT64_MAX = 1.7976931348623157e+308;


/**
 * Convenience constant equal to 2^20.
 * @const {number}
 */
export var TWO_TO_20 = 1048576;


/**
 * Convenience constant equal to 2^23.
 * @const {number}
 */
export var TWO_TO_23 = 8388608;


/**
 * Convenience constant equal to 2^31.
 * @const {number}
 */
export var TWO_TO_31 = 2147483648;


/**
 * Convenience constant equal to 2^32.
 * @const {number}
 */
export var TWO_TO_32 = 4294967296;


/**
 * Convenience constant equal to 2^52.
 * @const {number}
 */
export var TWO_TO_52 = 4503599627370496;


/**
 * Convenience constant equal to 2^63.
 * @const {number}
 */
export var TWO_TO_63 = 9223372036854775808;


/**
 * Convenience constant equal to 2^64.
 * @const {number}
 */
export var TWO_TO_64 = 18446744073709551616;


/**
 * Eight-character string of zeros, used as the default 64-bit hash value.
 * @const {string}
 */
export var ZERO_HASH = '\0\0\0\0\0\0\0\0';

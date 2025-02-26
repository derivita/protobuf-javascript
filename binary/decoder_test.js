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
 * @fileoverview Test cases for jspb's binary protocol buffer decoder.
 *
 * There are two particular magic numbers that need to be pointed out -
 * 2^64-1025 is the largest number representable as both a double and an
 * unsigned 64-bit integer, and 2^63-513 is the largest number representable as
 * both a double and a signed 64-bit integer.
 *
 * Test suite is written using Jasmine -- see http://jasmine.github.io/
 *
 * @author aappleby@google.com (Austin Appleby)
 */

import * as BinaryConstants from './constants.js';

import { BinaryDecoder } from './decoder.js';
import { BinaryEncoder } from './encoder.js';
import * as utils from './utils.js';


/**
 * Tests encoding and decoding of unsigned types.
 * @param {Function} readValue
 * @param {Function} writeValue
 * @param {number} epsilon
 * @param {number} upperLimit
 * @param {Function} filter
 * @suppress {missingProperties|visibility}
 */
function doTestUnsignedValue(
    readValue, writeValue, epsilon, upperLimit, filter) {
  const encoder = new BinaryEncoder();

  // Encode zero and limits.
  writeValue.call(encoder, filter(0));
  writeValue.call(encoder, filter(epsilon));
  writeValue.call(encoder, filter(upperLimit));

  // Encode positive values.
  for (let cursor = epsilon; cursor < upperLimit; cursor *= 1.1) {
    writeValue.call(encoder, filter(cursor));
  }

  const decoder = BinaryDecoder.alloc(encoder.end());

  // Check zero and limits.
  expect(readValue.call(decoder)).toEqual(filter(0));
  expect(readValue.call(decoder)).toEqual(filter(epsilon));
  expect(readValue.call(decoder)).toEqual(filter(upperLimit));

  // Check positive values.
  for (let cursor = epsilon; cursor < upperLimit; cursor *= 1.1) {
    if (filter(cursor) != readValue.call(decoder)) throw 'fail!';
  }

  // Encoding values outside the valid range should assert.
  expect(() => {
    writeValue.call(encoder, -1);
  }).toThrow();
  expect(() => {
    writeValue.call(encoder, upperLimit * 1.1);
  }).toThrow();
}


/**
 * Tests encoding and decoding of signed types.
 * @param {Function} readValue
 * @param {Function} writeValue
 * @param {number} epsilon
 * @param {number} lowerLimit
 * @param {number} upperLimit
 * @param {Function} filter
 * @suppress {missingProperties}
 */
function doTestSignedValue(
    readValue, writeValue, epsilon, lowerLimit, upperLimit, filter) {
  const encoder = new BinaryEncoder();

  // Encode zero and limits.
  writeValue.call(encoder, filter(lowerLimit));
  writeValue.call(encoder, filter(-epsilon));
  writeValue.call(encoder, filter(0));
  writeValue.call(encoder, filter(epsilon));
  writeValue.call(encoder, filter(upperLimit));

  const inputValues = [];

  // Encode negative values.
  for (let cursor = lowerLimit; cursor < -epsilon; cursor /= 1.1) {
    let val = filter(cursor);
    writeValue.call(encoder, val);
    inputValues.push(val);
  }

  // Encode positive values.
  for (let cursor = epsilon; cursor < upperLimit; cursor *= 1.1) {
    const val = filter(cursor);
    writeValue.call(encoder, val);
    inputValues.push(val);
  }

  const decoder = BinaryDecoder.alloc(encoder.end());

  // Check zero and limits.
  expect(readValue.call(decoder)).toEqual(filter(lowerLimit));
  expect(readValue.call(decoder)).toEqual(filter(-epsilon));
  expect(readValue.call(decoder)).toEqual(filter(0));
  expect(readValue.call(decoder)).toEqual(filter(epsilon));
  expect(readValue.call(decoder)).toEqual(filter(upperLimit));

  // Verify decoded values.
  for (let i = 0; i < inputValues.length; i++) {
    expect(readValue.call(decoder)).toEqual(inputValues[i]);
  }

  // Encoding values outside the valid range should assert.
  const pastLowerLimit = lowerLimit * 1.1;
  const pastUpperLimit = upperLimit * 1.1;
  if (pastLowerLimit !== -Infinity) {
    expect(() => void writeValue.call(encoder, pastLowerLimit)).toThrow();
  }
  if (pastUpperLimit !== Infinity) {
    expect(() => void writeValue.call(encoder, pastUpperLimit)).toThrow();
  }
}

describe('binaryDecoderTest', () => {
  /**
   * Tests the decoder instance cache.
   */
  it('testInstanceCache', /** @suppress {visibility} */ () => {
    // Empty the instance caches.
    BinaryDecoder.instanceCache_ = [];

    // Allocating and then freeing a decoder should put it in the instance
    // cache.
    BinaryDecoder.alloc().free();

    expect(BinaryDecoder.getInstanceCacheLength()).toEqual(1);

    // Allocating and then freeing three decoders should leave us with three in
    // the cache.

    const decoder1 = BinaryDecoder.alloc();
    const decoder2 = BinaryDecoder.alloc();
    const decoder3 = BinaryDecoder.alloc();
    decoder1.free();
    decoder2.free();
    decoder3.free();

    expect(BinaryDecoder.getInstanceCacheLength()).toEqual(3);
  });


  describe('varint64', () => {
    let /** !BinaryEncoder */ encoder;
    let /** !BinaryDecoder */ decoder;

    const hashA =
        String.fromCharCode(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00);
    const hashB =
        String.fromCharCode(0x12, 0x34, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00);
    const hashC =
        String.fromCharCode(0x12, 0x34, 0x56, 0x78, 0x87, 0x65, 0x43, 0x21);
    const hashD =
        String.fromCharCode(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF);
    beforeEach(() => {
      encoder = new BinaryEncoder();

      encoder.writeVarintHash64(hashA);
      encoder.writeVarintHash64(hashB);
      encoder.writeVarintHash64(hashC);
      encoder.writeVarintHash64(hashD);

      encoder.writeFixedHash64(hashA);
      encoder.writeFixedHash64(hashB);
      encoder.writeFixedHash64(hashC);
      encoder.writeFixedHash64(hashD);

      decoder = BinaryDecoder.alloc(encoder.end());
    });

    it('reads 64-bit integers as hash strings', () => {
      expect(hashA).toEqual(decoder.readVarintHash64());
      expect(hashB).toEqual(decoder.readVarintHash64());
      expect(hashC).toEqual(decoder.readVarintHash64());
      expect(hashD).toEqual(decoder.readVarintHash64());

      expect(hashA).toEqual(decoder.readFixedHash64());
      expect(hashB).toEqual(decoder.readFixedHash64());
      expect(hashC).toEqual(decoder.readFixedHash64());
      expect(hashD).toEqual(decoder.readFixedHash64());
    });

    it('reads split 64 bit integers', () => {
      function hexJoin(bitsLow, bitsHigh) {
        return `0x${(bitsHigh >>> 0).toString(16)}:0x${
            (bitsLow >>> 0).toString(16)}`;
      }
      function hexJoinHash(hash64) {
        utils.splitHash64(hash64, true);

        return hexJoin(utils.getSplit64Low(), utils.getSplit64High());
      }

      expect(decoder.readSplitVarint64(hexJoin)).toEqual(hexJoinHash(hashA));
      expect(decoder.readSplitVarint64(hexJoin)).toEqual(hexJoinHash(hashB));
      expect(decoder.readSplitVarint64(hexJoin)).toEqual(hexJoinHash(hashC));
      expect(decoder.readSplitVarint64(hexJoin)).toEqual(hexJoinHash(hashD));

      expect(decoder.readSplitFixed64(hexJoin)).toEqual(hexJoinHash(hashA));
      expect(decoder.readSplitFixed64(hexJoin)).toEqual(hexJoinHash(hashB));
      expect(decoder.readSplitFixed64(hexJoin)).toEqual(hexJoinHash(hashC));
      expect(decoder.readSplitFixed64(hexJoin)).toEqual(hexJoinHash(hashD));
    });
  });

  describe('sint64', () => {
    let /** !BinaryDecoder */ decoder;

    const hashA =
        String.fromCharCode(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00);
    const hashB =
        String.fromCharCode(0x12, 0x34, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00);
    const hashC =
        String.fromCharCode(0x12, 0x34, 0x56, 0x78, 0x87, 0x65, 0x43, 0x21);
    const hashD =
        String.fromCharCode(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF);
    beforeEach(() => {
      const encoder = new BinaryEncoder();

      encoder.writeZigzagVarintHash64(hashA);
      encoder.writeZigzagVarintHash64(hashB);
      encoder.writeZigzagVarintHash64(hashC);
      encoder.writeZigzagVarintHash64(hashD);

      decoder = BinaryDecoder.alloc(encoder.end());
    });

    it('reads 64-bit integers as decimal strings', () => {
      const signed = true;
      expect(decoder.readZigzagVarint64String())
          .toEqual(utils.hash64ToDecimalString(hashA, signed));
      expect(decoder.readZigzagVarint64String())
          .toEqual(utils.hash64ToDecimalString(hashB, signed));
      expect(decoder.readZigzagVarint64String())
          .toEqual(utils.hash64ToDecimalString(hashC, signed));
      expect(decoder.readZigzagVarint64String())
          .toEqual(utils.hash64ToDecimalString(hashD, signed));
    });

    it('reads 64-bit integers as hash strings', () => {
      expect(decoder.readZigzagVarintHash64()).toEqual(hashA);
      expect(decoder.readZigzagVarintHash64()).toEqual(hashB);
      expect(decoder.readZigzagVarintHash64()).toEqual(hashC);
      expect(decoder.readZigzagVarintHash64()).toEqual(hashD);
    });

    it('reads split 64 bit zigzag integers', () => {
      function hexJoin(bitsLow, bitsHigh) {
        return `0x${(bitsHigh >>> 0).toString(16)}:0x${
            (bitsLow >>> 0).toString(16)}`;
      }
      function hexJoinHash(hash64) {
        utils.splitHash64(hash64);
        return hexJoin(utils.getSplit64Low(), utils.getSplit64High());
      }

      expect(decoder.readSplitZigzagVarint64(hexJoin))
          .toEqual(hexJoinHash(hashA));
      expect(decoder.readSplitZigzagVarint64(hexJoin))
          .toEqual(hexJoinHash(hashB));
      expect(decoder.readSplitZigzagVarint64(hexJoin))
          .toEqual(hexJoinHash(hashC));
      expect(decoder.readSplitZigzagVarint64(hexJoin))
          .toEqual(hexJoinHash(hashD));
    });

    it('does zigzag encoding properly', () => {
      // Test cases directly from the protobuf dev guide.
      // https://engdoc.corp.google.com/eng/howto/protocolbuffers/developerguide/encoding.shtml?cl=head#types
      const testCases = [
        {original: '0', zigzag: '0'},
        {original: '-1', zigzag: '1'},
        {original: '1', zigzag: '2'},
        {original: '-2', zigzag: '3'},
        {original: '2147483647', zigzag: '4294967294'},
        {original: '-2147483648', zigzag: '4294967295'},
        // 64-bit extremes, not in dev guide.
        {original: '9223372036854775807', zigzag: '18446744073709551614'},
        {original: '-9223372036854775808', zigzag: '18446744073709551615'},
        // None of the above catch: bitsLow < 0 && bitsHigh > 0 && bitsHigh <
        // 0x1FFFFF. The following used to be broken.
        {original: '72000000000', zigzag: '144000000000'},
      ];
      const encoder = new BinaryEncoder();
      testCases.forEach(function(c) {
        encoder.writeZigzagVarint64String(c.original);
      });
      const buffer = encoder.end();
      const zigzagDecoder = BinaryDecoder.alloc(buffer);
      const varintDecoder = BinaryDecoder.alloc(buffer);
      testCases.forEach(function(c) {
        expect(zigzagDecoder.readZigzagVarint64String()).toEqual(c.original);
        expect(varintDecoder.readUnsignedVarint64String()).toEqual(c.zigzag);
      });
    });
  });

  /**
   * Tests reading and writing large strings
   */
  it('testLargeStrings', () => {
    const encoder = new BinaryEncoder();

    const len = 150000;
    let long_string = '';
    for (let i = 0; i < len; i++) {
      long_string += 'a';
    }

    encoder.writeString(long_string);

    const decoder = BinaryDecoder.alloc(encoder.end());

    expect(decoder.readString(len, true)).toEqual(long_string);
  });

  /**
   * Test encoding and decoding utf-8.
   */
  it('testUtf8', () => {
    const encoder = new BinaryEncoder();

    const ascii = 'ASCII should work in 3, 2, 1...';
    const utf8_two_bytes = '©';
    const utf8_three_bytes = '❄';
    const utf8_four_bytes = '😁';

    encoder.writeString(ascii);
    encoder.writeString(utf8_two_bytes);
    encoder.writeString(utf8_three_bytes);
    encoder.writeString(utf8_four_bytes);

    const decoder = BinaryDecoder.alloc(encoder.end());

    expect(decoder.readString(ascii.length,  /* enforceUtf8= */ true)).toEqual(ascii);
    expect(utf8_two_bytes).toEqual(decoder.readString(2,  /* enforceUtf8= */ true));
    expect(utf8_three_bytes)
      .toEqual(decoder.readString(3,  /* enforceUtf8= */ true));
    expect(utf8_four_bytes).toEqual(decoder.readString(4,  /* enforceUtf8= */ true));
  });

  /**
   * Verifies that passing a non-string to writeString raises an error.
   */
  it('testBadString', () => {
    const encoder = new BinaryEncoder();

    expect(() => {
      encoder.writeString(42)
    }).toThrow();
    expect(() => {
      encoder.writeString(null)
    }).toThrow();
  });

  /**
   * Verifies that misuse of the decoder class triggers assertions.
   */
  it('testDecodeErrors', () => {
    // Reading a value past the end of the stream should trigger an assertion.
    const decoder = BinaryDecoder.alloc([0, 1, 2]);
    expect(() => {
      decoder.readUint64()
    }).toThrow();

    // Overlong varints should trigger assertions.
    decoder.setBlock(
        [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0]);
    expect(() => {
      decoder.readUnsignedVarint64()
    }).toThrow();
    decoder.reset();
    expect(() => {
      decoder.readSignedVarint64()
    }).toThrow();
    decoder.reset();
    expect(() => {
      decoder.readZigzagVarint64()
    }).toThrow();
    decoder.reset();
    expect(() => {
      decoder.readUnsignedVarint32()
    }).toThrow();
  });


  /**
   * Tests encoding and decoding of unsigned integers.
   */
  it('testUnsignedIntegers', () => {
    doTestUnsignedValue(
        BinaryDecoder.prototype.readUint8,
        BinaryEncoder.prototype.writeUint8, 1, 0xFF, Math.round);

    doTestUnsignedValue(
        BinaryDecoder.prototype.readUint16,
        BinaryEncoder.prototype.writeUint16, 1, 0xFFFF, Math.round);

    doTestUnsignedValue(
        BinaryDecoder.prototype.readUint32,
        BinaryEncoder.prototype.writeUint32, 1, 0xFFFFFFFF, Math.round);

    doTestUnsignedValue(
        BinaryDecoder.prototype.readUnsignedVarint32,
        BinaryEncoder.prototype.writeUnsignedVarint32, 1, 0xFFFFFFFF,
        Math.round);

    doTestUnsignedValue(
        BinaryDecoder.prototype.readUint64,
        BinaryEncoder.prototype.writeUint64, 1, Math.pow(2, 64) - 1025,
        Math.round);

    doTestUnsignedValue(
        BinaryDecoder.prototype.readUnsignedVarint64,
        BinaryEncoder.prototype.writeUnsignedVarint64, 1,
        Math.pow(2, 64) - 1025, Math.round);
  });


  /**
   * Tests encoding and decoding of signed integers.
   */
  it('testSignedIntegers', () => {
    doTestSignedValue(
        BinaryDecoder.prototype.readInt8,
        BinaryEncoder.prototype.writeInt8, 1, -0x80, 0x7F, Math.round);

    doTestSignedValue(
        BinaryDecoder.prototype.readInt16,
        BinaryEncoder.prototype.writeInt16, 1, -0x8000, 0x7FFF,
        Math.round);

    doTestSignedValue(
        BinaryDecoder.prototype.readInt32,
        BinaryEncoder.prototype.writeInt32, 1, -0x80000000, 0x7FFFFFFF,
        Math.round);

    doTestSignedValue(
        BinaryDecoder.prototype.readSignedVarint32,
        BinaryEncoder.prototype.writeSignedVarint32, 1, -0x80000000,
        0x7FFFFFFF, Math.round);

    doTestSignedValue(
        BinaryDecoder.prototype.readInt64,
        BinaryEncoder.prototype.writeInt64, 1, -Math.pow(2, 63),
        Math.pow(2, 63) - 513, Math.round);

    doTestSignedValue(
        BinaryDecoder.prototype.readSignedVarint64,
        BinaryEncoder.prototype.writeSignedVarint64, 1, -Math.pow(2, 63),
        Math.pow(2, 63) - 513, Math.round);
  });


  /**
   * Tests encoding and decoding of floats.
   */
  it('testFloats', () => {
    /**
     * @param {number} x
     * @return {number}
     */
    function truncate(x) {
      const temp = new Float32Array(1);
      temp[0] = x;
      return temp[0];
    }
    doTestSignedValue(
        BinaryDecoder.prototype.readFloat,
        BinaryEncoder.prototype.writeFloat,
        BinaryConstants.FLOAT32_EPS, -BinaryConstants.FLOAT32_MAX,
        BinaryConstants.FLOAT32_MAX, truncate);

    doTestSignedValue(
        BinaryDecoder.prototype.readDouble,
        BinaryEncoder.prototype.writeDouble,
        BinaryConstants.FLOAT64_EPS * 10,
        -BinaryConstants.FLOAT64_MAX, BinaryConstants.FLOAT64_MAX,
        function(x) {
          return x;
        });
  });
});

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
 * @fileoverview Test cases for jspb's helper functions.
 *
 * Test suite is written using Jasmine -- see http://jasmine.github.io/
 *
 * @author aappleby@google.com (Austin Appleby)
 */

import * as crypt from '../../closure-library/closure/goog/crypt/crypt.js';

import * as base64 from '../../closure-library/closure/goog/crypt/base64.js';
import * as BinaryConstants from './constants.js';
import { BinaryWriter } from './writer.js';
import * as utils from './utils.js';


/**
 * @param {number} x
 * @return {number}
 */
function truncate(x) {
  const temp = new Float32Array(1);
  temp[0] = x;
  return temp[0];
}


/**
 * Converts an 64-bit integer in split representation to a 64-bit hash string
 * (8 bits encoded per character).
 * @param {number} bitsLow The low 32 bits of the split 64-bit integer.
 * @param {number} bitsHigh The high 32 bits of the split 64-bit integer.
 * @return {string} The encoded hash string, 8 bits per character.
 */
function toHashString(bitsLow, bitsHigh) {
  return String.fromCharCode(
      (bitsLow >>> 0) & 0xFF, (bitsLow >>> 8) & 0xFF, (bitsLow >>> 16) & 0xFF,
      (bitsLow >>> 24) & 0xFF, (bitsHigh >>> 0) & 0xFF, (bitsHigh >>> 8) & 0xFF,
      (bitsHigh >>> 16) & 0xFF, (bitsHigh >>> 24) & 0xFF);
}


describe('binaryUtilsTest', () => {
  /**
   * Tests lossless binary-to-decimal conversion.
   */
  it('testDecimalConversion', () => {
    // Check some magic numbers.
    let result = utils.joinUnsignedDecimalString(0x89e80001, 0x8ac72304);
    expect(result).toEqual('10000000000000000001');

    result = utils.joinUnsignedDecimalString(0xacd05f15, 0x1b69b4b);
    expect(result).toEqual('123456789123456789');

    result = utils.joinUnsignedDecimalString(0xeb1f0ad2, 0xab54a98c);
    expect(result).toEqual('12345678901234567890');

    result = utils.joinUnsignedDecimalString(0xe3b70cb1, 0x891087b8);
    expect(result).toEqual('9876543210987654321');

    // Check limits.
    result = utils.joinUnsignedDecimalString(0x00000000, 0x00000000);
    expect(result).toEqual('0');

    result = utils.joinUnsignedDecimalString(0xFFFFFFFF, 0xFFFFFFFF);
    expect(result).toEqual('18446744073709551615');

    // Check each bit of the low dword.
    for (let i = 0; i < 32; i++) {
      const low = (1 << i) >>> 0;
      result = utils.joinUnsignedDecimalString(low, 0);
      expect(result).toEqual('' + Math.pow(2, i));
    }

    // Check the first 20 bits of the high dword.
    for (let i = 0; i < 20; i++) {
      const high = (1 << i) >>> 0;
      result = utils.joinUnsignedDecimalString(0, high);
      expect(result).toEqual('' + Math.pow(2, 32 + i));
    }

    // V8's internal double-to-string conversion is inaccurate for values above
    // 2^52, even if they're representable integers - check the rest of the bits
    // manually against the correct string representations of 2^N.

    result = utils.joinUnsignedDecimalString(0x00000000, 0x00100000);
    expect(result).toEqual('4503599627370496');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x00200000);
    expect(result).toEqual('9007199254740992');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x00400000);
    expect(result).toEqual('18014398509481984');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x00800000);
    expect(result).toEqual('36028797018963968');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x01000000);
    expect(result).toEqual('72057594037927936');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x02000000);
    expect(result).toEqual('144115188075855872');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x04000000);
    expect(result).toEqual('288230376151711744');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x08000000);
    expect(result).toEqual('576460752303423488');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x10000000);
    expect(result).toEqual('1152921504606846976');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x20000000);
    expect(result).toEqual('2305843009213693952');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x40000000);
    expect(result).toEqual('4611686018427387904');

    result = utils.joinUnsignedDecimalString(0x00000000, 0x80000000);
    expect(result).toEqual('9223372036854775808');
  });


  /**
   * Going from hash strings to decimal strings should also be lossless.
   */
  it('testHashToDecimalConversion', () => {
    let result;
    const convert = utils.hash64ToDecimalString;

    result = convert(toHashString(0x00000000, 0x00000000), false);
    expect(result).toEqual('0');

    result = convert(toHashString(0x00000000, 0x00000000), true);
    expect(result).toEqual('0');

    result = convert(toHashString(0xFFFFFFFF, 0xFFFFFFFF), false);
    expect(result).toEqual('18446744073709551615');

    result = convert(toHashString(0xFFFFFFFF, 0xFFFFFFFF), true);
    expect(result).toEqual('-1');

    result = convert(toHashString(0x00000000, 0x80000000), false);
    expect(result).toEqual('9223372036854775808');

    result = convert(toHashString(0x00000000, 0x80000000), true);
    expect(result).toEqual('-9223372036854775808');

    result = convert(toHashString(0xacd05f15, 0x01b69b4b), false);
    expect(result).toEqual('123456789123456789');

    result = convert(toHashString(~0xacd05f15 + 1, ~0x01b69b4b), true);
    expect(result).toEqual('-123456789123456789');

    // And converting arrays of hashes should work the same way.
    result = utils.hash64ArrayToDecimalStrings(
        [
          toHashString(0xFFFFFFFF, 0xFFFFFFFF),
          toHashString(0x00000000, 0x80000000),
          toHashString(0xacd05f15, 0x01b69b4b)
        ],
        false);
    expect(result.length).toEqual(3);
    expect(result[0]).toEqual('18446744073709551615');
    expect(result[1]).toEqual('9223372036854775808');
    expect(result[2]).toEqual('123456789123456789');
  });

  /*
   * Going from decimal strings to hash strings should be lossless.
   */
  it('testDecimalToHashConversion', () => {
    let result;
    const convert = utils.decimalStringToHash64;

    result = convert('0');
    expect(result).toEqual(crypt.byteArrayToString(
        [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));

    result = convert('-1');
    expect(result).toEqual(crypt.byteArrayToString(
        [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]));

    result = convert('18446744073709551615');
    expect(result).toEqual(crypt.byteArrayToString(
        [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]));

    result = convert('9223372036854775808');
    expect(result).toEqual(crypt.byteArrayToString(
        [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80]));

    result = convert('-9223372036854775808');
    expect(result).toEqual(crypt.byteArrayToString(
        [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80]));

    result = convert('123456789123456789');
    expect(result).toEqual(crypt.byteArrayToString(
        [0x15, 0x5F, 0xD0, 0xAC, 0x4B, 0x9B, 0xB6, 0x01]));

    result = convert('-123456789123456789');
    expect(result).toEqual(crypt.byteArrayToString(
        [0xEB, 0xA0, 0x2F, 0x53, 0xB4, 0x64, 0x49, 0xFE]));
  });

  /**
   * Going from hash strings to hex strings should be lossless.
   */
  it('testHashToHexConversion', () => {
    let result;
    const convert = utils.hash64ToHexString;

    result = convert(toHashString(0x00000000, 0x00000000));
    expect(result).toEqual('0x0000000000000000');

    result = convert(toHashString(0xFFFFFFFF, 0xFFFFFFFF));
    expect(result).toEqual('0xffffffffffffffff');

    result = convert(toHashString(0x12345678, 0x9ABCDEF0));
    expect(result).toEqual('0x9abcdef012345678');
  });


  /**
   * Going from hex strings to hash strings should be lossless.
   */
  it('testHexToHashConversion', () => {
    let result;
    const convert = utils.hexStringToHash64;

    result = convert('0x0000000000000000');
    expect(result).toEqual(crypt.byteArrayToString(
        [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));

    result = convert('0xffffffffffffffff');
    expect(result).toEqual(crypt.byteArrayToString(
        [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]));

    // Hex string is big-endian, hash string is little-endian.
    result = convert('0x123456789ABCDEF0');
    expect(result).toEqual(crypt.byteArrayToString(
        [0xF0, 0xDE, 0xBC, 0x9A, 0x78, 0x56, 0x34, 0x12]));

    // Capitalization should not matter.
    result = convert('0x0000abcdefABCDEF');
    expect(result).toEqual(crypt.byteArrayToString(
        [0xEF, 0xCD, 0xAB, 0xEF, 0xCD, 0xAB, 0x00, 0x00]));
  });


  /**
   * Going from numbers to hash strings should be lossless for up to 53 bits of
   * precision.
   */
  it('testNumberToHashConversion', () => {
    let result;
    const convert = utils.numberToHash64;

    result = convert(0x0000000000000);
    expect(utils.hash64ToHexString(result)).toEqual('0x0000000000000000');

    result = convert(0xFFFFFFFFFFFFF);
    expect(utils.hash64ToHexString(result)).toEqual('0x000fffffffffffff');

    result = convert(0x123456789ABCD);
    expect(utils.hash64ToHexString(result)).toEqual('0x000123456789abcd');

    result = convert(0xDCBA987654321);
    expect(utils.hash64ToHexString(result)).toEqual('0x000dcba987654321');

    // 53 bits of precision should not be truncated.
    result = convert(0x10000000000001);
    expect(utils.hash64ToHexString(result)).toEqual('0x0010000000000001');

    // 54 bits of precision should be truncated.
    result = convert(0x20000000000001);
    expect(utils.hash64ToHexString(result))
        .not.toEqual('0x0020000000000001');
  });


  /**
   * Sanity check the behavior of Javascript's strings when doing funny things
   * with unicode characters.
   */
  it('sanityCheckUnicodeStrings', () => {
    const strings = new Array(65536);

    // All possible unsigned 16-bit values should be storable in a string, they
    // shouldn't do weird things with the length of the string, and they should
    // come back out of the string unchanged.
    for (let i = 0; i < 65536; i++) {
      strings[i] = 'a' + String.fromCharCode(i) + 'a';
      expect(strings[i].length).toEqual(3);
      expect(strings[i].charCodeAt(1)).toEqual(i);
    }

    // Each unicode character should compare equal to itself and not equal to a
    // different unicode character.
    for (let i = 0; i < 65536; i++) {
      expect(strings[i] == strings[i]).toEqual(true);
      expect(strings[i] == strings[(i + 1) % 65536]).toEqual(false);
    }
  });


  /**
   * Tests conversion from 32-bit floating point numbers to split64 numbers.
   */
  it('testFloat32ToSplit64', () => {
    const f32_eps = BinaryConstants.FLOAT32_EPS;
    const f32_min = BinaryConstants.FLOAT32_MIN;
    const f32_max = BinaryConstants.FLOAT32_MAX;
    const f32_max_safe_int = utils.joinFloat32(0x4b7fffff, 0);
    const f32_pi = Math.fround(Math.PI);

    // NaN.
    utils.splitFloat32(NaN);
    expect(isNaN(utils.joinFloat32(
        utils.getSplit64Low(), utils.getSplit64High())))
        .toEqual(true);

    /**
     * @param {number} x
     * @param {number=} opt_bits
     */
    function test(x, opt_bits) {
      utils.splitFloat32(x);
      if (opt_bits !== undefined) {
        if (opt_bits != utils.getSplit64Low()) throw 'fail!';
      }
      expect(truncate(x))
          .toEqual(utils.joinFloat32(
              utils.getSplit64Low(), utils.getSplit64High()));
    }

    // Positive and negative infinity.
    test(Infinity, 0x7f800000);
    test(-Infinity, 0xff800000);

    // Positive and negative zero.
    test(0, 0x00000000);
    test(-0, 0x80000000);

    // Positive and negative epsilon.
    test(f32_eps, 0x00000001);
    test(-f32_eps, 0x80000001);

    // Positive and negative min.
    test(f32_min, 0x00800000);
    test(-f32_min, 0x80800000);

    // Positive and negative max.
    test(f32_max, 0x7F7FFFFF);
    test(-f32_max, 0xFF7FFFFF);

    // Positive and negative max_safe_int.
    test(f32_max_safe_int, 0x4B7FFFFF);
    test(-f32_max_safe_int, 0xCB7FFFFF);

    // Pi.
    test(f32_pi, 0x40490fdb);

    // corner cases
    test(0.9999999762949594, 0x3f800000);
    test(7.99999999999999, 0x41000000);
    test(Math.sin(30 * Math.PI / 180), 0x3f000000);  // sin(30 degrees)

    // Various positive values.
    let cursor = f32_eps * 10;
    while (cursor != Infinity) {
      test(cursor);
      cursor *= 1.1;
    }

    // Various negative values.
    cursor = -f32_eps * 10;
    while (cursor != -Infinity) {
      test(cursor);
      cursor *= 1.1;
    }
  });


  /**
   * Tests conversion from 64-bit floating point numbers to split64 numbers.
   */
  it('testFloat64ToSplit64', () => {
    const f64_eps = BinaryConstants.FLOAT64_EPS;
    const f64_min = BinaryConstants.FLOAT64_MIN;
    const f64_max = BinaryConstants.FLOAT64_MAX;

    // NaN.
    utils.splitFloat64(NaN);
    expect(isNaN(utils.joinFloat64(
               utils.split64Low, utils.split64High)))
        .toEqual(true);

    /**
     * @param {number} x
     * @param {number=} opt_highBits
     * @param {number=} opt_lowBits
     */
    function test(x, opt_highBits, opt_lowBits) {
      utils.splitFloat64(x);
      if (opt_highBits !== undefined) {
        const split64High = utils.getSplit64High();
        expect(opt_highBits.toString(16)).toEqual(split64High.toString(16));
      }
      if (opt_lowBits !== undefined) {
        const split64Low = utils.getSplit64Low();
        expect(opt_lowBits.toString(16)).toEqual(split64Low.toString(16));
      }
      expect(
          utils.joinFloat64(utils.getSplit64Low(), utils.getSplit64High()))
          .toEqual(x);
    }

    // Positive and negative infinity.
    test(Infinity, 0x7ff00000, 0x00000000);
    test(-Infinity, 0xfff00000, 0x00000000);

    // Positive and negative zero.
    test(0, 0x00000000, 0x00000000);
    test(-0, 0x80000000, 0x00000000);

    test(1, 0x3FF00000, 0x00000000);
    test(2, 0x40000000, 0x00000000);

    // Positive and negative epsilon.
    test(f64_eps, 0x00000000, 0x00000001);
    test(-f64_eps, 0x80000000, 0x00000001);

    // Positive and negative min.
    test(f64_min, 0x00100000, 0x00000000);
    test(-f64_min, 0x80100000, 0x00000000);

    // Positive and negative max.
    test(f64_max, 0x7FEFFFFF, 0xFFFFFFFF);
    test(-f64_max, 0xFFEFFFFF, 0xFFFFFFFF);

    test(Number.MAX_SAFE_INTEGER, 0x433FFFFF, 0xFFFFFFFF);
    test(Number.MIN_SAFE_INTEGER, 0xC33FFFFF, 0xFFFFFFFF);

    // Test various edge cases with mantissa of all 1, all 0, or just the
    // highest or lowest significant bit.
    test(4503599627370497, 0x43300000, 0x00000001);
    test(6755399441055744, 0x43380000, 0x00000000);
    test(1.348269851146737e+308, 0x7FE80000, 0x00000000);
    test(1.9999999999999998, 0x3FFFFFFF, 0xFFFFFFFF);
    test(2.225073858507201e-308, 0x000FFFFF, 0xFFFFFFFF);
    test(Math.PI, 0x400921fb, 0x54442d18);
    test(BinaryConstants.FLOAT32_MIN, 0x38100000, 0x00000000);

    // Various positive values.
    let cursor = f64_eps * 10;
    while (cursor != Infinity) {
      test(cursor);
      cursor *= 1.1;
    }

    // Various negative values.
    cursor = -f64_eps * 10;
    while (cursor != -Infinity) {
      test(cursor);
      cursor *= 1.1;
    }
  });

  /**
   * Tests zigzag conversions.
   */
  it('can encode and decode zigzag 64', () => {
    function stringToHiLoPair(str) {
      utils.splitDecimalString(str);
      return {
        lo: utils.getSplit64Low() >>> 0,
        hi: utils.getSplit64High() >>> 0
      };
    }
    function makeHiLoPair(lo, hi) {
      return {lo: lo >>> 0, hi: hi >>> 0};
    }
    // Test cases directly from the protobuf dev guide.
    // https://engdoc.corp.google.com/eng/howto/protocolbuffers/developerguide/encoding.shtml?cl=head#types
    const testCases = [
      {original: stringToHiLoPair('0'), zigzag: stringToHiLoPair('0')},
      {original: stringToHiLoPair('-1'), zigzag: stringToHiLoPair('1')},
      {original: stringToHiLoPair('1'), zigzag: stringToHiLoPair('2')},
      {original: stringToHiLoPair('-2'), zigzag: stringToHiLoPair('3')},
      {
        original: stringToHiLoPair('2147483647'),
        zigzag: stringToHiLoPair('4294967294')
      },
      {
        original: stringToHiLoPair('-2147483648'),
        zigzag: stringToHiLoPair('4294967295')
      },
      // 64-bit extremes
      {
        original: stringToHiLoPair('9223372036854775807'),
        zigzag: stringToHiLoPair('18446744073709551614')
      },
      {
        original: stringToHiLoPair('-9223372036854775808'),
        zigzag: stringToHiLoPair('18446744073709551615')
      },
    ];
    for (const c of testCases) {
      expect(utils.toZigzag64(c.original.lo, c.original.hi, makeHiLoPair))
          .toEqual(c.zigzag);
      expect(utils.fromZigzag64(c.zigzag.lo, c.zigzag.hi, makeHiLoPair))
          .toEqual(c.original);
    }
  });


  /**
   * Tests counting packed varints.
   */
  it('testCountVarints', () => {
    const values = [];
    for (let i = 1; i < 1000000000; i *= 1.1) {
      values.push(Math.floor(i));
    }

    const writer = new BinaryWriter();
    writer.writePackedUint64(1, values);

    const buffer = new Uint8Array(writer.getResultBuffer());

    // We should have two more varints than we started with - one for the field
    // tag, one for the packed length.
    expect(utils.countVarints(buffer, 0, buffer.length))
        .toEqual(values.length + 2);
  });


  /**
   * Tests counting matching varint fields.
   */
  it('testCountVarintFields', () => {
    let writer = new BinaryWriter();

    let count = 0;
    for (let i = 1; i < 1000000000; i *= 1.1) {
      writer.writeUint64(1, Math.floor(i));
      count++;
    }
    writer.writeString(2, 'terminator');

    let buffer = new Uint8Array(writer.getResultBuffer());
    expect(utils.countVarintFields(buffer, 0, buffer.length, 1))
        .toEqual(count);

    writer = new BinaryWriter();

    count = 0;
    for (let i = 1; i < 1000000000; i *= 1.1) {
      writer.writeUint64(123456789, Math.floor(i));
      count++;
    }
    writer.writeString(2, 'terminator');

    buffer = new Uint8Array(writer.getResultBuffer());
    expect(utils.countVarintFields(buffer, 0, buffer.length, 123456789))
        .toEqual(count);
  });


  /**
   * Tests counting matching fixed32 fields.
   */
  it('testCountFixed32Fields', () => {
    let writer = new BinaryWriter();

    let count = 0;
    for (let i = 1; i < 1000000000; i *= 1.1) {
      writer.writeFixed32(1, Math.floor(i));
      count++;
    }
    writer.writeString(2, 'terminator');

    let buffer = new Uint8Array(writer.getResultBuffer());
    expect(utils.countFixed32Fields(buffer, 0, buffer.length, 1))
        .toEqual(count);

    writer = new BinaryWriter();

    count = 0;
    for (let i = 1; i < 1000000000; i *= 1.1) {
      writer.writeFixed32(123456789, Math.floor(i));
      count++;
    }
    writer.writeString(2, 'terminator');

    buffer = new Uint8Array(writer.getResultBuffer());
    expect(utils.countFixed32Fields(buffer, 0, buffer.length, 123456789))
        .toEqual(count);
  });


  /**
   * Tests counting matching fixed64 fields.
   */
  it('testCountFixed64Fields', () => {
    let writer = new BinaryWriter();

    let count = 0;
    for (let i = 1; i < 1000000000; i *= 1.1) {
      writer.writeDouble(1, i);
      count++;
    }
    writer.writeString(2, 'terminator');

    let buffer = new Uint8Array(writer.getResultBuffer());
    expect(utils.countFixed64Fields(buffer, 0, buffer.length, 1))
        .toEqual(count);

    writer = new BinaryWriter();

    count = 0;
    for (let i = 1; i < 1000000000; i *= 1.1) {
      writer.writeDouble(123456789, i);
      count++;
    }
    writer.writeString(2, 'terminator');

    buffer = new Uint8Array(writer.getResultBuffer());
    expect(utils.countFixed64Fields(buffer, 0, buffer.length, 123456789))
        .toEqual(count);
  });


  /**
   * Tests counting matching delimited fields.
   */
  it('testCountDelimitedFields', () => {
    let writer = new BinaryWriter();

    let count = 0;
    for (let i = 1; i < 1000; i *= 1.1) {
      writer.writeBytes(1, [Math.floor(i)]);
      count++;
    }
    writer.writeString(2, 'terminator');

    let buffer = new Uint8Array(writer.getResultBuffer());
    expect(utils.countDelimitedFields(buffer, 0, buffer.length, 1))
        .toEqual(count);

    writer = new BinaryWriter();

    count = 0;
    for (let i = 1; i < 1000; i *= 1.1) {
      writer.writeBytes(123456789, [Math.floor(i)]);
      count++;
    }
    writer.writeString(2, 'terminator');

    buffer = new Uint8Array(writer.getResultBuffer());
    expect(utils.countDelimitedFields(buffer, 0, buffer.length, 123456789))
        .toEqual(count);
  });


  /**
   * Tests byte format for debug strings.
   */
  it('testDebugBytesToTextFormat', () => {
    expect(utils.debugBytesToTextFormat(null)).toEqual('""');
    expect(utils.debugBytesToTextFormat([
      0, 16, 255
    ])).toEqual('"\\x00\\x10\\xff"');
  });


  /**
   * Tests converting byte blob sources into byte blobs.
   */
  it('testByteSourceToUint8Array', () => {
    const convert = utils.byteSourceToUint8Array;

    const sourceData = [];
    for (let i = 0; i < 256; i++) {
      sourceData.push(i);
    }

    const sourceBytes = new Uint8Array(sourceData);
    const sourceBuffer = sourceBytes.buffer;
    const sourceBase64 = base64.encodeByteArray(sourceData);

    function check(result) {
      expect(result.constructor).toEqual(Uint8Array);
      expect(result.length).toEqual(sourceData.length);
      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toEqual(sourceData[i]);
      }
    }

    // Converting Uint8Arrays into Uint8Arrays should be a no-op.
    expect(convert(sourceBytes)).toEqual(sourceBytes);

    // Converting Array<numbers> into Uint8Arrays should work.
    check(convert(sourceData));

    // Converting ArrayBuffers into Uint8Arrays should work.
    check(convert(sourceBuffer));

    // Converting base64-encoded strings into Uint8Arrays should work.
    check(convert(sourceBase64));
  });
});

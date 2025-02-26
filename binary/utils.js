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
 * @fileoverview This file contains helper code used by jspb.BinaryReader
 * and BinaryWriter.
 *
 * @suppress {missingRequire} TODO(b/152540451): this shouldn't be needed
 * @author aappleby@google.com (Austin Appleby)
 */

import * as crypt from '../../closure-library/closure/goog/crypt/crypt.js';

import * as base64 from '../../closure-library/closure/goog/crypt/base64.js';
import * as googString from '../../closure-library/closure/goog/string/string.js';
import * as asserts from '../asserts.js';
import * as BinaryConstants from './constants.js';


/**
 * Javascript can't natively handle 64-bit data types, so to manipulate them we
 * have to split them into two 32-bit halves and do the math manually.
 *
 * Instead of instantiating and passing small structures around to do this, we
 * instead just use two global temporary values. This one stores the low 32
 * bits of a split value - for example, if the original value was a 64-bit
 * integer, this temporary value will contain the low 32 bits of that integer.
 * If the original value was a double, this temporary value will contain the
 * low 32 bits of the binary representation of that double, etcetera.
 * @type {number}
 * @private
 */
var split64Low = 0;


/**
 * And correspondingly, this temporary variable will contain the high 32 bits
 * of whatever value was split.
 * @type {number}
 * @private
 */
var split64High = 0;


/**
 * @return {number}
 * @export
 */
export function getSplit64Low() {
  return split64Low;
}

/**
 * @return {number}
 * @export
 */
export function getSplit64High() {
  return split64High;
}


/**
 * Splits an unsigned Javascript integer into two 32-bit halves and stores it
 * in the temp values above.
 * @param {number} value The number to split.
 * @export
 */
export function splitUint64(value) {
  // Extract low 32 bits and high 32 bits as unsigned integers.
  var lowBits = value >>> 0;
  var highBits =
      Math.floor((value - lowBits) / BinaryConstants.TWO_TO_32) >>> 0;

  split64Low = lowBits;
  split64High = highBits;
}


/**
 * Splits a signed Javascript integer into two 32-bit halves and stores it in
 * the temp values above.
 * @param {number} value The number to split.
 * @export
 */
export function splitInt64(value) {
  // Convert to sign-magnitude representation.
  var sign = (value < 0);
  value = Math.abs(value);

  // Extract low 32 bits and high 32 bits as unsigned integers.
  var lowBits = value >>> 0;
  var highBits = Math.floor((value - lowBits) / BinaryConstants.TWO_TO_32);
  highBits = highBits >>> 0;

  // Perform two's complement conversion if the sign bit was set.
  if (sign) {
    highBits = ~highBits >>> 0;
    lowBits = ~lowBits >>> 0;
    lowBits += 1;
    if (lowBits > 0xFFFFFFFF) {
      lowBits = 0;
      highBits++;
      if (highBits > 0xFFFFFFFF) highBits = 0;
    }
  }

  split64Low = lowBits;
  split64High = highBits;
}


/**
 * Converts a signed Javascript integer into zigzag format, splits it into two
 * 32-bit halves, and stores it in the temp values above.
 * @param {number} value The number to split.
 * @export
 */
export function splitZigzag64(value) {
  // Convert to sign-magnitude and scale by 2 before we split the value.
  var sign = (value < 0);
  value = Math.abs(value) * 2;

  splitUint64(value);
  var lowBits = split64Low;
  var highBits = split64High;

  // If the value is negative, subtract 1 from the split representation so we
  // don't lose the sign bit due to precision issues.
  if (sign) {
    if (lowBits == 0) {
      if (highBits == 0) {
        lowBits = 0xFFFFFFFF;
        highBits = 0xFFFFFFFF;
      } else {
        highBits--;
        lowBits = 0xFFFFFFFF;
      }
    } else {
      lowBits--;
    }
  }

  split64Low = lowBits;
  split64High = highBits;
}


/**
 * Converts a floating-point number into 32-bit IEEE representation and stores
 * it in the temp values above.
 * @param {number} value
 * @export
 */
export function splitFloat32(value) {
  var sign = (value < 0) ? 1 : 0;
  value = sign ? -value : value;
  var exp;
  var mant;

  // Handle zeros.
  if (value === 0) {
    if ((1 / value) > 0) {
      // Positive zero.
      split64High = 0;
      split64Low = 0x00000000;
    } else {
      // Negative zero.
      split64High = 0;
      split64Low = 0x80000000;
    }
    return;
  }

  // Handle nans.
  if (isNaN(value)) {
    split64High = 0;
    split64Low = 0x7FFFFFFF;
    return;
  }

  // Handle infinities.
  if (value > BinaryConstants.FLOAT32_MAX) {
    split64High = 0;
    split64Low = ((sign << 31) | (0x7F800000)) >>> 0;
    return;
  }

  // Handle denormals.
  if (value < BinaryConstants.FLOAT32_MIN) {
    // Number is a denormal.
    mant = Math.round(value / Math.pow(2, -149));
    split64High = 0;
    split64Low = ((sign << 31) | mant) >>> 0;
    return;
  }

  exp = Math.floor(Math.log(value) / Math.LN2);
  mant = value * Math.pow(2, -exp);
  mant = Math.round(mant * BinaryConstants.TWO_TO_23);
  if (mant >= 0x1000000) {
    ++exp;
  }
  mant = mant & 0x7FFFFF;

  split64High = 0;
  split64Low = ((sign << 31) | ((exp + 127) << 23) | mant) >>> 0;
}


/**
 * Converts a floating-point number into 64-bit IEEE representation and stores
 * it in the temp values above.
 * @param {number} value
 * @export
 */
export function splitFloat64(value) {
  var sign = (value < 0) ? 1 : 0;
  value = sign ? -value : value;

  // Handle zeros.
  if (value === 0) {
    if ((1 / value) > 0) {
      // Positive zero.
      split64High = 0x00000000;
      split64Low = 0x00000000;
    } else {
      // Negative zero.
      split64High = 0x80000000;
      split64Low = 0x00000000;
    }
    return;
  }

  // Handle nans.
  if (isNaN(value)) {
    split64High = 0x7FFFFFFF;
    split64Low = 0xFFFFFFFF;
    return;
  }

  // Handle infinities.
  if (value > BinaryConstants.FLOAT64_MAX) {
    split64High = ((sign << 31) | (0x7FF00000)) >>> 0;
    split64Low = 0;
    return;
  }

  // Handle denormals.
  if (value < BinaryConstants.FLOAT64_MIN) {
    // Number is a denormal.
    var mant = value / Math.pow(2, -1074);
    var mantHigh = (mant / BinaryConstants.TWO_TO_32);
    split64High = ((sign << 31) | mantHigh) >>> 0;
    split64Low = (mant >>> 0);
    return;
  }

  // Compute the least significant exponent needed to represent the magnitude of
  // the value by repeadly dividing/multiplying by 2 until the magnitude
  // crosses 2. While tempting to use log math to find the exponent, at the
  // boundaries of precision, the result can be off by one.
  var maxDoubleExponent = 1023;
  var minDoubleExponent = -1022;
  var x = value;
  var exp = 0;
  if (x >= 2) {
    while (x >= 2 && exp < maxDoubleExponent) {
      exp++;
      x = x / 2;
    }
  } else {
    while (x < 1 && exp > minDoubleExponent) {
      x = x * 2;
      exp--;
    }
  }
  var mant = value * Math.pow(2, -exp);

  var mantHigh = (mant * BinaryConstants.TWO_TO_20) & 0xFFFFF;
  var mantLow = (mant * BinaryConstants.TWO_TO_52) >>> 0;

  split64High =
      ((sign << 31) | ((exp + 1023) << 20) | mantHigh) >>> 0;
  split64Low = mantLow;
}


/**
 * Converts an 8-character hash string into two 32-bit numbers and stores them
 * in the temp values above.
 * @param {string} hash
 * @export
 */
export function splitHash64(hash) {
  var a = hash.charCodeAt(0);
  var b = hash.charCodeAt(1);
  var c = hash.charCodeAt(2);
  var d = hash.charCodeAt(3);
  var e = hash.charCodeAt(4);
  var f = hash.charCodeAt(5);
  var g = hash.charCodeAt(6);
  var h = hash.charCodeAt(7);

  split64Low = (a + (b << 8) + (c << 16) + (d << 24)) >>> 0;
  split64High = (e + (f << 8) + (g << 16) + (h << 24)) >>> 0;
}


/**
 * Joins two 32-bit values into a 64-bit unsigned integer. Precision will be
 * lost if the result is greater than 2^52.
 * @param {number} bitsLow
 * @param {number} bitsHigh
 * @return {number}
 * @export
 */
export function joinUint64(bitsLow, bitsHigh) {
  return bitsHigh * BinaryConstants.TWO_TO_32 + (bitsLow >>> 0);
}


/**
 * Joins two 32-bit values into a 64-bit signed integer. Precision will be lost
 * if the result is greater than 2^52.
 * @param {number} bitsLow
 * @param {number} bitsHigh
 * @return {number}
 * @export
 */
export function joinInt64(bitsLow, bitsHigh) {
  // If the high bit is set, do a manual two's complement conversion.
  var sign = (bitsHigh & 0x80000000);
  if (sign) {
    bitsLow = (~bitsLow + 1) >>> 0;
    bitsHigh = ~bitsHigh >>> 0;
    if (bitsLow == 0) {
      bitsHigh = (bitsHigh + 1) >>> 0;
    }
  }

  var result = joinUint64(bitsLow, bitsHigh);
  return sign ? -result : result;
}

/**
 * Converts split 64-bit values from standard two's complement encoding to
 * zig-zag encoding. Invokes the provided function to produce final result.
 *
 * @param {number} bitsLow
 * @param {number} bitsHigh
 * @param {function(number, number): T} convert Conversion function to produce
 *     the result value, takes parameters (lowBits, highBits).
 * @return {T}
 * @template T
 * @export
 */
export function toZigzag64(bitsLow, bitsHigh, convert) {
  // See
  // https://engdoc.corp.google.com/eng/howto/protocolbuffers/developerguide/encoding.shtml?cl=head#types
  // 64-bit math is: (n << 1) ^ (n >> 63)
  //
  // To do this in 32 bits, we can get a 32-bit sign-flipping mask from the
  // high word.
  // Then we can operate on each word individually, with the addition of the
  // "carry" to get the most significant bit from the low word into the high
  // word.
  var signFlipMask = bitsHigh >> 31;
  bitsHigh = (bitsHigh << 1 | bitsLow >>> 31) ^ signFlipMask;
  bitsLow = (bitsLow << 1) ^ signFlipMask;
  return convert(bitsLow, bitsHigh);
}


/**
 * Joins two 32-bit values into a 64-bit unsigned integer and applies zigzag
 * decoding. Precision will be lost if the result is greater than 2^52.
 * @param {number} bitsLow
 * @param {number} bitsHigh
 * @return {number}
 * @export
 */
export function joinZigzag64(bitsLow, bitsHigh) {
  return fromZigzag64(bitsLow, bitsHigh, joinInt64);
}


/**
 * Converts split 64-bit values from zigzag encoding to standard two's
 * complement encoding. Invokes the provided function to produce final result.
 *
 * @param {number} bitsLow
 * @param {number} bitsHigh
 * @param {function(number, number): T} convert Conversion function to produce
 *     the result value, takes parameters (lowBits, highBits).
 * @return {T}
 * @template T
 * @export
 */
export function fromZigzag64(bitsLow, bitsHigh, convert) {
  // 64 bit math is:
  //   signmask = (zigzag & 1) ? -1 : 0;
  //   twosComplement = (zigzag >> 1) ^ signmask;
  //
  // To work with 32 bit, we can operate on both but "carry" the lowest bit
  // from the high word by shifting it up 31 bits to be the most significant bit
  // of the low word.
  var signFlipMask = -(bitsLow & 1);
  bitsLow = ((bitsLow >>> 1) | (bitsHigh << 31)) ^ signFlipMask;
  bitsHigh = (bitsHigh >>> 1) ^ signFlipMask;
  return convert(bitsLow, bitsHigh);
}


/**
 * Joins two 32-bit values into a 32-bit IEEE floating point number and
 * converts it back into a Javascript number.
 * @param {number} bitsLow The low 32 bits of the binary number;
 * @param {number} bitsHigh The high 32 bits of the binary number.
 * @return {number}
 * @export
 */
export function joinFloat32(bitsLow, bitsHigh) {
  var sign = ((bitsLow >> 31) * 2 + 1);
  var exp = (bitsLow >>> 23) & 0xFF;
  var mant = bitsLow & 0x7FFFFF;

  if (exp == 0xFF) {
    if (mant) {
      return NaN;
    } else {
      return sign * Infinity;
    }
  }

  if (exp == 0) {
    // Denormal.
    return sign * Math.pow(2, -149) * mant;
  } else {
    return sign * Math.pow(2, exp - 150) * (mant + Math.pow(2, 23));
  }
}


/**
 * Joins two 32-bit values into a 64-bit IEEE floating point number and
 * converts it back into a Javascript number.
 * @param {number} bitsLow The low 32 bits of the binary number;
 * @param {number} bitsHigh The high 32 bits of the binary number.
 * @return {number}
 * @export
 */
export function joinFloat64(bitsLow, bitsHigh) {
  var sign = ((bitsHigh >> 31) * 2 + 1);
  var exp = (bitsHigh >>> 20) & 0x7FF;
  var mant = BinaryConstants.TWO_TO_32 * (bitsHigh & 0xFFFFF) + bitsLow;

  if (exp == 0x7FF) {
    if (mant) {
      return NaN;
    } else {
      return sign * Infinity;
    }
  }

  if (exp == 0) {
    // Denormal.
    return sign * Math.pow(2, -1074) * mant;
  } else {
    return sign * Math.pow(2, exp - 1075) *
        (mant + BinaryConstants.TWO_TO_52);
  }
}


/**
 * Joins two 32-bit values into an 8-character hash string.
 * @param {number} bitsLow
 * @param {number} bitsHigh
 * @return {string}
 * @export
 */
export function joinHash64(bitsLow, bitsHigh) {
  var a = (bitsLow >>> 0) & 0xFF;
  var b = (bitsLow >>> 8) & 0xFF;
  var c = (bitsLow >>> 16) & 0xFF;
  var d = (bitsLow >>> 24) & 0xFF;
  var e = (bitsHigh >>> 0) & 0xFF;
  var f = (bitsHigh >>> 8) & 0xFF;
  var g = (bitsHigh >>> 16) & 0xFF;
  var h = (bitsHigh >>> 24) & 0xFF;

  return String.fromCharCode(a, b, c, d, e, f, g, h);
}

/**
 * Individual digits for number->string conversion.
 * @const {!Array<string>}
 * @export
 */
export var DIGITS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'
];

/** @const @private {number} '0' */
var ZERO_CHAR_CODE_ = 48;

/** @const @private {number} 'a' */
var A_CHAR_CODE_ = 97;

/**
 * Losslessly converts a 64-bit unsigned integer in 32:32 split representation
 * into a decimal string.
 * @param {number} bitsLow The low 32 bits of the binary number;
 * @param {number} bitsHigh The high 32 bits of the binary number.
 * @return {string} The binary number represented as a string.
 * @export
 */
export function joinUnsignedDecimalString(bitsLow, bitsHigh) {
  // Skip the expensive conversion if the number is small enough to use the
  // built-in conversions.
  if (bitsHigh <= 0x1FFFFF) {
    return '' + joinUint64(bitsLow, bitsHigh);
  }

  // What this code is doing is essentially converting the input number from
  // base-2 to base-1e7, which allows us to represent the 64-bit range with
  // only 3 (very large) digits. Those digits are then trivial to convert to
  // a base-10 string.

  // The magic numbers used here are -
  // 2^24 = 16777216 = (1,6777216) in base-1e7.
  // 2^48 = 281474976710656 = (2,8147497,6710656) in base-1e7.

  // Split 32:32 representation into 16:24:24 representation so our
  // intermediate digits don't overflow.
  var low = bitsLow & 0xFFFFFF;
  var mid = (((bitsLow >>> 24) | (bitsHigh << 8)) >>> 0) & 0xFFFFFF;
  var high = (bitsHigh >> 16) & 0xFFFF;

  // Assemble our three base-1e7 digits, ignoring carries. The maximum
  // value in a digit at this step is representable as a 48-bit integer, which
  // can be stored in a 64-bit floating point number.
  var digitA = low + (mid * 6777216) + (high * 6710656);
  var digitB = mid + (high * 8147497);
  var digitC = (high * 2);

  // Apply carries from A to B and from B to C.
  var base = 10000000;
  if (digitA >= base) {
    digitB += Math.floor(digitA / base);
    digitA %= base;
  }

  if (digitB >= base) {
    digitC += Math.floor(digitB / base);
    digitB %= base;
  }

  // Convert base-1e7 digits to base-10, with optional leading zeroes.
  function decimalFrom1e7(digit1e7, needLeadingZeros) {
    var partial = digit1e7 ? String(digit1e7) : '';
    if (needLeadingZeros) {
      return '0000000'.slice(partial.length) + partial;
    }
    return partial;
  }

  return decimalFrom1e7(digitC, /*needLeadingZeros=*/ 0) +
      decimalFrom1e7(digitB, /*needLeadingZeros=*/ digitC) +
      // If the final 1e7 digit didn't need leading zeros, we would have
      // returned via the trivial code path at the top.
      decimalFrom1e7(digitA, /*needLeadingZeros=*/ 1);
}


/**
 * Losslessly converts a 64-bit signed integer in 32:32 split representation
 * into a decimal string.
 * @param {number} bitsLow The low 32 bits of the binary number;
 * @param {number} bitsHigh The high 32 bits of the binary number.
 * @return {string} The binary number represented as a string.
 * @export
 */
export function joinSignedDecimalString(bitsLow, bitsHigh) {
  // If we're treating the input as a signed value and the high bit is set, do
  // a manual two's complement conversion before the decimal conversion.
  var negative = (bitsHigh & 0x80000000);
  if (negative) {
    bitsLow = (~bitsLow + 1) >>> 0;
    var carry = (bitsLow == 0) ? 1 : 0;
    bitsHigh = (~bitsHigh + carry) >>> 0;
  }

  var result = joinUnsignedDecimalString(bitsLow, bitsHigh);
  return negative ? '-' + result : result;
}


/**
 * Convert an 8-character hash string representing either a signed or unsigned
 * 64-bit integer into its decimal representation without losing accuracy.
 * @param {string} hash The hash string to convert.
 * @param {boolean} signed True if we should treat the hash string as encoding
 *     a signed integer.
 * @return {string}
 * @export
 */
export function hash64ToDecimalString(hash, signed) {
  splitHash64(hash);
  var bitsLow = split64Low;
  var bitsHigh = split64High;
  return signed ? joinSignedDecimalString(bitsLow, bitsHigh) :
                  joinUnsignedDecimalString(bitsLow, bitsHigh);
}


/**
 * Converts an array of 8-character hash strings into their decimal
 * representations.
 * @param {!Array<string>} hashes The array of hash strings to convert.
 * @param {boolean} signed True if we should treat the hash string as encoding
 *     a signed integer.
 * @return {!Array<string>}
 * @export
 */
export function hash64ArrayToDecimalStrings(hashes, signed) {
  var result = new Array(hashes.length);
  for (var i = 0; i < hashes.length; i++) {
    result[i] = hash64ToDecimalString(hashes[i], signed);
  }
  return result;
}


/**
 * Converts a signed or unsigned decimal string into its hash string
 * representation.
 * @param {string} dec
 * @return {string}
 * @export
 */
export function decimalStringToHash64(dec) {
  asserts.assert(dec.length > 0);

  // Check for minus sign.
  var minus = false;
  if (dec[0] === '-') {
    minus = true;
    dec = dec.slice(1);
  }

  // Store result as a byte array.
  var resultBytes = [0, 0, 0, 0, 0, 0, 0, 0];

  // Set result to m*result + c.
  function muladd(m, c) {
    for (var i = 0; i < 8 && (m !== 1 || c > 0); i++) {
      var r = m * resultBytes[i] + c;
      resultBytes[i] = r & 0xFF;
      c = r >>> 8;
    }
  }

  // Negate the result bits.
  function neg() {
    for (var i = 0; i < 8; i++) {
      resultBytes[i] = (~resultBytes[i]) & 0xFF;
    }
  }

  // For each decimal digit, set result to 10*result + digit.
  for (var i = 0; i < dec.length; i++) {
    muladd(10, dec.charCodeAt(i) - ZERO_CHAR_CODE_);
  }

  // If there's a minus sign, convert into two's complement.
  if (minus) {
    neg();
    muladd(1, 1);
  }

  return crypt.byteArrayToString(resultBytes);
}


/**
 * Converts a signed or unsigned decimal string into two 32-bit halves, and
 * stores them in the temp variables listed above.
 * @param {string} value The decimal string to convert.
 * @export
 */
export function splitDecimalString(value) {
  splitHash64(decimalStringToHash64(value));
}

/**
 * @param {number} nibble A 4-bit integer.
 * @return {string}
 * @private
 */
function toHexDigit_(nibble) {
  return String.fromCharCode(
      nibble < 10 ? ZERO_CHAR_CODE_ + nibble :
                    A_CHAR_CODE_ - 10 + nibble);
}

/**
 * @param {number} hexCharCode
 * @return {number}
 * @private
 */
function fromHexCharCode_(hexCharCode) {
  if (hexCharCode >= A_CHAR_CODE_) {
    return hexCharCode - A_CHAR_CODE_ + 10;
  }
  return hexCharCode - ZERO_CHAR_CODE_;
}

/**
 * Converts an 8-character hash string into its hexadecimal representation.
 * @param {string} hash
 * @return {string}
 * @export
 */
export function hash64ToHexString(hash) {
  var temp = new Array(18);
  temp[0] = '0';
  temp[1] = 'x';

  for (var i = 0; i < 8; i++) {
    var c = hash.charCodeAt(7 - i);
    temp[i * 2 + 2] = toHexDigit_(c >> 4);
    temp[i * 2 + 3] = toHexDigit_(c & 0xF);
  }

  var result = temp.join('');
  return result;
}


/**
 * Converts a '0x<16 digits>' hex string into its hash string representation.
 * @param {string} hex
 * @return {string}
 * @export
 */
export function hexStringToHash64(hex) {
  hex = hex.toLowerCase();
  asserts.assert(hex.length == 18);
  asserts.assert(hex[0] == '0');
  asserts.assert(hex[1] == 'x');

  var result = '';
  for (var i = 0; i < 8; i++) {
    var hi = fromHexCharCode_(hex.charCodeAt(i * 2 + 2));
    var lo = fromHexCharCode_(hex.charCodeAt(i * 2 + 3));
    result = String.fromCharCode(hi * 16 + lo) + result;
  }

  return result;
}


/**
 * Convert an 8-character hash string representing either a signed or unsigned
 * 64-bit integer into a Javascript number. Will lose accuracy if the result is
 * larger than 2^52.
 * @param {string} hash The hash string to convert.
 * @param {boolean} signed True if the has should be interpreted as a signed
 *     number.
 * @return {number}
 * @export
 */
export function hash64ToNumber(hash, signed) {
  splitHash64(hash);
  var bitsLow = split64Low;
  var bitsHigh = split64High;
  return signed ? joinInt64(bitsLow, bitsHigh) :
                  joinUint64(bitsLow, bitsHigh);
}


/**
 * Convert a Javascript number into an 8-character hash string. Will lose
 * precision if the value is non-integral or greater than 2^64.
 * @param {number} value The integer to convert.
 * @return {string}
 * @export
 */
export function numberToHash64(value) {
  splitInt64(value);
  return joinHash64(split64Low, split64High);
}


/**
 * Counts the number of contiguous varints in a buffer.
 * @param {!Uint8Array} buffer The buffer to scan.
 * @param {number} start The starting point in the buffer to scan.
 * @param {number} end The end point in the buffer to scan.
 * @return {number} The number of varints in the buffer.
 * @export
 */
export function countVarints(buffer, start, end) {
  // Count how many high bits of each byte were set in the buffer.
  var count = 0;
  for (var i = start; i < end; i++) {
    count += buffer[i] >> 7;
  }

  // The number of varints in the buffer equals the size of the buffer minus
  // the number of non-terminal bytes in the buffer (those with the high bit
  // set).
  return (end - start) - count;
}


/**
 * Counts the number of contiguous varint fields with the given field number in
 * the buffer.
 * @param {!Uint8Array} buffer The buffer to scan.
 * @param {number} start The starting point in the buffer to scan.
 * @param {number} end The end point in the buffer to scan.
 * @param {number} field The field number to count.
 * @return {number} The number of matching fields in the buffer.
 * @export
 */
export function countVarintFields(buffer, start, end, field) {
  var count = 0;
  var cursor = start;
  var tag = field * 8 + BinaryConstants.WireType.VARINT;

  if (tag < 128) {
    // Single-byte field tag, we can use a slightly quicker count.
    while (cursor < end) {
      // Skip the field tag, or exit if we find a non-matching tag.
      if (buffer[cursor++] != tag) return count;

      // Field tag matches, we've found a valid field.
      count++;

      // Skip the varint.
      while (1) {
        var x = buffer[cursor++];
        if ((x & 0x80) == 0) break;
      }
    }
  } else {
    while (cursor < end) {
      // Skip the field tag, or exit if we find a non-matching tag.
      var temp = tag;
      while (temp > 128) {
        if (buffer[cursor] != ((temp & 0x7F) | 0x80)) return count;
        cursor++;
        temp >>= 7;
      }
      if (buffer[cursor++] != temp) return count;

      // Field tag matches, we've found a valid field.
      count++;

      // Skip the varint.
      while (1) {
        var x = buffer[cursor++];
        if ((x & 0x80) == 0) break;
      }
    }
  }
  return count;
}


/**
 * Counts the number of contiguous fixed32 fields with the given tag in the
 * buffer.
 * @param {!Uint8Array} buffer The buffer to scan.
 * @param {number} start The starting point in the buffer to scan.
 * @param {number} end The end point in the buffer to scan.
 * @param {number} tag The tag value to count.
 * @param {number} stride The number of bytes to skip per field.
 * @return {number} The number of fields with a matching tag in the buffer.
 * @private
 */
function countFixedFields_(buffer, start, end, tag, stride) {
  var count = 0;
  var cursor = start;

  if (tag < 128) {
    // Single-byte field tag, we can use a slightly quicker count.
    while (cursor < end) {
      // Skip the field tag, or exit if we find a non-matching tag.
      if (buffer[cursor++] != tag) return count;

      // Field tag matches, we've found a valid field.
      count++;

      // Skip the value.
      cursor += stride;
    }
  } else {
    while (cursor < end) {
      // Skip the field tag, or exit if we find a non-matching tag.
      var temp = tag;
      while (temp > 128) {
        if (buffer[cursor++] != ((temp & 0x7F) | 0x80)) return count;
        temp >>= 7;
      }
      if (buffer[cursor++] != temp) return count;

      // Field tag matches, we've found a valid field.
      count++;

      // Skip the value.
      cursor += stride;
    }
  }
  return count;
}


/**
 * Counts the number of contiguous fixed32 fields with the given field number
 * in the buffer.
 * @param {!Uint8Array} buffer The buffer to scan.
 * @param {number} start The starting point in the buffer to scan.
 * @param {number} end The end point in the buffer to scan.
 * @param {number} field The field number to count.
 * @return {number} The number of matching fields in the buffer.
 * @export
 */
export function countFixed32Fields(buffer, start, end, field) {
  var tag = field * 8 + BinaryConstants.WireType.FIXED32;
  return countFixedFields_(buffer, start, end, tag, 4);
}


/**
 * Counts the number of contiguous fixed64 fields with the given field number
 * in the buffer.
 * @param {!Uint8Array} buffer The buffer to scan.
 * @param {number} start The starting point in the buffer to scan.
 * @param {number} end The end point in the buffer to scan.
 * @param {number} field The field number to count
 * @return {number} The number of matching fields in the buffer.
 * @export
 */
export function countFixed64Fields(buffer, start, end, field) {
  var tag = field * 8 + BinaryConstants.WireType.FIXED64;
  return countFixedFields_(buffer, start, end, tag, 8);
}


/**
 * Counts the number of contiguous delimited fields with the given field number
 * in the buffer.
 * @param {!Uint8Array} buffer The buffer to scan.
 * @param {number} start The starting point in the buffer to scan.
 * @param {number} end The end point in the buffer to scan.
 * @param {number} field The field number to count.
 * @return {number} The number of matching fields in the buffer.
 * @export
 */
export function countDelimitedFields(buffer, start, end, field) {
  var count = 0;
  var cursor = start;
  var tag = field * 8 + BinaryConstants.WireType.DELIMITED;

  while (cursor < end) {
    // Skip the field tag, or exit if we find a non-matching tag.
    var temp = tag;
    while (temp > 128) {
      if (buffer[cursor++] != ((temp & 0x7F) | 0x80)) return count;
      temp >>= 7;
    }
    if (buffer[cursor++] != temp) return count;

    // Field tag matches, we've found a valid field.
    count++;

    // Decode the length prefix.
    var length = 0;
    var shift = 1;
    while (1) {
      temp = buffer[cursor++];
      length += (temp & 0x7f) * shift;
      shift *= 128;
      if ((temp & 0x80) == 0) break;
    }

    // Advance the cursor past the blob.
    cursor += length;
  }
  return count;
}


/**
 * String-ify bytes for text format. Should be optimized away in non-debug.
 * The returned string uses \xXX escapes for all values and is itself quoted.
 * [1, 31] serializes to '"\x01\x1f"'.
 * @param {BinaryConstants.ByteSource} byteSource The bytes to serialize.
 * @return {string} Stringified bytes for text format.
 * @export
 */
export function debugBytesToTextFormat(byteSource) {
  var s = '"';
  if (byteSource) {
    var bytes = byteSourceToUint8Array(byteSource);
    for (var i = 0; i < bytes.length; i++) {
      s += '\\x';
      if (bytes[i] < 16) s += '0';
      s += bytes[i].toString(16);
    }
  }
  return s + '"';
}


/**
 * String-ify a scalar for text format. Should be optimized away in non-debug.
 * @param {string|number|boolean} scalar The scalar to stringify.
 * @return {string} Stringified scalar for text format.
 * @export
 */
export function debugScalarToTextFormat(scalar) {
  if (typeof scalar === 'string') {
    return googString.quote(scalar);
  } else {
    return scalar.toString();
  }
}


/**
 * Utility function: convert a string with codepoints 0--255 inclusive to a
 * Uint8Array. If any codepoints greater than 255 exist in the string, throws an
 * exception.
 * @param {string} str
 * @return {!Uint8Array}
 * @export
 */
export function stringToByteArray(str) {
  var arr = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    var codepoint = str.charCodeAt(i);
    if (codepoint > 255) {
      throw new Error(
          'Conversion error: string contains codepoint ' +
          'outside of byte range');
    }
    arr[i] = codepoint;
  }
  return arr;
}


/**
 * Converts any type defined in jspb.ByteSource into a Uint8Array.
 * @param {!BinaryConstants.ByteSource} data
 * @return {!Uint8Array}
 * @suppress {invalidCasts}
 * @export
 */
export function byteSourceToUint8Array(data) {
  if (data.constructor === Uint8Array) {
    return /** @type {!Uint8Array} */ (data);
  }

  if (data.constructor === ArrayBuffer) {
    data = /** @type {!ArrayBuffer} */ (data);
    return /** @type {!Uint8Array} */ (new Uint8Array(data));
  }

  if (data.constructor === Array) {
    data = /** @type {!Array<number>} */ (data);
    return /** @type {!Uint8Array} */ (new Uint8Array(data));
  }

  if (data.constructor === String) {
    data = /** @type {string} */ (data);
    return base64.decodeStringToUint8Array(data);
  }

  if (data instanceof Uint8Array) {
    // Support types like nodejs Buffer and other subclasses of Uint8Array.
    data = /** @type {!Uint8Array} */ (data);
    // Make a shallow copy to ensure we only ever deal with Uint8Array
    // exactly to ensure monomorphism.
    return /** @type {!Uint8Array} */ (
        new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
  }

  asserts.fail('Type not convertible to Uint8Array.');
  return /** @type {!Uint8Array} */ (new Uint8Array(0));
}

import * as BinaryConstants from './constants.js';
export declare function getSplit64Low(): number;
export declare function getSplit64High(): number;
/**
 * Splits an unsigned Javascript integer into two 32-bit halves and stores it
 * in the temp values above.
 * @param value The number to split.
 */
export declare function splitUint64(value: number): void;
/**
 * Splits a signed Javascript integer into two 32-bit halves and stores it in
 * the temp values above.
 * @param value The number to split.
 */
export declare function splitInt64(value: number): void;
/**
 * Converts a signed Javascript integer into zigzag format, splits it into two
 * 32-bit halves, and stores it in the temp values above.
 * @param value The number to split.
 */
export declare function splitZigzag64(value: number): void;
/**
 * Converts a floating-point number into 32-bit IEEE representation and stores
 * it in the temp values above.
 */
export declare function splitFloat32(value: number): void;
/**
 * Converts a floating-point number into 64-bit IEEE representation and stores
 * it in the temp values above.
 */
export declare function splitFloat64(value: number): void;
/**
 * Converts an 8-character hash string into two 32-bit numbers and stores them
 * in the temp values above.
 */
export declare function splitHash64(hash: string): void;
/**
 * Joins two 32-bit values into a 64-bit unsigned integer. Precision will be
 * lost if the result is greater than 2^52.
 */
export declare function joinUint64(bitsLow: number, bitsHigh: number): number;
/**
 * Joins two 32-bit values into a 64-bit signed integer. Precision will be lost
 * if the result is greater than 2^52.
 */
export declare function joinInt64(bitsLow: number, bitsHigh: number): number;
/**
 * Converts split 64-bit values from standard two's complement encoding to
 * zig-zag encoding. Invokes the provided function to produce final result.
 * @param convert Conversion function to produce the result value, takes parameters (lowBits, highBits).
 */
export declare function toZigzag64<T = any>(bitsLow: number, bitsHigh: number, convert: () => (T | null)): T | null;
/**
 * Joins two 32-bit values into a 64-bit unsigned integer and applies zigzag
 * decoding. Precision will be lost if the result is greater than 2^52.
 */
export declare function joinZigzag64(bitsLow: number, bitsHigh: number): number;
/**
 * Converts split 64-bit values from zigzag encoding to standard two's
 * complement encoding. Invokes the provided function to produce final result.
 * @param convert Conversion function to produce the result value, takes parameters (lowBits, highBits).
 */
export declare function fromZigzag64<T = any>(bitsLow: number, bitsHigh: number, convert: () => (T | null)): T | null;
/**
 * Joins two 32-bit values into a 32-bit IEEE floating point number and
 * converts it back into a Javascript number.
 * @param bitsLow The low 32 bits of the binary number;
 * @param bitsHigh The high 32 bits of the binary number.
 */
export declare function joinFloat32(bitsLow: number, bitsHigh: number): number;
/**
 * Joins two 32-bit values into a 64-bit IEEE floating point number and
 * converts it back into a Javascript number.
 * @param bitsLow The low 32 bits of the binary number;
 * @param bitsHigh The high 32 bits of the binary number.
 */
export declare function joinFloat64(bitsLow: number, bitsHigh: number): number;
/**
 * Joins two 32-bit values into an 8-character hash string.
 */
export declare function joinHash64(bitsLow: number, bitsHigh: number): string;
/**
 * Individual digits for number->string conversion.
 */
export declare var DIGITS: string[];
/**
 * Losslessly converts a 64-bit unsigned integer in 32:32 split representation
 * into a decimal string.
 * @param bitsLow The low 32 bits of the binary number;
 * @param bitsHigh The high 32 bits of the binary number.
 * @return The binary number represented as a string.
 */
export declare function joinUnsignedDecimalString(bitsLow: number, bitsHigh: number): string;
/**
 * Losslessly converts a 64-bit signed integer in 32:32 split representation
 * into a decimal string.
 * @param bitsLow The low 32 bits of the binary number;
 * @param bitsHigh The high 32 bits of the binary number.
 * @return The binary number represented as a string.
 */
export declare function joinSignedDecimalString(bitsLow: number, bitsHigh: number): string;
/**
 * Convert an 8-character hash string representing either a signed or unsigned
 * 64-bit integer into its decimal representation without losing accuracy.
 * @param hash The hash string to convert.
 * @param signed True if we should treat the hash string as encoding a signed integer.
 */
export declare function hash64ToDecimalString(hash: string, signed: boolean): string;
/**
 * Converts an array of 8-character hash strings into their decimal
 * representations.
 * @param hashes The array of hash strings to convert.
 * @param signed True if we should treat the hash string as encoding a signed integer.
 */
export declare function hash64ArrayToDecimalStrings(hashes: string[], signed: boolean): string[];
/**
 * Converts a signed or unsigned decimal string into its hash string
 * representation.
 */
export declare function decimalStringToHash64(dec: string): string;
/**
 * Converts a signed or unsigned decimal string into two 32-bit halves, and
 * stores them in the temp variables listed above.
 * @param value The decimal string to convert.
 */
export declare function splitDecimalString(value: string): void;
/**
 * Converts an 8-character hash string into its hexadecimal representation.
 */
export declare function hash64ToHexString(hash: string): string;
/**
 * Converts a '0x<16 digits>' hex string into its hash string representation.
 */
export declare function hexStringToHash64(hex: string): string;
/**
 * Convert an 8-character hash string representing either a signed or unsigned
 * 64-bit integer into a Javascript number. Will lose accuracy if the result is
 * larger than 2^52.
 * @param hash The hash string to convert.
 * @param signed True if the has should be interpreted as a signed number.
 */
export declare function hash64ToNumber(hash: string, signed: boolean): number;
/**
 * Convert a Javascript number into an 8-character hash string. Will lose
 * precision if the value is non-integral or greater than 2^64.
 * @param value The integer to convert.
 */
export declare function numberToHash64(value: number): string;
/**
 * Counts the number of contiguous varints in a buffer.
 * @param buffer The buffer to scan.
 * @param start The starting point in the buffer to scan.
 * @param end The end point in the buffer to scan.
 * @return The number of varints in the buffer.
 */
export declare function countVarints(buffer: Uint8Array, start: number, end: number): number;
/**
 * Counts the number of contiguous varint fields with the given field number in
 * the buffer.
 * @param buffer The buffer to scan.
 * @param start The starting point in the buffer to scan.
 * @param end The end point in the buffer to scan.
 * @param field The field number to count.
 * @return The number of matching fields in the buffer.
 */
export declare function countVarintFields(buffer: Uint8Array, start: number, end: number, field: number): number;
/**
 * Counts the number of contiguous fixed32 fields with the given field number
 * in the buffer.
 * @param buffer The buffer to scan.
 * @param start The starting point in the buffer to scan.
 * @param end The end point in the buffer to scan.
 * @param field The field number to count.
 * @return The number of matching fields in the buffer.
 */
export declare function countFixed32Fields(buffer: Uint8Array, start: number, end: number, field: number): number;
/**
 * Counts the number of contiguous fixed64 fields with the given field number
 * in the buffer.
 * @param buffer The buffer to scan.
 * @param start The starting point in the buffer to scan.
 * @param end The end point in the buffer to scan.
 * @param field The field number to count
 * @return The number of matching fields in the buffer.
 */
export declare function countFixed64Fields(buffer: Uint8Array, start: number, end: number, field: number): number;
/**
 * Counts the number of contiguous delimited fields with the given field number
 * in the buffer.
 * @param buffer The buffer to scan.
 * @param start The starting point in the buffer to scan.
 * @param end The end point in the buffer to scan.
 * @param field The field number to count.
 * @return The number of matching fields in the buffer.
 */
export declare function countDelimitedFields(buffer: Uint8Array, start: number, end: number, field: number): number;
/**
 * String-ify bytes for text format. Should be optimized away in non-debug.
 * The returned string uses \xXX escapes for all values and is itself quoted.
 * [1, 31] serializes to '"\x01\x1f"'.
 * @param byteSource The bytes to serialize.
 * @return Stringified bytes for text format.
 */
export declare function debugBytesToTextFormat(byteSource: BinaryConstants.ByteSource | null): string;
/**
 * String-ify a scalar for text format. Should be optimized away in non-debug.
 * @param scalar The scalar to stringify.
 * @return Stringified scalar for text format.
 */
export declare function debugScalarToTextFormat(scalar: string | number | boolean): string;
/**
 * Utility function: convert a string with codepoints 0--255 inclusive to a
 * Uint8Array. If any codepoints greater than 255 exist in the string, throws an
 * exception.
 */
export declare function stringToByteArray(str: string): Uint8Array;
/**
 * Converts any type defined in jspb.ByteSource into a Uint8Array.
 */
export declare function byteSourceToUint8Array(data: BinaryConstants.ByteSource): Uint8Array;

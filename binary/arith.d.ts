/**
 * UInt64 implements some 64-bit arithmetic routines necessary for properly
 * handling 64-bit integer fields. It implements lossless integer arithmetic on
 * top of JavaScript's number type, which has only 53 bits of precision, by
 * representing 64-bit integers as two 32-bit halves.
 */
export declare class UInt64 {
    /**
     * UInt64 implements some 64-bit arithmetic routines necessary for properly
     * handling 64-bit integer fields. It implements lossless integer arithmetic on
     * top of JavaScript's number type, which has only 53 bits of precision, by
     * representing 64-bit integers as two 32-bit halves.
     * @param lo The low 32 bits.
     * @param hi The high 32 bits.
     */
    constructor(lo: number, hi: number);
    private noStructuralTyping____protobuf_javascript_binary_arith_UInt64;
    /**
     * The low 32 bits.
     */
    lo: number;
    /**
     * The high 32 bits.
     */
    hi: number;
    /**
     * Compare two 64-bit numbers. Returns -1 if the first is
     * less, +1 if the first is greater, or 0 if both are equal.
     */
    cmp(other: UInt64): number;
    /**
     * Right-shift this number by one bit.
     */
    rightShift(): UInt64;
    /**
     * Left-shift this number by one bit.
     */
    leftShift(): UInt64;
    /**
     * Test the MSB.
     */
    msb(): boolean;
    /**
     * Test the LSB.
     */
    lsb(): boolean;
    /**
     * Test whether this number is zero.
     */
    zero(): boolean;
    /**
     * Add two 64-bit numbers to produce a 64-bit number.
     */
    add(other: UInt64): UInt64;
    /**
     * Subtract two 64-bit numbers to produce a 64-bit number.
     */
    sub(other: UInt64): UInt64;
    /**
     * Multiply two 32-bit numbers to produce a 64-bit number.
     * @param a The first integer:  must be in [0, 2^32-1).
     * @param b The second integer: must be in [0, 2^32-1).
     */
    static mul32x32(a: number, b: number): UInt64;
    /**
     * Multiply this number by a 32-bit number, producing a 96-bit number, then
     * truncate the top 32 bits.
     * @param a The multiplier.
     */
    mul(a: number): UInt64;
    /**
     * Divide a 64-bit number by a 32-bit number to produce a
     * 64-bit quotient and a 32-bit remainder.
     * @return array of [quotient, remainder], unless divisor is 0, in which case an empty array is returned.
     */
    div(_divisor: number): (UInt64 | null)[] | null;
    /**
     * Convert a 64-bit number to a string.
     */
    toString(): string;
    /**
     * Parse a string into a 64-bit number. Returns `null` on a parse error.
     */
    static fromString(s: string): UInt64 | null;
    /**
     * Make a copy of the uint64.
     */
    clone(): UInt64;
}
/**
 * Int64 is like UInt64, but modifies string conversions to interpret the stored
 * 64-bit value as a twos-complement-signed integer. It does *not* support the
 * full range of operations that UInt64 does: only add, subtract, and string
 * conversions.
 *
 * N.B. that multiply and divide routines are *NOT* supported. They will throw
 * exceptions. (They are not necessary to implement string conversions, which
 * are the only operations we really need in jspb.)
 */
export declare class Int64 {
    /**
     * Int64 is like UInt64, but modifies string conversions to interpret the stored
     * 64-bit value as a twos-complement-signed integer. It does *not* support the
     * full range of operations that UInt64 does: only add, subtract, and string
     * conversions.
     *
     * N.B. that multiply and divide routines are *NOT* supported. They will throw
     * exceptions. (They are not necessary to implement string conversions, which
     * are the only operations we really need in jspb.)
     * @param lo The low 32 bits.
     * @param hi The high 32 bits.
     */
    constructor(lo: number, hi: number);
    private noStructuralTyping____protobuf_javascript_binary_arith_Int64;
    /**
     * The low 32 bits.
     */
    lo: number;
    /**
     * The high 32 bits.
     */
    hi: number;
    /**
     * Add two 64-bit numbers to produce a 64-bit number.
     */
    add(other: Int64): Int64;
    /**
     * Subtract two 64-bit numbers to produce a 64-bit number.
     */
    sub(other: Int64): Int64;
    /**
     * Make a copy of the int64.
     */
    clone(): Int64;
    /**
     * Convert a 64-bit number to a string.
     */
    toString(): string;
    /**
     * Parse a string into a 64-bit number. Returns `null` on a parse error.
     */
    static fromString(s: string): Int64 | null;
}

import { Long } from '../../../closure-library/closure/goog/math/long.js';
/**
 * A container for protobufs Int64/Uint64 data type.
 */
declare class Int64 {
    static getZero(): Int64;
    static getMinValue(): Int64;
    static getMaxValue(): Int64;
    /**
     * Constructs a Int64 given two 32 bit numbers
     */
    static fromBits(lowBits: number, highBits: number): Int64;
    /**
     * Constructs an Int64 from a signed 32 bit number.
     */
    static fromInt(value: number): Int64;
    /**
     * Constructs an Int64 from a number (over 32 bits).
     */
    static fromNumber(value: number): Int64;
    /**
     * Construct an Int64 from a signed decimal string.
     */
    static fromDecimalString(value: string): Int64;
    /**
     * Construct an Int64 from a signed hexadecimal string.
     */
    static fromHexString(value: string): Int64;
    /**
     * Creates an Int64 instance from a Long value.
     */
    static fromLong(value: Long): Int64;
    constructor(lowBits: number, highBits: number);
    /**
     * Returns the int64 value as a JavaScript number. This will lose precision
     * if the number is outside of the safe range for JavaScript of 53 bits
     * precision.
     */
    asNumber(): number;
    asLong(): Long;
    getLowBits(): number;
    getHighBits(): number;
    getLowBitsUnsigned(): number;
    getHighBitsUnsigned(): number;
    toSignedDecimalString(): string;
    toUnsignedDecimalString(): string;
    /**
     * Returns an unsigned hexadecimal string representation of the Int64.
     */
    toHexString(): string;
    equals(other: any): boolean;
    /**
     * Returns a number (int32) that is suitable for using in hashed structures.
     */
    hashCode(): number;
}
export { Int64 };

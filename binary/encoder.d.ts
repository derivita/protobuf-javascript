/**
 * BinaryEncoder implements encoders for all the wire types specified in
 * https://protobuf.dev/programming-guides/encoding/.
 */
export declare class BinaryEncoder {
    /**
     * BinaryEncoder implements encoders for all the wire types specified in
     * https://protobuf.dev/programming-guides/encoding/.
     */
    constructor();
    private noStructuralTyping____protobuf_javascript_binary_encoder_BinaryEncoder;
    length(): number;
    end(): number[];
    /**
     * Encodes a 64-bit integer in 32:32 split representation into its wire-format
     * varint representation and stores it in the buffer.
     * @param lowBits The low 32 bits of the int.
     * @param highBits The high 32 bits of the int.
     */
    writeSplitVarint64(lowBits: number, highBits: number): void;
    /**
     * Encodes a 64-bit integer in 32:32 split representation into its wire-format
     * fixed representation and stores it in the buffer.
     * @param lowBits The low 32 bits of the int.
     * @param highBits The high 32 bits of the int.
     */
    writeSplitFixed64(lowBits: number, highBits: number): void;
    /**
     * Encodes a 32-bit unsigned integer into its wire-format varint representation
     * and stores it in the buffer.
     * @param value The integer to convert.
     */
    writeUnsignedVarint32(value: number): void;
    /**
     * Encodes a 32-bit signed integer into its wire-format varint representation
     * and stores it in the buffer.
     * @param value The integer to convert.
     */
    writeSignedVarint32(value: number): void;
    /**
     * Encodes a 64-bit unsigned integer into its wire-format varint representation
     * and stores it in the buffer. Integers that are not representable in 64 bits
     * will be truncated.
     * @param value The integer to convert.
     */
    writeUnsignedVarint64(value: number): void;
    /**
     * Encodes a 64-bit signed integer into its wire-format varint representation
     * and stores it in the buffer. Integers that are not representable in 64 bits
     * will be truncated.
     * @param value The integer to convert.
     */
    writeSignedVarint64(value: number): void;
    /**
     * Encodes a JavaScript integer into its wire-format, zigzag-encoded varint
     * representation and stores it in the buffer.
     * @param value The integer to convert.
     */
    writeZigzagVarint32(value: number): void;
    /**
     * Encodes a JavaScript integer into its wire-format, zigzag-encoded varint
     * representation and stores it in the buffer. Integers not representable in 64
     * bits will be truncated.
     * @param value The integer to convert.
     */
    writeZigzagVarint64(value: number): void;
    /**
     * Encodes a JavaScript decimal string into its wire-format, zigzag-encoded
     * varint representation and stores it in the buffer. Integers not representable
     * in 64 bits will be truncated.
     * @param value The integer to convert.
     */
    writeZigzagVarint64String(value: string): void;
    /**
     * Writes a 64-bit hash string (8 characters @ 8 bits of data each) to the
     * buffer as a zigzag varint.
     * @param hash The hash to write.
     */
    writeZigzagVarintHash64(hash: string): void;
    /**
     * Writes an 8-bit unsigned integer to the buffer. Numbers outside the range
     * [0,2^8) will be truncated.
     * @param value The value to write.
     */
    writeUint8(value: number): void;
    /**
     * Writes a 16-bit unsigned integer to the buffer. Numbers outside the
     * range [0,2^16) will be truncated.
     * @param value The value to write.
     */
    writeUint16(value: number): void;
    /**
     * Writes a 32-bit unsigned integer to the buffer. Numbers outside the
     * range [0,2^32) will be truncated.
     * @param value The value to write.
     */
    writeUint32(value: number): void;
    /**
     * Writes a 64-bit unsigned integer to the buffer. Numbers outside the
     * range [0,2^64) will be truncated.
     * @param value The value to write.
     */
    writeUint64(value: number): void;
    /**
     * Writes an 8-bit integer to the buffer. Numbers outside the range
     * [-2^7,2^7) will be truncated.
     * @param value The value to write.
     */
    writeInt8(value: number): void;
    /**
     * Writes a 16-bit integer to the buffer. Numbers outside the range
     * [-2^15,2^15) will be truncated.
     * @param value The value to write.
     */
    writeInt16(value: number): void;
    /**
     * Writes a 32-bit integer to the buffer. Numbers outside the range
     * [-2^31,2^31) will be truncated.
     * @param value The value to write.
     */
    writeInt32(value: number): void;
    /**
     * Writes a 64-bit integer to the buffer. Numbers outside the range
     * [-2^63,2^63) will be truncated.
     * @param value The value to write.
     */
    writeInt64(value: number): void;
    /**
     * Writes a 64-bit integer decimal strings to the buffer. Numbers outside the
     * range [-2^63,2^63) will be truncated.
     * @param value The value to write.
     */
    writeInt64String(value: string): void;
    /**
     * Writes a single-precision floating point value to the buffer. Numbers
     * requiring more than 32 bits of precision will be truncated.
     * @param value The value to write.
     */
    writeFloat(value: number): void;
    /**
     * Writes a double-precision floating point value to the buffer. As this is
     * the native format used by JavaScript, no precision will be lost.
     * @param value The value to write.
     */
    writeDouble(value: number): void;
    /**
     * Writes a boolean value to the buffer as a varint. We allow numbers as input
     * because the JSPB code generator uses 0/1 instead of true/false to save space
     * in the string representation of the proto.
     * @param value The value to write.
     */
    writeBool(value: boolean | number): void;
    /**
     * Writes an enum value to the buffer as a varint.
     * @param value The value to write.
     */
    writeEnum(value: number): void;
    /**
     * Writes an arbitrary byte array to the buffer.
     * @param bytes The array of bytes to write.
     */
    writeBytes(bytes: Uint8Array): void;
    /**
     * Writes a 64-bit hash string (8 characters @ 8 bits of data each) to the
     * buffer as a varint.
     * @param hash The hash to write.
     */
    writeVarintHash64(hash: string): void;
    /**
     * Writes a 64-bit hash string (8 characters @ 8 bits of data each) to the
     * buffer as a fixed64.
     * @param hash The hash to write.
     */
    writeFixedHash64(hash: string): void;
    /**
     * Writes a UTF16 Javascript string to the buffer encoded as UTF8.
     * TODO(aappleby): Add support for surrogate pairs, reject unpaired surrogates.
     * @param value The string to write.
     * @return The number of bytes used to encode the string.
     */
    writeString(value: string): number;
}

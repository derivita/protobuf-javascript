import { ByteSource } from './constants.js';
/**
 * BinaryDecoder implements the decoders for all the wire types specified in
 * https://protobuf.dev/programming-guides/encoding/.
 */
export declare class BinaryDecoder {
    /**
     * BinaryDecoder implements the decoders for all the wire types specified in
     * https://protobuf.dev/programming-guides/encoding/.
     * @param opt_bytes The bytes we're reading from.
     * @param opt_start The optional offset to start reading at.
     * @param opt_length The optional length of the block to read - we'll throw an assertion if we go off the end of the block.
     */
    constructor(opt_bytes?: ByteSource | null, opt_start?: number, opt_length?: number);
    private noStructuralTyping____protobuf_javascript_binary_decoder_BinaryDecoder;
    static getInstanceCacheLength(): number;
    /**
     * Pops an instance off the instance cache, or creates one if the cache is
     * empty.
     * @param opt_bytes The bytes we're reading from.
     * @param opt_start The optional offset to start reading at.
     * @param opt_length The optional length of the block to read - we'll throw an assertion if we go off the end of the block.
     */
    static alloc(opt_bytes?: ByteSource | null, opt_start?: number, opt_length?: number): BinaryDecoder;
    /**
     * Puts this instance back in the instance cache.
     */
    free(): void;
    /**
     * Makes a copy of this decoder.
     */
    clone(): BinaryDecoder;
    /**
     * Clears the decoder.
     */
    clear(): void;
    /**
     * Returns the raw buffer.
     * @return The raw buffer.
     */
    getBuffer(): Uint8Array | null;
    /**
     * Changes the block of bytes we're decoding.
     * @param data The bytes we're reading from.
     * @param opt_start The optional offset to start reading at.
     * @param opt_length The optional length of the block to read - we'll throw an assertion if we go off the end of the block.
     */
    setBlock(data: ByteSource, opt_start?: number, opt_length?: number): void;
    getEnd(): number;
    /**
     *
     */
    setEnd(end: number): void;
    /**
     * Moves the read cursor back to the start of the block.
     */
    reset(): void;
    /**
     * Returns the internal read cursor.
     * @return The internal read cursor.
     */
    getCursor(): number;
    /**
     * Returns the internal read cursor.
     * @param cursor The new cursor.
     */
    setCursor(cursor: number): void;
    /**
     * Advances the stream cursor by the given number of bytes.
     * @param count The number of bytes to advance by.
     */
    advance(count: number): void;
    /**
     * Returns true if this decoder is at the end of the block.
     */
    atEnd(): boolean;
    /**
     * Returns true if this decoder is at the end of the block.
     */
    pastEnd(): boolean;
    /**
     * Returns true if this decoder encountered an error due to corrupt data.
     */
    getError(): boolean;
    /**
     * Reads an unsigned varint from the binary stream and invokes the conversion
     * function with the value in two signed 32 bit integers to produce the result.
     * Since this does not convert the value to a number, no precision is lost.
     *
     * It's possible for an unsigned varint to be incorrectly encoded - more than
     * 64 bits' worth of data could be present. If this happens, this method will
     * throw an error.
     *
     * Decoding varints requires doing some funny base-128 math - for more
     * details on the format, see
     * https://protobuf.dev/programming-guides/encoding/
     * @param convert Conversion function to produce the result value, takes parameters (lowBits, highBits).
     */
    readSplitVarint64<T = any>(convert: () => (T | null)): T | null;
    /**
     * Reads a signed zigzag encoded varint from the binary stream and invokes
     * the conversion function with the value in two signed 32 bit integers to
     * produce the result. Since this does not convert the value to a number, no
     * precision is lost.
     *
     * It's possible for an unsigned varint to be incorrectly encoded - more than
     * 64 bits' worth of data could be present. If this happens, this method will
     * throw an error.
     *
     * Zigzag encoding is a modification of varint encoding that reduces the
     * storage overhead for small negative integers - for more details on the
     * format, see https://protobuf.dev/programming-guides/encoding/
     * @param convert Conversion function to produce the result value, takes parameters (lowBits, highBits).
     */
    readSplitZigzagVarint64<T = any>(convert: () => (T | null)): T | null;
    /**
     * Reads a 64-bit fixed-width value from the stream and invokes the conversion
     * function with the value in two signed 32 bit integers to produce the result.
     * Since this does not convert the value to a number, no precision is lost.
     * @param convert Conversion function to produce the result value, takes parameters (lowBits, highBits).
     */
    readSplitFixed64<T = any>(convert: () => (T | null)): T | null;
    /**
     * Skips over a varint in the block without decoding it.
     */
    skipVarint(): void;
    /**
     * Skips backwards over a varint in the block - to do this correctly, we have
     * to know the value we're skipping backwards over or things are ambiguous.
     * @param value The varint value to unskip.
     */
    unskipVarint(value: number): void;
    /**
     * Reads a 32-bit varint from the binary stream. Due to a quirk of the encoding
     * format and Javascript's handling of bitwise math, this actually works
     * correctly for both signed and unsigned 32-bit varints.
     *
     * This function is called vastly more frequently than any other in
     * BinaryDecoder, so it has been unrolled and tweaked for performance.
     *
     * If there are more than 32 bits of data in the varint, it _must_ be due to
     * sign-extension. If we're in debug mode and the high 32 bits don't match the
     * expected sign extension, this method will throw an error.
     *
     * Decoding varints requires doing some funny base-128 math - for more
     * details on the format, see
     * https://protobuf.dev/programming-guides/encoding/
     * @return The decoded unsigned 32-bit varint.
     */
    readUnsignedVarint32(): number;
    /**
     * Coerces the output of readUnsignedVarint32 to an int32.
     * @return The decoded signed 32-bit varint.
     */
    readSignedVarint32(): number;
    /**
     * Reads a 32-bit unsigned variant and returns its value as a string.
     * @return The decoded unsigned 32-bit varint as a string.
     */
    readUnsignedVarint32String(): string;
    /**
     * Reads a 32-bit signed variant and returns its value as a string.
     * @return The decoded signed 32-bit varint as a string.
     */
    readSignedVarint32String(): string;
    /**
     * Reads a signed, zigzag-encoded 32-bit varint from the binary stream.
     *
     * Zigzag encoding is a modification of varint encoding that reduces the
     * storage overhead for small negative integers - for more details on the
     * format, see https://protobuf.dev/programming-guides/encoding/
     * @return The decoded signed, zigzag-encoded 32-bit varint.
     */
    readZigzagVarint32(): number;
    /**
     * Reads an unsigned 64-bit varint from the binary stream. Note that since
     * Javascript represents all numbers as double-precision floats, there will be
     * precision lost if the absolute value of the varint is larger than 2^53.
     * @return The decoded unsigned varint. Precision will be lost if the integer exceeds 2^53.
     */
    readUnsignedVarint64(): number;
    /**
     * Reads an unsigned 64-bit varint from the binary stream and returns the value
     * as a decimal string.
     * @return The decoded unsigned varint as a decimal string.
     */
    readUnsignedVarint64String(): string;
    /**
     * Reads a signed 64-bit varint from the binary stream. Note that since
     * Javascript represents all numbers as double-precision floats, there will be
     * precision lost if the absolute value of the varint is larger than 2^53.
     * @return The decoded signed varint. Precision will be lost if the integer exceeds 2^53.
     */
    readSignedVarint64(): number;
    /**
     * Reads an signed 64-bit varint from the binary stream and returns the value
     * as a decimal string.
     * @return The decoded signed varint as a decimal string.
     */
    readSignedVarint64String(): string;
    /**
     * Reads a signed, zigzag-encoded 64-bit varint from the binary stream. Note
     * that since Javascript represents all numbers as double-precision floats,
     * there will be precision lost if the absolute value of the varint is larger
     * than 2^53.
     *
     * Zigzag encoding is a modification of varint encoding that reduces the
     * storage overhead for small negative integers - for more details on the
     * format, see https://protobuf.dev/programming-guides/encoding/
     * @return The decoded zigzag varint. Precision will be lost if the integer exceeds 2^53.
     */
    readZigzagVarint64(): number;
    /**
     * Reads a signed, zigzag-encoded 64-bit varint from the binary stream
     * losslessly and returns it as an 8-character Unicode string for use as a hash
     * table key.
     *
     * Zigzag encoding is a modification of varint encoding that reduces the
     * storage overhead for small negative integers - for more details on the
     * format, see https://protobuf.dev/programming-guides/encoding/
     * @return The decoded zigzag varint in hash64 format.
     */
    readZigzagVarintHash64(): string;
    /**
     * Reads a signed, zigzag-encoded 64-bit varint from the binary stream and
     * returns its value as a string.
     *
     * Zigzag encoding is a modification of varint encoding that reduces the
     * storage overhead for small negative integers - for more details on the
     * format, see https://protobuf.dev/programming-guides/encoding/
     * @return The decoded signed, zigzag-encoded 64-bit varint as a string.
     */
    readZigzagVarint64String(): string;
    /**
     * Reads a raw unsigned 8-bit integer from the binary stream.
     * @return The unsigned 8-bit integer read from the binary stream.
     */
    readUint8(): number;
    /**
     * Reads a raw unsigned 16-bit integer from the binary stream.
     * @return The unsigned 16-bit integer read from the binary stream.
     */
    readUint16(): number;
    /**
     * Reads a raw unsigned 32-bit integer from the binary stream.
     * @return The unsigned 32-bit integer read from the binary stream.
     */
    readUint32(): number;
    /**
     * Reads a raw unsigned 64-bit integer from the binary stream. Note that since
     * Javascript represents all numbers as double-precision floats, there will be
     * precision lost if the absolute value of the integer is larger than 2^53.
     * @return The unsigned 64-bit integer read from the binary stream. Precision will be lost if the integer exceeds 2^53.
     */
    readUint64(): number;
    /**
     * Reads a raw unsigned 64-bit integer from the binary stream. Note that since
     * Javascript represents all numbers as double-precision floats, there will be
     * precision lost if the absolute value of the integer is larger than 2^53.
     * @return The unsigned 64-bit integer read from the binary stream.
     */
    readUint64String(): string;
    /**
     * Reads a raw signed 8-bit integer from the binary stream.
     * @return The signed 8-bit integer read from the binary stream.
     */
    readInt8(): number;
    /**
     * Reads a raw signed 16-bit integer from the binary stream.
     * @return The signed 16-bit integer read from the binary stream.
     */
    readInt16(): number;
    /**
     * Reads a raw signed 32-bit integer from the binary stream.
     * @return The signed 32-bit integer read from the binary stream.
     */
    readInt32(): number;
    /**
     * Reads a raw signed 64-bit integer from the binary stream. Note that since
     * Javascript represents all numbers as double-precision floats, there will be
     * precision lost if the absolute value of the integer is larger than 2^53.
     * @return The signed 64-bit integer read from the binary stream. Precision will be lost if the integer exceeds 2^53.
     */
    readInt64(): number;
    /**
     * Reads a raw signed 64-bit integer from the binary stream and returns it as a
     * string.
     * @return The signed 64-bit integer read from the binary stream. Precision will be lost if the integer exceeds 2^53.
     */
    readInt64String(): string;
    /**
     * Reads a 32-bit floating-point number from the binary stream, using the
     * temporary buffer to realign the data.
     * @return The float read from the binary stream.
     */
    readFloat(): number;
    /**
     * Reads a 64-bit floating-point number from the binary stream, using the
     * temporary buffer to realign the data.
     * @return The double read from the binary stream.
     */
    readDouble(): number;
    /**
     * Reads a boolean value from the binary stream.
     * @return The boolean read from the binary stream.
     */
    readBool(): boolean;
    /**
     * Reads an enum value from the binary stream, which are always encoded as
     * signed varints.
     * @return The enum value read from the binary stream.
     */
    readEnum(): number;
    /**
     * Reads and parses a UTF-8 encoded unicode string from the stream.
     * The code is inspired by maps.vectortown.parse.StreamedDataViewReader.
     * Supports codepoints from U+0000 up to U+10FFFF.
     * (http://en.wikipedia.org/wiki/UTF-8).
     * @param length The length of the string to read.
     * @param requireUtf8 Whether to throw when invalid utf8 is found.
     * @return The decoded string.
     */
    readString(length: number, requireUtf8: boolean): string;
    /**
     * Reads a block of raw bytes from the binary stream.
     * @param length The number of bytes to read.
     * @return The decoded block of bytes, or an empty block if the length was invalid.
     */
    readBytes(length: number): Uint8Array;
    /**
     * Reads a 64-bit varint from the stream and returns it as an 8-character
     * Unicode string for use as a hash table key.
     * @return The hash value.
     */
    readVarintHash64(): string;
    /**
     * Reads a 64-bit fixed-width value from the stream and returns it as an
     * 8-character Unicode string for use as a hash table key.
     * @return The hash value.
     */
    readFixedHash64(): string;
}

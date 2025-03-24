import * as BinaryConstants from './constants.js';
import { BinaryDecoder } from './decoder.js';
/**
 * BinaryReader implements the decoders for all the wire types specified in
 * https://protobuf.dev/programming-guides/encoding/.
 */
export declare class BinaryReader {
    /**
     * BinaryReader implements the decoders for all the wire types specified in
     * https://protobuf.dev/programming-guides/encoding/.
     * @param opt_bytes The bytes we're reading from.
     * @param opt_start The optional offset to start reading at.
     * @param opt_length The optional length of the block to read - we'll throw an assertion if we go off the end of the block.
     */
    constructor(opt_bytes?: BinaryConstants.ByteSource | null, opt_start?: number, opt_length?: number);
    private noStructuralTyping____protobuf_javascript_binary_reader_BinaryReader;
    static clearInstanceCache(): void;
    static getInstanceCacheLength(): number;
    /**
     * Pops an instance off the instance cache, or creates one if the cache is
     * empty.
     * @param opt_bytes The bytes we're reading from.
     * @param opt_start The optional offset to start reading at.
     * @param opt_length The optional length of the block to read - we'll throw an assertion if we go off the end of the block.
     */
    static alloc(opt_bytes?: BinaryConstants.ByteSource | null, opt_start?: number, opt_length?: number): BinaryReader;
    /**
     * Alias for the above method.
     * @param opt_bytes The bytes we're reading from.
     * @param opt_start The optional offset to start reading at.
     * @param opt_length The optional length of the block to read - we'll throw an assertion if we go off the end of the block.
     */
    alloc(a?: BinaryConstants.ByteSource | null, b?: number, c?: number): BinaryReader;
    /**
     * Puts this instance back in the instance cache.
     */
    free(): void;
    /**
     * Returns the cursor immediately before the current field's tag.
     * @return The internal read cursor.
     */
    getFieldCursor(): number;
    /**
     * Returns the internal read cursor.
     * @return The internal read cursor.
     */
    getCursor(): number;
    /**
     * Returns the raw buffer.
     * @return The raw buffer.
     */
    getBuffer(): Uint8Array | null;
    getFieldNumber(): number;
    getWireType(): BinaryConstants.WireType | null;
    isDelimited(): boolean;
    isEndGroup(): boolean;
    /**
     * Returns true if this reader hit an error due to corrupt data.
     */
    getError(): boolean;
    /**
     * Points this reader at a new block of bytes.
     * @param bytes The block of bytes we're reading from.
     * @param start The offset to start reading at.
     * @param length The length of the block to read.
     */
    setBlock(bytes: Uint8Array, start: number, length: number): void;
    /**
     * Rewinds the stream cursor to the beginning of the buffer and resets all
     * internal state.
     */
    reset(): void;
    /**
     * Advances the stream cursor by the given number of bytes.
     * @param count The number of bytes to advance by.
     */
    advance(count: number): void;
    /**
     * Reads the next field header in the stream if there is one, returns true if
     * we saw a valid field header or false if we've read the whole stream.
     * Throws an error if we encountered a deprecated START_GROUP/END_GROUP field.
     * @return True if the stream contains more fields.
     */
    nextField(): boolean;
    /**
     * Winds the reader back to just before this field's header.
     */
    unskipHeader(): void;
    /**
     * Skips all contiguous fields whose header matches the one we just read.
     */
    skipMatchingFields(): void;
    /**
     * Skips over the next varint field in the binary stream.
     */
    skipVarintField(): void;
    /**
     * Skips over the next delimited field in the binary stream.
     */
    skipDelimitedField(): void;
    /**
     * Skips over the next fixed32 field in the binary stream.
     */
    skipFixed32Field(): void;
    /**
     * Skips over the next fixed64 field in the binary stream.
     */
    skipFixed64Field(): void;
    /**
     * Skips over the next group field in the binary stream.
     */
    skipGroup(): void;
    /**
     * Skips over the next field in the binary stream - this is useful if we're
     * decoding a message that contain unknown fields.
     */
    skipField(): void;
    /**
     * Registers a user-defined read callback.
     */
    registerReadCallback(callbackName: string, callback: () => any): void;
    /**
     * Runs a registered read callback.
     * @param callbackName The name the callback is registered under.
     * @return The value returned by the callback.
     */
    runReadCallback(callbackName: string): any;
    /**
     * Reads a field of any valid non-message type from the binary stream.
     */
    readAny(fieldType: BinaryConstants.FieldType | null): BinaryConstants.AnyFieldType | null;
    /**
     * Deserialize a proto into the provided message object using the provided
     * reader function. This function is templated as we currently have one client
     * who is using manual deserialization instead of the code-generated versions.
     */
    readMessage<T = any>(message: T | null, reader: () => any): void;
    /**
     * Deserialize a proto into the provided message object using the provided
     * reader function, assuming that the message is serialized as a group
     * with the given tag.
     */
    readGroup<T = any>(field: number, message: T | null, reader: () => any): void;
    /**
     * Return a decoder that wraps the current delimited field.
     */
    getFieldDecoder(): BinaryDecoder;
    /**
     * Reads a signed 32-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     * @return The value of the signed 32-bit integer field.
     */
    readInt32(): number;
    /**
     * Reads a signed 32-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * Returns the value as a string.
     * @return The value of the signed 32-bit integer field as a decimal string.
     */
    readInt32String(): string;
    /**
     * Reads a signed 64-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     * @return The value of the signed 64-bit integer field.
     */
    readInt64(): number;
    /**
     * Reads a signed 64-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * Returns the value as a string.
     * @return The value of the signed 64-bit integer field as a decimal string.
     */
    readInt64String(): string;
    /**
     * Reads an unsigned 32-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     * @return The value of the unsigned 32-bit integer field.
     */
    readUint32(): number;
    /**
     * Reads an unsigned 32-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * Returns the value as a string.
     * @return The value of the unsigned 32-bit integer field as a decimal string.
     */
    readUint32String(): string;
    /**
     * Reads an unsigned 64-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     * @return The value of the unsigned 64-bit integer field.
     */
    readUint64(): number;
    /**
     * Reads an unsigned 64-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * Returns the value as a string.
     * @return The value of the unsigned 64-bit integer field as a decimal string.
     */
    readUint64String(): string;
    /**
     * Reads a signed zigzag-encoded 32-bit integer field from the binary stream,
     * or throws an error if the next field in the stream is not of the correct
     * wire type.
     * @return The value of the signed 32-bit integer field.
     */
    readSint32(): number;
    /**
     * Reads a signed zigzag-encoded 64-bit integer field from the binary stream,
     * or throws an error if the next field in the stream is not of the correct
     * wire type.
     * @return The value of the signed 64-bit integer field.
     */
    readSint64(): number;
    /**
     * Reads a signed zigzag-encoded 64-bit integer field from the binary stream,
     * or throws an error if the next field in the stream is not of the correct
     * wire type.
     * @return The value of the signed 64-bit integer field as a decimal string.
     */
    readSint64String(): string;
    /**
     * Reads an unsigned 32-bit fixed-length integer fiield from the binary stream,
     * or throws an error if the next field in the stream is not of the correct
     * wire type.
     * @return The value of the double field.
     */
    readFixed32(): number;
    /**
     * Reads an unsigned 64-bit fixed-length integer fiield from the binary stream,
     * or throws an error if the next field in the stream is not of the correct
     * wire type.
     * @return The value of the float field.
     */
    readFixed64(): number;
    /**
     * Reads a signed 64-bit integer field from the binary stream as a string, or
     * throws an error if the next field in the stream is not of the correct wire
     * type.
     *
     * Returns the value as a string.
     * @return The value of the unsigned 64-bit integer field as a decimal string.
     */
    readFixed64String(): string;
    /**
     * Reads a signed 32-bit fixed-length integer fiield from the binary stream, or
     * throws an error if the next field in the stream is not of the correct wire
     * type.
     * @return The value of the signed 32-bit integer field.
     */
    readSfixed32(): number;
    /**
     * Reads a signed 32-bit fixed-length integer fiield from the binary stream, or
     * throws an error if the next field in the stream is not of the correct wire
     * type.
     * @return The value of the signed 32-bit integer field as a decimal string.
     */
    readSfixed32String(): string;
    /**
     * Reads a signed 64-bit fixed-length integer fiield from the binary stream, or
     * throws an error if the next field in the stream is not of the correct wire
     * type.
     * @return The value of the sfixed64 field.
     */
    readSfixed64(): number;
    /**
     * Reads a signed 64-bit fixed-length integer fiield from the binary stream, or
     * throws an error if the next field in the stream is not of the correct wire
     * type.
     *
     * Returns the value as a string.
     * @return The value of the sfixed64 field as a decimal string.
     */
    readSfixed64String(): string;
    /**
     * Reads a 32-bit floating-point field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     * @return The value of the float field.
     */
    readFloat(): number;
    /**
     * Reads a 64-bit floating-point field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     * @return The value of the double field.
     */
    readDouble(): number;
    /**
     * Reads a boolean field from the binary stream, or throws an error if the next
     * field in the stream is not of the correct wire type.
     * @return The value of the boolean field.
     */
    readBool(): boolean;
    /**
     * Reads an enum field from the binary stream, or throws an error if the next
     * field in the stream is not of the correct wire type.
     * @return The value of the enum field.
     */
    readEnum(): number;
    /**
     * Reads a string field from the binary stream, or throws an error if the next
     * field in the stream is not of the correct wire type.
     * @return The value of the string field.
     */
    readString(): string;
    /**
     * Reads a string field from the binary stream, or throws an error if the next
     * field in the stream is not of the correct wire type, or if the string is
     * not valid utf8.
     * @return The value of the string field.
     */
    readStringRequireUtf8(): string;
    /**
     * Reads a length-prefixed block of bytes from the binary stream, or returns
     * null if the next field in the stream has an invalid length value.
     * @return The block of bytes.
     */
    readBytes(): Uint8Array;
    /**
     * Reads a 64-bit varint or fixed64 field from the stream and returns it as an
     * 8-character Unicode string for use as a hash table key, or throws an error
     * if the next field in the stream is not of the correct wire type.
     * @return The hash value.
     */
    readVarintHash64(): string;
    /**
     * Reads an sint64 field from the stream and returns it as an 8-character
     * Unicode string for use as a hash table key, or throws an error if the next
     * field in the stream is not of the correct wire type.
     * @return The hash value.
     */
    readSintHash64(): string;
    /**
     * Reads a 64-bit varint field from the stream and invokes `convert` to produce
     * the return value, or throws an error if the next field in the stream is not
     * of the correct wire type.
     * @param convert Conversion function to produce the result value, takes parameters (lowBits, highBits).
     */
    readSplitVarint64<T = any>(convert: () => (T | null)): T | null;
    /**
     * Reads a 64-bit zig-zag varint field from the stream and invokes `convert` to
     * produce the return value, or throws an error if the next field in the stream
     * is not of the correct wire type.
     * @param convert Conversion function to produce the result value, takes parameters (lowBits, highBits).
     */
    readSplitZigzagVarint64<T = any>(convert: () => (T | null)): T | null;
    /**
     * Reads a 64-bit varint or fixed64 field from the stream and returns it as a
     * 8-character Unicode string for use as a hash table key, or throws an error
     * if the next field in the stream is not of the correct wire type.
     * @return The hash value.
     */
    readFixedHash64(): string;
    /**
     * Reads a 64-bit fixed64 field from the stream and invokes `convert`
     * to produce the return value, or throws an error if the next field in the
     * stream is not of the correct wire type.
     * @param convert Conversion function to produce the result value, takes parameters (lowBits, highBits).
     */
    readSplitFixed64<T = any>(convert: () => (T | null)): T | null;
    /**
     * Reads a packed int32 field, which consists of a length header and a list of
     * signed varints.
     */
    readPackedInt32(): number[];
    /**
     * Reads a packed int32 field, which consists of a length header and a list of
     * signed varints. Returns a list of strings.
     */
    readPackedInt32String(): string[];
    /**
     * Reads a packed int64 field, which consists of a length header and a list of
     * signed varints.
     */
    readPackedInt64(): number[];
    /**
     * Reads a packed int64 field, which consists of a length header and a list of
     * signed varints. Returns a list of strings.
     */
    readPackedInt64String(): string[];
    /**
     * Reads a packed uint32 field, which consists of a length header and a list of
     * unsigned varints.
     */
    readPackedUint32(): number[];
    /**
     * Reads a packed uint32 field, which consists of a length header and a list of
     * unsigned varints. Returns a list of strings.
     */
    readPackedUint32String(): string[];
    /**
     * Reads a packed uint64 field, which consists of a length header and a list of
     * unsigned varints.
     */
    readPackedUint64(): number[];
    /**
     * Reads a packed uint64 field, which consists of a length header and a list of
     * unsigned varints. Returns a list of strings.
     */
    readPackedUint64String(): string[];
    /**
     * Reads a packed sint32 field, which consists of a length header and a list of
     * zigzag varints.
     */
    readPackedSint32(): number[];
    /**
     * Reads a packed sint64 field, which consists of a length header and a list of
     * zigzag varints.
     */
    readPackedSint64(): number[];
    /**
     * Reads a packed sint64 field, which consists of a length header and a list of
     * zigzag varints.  Returns a list of strings.
     */
    readPackedSint64String(): string[];
    /**
     * Reads a packed fixed32 field, which consists of a length header and a list
     * of unsigned 32-bit ints.
     */
    readPackedFixed32(): number[];
    /**
     * Reads a packed fixed64 field, which consists of a length header and a list
     * of unsigned 64-bit ints.
     */
    readPackedFixed64(): number[];
    /**
     * Reads a packed fixed64 field, which consists of a length header and a list
     * of unsigned 64-bit ints.  Returns a list of strings.
     */
    readPackedFixed64String(): number[];
    /**
     * Reads a packed sfixed32 field, which consists of a length header and a list
     * of 32-bit ints.
     */
    readPackedSfixed32(): number[];
    /**
     * Reads a packed sfixed64 field, which consists of a length header and a list
     * of 64-bit ints.
     */
    readPackedSfixed64(): number[];
    /**
     * Reads a packed sfixed64 field, which consists of a length header and a list
     * of 64-bit ints.  Returns a list of strings.
     */
    readPackedSfixed64String(): string[];
    /**
     * Reads a packed float field, which consists of a length header and a list of
     * floats.
     */
    readPackedFloat(): number[];
    /**
     * Reads a packed double field, which consists of a length header and a list of
     * doubles.
     */
    readPackedDouble(): number[];
    /**
     * Reads a packed bool field, which consists of a length header and a list of
     * unsigned varints.
     */
    readPackedBool(): boolean[];
    /**
     * Reads a packed enum field, which consists of a length header and a list of
     * unsigned varints.
     */
    readPackedEnum(): number[];
    /**
     * Reads a packed varint hash64 field, which consists of a length header and a
     * list of varint hash64s.
     */
    readPackedVarintHash64(): string[];
    /**
     * Reads a packed fixed hash64 field, which consists of a length header and a
     * list of fixed hash64s.
     */
    readPackedFixedHash64(): string[];
}

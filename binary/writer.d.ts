import * as base64 from '../../closure-library/closure/goog/crypt/base64.js';
import * as BinaryConstants from './constants.js';
/**
 * BinaryWriter implements encoders for all the wire types specified in
 * https://protobuf.dev/programming-guides/encoding/.
 */
export declare class BinaryWriter {
    /**
     * BinaryWriter implements encoders for all the wire types specified in
     * https://protobuf.dev/programming-guides/encoding/.
     */
    constructor();
    private noStructuralTyping____protobuf_javascript_binary_writer_BinaryWriter;
    /**
     * Writes a pre-serialized message to the buffer.
     * @param bytes The array of bytes to write.
     * @param start The start of the range to write.
     * @param end The end of the range to write.
     */
    writeSerializedMessage(bytes: Uint8Array, start: number, end: number): void;
    /**
     * Writes a pre-serialized message to the buffer if the message and endpoints
     * are non-null.
     * @param bytes The array of bytes to write.
     * @param start The start of the range to write.
     * @param end The end of the range to write.
     */
    maybeWriteSerializedMessage(bytes: Uint8Array | null, start: number | null, end: number | null): void;
    /**
     * Resets the writer, throwing away any accumulated buffers.
     */
    reset(): void;
    /**
     * Converts the encoded data into a Uint8Array.
     */
    getResultBuffer(): Uint8Array;
    /**
     * Converts the encoded data into a base64-encoded string.
     * @param alphabet Which flavor of base64 to use.
     */
    getResultBase64String(alphabet?: base64.Alphabet): string;
    /**
     * Begins a new sub-message. The client must call endSubMessage() when they're
     * done.
     * TODO(aappleby): Deprecated. Move callers to writeMessage().
     * @param field The field number of the sub-message.
     */
    beginSubMessage(field: number): void;
    /**
     * Finishes a sub-message and packs it into the parent messages' buffer.
     * TODO(aappleby): Deprecated. Move callers to writeMessage().
     */
    endSubMessage(): void;
    /**
     * Writes a field of any valid scalar type to the binary stream.
     */
    writeAny(fieldType: BinaryConstants.FieldType | null, field: number, value: BinaryConstants.AnyFieldType | null): void;
    /**
     * Writes an int32 field to the buffer. Numbers outside the range [-2^31,2^31)
     * will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeInt32(field: number, value: number | null): void;
    /**
     * Writes an int32 field represented as a string to the buffer. Numbers outside
     * the range [-2^31,2^31) will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeInt32String(field: number, value: string | null): void;
    /**
     * Writes an int64 field to the buffer. Numbers outside the range [-2^63,2^63)
     * will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeInt64(field: number, value: number | null): void;
    /**
     * Writes a int64 field (with value as a string) to the buffer.
     * @param field The field number.
     * @param value The value to write.
     */
    writeInt64String(field: number, value: string | null): void;
    /**
     * Writes a uint32 field to the buffer. Numbers outside the range [0,2^32)
     * will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeUint32(field: number, value: number | null): void;
    /**
     * Writes a uint32 field represented as a string to the buffer. Numbers outside
     * the range [0,2^32) will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeUint32String(field: number, value: string | null): void;
    /**
     * Writes a uint64 field to the buffer. Numbers outside the range [0,2^64)
     * will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeUint64(field: number, value: number | null): void;
    /**
     * Writes a uint64 field (with value as a string) to the buffer.
     * @param field The field number.
     * @param value The value to write.
     */
    writeUint64String(field: number, value: string | null): void;
    /**
     * Writes an sint32 field to the buffer. Numbers outside the range [-2^31,2^31)
     * will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeSint32(field: number, value: number | null): void;
    /**
     * Writes an sint64 field to the buffer. Numbers outside the range [-2^63,2^63)
     * will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeSint64(field: number, value: number | null): void;
    /**
     * Writes an sint64 field to the buffer from a hash64 encoded value. Numbers
     * outside the range [-2^63,2^63) will be truncated.
     * @param field The field number.
     * @param value The hash64 string to write.
     */
    writeSintHash64(field: number, value: string | null): void;
    /**
     * Writes an sint64 field to the buffer. Numbers outside the range [-2^63,2^63)
     * will be truncated.
     * @param field The field number.
     * @param value The decimal string to write.
     */
    writeSint64String(field: number, value: string | null): void;
    /**
     * Writes a fixed32 field to the buffer. Numbers outside the range [0,2^32)
     * will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeFixed32(field: number, value: number | null): void;
    /**
     * Writes a fixed64 field to the buffer. Numbers outside the range [0,2^64)
     * will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeFixed64(field: number, value: number | null): void;
    /**
     * Writes a fixed64 field (with value as a string) to the buffer.
     * @param field The field number.
     * @param value The value to write.
     */
    writeFixed64String(field: number, value: string | null): void;
    /**
     * Writes a sfixed32 field to the buffer. Numbers outside the range
     * [-2^31,2^31) will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeSfixed32(field: number, value: number | null): void;
    /**
     * Writes a sfixed64 field to the buffer. Numbers outside the range
     * [-2^63,2^63) will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeSfixed64(field: number, value: number | null): void;
    /**
     * Writes a sfixed64 string field to the buffer. Numbers outside the range
     * [-2^63,2^63) will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeSfixed64String(field: number, value: string | null): void;
    /**
     * Writes a single-precision floating point field to the buffer. Numbers
     * requiring more than 32 bits of precision will be truncated.
     * @param field The field number.
     * @param value The value to write.
     */
    writeFloat(field: number, value: number | null): void;
    /**
     * Writes a double-precision floating point field to the buffer. As this is the
     * native format used by JavaScript, no precision will be lost.
     * @param field The field number.
     * @param value The value to write.
     */
    writeDouble(field: number, value: number | null): void;
    /**
     * Writes a boolean field to the buffer. We allow numbers as input
     * because the JSPB code generator uses 0/1 instead of true/false to save space
     * in the string representation of the proto.
     * @param field The field number.
     * @param value The value to write.
     */
    writeBool(field: number, value: boolean | number | null): void;
    /**
     * Writes an enum field to the buffer.
     * @param field The field number.
     * @param value The value to write.
     */
    writeEnum(field: number, value: number | null): void;
    /**
     * Writes a string field to the buffer.
     * @param field The field number.
     * @param value The string to write.
     */
    writeString(field: number, value: string | null): void;
    /**
     * Writes an arbitrary byte field to the buffer. Note - to match the behavior
     * of the C++ implementation, empty byte arrays _are_ serialized.
     * @param field The field number.
     * @param value The array of bytes to write.
     */
    writeBytes(field: number, value: BinaryConstants.ByteSource | null): void;
    /**
     * Writes a message to the buffer.
     * @param field The field number.
     * @param value The message to write.
     * @param writerCallback Will be invoked with the value to write and the writer to write it with.
     */
    writeMessage<MessageType = any>(field: number, value: MessageType | null, writerCallback: (m:Exclude<MessageType, null>, w:BinaryWriter) => void): void;
    /**
     * Writes a message set extension to the buffer.
     * @param field The field number for the extension.
     * @param value The extension message object to write. Note that message set can only have extensions with type of optional message.
     * @param writerCallback Will be invoked with the value to write and the writer to write it with.
     */
    writeMessageSet<MessageType = any>(field: number, value: MessageType | null, writerCallback: (m:Exclude<MessageType, null>, w:BinaryWriter) => void): void;
    /**
     * Writes a group message to the buffer.
     * @param field The field number.
     * @param value The message to write, wrapped with START_GROUP / END_GROUP tags. Will be a no-op if 'value' is null.
     * @param writerCallback Will be invoked with the value to write and the writer to write it with.
     */
    writeGroup<MessageType = any>(field: number, value: MessageType | null, writerCallback: (m:Exclude<MessageType, null>, w:BinaryWriter) => void): void;
    /**
     * Writes a 64-bit hash string field (8 characters @ 8 bits of data each) to
     * the buffer.
     * @param field The field number.
     * @param value The hash string.
     */
    writeFixedHash64(field: number, value: string | null): void;
    /**
     * Writes a 64-bit hash string field (8 characters @ 8 bits of data each) to
     * the buffer.
     * @param field The field number.
     * @param value The hash string.
     */
    writeVarintHash64(field: number, value: string | null): void;
    /**
     * Writes a 64-bit field to the buffer as a fixed64.
     * @param field The field number.
     * @param lowBits The low 32 bits.
     * @param highBits The high 32 bits.
     */
    writeSplitFixed64(field: number, lowBits: number, highBits: number): void;
    /**
     * Writes a 64-bit field to the buffer as a varint.
     * @param field The field number.
     * @param lowBits The low 32 bits.
     * @param highBits The high 32 bits.
     */
    writeSplitVarint64(field: number, lowBits: number, highBits: number): void;
    /**
     * Writes a 64-bit field to the buffer as a zigzag encoded varint.
     * @param field The field number.
     * @param lowBits The low 32 bits.
     * @param highBits The high 32 bits.
     */
    writeSplitZigzagVarint64(field: number, lowBits: number, highBits: number): void;
    /**
     * Writes an array of numbers to the buffer as a repeated 32-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedInt32(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers formatted as strings to the buffer as a repeated
     * 32-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedInt32String(field: number, value: string[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a repeated 64-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedInt64(field: number, value: number[] | null): void;
    /**
     * Writes an array of 64-bit values to the buffer as a fixed64.
     * @param field The field number.
     * @param value The value.
     * @param lo Function to get low bits.
     * @param hi Function to get high bits.
     */
    writeRepeatedSplitFixed64<T = any>(field: number, value: (T | null)[] | null, lo: () => number, hi: () => number): void;
    /**
     * Writes an array of 64-bit values to the buffer as a varint.
     * @param field The field number.
     * @param value The value.
     * @param lo Function to get low bits.
     * @param hi Function to get high bits.
     */
    writeRepeatedSplitVarint64<T = any>(field: number, value: (T | null)[] | null, lo: () => number, hi: () => number): void;
    /**
     * Writes an array of 64-bit values to the buffer as a zigzag varint.
     * @param field The field number.
     * @param value The value.
     * @param lo Function to get low bits.
     * @param hi Function to get high bits.
     */
    writeRepeatedSplitZigzagVarint64<T = any>(field: number, value: (T | null)[] | null, lo: () => number, hi: () => number): void;
    /**
     * Writes an array of numbers formatted as strings to the buffer as a repeated
     * 64-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedInt64String(field: number, value: string[] | null): void;
    /**
     * Writes an array numbers to the buffer as a repeated unsigned 32-bit int
     * field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedUint32(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers formatted as strings to the buffer as a repeated
     * unsigned 32-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedUint32String(field: number, value: string[] | null): void;
    /**
     * Writes an array numbers to the buffer as a repeated unsigned 64-bit int
     * field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedUint64(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers formatted as strings to the buffer as a repeated
     * unsigned 64-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedUint64String(field: number, value: string[] | null): void;
    /**
     * Writes an array numbers to the buffer as a repeated signed 32-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedSint32(field: number, value: number[] | null): void;
    /**
     * Writes an array numbers to the buffer as a repeated signed 64-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedSint64(field: number, value: number[] | null): void;
    /**
     * Writes an array numbers to the buffer as a repeated signed 64-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedSint64String(field: number, value: string[] | null): void;
    /**
     * Writes an array of hash64 strings to the buffer as a repeated signed 64-bit
     * int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedSintHash64(field: number, value: string[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a repeated fixed32 field. This
     * works for both signed and unsigned fixed32s.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedFixed32(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a repeated fixed64 field. This
     * works for both signed and unsigned fixed64s.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedFixed64(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a repeated fixed64 field. This
     * works for both signed and unsigned fixed64s.
     * @param field The field number.
     * @param value The array of decimal strings to write.
     */
    writeRepeatedFixed64String(field: number, value: string[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a repeated sfixed32 field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedSfixed32(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a repeated sfixed64 field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedSfixed64(field: number, value: number[] | null): void;
    /**
     * Writes an array of decimal strings to the buffer as a repeated sfixed64
     * field.
     * @param field The field number.
     * @param value The array of decimal strings to write.
     */
    writeRepeatedSfixed64String(field: number, value: string[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a repeated float field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedFloat(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a repeated double field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedDouble(field: number, value: number[] | null): void;
    /**
     * Writes an array of booleans to the buffer as a repeated bool field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedBool(field: number, value: boolean[] | null): void;
    /**
     * Writes an array of enums to the buffer as a repeated enum field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writeRepeatedEnum(field: number, value: number[] | null): void;
    /**
     * Writes an array of strings to the buffer as a repeated string field.
     * @param field The field number.
     * @param value The array of strings to write.
     */
    writeRepeatedString(field: number, value: string[] | null): void;
    /**
     * Writes an array of arbitrary byte fields to the buffer.
     * @param field The field number.
     * @param value The arrays of arrays of bytes to write.
     */
    writeRepeatedBytes(field: number, value: BinaryConstants.ByteSource[] | null): void;
    /**
     * Writes an array of messages to the buffer.
     * @param field The field number.
     * @param value The array of messages to write.
     * @param writerCallback Will be invoked with the value to write and the writer to write it with.
     */
    writeRepeatedMessage<MessageType = any>(field: number, value: (MessageType | null)[] | null, writerCallback: () => any): void;
    /**
     * Writes an array of group messages to the buffer.
     * @param field The field number.
     * @param value The array of messages to write.
     * @param writerCallback Will be invoked with the value to write and the writer to write it with.
     */
    writeRepeatedGroup<MessageType = any>(field: number, value: (MessageType | null)[] | null, writerCallback: () => any): void;
    /**
     * Writes a 64-bit hash string field (8 characters @ 8 bits of data each) to
     * the buffer.
     * @param field The field number.
     * @param value The array of hashes to write.
     */
    writeRepeatedFixedHash64(field: number, value: string[] | null): void;
    /**
     * Writes a repeated 64-bit hash string field (8 characters @ 8 bits of data
     * each) to the buffer.
     * @param field The field number.
     * @param value The array of hashes to write.
     */
    writeRepeatedVarintHash64(field: number, value: string[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a packed 32-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedInt32(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers represented as strings to the buffer as a packed
     * 32-bit int field.
     */
    writePackedInt32String(field: number, value: string[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a packed 64-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedInt64(field: number, value: number[] | null): void;
    /**
     * Writes an array of 64-bit values to the buffer as a fixed64.
     * @param field The field number.
     * @param value The value.
     * @param lo Function to get low bits.
     * @param hi Function to get high bits.
     */
    writePackedSplitFixed64<T = any>(field: number, value: (T | null)[] | null, lo: () => number, hi: () => number): void;
    /**
     * Writes an array of 64-bit values to the buffer as a varint.
     * @param field The field number.
     * @param value The value.
     * @param lo Function to get low bits.
     * @param hi Function to get high bits.
     */
    writePackedSplitVarint64<T = any>(field: number, value: (T | null)[] | null, lo: () => number, hi: () => number): void;
    /**
     * Writes an array of 64-bit values to the buffer as a zigzag varint.
     * @param field The field number.
     * @param value The value.
     * @param lo Function to get low bits.
     * @param hi Function to get high bits.
     */
    writePackedSplitZigzagVarint64<T = any>(field: number, value: (T | null)[] | null, lo: () => number, hi: () => number): void;
    /**
     * Writes an array of numbers represented as strings to the buffer as a packed
     * 64-bit int field.
     */
    writePackedInt64String(field: number, value: string[] | null): void;
    /**
     * Writes an array numbers to the buffer as a packed unsigned 32-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedUint32(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers represented as strings to the buffer as a packed
     * unsigned 32-bit int field.
     */
    writePackedUint32String(field: number, value: string[] | null): void;
    /**
     * Writes an array numbers to the buffer as a packed unsigned 64-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedUint64(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers represented as strings to the buffer as a packed
     * unsigned 64-bit int field.
     */
    writePackedUint64String(field: number, value: string[] | null): void;
    /**
     * Writes an array numbers to the buffer as a packed signed 32-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedSint32(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a packed signed 64-bit int field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedSint64(field: number, value: number[] | null): void;
    /**
     * Writes an array of decimal strings to the buffer as a packed signed 64-bit
     * int field.
     * @param field The field number.
     * @param value The array of decimal strings to write.
     */
    writePackedSint64String(field: number, value: string[] | null): void;
    /**
     * Writes an array of hash 64 strings to the buffer as a packed signed 64-bit
     * int field.
     * @param field The field number.
     * @param value The array of decimal strings to write.
     */
    writePackedSintHash64(field: number, value: string[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a packed fixed32 field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedFixed32(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a packed fixed64 field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedFixed64(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers represented as strings to the buffer as a packed
     * fixed64 field.
     * @param field The field number.
     * @param value The array of strings to write.
     */
    writePackedFixed64String(field: number, value: string[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a packed sfixed32 field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedSfixed32(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a packed sfixed64 field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedSfixed64(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a packed sfixed64 field.
     * @param field The field number.
     * @param value The array of decimal strings to write.
     */
    writePackedSfixed64String(field: number, value: string[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a packed float field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedFloat(field: number, value: number[] | null): void;
    /**
     * Writes an array of numbers to the buffer as a packed double field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedDouble(field: number, value: number[] | null): void;
    /**
     * Writes an array of booleans to the buffer as a packed bool field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedBool(field: number, value: boolean[] | null): void;
    /**
     * Writes an array of enums to the buffer as a packed enum field.
     * @param field The field number.
     * @param value The array of ints to write.
     */
    writePackedEnum(field: number, value: number[] | null): void;
    /**
     * Writes a 64-bit hash string field (8 characters @ 8 bits of data each) to
     * the buffer.
     * @param field The field number.
     * @param value The array of hashes to write.
     */
    writePackedFixedHash64(field: number, value: string[] | null): void;
    /**
     * Writes a 64-bit hash string field (8 characters @ 8 bits of data each) to
     * the buffer.
     * @param field The field number.
     * @param value The array of hashes to write.
     */
    writePackedVarintHash64(field: number, value: string[] | null): void;
}

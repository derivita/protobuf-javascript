import { ByteString } from '../bytestring.js';
import { Int64 } from '../int64.js';
import { WireType } from './wire_type.js';
/**
 * Writer provides methods for encoding all protobuf supported type into a
 * binary format bytes array.
 * Check https://protobuf.dev/programming-guides/encoding/ for binary
 * format definition.
 */
declare class Writer {
    constructor();
    /**
     * Converts the encoded data into a Uint8Array.
     * The writer is also reset.
     */
    getAndResetResultBuffer(): ArrayBuffer;
    /**
     * Encodes a (field number, wire type) tuple into a wire-format field header.
     */
    writeTag(fieldNumber: number, wireType: WireType): void;
    /**
     * **************************************************************************
     * OPTIONAL METHODS
     * **************************************************************************
     */
    writeBoolValue_(value: any): void;
    /**
     * Writes a boolean value field to the buffer as a varint.
     */
    writeBool(fieldNumber: number, value: boolean): void;
    /**
     * Writes a bytes value field to the buffer as a length delimited field.
     */
    writeBytes(fieldNumber: number, value: ByteString): void;
    /**
     * Writes a double value field to the buffer.
     */
    writeDouble(fieldNumber: number, value: number): void;
    /**
     * Writes a fixed32 value field to the buffer.
     */
    writeFixed32(fieldNumber: number, value: number): void;
    /**
     * Writes a float value field to the buffer.
     */
    writeFloat(fieldNumber: number, value: number): void;
    /**
     * Writes a int32 value field to the buffer as a varint.
     */
    writeInt32(fieldNumber: number, value: number): void;
    /**
     * Writes a int64 value field to the buffer as a varint.
     */
    writeInt64(fieldNumber: number, value: Int64): void;
    /**
     * Writes a sfixed32 value field to the buffer.
     */
    writeSfixed32(fieldNumber: number, value: number): void;
    /**
     * Writes a sfixed64 value field to the buffer.
     */
    writeSfixed64(fieldNumber: number, value: Int64): void;
    /**
     * Writes a sfixed64 value field to the buffer.
     */
    writeStartGroup(fieldNumber: number): void;
    /**
     * Writes a sfixed64 value field to the buffer.
     */
    writeEndGroup(fieldNumber: number): void;
    /**
     * Writes a uint32 value field to the buffer as a varint.
     */
    writeUint32(fieldNumber: number, value: number): void;
    /**
     * Writes a sint32 value field to the buffer as a varint.
     */
    writeSint32(fieldNumber: number, value: number): void;
    /**
     * Writes a sint64 value field to the buffer as a varint.
     */
    writeSint64(fieldNumber: number, value: Int64): void;
    /**
     * Writes a string value field to the buffer as a varint.
     */
    writeString(fieldNumber: number, value: string): void;
    /**
     * Write the whole bytes as a length delimited field.
     */
    writeDelimited(fieldNumber: number, arrayBuffer: ArrayBuffer): void;
    /**
     * **************************************************************************
     * REPEATED METHODS
     * **************************************************************************
     */
    writeRepeatedBool(fieldNumber: any, values: any): void;
    /**
     * Writes repeated boolean values to the buffer as packed varints.
     */
    writePackedBool(fieldNumber: number, values: boolean[]): void;
    /**
     * Writes repeated double values to the buffer as unpacked fixed64.
     */
    writeRepeatedDouble(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated double values to the buffer as packed fixed64.
     */
    writePackedDouble(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated fixed32 values to the buffer as unpacked fixed32.
     */
    writeRepeatedFixed32(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated fixed32 values to the buffer as packed fixed32.
     */
    writePackedFixed32(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated float values to the buffer as unpacked fixed64.
     */
    writeRepeatedFloat(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated float values to the buffer as packed fixed64.
     */
    writePackedFloat(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated int32 values to the buffer as unpacked int32.
     */
    writeRepeatedInt32(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated int32 values to the buffer as packed int32.
     */
    writePackedInt32(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated int64 values to the buffer as unpacked varint.
     */
    writeRepeatedInt64(fieldNumber: number, values: Int64[]): void;
    /**
     * Writes repeated int64 values to the buffer as packed varint.
     */
    writePackedInt64(fieldNumber: number, values: Int64[]): void;
    /**
     * Writes repeated sfixed32 values to the buffer as unpacked fixed32.
     */
    writeRepeatedSfixed32(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated sfixed32 values to the buffer as packed fixed32.
     */
    writePackedSfixed32(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated sfixed64 values to the buffer as unpacked fixed64.
     */
    writeRepeatedSfixed64(fieldNumber: number, values: Int64[]): void;
    /**
     * Writes repeated sfixed64 values to the buffer as packed fixed64.
     */
    writePackedSfixed64(fieldNumber: number, values: Int64[]): void;
    /**
     * Writes repeated sint32 values to the buffer as unpacked sint32.
     */
    writeRepeatedSint32(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated sint32 values to the buffer as packed sint32.
     */
    writePackedSint32(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated sint64 values to the buffer as unpacked varint.
     */
    writeRepeatedSint64(fieldNumber: number, values: Int64[]): void;
    /**
     * Writes repeated sint64 values to the buffer as packed varint.
     */
    writePackedSint64(fieldNumber: number, values: Int64[]): void;
    /**
     * Writes repeated uint32 values to the buffer as unpacked uint32.
     */
    writeRepeatedUint32(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated uint32 values to the buffer as packed uint32.
     */
    writePackedUint32(fieldNumber: number, values: number[]): void;
    /**
     * Writes repeated bytes values to the buffer.
     */
    writeRepeatedBytes(fieldNumber: number, values: ByteString[]): void;
    /**
     * Writes repeated string values to the buffer.
     */
    writeRepeatedString(fieldNumber: number, values: string[]): void;
}
export { Writer };

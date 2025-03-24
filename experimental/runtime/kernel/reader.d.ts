import { BufferDecoder } from './buffer_decoder.js';
import { ByteString } from '../bytestring.js';
import { Int64 } from '../int64.js';
/**
 * ****************************************************************************
 * OPTIONAL FUNCTIONS
 * ****************************************************************************
 */
declare function readBool(bufferDecoder: any, start: any): void;
/**
 * Reads a ByteString value from the binary bytes.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readBytes(bufferDecoder: BufferDecoder, start: number): ByteString;
/**
 * Reads a int32 value from the binary bytes encoded as varint.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readInt32(bufferDecoder: BufferDecoder, start: number): number;
/**
 * Reads a int32 value from the binary bytes encoded as varint.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readInt64(bufferDecoder: BufferDecoder, start: number): Int64;
/**
 * Reads a fixed int32 value from the binary bytes.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readFixed32(bufferDecoder: BufferDecoder, start: number): number;
/**
 * Reads a float value from the binary bytes.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readFloat(bufferDecoder: BufferDecoder, start: number): number;
/**
 * Reads a fixed int64 value from the binary bytes.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readSfixed64(bufferDecoder: BufferDecoder, start: number): Int64;
/**
 * Reads a sint64 value from the binary bytes encoded as varint.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readSint64(bufferDecoder: BufferDecoder, start: number): Int64;
/**
 * Reads a sint32 value from the binary bytes encoded as varint.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readSint32(bufferDecoder: BufferDecoder, start: number): number;
/**
 * Read a subarray of bytes representing a length delimited field.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readDelimited(bufferDecoder: BufferDecoder, start: number): BufferDecoder;
/**
 * Reads a string value from the binary bytes.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readString(bufferDecoder: BufferDecoder, start: number): string;
/**
 * Reads a uint32 value from the binary bytes encoded as varint.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readUint32(bufferDecoder: BufferDecoder, start: number): number;
/**
 * Reads a double value from the binary bytes.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readDouble(bufferDecoder: BufferDecoder, start: number): number;
/**
 * Reads a fixed int32 value from the binary bytes.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readSfixed32(bufferDecoder: BufferDecoder, start: number): number;
/**
 * ****************************************************************************
 * REPEATED FUNCTIONS
 * ****************************************************************************
 */
declare function readPackedBool(bufferDecoder: any, start: any): void;
/**
 * Reads a packed double field, which consists of a length header and a list of
 * fixed64.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readPackedDouble(bufferDecoder: BufferDecoder, start: number): number[];
/**
 * Reads a packed fixed32 field, which consists of a length header and a list of
 * fixed32.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readPackedFixed32(bufferDecoder: BufferDecoder, start: number): number[];
/**
 * Reads a packed float field, which consists of a length header and a list of
 * fixed64.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readPackedFloat(bufferDecoder: BufferDecoder, start: number): number[];
/**
 * Reads a packed int32 field, which consists of a length header and a list of
 * varint.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readPackedInt32(bufferDecoder: BufferDecoder, start: number): number[];
/**
 * Reads a packed int64 field, which consists of a length header and a list
 * of int64.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readPackedInt64(bufferDecoder: BufferDecoder, start: number): Int64[];
/**
 * Reads a packed sfixed32 field, which consists of a length header and a list
 * of sfixed32.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readPackedSfixed32(bufferDecoder: BufferDecoder, start: number): number[];
/**
 * Reads a packed sfixed64 field, which consists of a length header and a list
 * of sfixed64.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readPackedSfixed64(bufferDecoder: BufferDecoder, start: number): Int64[];
/**
 * Reads a packed sint32 field, which consists of a length header and a list of
 * varint.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readPackedSint32(bufferDecoder: BufferDecoder, start: number): number[];
/**
 * Reads a packed sint64 field, which consists of a length header and a list
 * of sint64.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readPackedSint64(bufferDecoder: BufferDecoder, start: number): Int64[];
/**
 * Reads a packed uint32 field, which consists of a length header and a list of
 * varint.
 * @param bufferDecoder Binary format encoded bytes.
 * @param start Start of the data.
 */
declare function readPackedUint32(bufferDecoder: BufferDecoder, start: number): number[];
declare const _default: {
    readBool: typeof readBool;
    readBytes: typeof readBytes;
    readDelimited: typeof readDelimited;
    readDouble: typeof readDouble;
    readFixed32: typeof readFixed32;
    readFloat: typeof readFloat;
    readInt32: typeof readInt32;
    readInt64: typeof readInt64;
    readSint32: typeof readSint32;
    readSint64: typeof readSint64;
    readSfixed32: typeof readSfixed32;
    readSfixed64: typeof readSfixed64;
    readString: typeof readString;
    readUint32: typeof readUint32;
    readPackedBool: typeof readPackedBool;
    readPackedDouble: typeof readPackedDouble;
    readPackedFixed32: typeof readPackedFixed32;
    readPackedFloat: typeof readPackedFloat;
    readPackedInt32: typeof readPackedInt32;
    readPackedInt64: typeof readPackedInt64;
    readPackedSfixed32: typeof readPackedSfixed32;
    readPackedSfixed64: typeof readPackedSfixed64;
    readPackedSint32: typeof readPackedSint32;
    readPackedSint64: typeof readPackedSint64;
    readPackedUint32: typeof readPackedUint32;
};
export default _default;

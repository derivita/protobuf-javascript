import type { BinaryReader } from './reader.js';
import type { BinaryWriter } from './writer.js';
import type { Message } from '../message.js';

/**
 * Base interface class for all const messages.
 */
export interface ConstBinaryMessage {
    /**
     * Generate a debug string for this proto that is in proto2 text format.
     * @return The debug string.
     */
    toDebugString(): string;
    /**
     * Helper to generate a debug string for this proto at some indent level. The
     * first line is not indented.
     * @param indentLevel The number of spaces by which to indent lines.
     * @return The debug string.
     */
    toDebugStringInternal(indentLevel: number): string;
}
/**
 * Base interface class for all messages. Does __not__ define any methods, as
 * doing so on a widely-used interface defeats dead-code elimination.
 */
export interface BinaryMessage extends ConstBinaryMessage {
}
/**
 * The types convertible to Uint8Arrays. Strings are assumed to be
 * base64-encoded.
 */
export type ByteSource = ArrayBuffer | Uint8Array | number[] | string | null;
/**
 * A scalar field in jspb can be a boolean, number, or string.
 */
export type ScalarFieldType = boolean | number | string;
/**
 * A repeated field in jspb is an array of scalars, blobs, or messages.
 */
export type RepeatedFieldType = (ScalarFieldType | null)[] | Uint8Array[] | ConstBinaryMessage[] | BinaryMessage[];
/**
 * A field in jspb can be a scalar, a block of bytes, another proto, or an
 * array of any of the above.
 */
export type AnyFieldType = ScalarFieldType | RepeatedFieldType | Uint8Array | ConstBinaryMessage | BinaryMessage | null;
/**
 * A builder function creates an instance of a message object.
 */
export type BuilderFunction = () => BinaryMessage;
/**
 * A cloner function creates a deep copy of a message object.
 */
export type ClonerFunction = (m:ConstBinaryMessage|null) => (BinaryMessage | null);
/**
 * A recycler function destroys an instance of a message object.
 */
export type RecyclerFunction = (m: BinaryMessage) => void;
/**
 * A reader function initializes a message using data from a BinaryReader.
 */
export type ReaderFunction = (m: BinaryMessage, r: BinaryReader) => void;
/**
 * A writer function serializes a message to a BinaryWriter.
 */
export type WriterFunction = (m: Message|ConstBinaryMessage, w: BinaryWriter) => void;
/**
 * A pruner function removes default-valued fields and empty submessages from a
 * message and returns either the pruned message or null if the entire message
 * was pruned away.
 */
export type PrunerFunction = (m: BinaryMessage | null) => (BinaryMessage | null);
/**
 * A comparer function returns true if two protos are equal.
 */
export type ComparerFunction = (a:ConstBinaryMessage | null, b:ConstBinaryMessage | null) => boolean;
export /**
 * Field type codes, taken from proto2/public/wire_format_lite.h.
 */ type FieldType = number;
export declare const FieldType: {
    INVALID: number;
    DOUBLE: number;
    FLOAT: number;
    INT64: number;
    UINT64: number;
    INT32: number;
    FIXED64: number;
    FIXED32: number;
    BOOL: number;
    STRING: number;
    GROUP: number;
    MESSAGE: number;
    BYTES: number;
    UINT32: number;
    ENUM: number;
    SFIXED32: number;
    SFIXED64: number;
    SINT32: number;
    SINT64: number;
    FHASH64: number;
    VHASH64: number;
};
export declare const WireType: {
    INVALID: number;
    VARINT: number;
    FIXED64: number;
    DELIMITED: number;
    START_GROUP: number;
    END_GROUP: number;
    FIXED32: number;
};
export /**
 * Wire-format type codes, taken from proto2/public/wire_format_lite.h.
 */ type WireType = number;
/**
 * Translates field type to wire type.
 */
export declare function FieldTypeToWireType(fieldType: FieldType | null): WireType | null;
/**
 * Flag to indicate a missing field.
 */
export declare var INVALID_FIELD_NUMBER: number;
/**
 * The smallest denormal float32 value.
 */
export declare var FLOAT32_EPS: number;
/**
 * The smallest normal float64 value.
 */
export declare var FLOAT32_MIN: number;
/**
 * The largest finite float32 value.
 */
export declare var FLOAT32_MAX: number;
/**
 * The smallest denormal float64 value.
 */
export declare var FLOAT64_EPS: number;
/**
 * The smallest normal float64 value.
 */
export declare var FLOAT64_MIN: number;
/**
 * The largest finite float64 value.
 */
export declare var FLOAT64_MAX: number;
/**
 * Convenience constant equal to 2^20.
 */
export declare var TWO_TO_20: number;
/**
 * Convenience constant equal to 2^23.
 */
export declare var TWO_TO_23: number;
/**
 * Convenience constant equal to 2^31.
 */
export declare var TWO_TO_31: number;
/**
 * Convenience constant equal to 2^32.
 */
export declare var TWO_TO_32: number;
/**
 * Convenience constant equal to 2^52.
 */
export declare var TWO_TO_52: number;
/**
 * Convenience constant equal to 2^63.
 */
export declare var TWO_TO_63: number;
/**
 * Convenience constant equal to 2^64.
 */
export declare var TWO_TO_64: number;
/**
 * Eight-character string of zeros, used as the default 64-bit hash value.
 */
export declare var ZERO_HASH: string;

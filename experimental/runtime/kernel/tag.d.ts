import { BufferDecoder } from './buffer_decoder.js';
import { WireType } from './wire_type.js';
/**
 * Returns wire type stored in a tag.
 * Protos store the wire type as the first 3 bit of a tag.
 */
declare function tagToWireType(tag: number): WireType;
/**
 * Returns the field number stored in a tag.
 * Protos store the field number in the upper 29 bits of a 32 bit number.
 */
declare function tagToFieldNumber(tag: number): number;
/**
 * Combines wireType and fieldNumber into a tag.
 */
declare function createTag(wireType: WireType, fieldNumber: number): number;
/**
 * Returns the length, in bytes, of the field in the tag stream, less the tag
 * itself.
 * Note: This moves the cursor in the bufferDecoder.
 */
declare function getTagLength(bufferDecoder: BufferDecoder, start: number, wireType: WireType, fieldNumber: number): number;
/**
 *
 */
declare function get32BitVarintLength(value: number): number;
/**
 * Skips over a field.
 * Note: If the field is a start group the entire group will be skipped, placing
 * the cursor onto the next field.
 */
declare function skipField(bufferDecoder: BufferDecoder, wireType: WireType, fieldNumber: number): void;
declare const _default: {
    createTag: typeof createTag;
    get32BitVarintLength: typeof get32BitVarintLength;
    getTagLength: typeof getTagLength;
    skipField: typeof skipField;
    tagToWireType: typeof tagToWireType;
    tagToFieldNumber: typeof tagToFieldNumber;
};
export default _default;

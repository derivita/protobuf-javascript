import { BinaryStorage } from './binary_storage.js';
import { BufferDecoder } from './buffer_decoder.js';
import { WireType } from './wire_type.js';
import { Field } from './field.js';
/**
 * Creates an index of field locations in a given binary protobuf.
 */
declare function buildIndex(bufferDecoder: BufferDecoder, pivot: number | undefined): BinaryStorage<Field>;
declare const _default: {
    buildIndex: typeof buildIndex;
    tagToWireType: (tag: number) => WireType;
};
export default _default;

import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of packed uint32 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedUint32Pairs(): {
    'name': string;
    'uint32Values': number[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedUint32Pairs: typeof getPackedUint32Pairs;
};
export default _default;

import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of packed double values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedDoublePairs(): {
    'name': string;
    'doubleValues': number[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedDoublePairs: typeof getPackedDoublePairs;
};
export default _default;

import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of double values and their bit representation.
 * This is used to test encoding and decoding from the protobuf wire format.
 */
declare function getDoublePairs(): {
    'name': string;
    'doubleValue': number;
    'bufferDecoder': BufferDecoder;
}[];
declare const _default: {
    getDoublePairs: typeof getDoublePairs;
};
export default _default;

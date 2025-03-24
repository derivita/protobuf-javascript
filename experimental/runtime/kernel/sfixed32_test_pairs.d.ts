import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of int values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getSfixed32Pairs(): {
    'name': string;
    'intValue': number;
    'bufferDecoder': BufferDecoder;
}[];
declare const _default: {
    getSfixed32Pairs: typeof getSfixed32Pairs;
};
export default _default;

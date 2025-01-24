import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of float values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getFixed32Pairs(): {
    'name': string;
    'intValue': number;
    'bufferDecoder': BufferDecoder;
}[];
declare const _default: {
    getFixed32Pairs: typeof getFixed32Pairs;
};
export default _default;

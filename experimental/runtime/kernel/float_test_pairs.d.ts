import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of float values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getFloatPairs(): {
    'name': string;
    'floatValue': number;
    'bufferDecoder': BufferDecoder;
}[];
declare const _default: {
    getFloatPairs: typeof getFloatPairs;
};
export default _default;

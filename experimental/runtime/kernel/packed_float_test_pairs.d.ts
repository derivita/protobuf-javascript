import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of packed float values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedFloatPairs(): {
    'name': string;
    'floatValues': number[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedFloatPairs: typeof getPackedFloatPairs;
};
export default _default;

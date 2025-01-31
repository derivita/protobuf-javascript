import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of packed sint64 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedSint64Pairs(): {
    'name': string;
    'sint64Values': number[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedSint64Pairs: typeof getPackedSint64Pairs;
};
export default _default;

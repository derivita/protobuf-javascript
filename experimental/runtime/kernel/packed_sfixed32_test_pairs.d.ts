import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of packed sfixed32 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedSfixed32Pairs(): {
    'name': string;
    'sfixed32Values': number[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedSfixed32Pairs: typeof getPackedSfixed32Pairs;
};
export default _default;

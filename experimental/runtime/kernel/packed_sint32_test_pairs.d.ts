import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of packed sint32 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedSint32Pairs(): {
    'name': string;
    'sint32Values': number[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedSint32Pairs: typeof getPackedSint32Pairs;
};
export default _default;

import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of packed fixed32 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedFixed32Pairs(): {
    'name': string;
    'fixed32Values': number[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedFixed32Pairs: typeof getPackedFixed32Pairs;
};
export default _default;

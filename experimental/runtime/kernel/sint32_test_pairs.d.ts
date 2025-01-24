import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of float values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getSint32Pairs(): {
    'name': string;
    'intValue': number;
    'bufferDecoder': BufferDecoder;
    'error': boolean | null;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getSint32Pairs: typeof getSint32Pairs;
};
export default _default;

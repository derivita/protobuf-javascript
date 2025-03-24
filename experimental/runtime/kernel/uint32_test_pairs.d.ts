import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of float values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getUint32Pairs(): {
    'name': string;
    'intValue': number;
    'bufferDecoder': BufferDecoder;
    'error': boolean | undefined;
    'skip_reader': boolean | undefined;
    'skip_writer': boolean | undefined;
}[];
declare const _default: {
    getUint32Pairs: typeof getUint32Pairs;
};
export default _default;

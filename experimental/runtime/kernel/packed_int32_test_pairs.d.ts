import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of packed int32 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedInt32Pairs(): {
    'name': string;
    'int32Values': number[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedInt32Pairs: typeof getPackedInt32Pairs;
};
export default _default;

import { BufferDecoder } from './buffer_decoder.js';
import { Int64 } from '../int64.js';
/**
 * An array of Pairs of packed sfixed64 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedSfixed64Pairs(): {
    'name': string;
    'sfixed64Values': Int64[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedSfixed64Pairs: typeof getPackedSfixed64Pairs;
};
export default _default;

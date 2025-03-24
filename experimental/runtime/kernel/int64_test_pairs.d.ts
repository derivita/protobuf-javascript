import { BufferDecoder } from './buffer_decoder.js';
import { Int64 } from '../int64.js';
/**
 * An array of Pairs of float values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getInt64Pairs(): {
    'name': string;
    'longValue': Int64;
    'bufferDecoder': BufferDecoder;
    'error': boolean | null;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getInt64Pairs: typeof getInt64Pairs;
};
export default _default;

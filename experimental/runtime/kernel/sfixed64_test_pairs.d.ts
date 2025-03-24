import { BufferDecoder } from './buffer_decoder.js';
import { Int64 } from '../int64.js';
/**
 * An array of Pairs of int values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getSfixed64Pairs(): {
    'name': string;
    'longValue': Int64;
    'bufferDecoder': BufferDecoder;
}[];
declare const _default: {
    getSfixed64Pairs: typeof getSfixed64Pairs;
};
export default _default;

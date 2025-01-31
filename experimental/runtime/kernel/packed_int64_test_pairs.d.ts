import { BufferDecoder } from './buffer_decoder.js';
import { Int64 } from '../int64.js';
/**
 * An array of Pairs of packed int64 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedInt64Pairs(): {
    'name': string;
    'int64Values': Int64[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedInt64Pairs: typeof getPackedInt64Pairs;
};
export default _default;

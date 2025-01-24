import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of boolean values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getBoolPairs(): {
    'name': string;
    'boolValue': boolean;
    'bufferDecoder': BufferDecoder;
    'error': boolean | null;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getBoolPairs: typeof getBoolPairs;
};
export default _default;

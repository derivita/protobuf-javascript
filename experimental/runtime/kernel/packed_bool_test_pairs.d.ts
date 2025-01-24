import { BufferDecoder } from './buffer_decoder.js';
/**
 * An array of Pairs of packed bool values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 */
declare function getPackedBoolPairs(): {
    'name': string;
    'boolValues': boolean[];
    'bufferDecoder': BufferDecoder;
    'skip_writer': boolean | null;
}[];
declare const _default: {
    getPackedBoolPairs: typeof getPackedBoolPairs;
};
export default _default;

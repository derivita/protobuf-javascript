/**
 * Combines multiple bytes arrays (either Uint8Array or number array whose
 * values are bytes) into a single Uint8Array.
 */
declare function concatenateByteArrays(arrays: Uint8Array[] | number[][]): Uint8Array;
declare const _default: {
    concatenateByteArrays: typeof concatenateByteArrays;
};
export default _default;

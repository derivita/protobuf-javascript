/**
 *
 */
declare function arrayBufferEqual(buffer1: ArrayBuffer, buffer2: ArrayBuffer): boolean;
/**
 *
 */
declare function uint8ArrayEqual(array1: Uint8Array, array2: Uint8Array): boolean;
/**
 * ArrayBuffer.prototype.slice, but fallback to manual copy if missing.
 * @return New array buffer with given the contents of `buffer`.
 */
declare function arrayBufferSlice(buffer: ArrayBuffer, start: number, end?: number): ArrayBuffer;
/**
 * Returns a new Uint8Array with the size and contents of the given
 * ArrayBufferView. ArrayBufferView is an interface implemented by DataView,
 * Uint8Array and all typed arrays.
 */
declare function cloneArrayBufferView(view: ArrayBufferView): Uint8Array;
/**
 * Returns a 32 bit number for the corresponding Uint8Array.
 */
declare function hashUint8Array(array: Uint8Array): number;
declare const _default: {
    arrayBufferEqual: typeof arrayBufferEqual;
    uint8ArrayEqual: typeof uint8ArrayEqual;
    arrayBufferSlice: typeof arrayBufferSlice;
    cloneArrayBufferView: typeof cloneArrayBufferView;
    hashUint8Array: typeof hashUint8Array;
};
export default _default;

/**
 * Immutable sequence of bytes.
 *
 * Bytes can be obtained as an ArrayBuffer or a base64 encoded string.
 */
declare class ByteString {
    constructor(bytes: Uint8Array | null, base64: string | null);
    /**
     * Constructs a ByteString instance from a base64 string.
     */
    static fromBase64String(value: string): ByteString;
    /**
     * Constructs a ByteString from an array buffer.
     */
    static fromArrayBuffer(bytes: ArrayBuffer, start?: number, end?: number): ByteString;
    /**
     * Constructs a ByteString from any ArrayBufferView (e.g. DataView,
     * TypedArray, Uint8Array, etc.).
     */
    static fromArrayBufferView(bytes: ArrayBufferView): ByteString;
    /**
     * Returns this ByteString as an ArrayBuffer.
     */
    toArrayBuffer(): ArrayBuffer;
    /**
     * Returns this ByteString as a base64 encoded string.
     */
    toBase64String(): string;
    /**
     * Returns true for Bytestrings that contain identical values.
     */
    equals(other: any): boolean;
    /**
     * Returns a number (int32) that is suitable for using in hashed structures.
     */
    hashCode(): number;
    /**
     * Returns true if the bytestring is empty.
     */
    isEmpty(): boolean;
    static EMPTY: ByteString;
}
export { ByteString };

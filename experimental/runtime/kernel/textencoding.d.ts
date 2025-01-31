/**
 * Decodes raw bytes into a string.
 * Supports codepoints from U+0000 up to U+10FFFF.
 * (http://en.wikipedia.org/wiki/UTF-8).
 */
declare function decode(bytes: DataView): string;
/**
 * Writes a UTF16 JavaScript string to the buffer encoded as UTF8.
 * @param value The string to write.
 * @return An array containing the encoded bytes.
 */
declare function encode(value: string): Uint8Array;
declare const _default: {
    decode: typeof decode;
    encode: typeof encode;
};
export default _default;

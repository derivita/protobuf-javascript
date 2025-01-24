/**
 * Our handwritten UTF8 decoder.
 *
 * https://en.wikipedia.org/wiki/UTF-8#Encoding describes the bit layout
 *
 * https://en.wikipedia.org/wiki/UTF-8#Invalid_sequences_and_error_handling
 * describes important cases to check for which are namely:
 * - overlong encodings, meaning a value expressable in N bytes could have been
 * expressed in fewer bytes
 * - invalid bytes, meaning bytes that are generally out of range
 * - surrogate codepoints, utf8 never encodes directly a utf16 surrogate value
 * - underflow where there aren't enough bytes for the sequence we are parsing
 * - out of range codepoints.
 */
export declare function polyfillDecodeUtf8(bytes: any, offset: any, length: any, parsingErrorsAreFatal: any): string;
export declare function textDecoderDecodeUtf8(bytes: any, offset: any, length: any, parsingErrorsAreFatal: any): string;
/**
 * A utf8 decoding routine either based upon TextDecoder if available or using
 * our polyfill implementation
 */
export declare function decodeUtf8(bytes: any, offset: any, length: any, parsingErrorsAreFatal: any): string;
export declare function textEncoderEncode(s: any, rejectUnpairedSurrogates: any): Uint8Array;
export declare function polyfillEncode(s: any, rejectUnpairedSurrogates: any): Uint8Array;
/**
 * A utf8 encoding routine either based upon TextEncoder if available or using
 * our polyfill implementation
 */
export declare function encodeUtf8(string: any, rejectUnpairedSurrogates?: boolean): Uint8Array;
export declare var checkWellFormed: any;

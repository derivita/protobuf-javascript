import { ByteString } from './bytestring.js';
/**
 * Constructs a ByteString from an Uint8Array. DON'T MODIFY the underlying
 * ArrayBuffer, since the ByteString directly uses it without making a copy.
 */
declare function byteStringFromUint8ArrayUnsafe(bytes: Uint8Array): ByteString;
/**
 * Returns this ByteString as an Uint8Array. DON'T MODIFY the returned array,
 * since the ByteString holds the reference to the same array.
 */
declare function byteStringToUint8ArrayUnsafe(bytes: ByteString): Uint8Array;
export { byteStringFromUint8ArrayUnsafe, byteStringToUint8ArrayUnsafe, };

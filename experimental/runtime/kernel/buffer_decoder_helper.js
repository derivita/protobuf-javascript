/**
 * @fileoverview Helper methods to create BufferDecoders.
 */
import { BufferDecoder } from './buffer_decoder.js';

/**
 * @param {...number} bytes
 * @return {!BufferDecoder}
 */
function createBufferDecoder(...bytes) {
  return BufferDecoder.fromArrayBuffer(new Uint8Array(bytes).buffer);
}

export default {
  createBufferDecoder,
};

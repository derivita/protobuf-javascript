/**
 * @fileoverview Test data for sfixed32 encoding and decoding.
 */
import { BufferDecoder } from './buffer_decoder.js';

import bufferDecoderHelper from './buffer_decoder_helper.js';
const {createBufferDecoder} = bufferDecoderHelper;

/**
 * An array of Pairs of int values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 * @return {!Array<{name: string, intValue: number, bufferDecoder:
 *     !BufferDecoder}>}
 */
function getSfixed32Pairs() {
  const sfixed32Pairs = [
    {
      name: 'zero',
      intValue: 0,
      bufferDecoder: createBufferDecoder(0x00, 0x00, 0x00, 0x00),
    },
    {
      name: 'one',
      intValue: 1,
      bufferDecoder: createBufferDecoder(0x01, 0x00, 0x00, 0x00)
    },
    {
      name: 'minus one',
      intValue: -1,
      bufferDecoder: createBufferDecoder(0xFF, 0xFF, 0xFF, 0xFF),
    },
    {
      name: 'max int 2^31 -1',
      intValue: Math.pow(2, 31) - 1,
      bufferDecoder: createBufferDecoder(0xFF, 0xFF, 0xFF, 0x7F)
    },
    {
      name: 'min int -2^31',
      intValue: -Math.pow(2, 31),
      bufferDecoder: createBufferDecoder(0x00, 0x00, 0x00, 0x80)
    },
  ];
  return [...sfixed32Pairs];
}

export default {getSfixed32Pairs};

/**
 * @fileoverview Test data for int64 encoding and decoding.
 */
import { BufferDecoder } from './buffer_decoder.js';

import { Int64 } from '../int64.js';
import bufferDecoderHelper from './buffer_decoder_helper.js';
const {createBufferDecoder} = bufferDecoderHelper;

/**
 * An array of Pairs of float values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 * @return {!Array<{name: string, longValue: !Int64, bufferDecoder:
 *     !BufferDecoder, error: ?boolean, skip_writer: ?boolean}>}
 */
function getInt64Pairs() {
  const int64Pairs = [
    {
      name: 'zero',
      longValue: Int64.fromInt(0),
      bufferDecoder: createBufferDecoder(0x00),
    },
    {
      name: 'one ',
      longValue: Int64.fromInt(1),
      bufferDecoder: createBufferDecoder(0x01),
    },
    {
      name: 'minus one',
      longValue: Int64.fromInt(-1),
      bufferDecoder: createBufferDecoder(
          0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x01),
    },
    {
      name: 'max signed int 2^63 - 1',
      longValue: Int64.fromBits(0xFFFFFFFF, 0x7FFFFFFF),
      bufferDecoder: createBufferDecoder(
          0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F),

    },
    {
      name: 'value min signed int -2^63 (64 bit)',
      longValue: Int64.fromBits(0xFFFFFFFF, 0xFFFFFFFF),
      bufferDecoder: createBufferDecoder(
          0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x01),
    },
    {
      name: 'errors out for 11 bytes',
      longValue: Int64.fromInt(-1),
      bufferDecoder: createBufferDecoder(
          0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF),
      error: true,
      skip_writer: true,
    },
  ];
  return [...int64Pairs];
}

export default {getInt64Pairs};

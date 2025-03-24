import { BufferDecoder } from './buffer_decoder.js';
import { Int64 } from '../int64.js';
import bufferDecoderHelper from './buffer_decoder_helper.js';
const {createBufferDecoder} = bufferDecoderHelper;

/**
 * An array of Pairs of packed sfixed64 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 * @return {!Array<{name: string, sfixed64Values: !Array<!Int64>,
 *                  bufferDecoder: !BufferDecoder, skip_writer: ?boolean}>}
 */
function getPackedSfixed64Pairs() {
  return [
    {
      name: 'empty value',
      sfixed64Values: [],
      bufferDecoder: createBufferDecoder(0x00),
      skip_writer: true,
    },
    {
      name: 'single value',
      sfixed64Values: [Int64.fromInt(1)],
      bufferDecoder: createBufferDecoder(
          0x08, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00),
    },
    {
      name: 'multiple values',
      sfixed64Values: [Int64.fromInt(1), Int64.fromInt(0)],
      bufferDecoder: createBufferDecoder(
          0x10,  // length
          0x01,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,  // 1
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,  // 2
          ),
    },
  ];
}

export default {getPackedSfixed64Pairs};

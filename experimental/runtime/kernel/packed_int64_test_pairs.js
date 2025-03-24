import { BufferDecoder } from './buffer_decoder.js';
import { Int64 } from '../int64.js';
import bufferDecoderHelper from './buffer_decoder_helper.js';
const {createBufferDecoder} = bufferDecoderHelper;

/**
 * An array of Pairs of packed int64 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 * @return {!Array<{name: string, int64Values: !Array<!Int64>,
 *                  bufferDecoder: !BufferDecoder, skip_writer: ?boolean}>}
 */
function getPackedInt64Pairs() {
  return [
    {
      name: 'empty value',
      int64Values: [],
      bufferDecoder: createBufferDecoder(0x00),
      skip_writer: true,
    },
    {
      name: 'single value',
      int64Values: [Int64.fromInt(1)],
      bufferDecoder: createBufferDecoder(0x01, 0x01),
    },
    {
      name: 'multiple values',
      int64Values: [Int64.fromInt(1), Int64.fromInt(0)],
      bufferDecoder: createBufferDecoder(0x02, 0x01, 0x00),
    },
  ];
}

export default {getPackedInt64Pairs};

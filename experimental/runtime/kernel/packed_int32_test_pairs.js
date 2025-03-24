import { BufferDecoder } from './buffer_decoder.js';
import bufferDecoderHelper from './buffer_decoder_helper.js';
const {createBufferDecoder} = bufferDecoderHelper;

/**
 * An array of Pairs of packed int32 values and their bit representation.
 * This is used to test encoding and decoding from/to the protobuf wire format.
 * @return {!Array<{name: string, int32Values: !Array<number>,
 *                  bufferDecoder: !BufferDecoder, skip_writer: ?boolean}>}
 */
function getPackedInt32Pairs() {
  return [
    {
      name: 'empty value',
      int32Values: [],
      bufferDecoder: createBufferDecoder(0x00),
      skip_writer: true,
    },
    {
      name: 'single value',
      int32Values: [1],
      bufferDecoder: createBufferDecoder(0x01, 0x01),
    },
    {
      name: 'multiple values',
      int32Values: [1, 0],
      bufferDecoder: createBufferDecoder(0x02, 0x01, 0x00),
    },
  ];
}

export default {getPackedInt32Pairs};

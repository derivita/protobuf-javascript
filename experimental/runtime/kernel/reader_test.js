/**
 * @fileoverview Tests for reader.js.
 */
goog.setTestOnly();

// Note to the reader:
// Since the reader behavior changes with the checking level some of the
// tests in this file have to know which checking level is enable to make
// correct assertions.
import { BufferDecoder } from './buffer_decoder.js';

import { ByteString } from '../bytestring.js';
import reader from './reader.js';
import checks from '../internal/checks.js';
const {CHECK_CRITICAL_STATE} = checks;
import bufferDecoderHelper from './buffer_decoder_helper.js';
const {createBufferDecoder} = bufferDecoderHelper;
import textencoding from './textencoding.js';
const {encode} = textencoding;
import boolTestPairs from './bool_test_pairs.js';
const {getBoolPairs} = boolTestPairs;
import doubleTestPairs from './double_test_pairs.js';
const {getDoublePairs} = doubleTestPairs;
import fixed32TestPairs from './fixed32_test_pairs.js';
const {getFixed32Pairs} = fixed32TestPairs;
import floatTestPairs from './float_test_pairs.js';
const {getFloatPairs} = floatTestPairs;
import int32TestPairs from './int32_test_pairs.js';
const {getInt32Pairs} = int32TestPairs;
import int64TestPairs from './int64_test_pairs.js';
const {getInt64Pairs} = int64TestPairs;
import packedBoolTestPairs from './packed_bool_test_pairs.js';
const {getPackedBoolPairs} = packedBoolTestPairs;
import packedDoubleTestPairs from './packed_double_test_pairs.js';
const {getPackedDoublePairs} = packedDoubleTestPairs;
import packedFixed32TestPairs from './packed_fixed32_test_pairs.js';
const {getPackedFixed32Pairs} = packedFixed32TestPairs;
import packedFloatTestPairs from './packed_float_test_pairs.js';
const {getPackedFloatPairs} = packedFloatTestPairs;
import packedInt32TestPairs from './packed_int32_test_pairs.js';
const {getPackedInt32Pairs} = packedInt32TestPairs;
import packedInt64TestPairs from './packed_int64_test_pairs.js';
const {getPackedInt64Pairs} = packedInt64TestPairs;
import packedSfixed32TestPairs from './packed_sfixed32_test_pairs.js';
const {getPackedSfixed32Pairs} = packedSfixed32TestPairs;
import packedSfixed64TestPairs from './packed_sfixed64_test_pairs.js';
const {getPackedSfixed64Pairs} = packedSfixed64TestPairs;
import packedSint32TestPairs from './packed_sint32_test_pairs.js';
const {getPackedSint32Pairs} = packedSint32TestPairs;
import packedSint64TestPairs from './packed_sint64_test_pairs.js';
const {getPackedSint64Pairs} = packedSint64TestPairs;
import packedUint32TestPairs from './packed_uint32_test_pairs.js';
const {getPackedUint32Pairs} = packedUint32TestPairs;
import sfixed32TestPairs from './sfixed32_test_pairs.js';
const {getSfixed32Pairs} = sfixed32TestPairs;
import sfixed64TestPairs from './sfixed64_test_pairs.js';
const {getSfixed64Pairs} = sfixed64TestPairs;
import sint32TestPairs from './sint32_test_pairs.js';
const {getSint32Pairs} = sint32TestPairs;
import sint64TestPairs from './sint64_test_pairs.js';
const {getSint64Pairs} = sint64TestPairs;
import uint32TestPairs from './uint32_test_pairs.js';
const {getUint32Pairs} = uint32TestPairs;

/******************************************************************************
 *                        Optional FUNCTIONS
 ******************************************************************************/

describe('Read bool does', () => {
  for (const pair of getBoolPairs()) {
    it(`decode ${pair.name}`, () => {
      if (pair.error && CHECK_CRITICAL_STATE) {
        expect(() => reader.readBool(pair.bufferDecoder, 0)).toThrow();
      } else {
        const d = reader.readBool(
            pair.bufferDecoder, pair.bufferDecoder.startIndex());
        expect(d).toEqual(pair.boolValue);
      }
    });
  }
});

describe('readBytes does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder();
    expect(() => reader.readBytes(bufferDecoder, 0)).toThrow();
  });

  it('read bytes by index', () => {
    const bufferDecoder = createBufferDecoder(3, 1, 2, 3);
    const byteString = reader.readBytes(bufferDecoder, 0);
    expect(ByteString.fromArrayBuffer(new Uint8Array([1, 2, 3]).buffer))
        .toEqual(byteString);
  });
});

describe('readDouble does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder();
    expect(() => reader.readDouble(bufferDecoder, 0)).toThrow();
  });

  for (const pair of getDoublePairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readDouble(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.doubleValue);
    });
  }
});

describe('readFixed32 does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder();
    expect(() => reader.readFixed32(bufferDecoder, 0)).toThrow();
  });

  for (const pair of getFixed32Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readFixed32(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.intValue);
    });
  }
});

describe('readFloat does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder();
    expect(() => reader.readFloat(bufferDecoder, 0)).toThrow();
  });

  for (const pair of getFloatPairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readFloat(pair.bufferDecoder, 0);
      expect(d).toEqual(Math.fround(pair.floatValue));
    });
  }
});

describe('readInt32 does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder(0x80);
    expect(() => reader.readInt32(bufferDecoder, 0)).toThrow();
  });

  for (const pair of getInt32Pairs()) {
    it(`decode ${pair.name}`, () => {
      if (pair.error && CHECK_CRITICAL_STATE) {
        expect(() => reader.readInt32(pair.bufferDecoder, 0)).toThrow();
      } else {
        const d = reader.readInt32(pair.bufferDecoder, 0);
        expect(d).toEqual(pair.intValue);
      }
    });
  }
});

describe('readSfixed32 does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder(0x80);
    expect(() => reader.readSfixed32(bufferDecoder, 0)).toThrow();
  });

  for (const pair of getSfixed32Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readSfixed32(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.intValue);
    });
  }
});

describe('readSfixed64 does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder(0x80);
    expect(() => reader.readSfixed64(bufferDecoder, 0)).toThrow();
  });

  for (const pair of getSfixed64Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readSfixed64(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.longValue);
    });
  }
});

describe('readSint32 does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder(0x80);
    expect(() => reader.readSint32(bufferDecoder, 0)).toThrow();
  });

  for (const pair of getSint32Pairs()) {
    it(`decode ${pair.name}`, () => {
      if (pair.error && CHECK_CRITICAL_STATE) {
        expect(() => reader.readSint32(pair.bufferDecoder, 0)).toThrow();
      } else {
        const d = reader.readSint32(pair.bufferDecoder, 0);
        expect(d).toEqual(pair.intValue);
      }
    });
  }
});

describe('readInt64 does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder(0x80);
    expect(() => reader.readInt64(bufferDecoder, 0)).toThrow();
  });

  for (const pair of getInt64Pairs()) {
    it(`decode ${pair.name}`, () => {
      if (pair.error && CHECK_CRITICAL_STATE) {
        expect(() => reader.readInt64(pair.bufferDecoder, 0)).toThrow();
      } else {
        const d = reader.readInt64(pair.bufferDecoder, 0);
        expect(d).toEqual(pair.longValue);
      }
    });
  }
});

describe('readSint64 does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder(0x80);
    expect(() => reader.readSint64(bufferDecoder, 0)).toThrow();
  });

  for (const pair of getSint64Pairs()) {
    it(`decode ${pair.name}`, () => {
      if (pair.error && CHECK_CRITICAL_STATE) {
        expect(() => reader.readSint64(pair.bufferDecoder, 0)).toThrow();
      } else {
        const d = reader.readSint64(pair.bufferDecoder, 0);
        expect(d).toEqual(pair.longValue);
      }
    });
  }
});

describe('readUint32 does', () => {
  it('throw exception if data is too short', () => {
    const bufferDecoder = createBufferDecoder(0x80);
    expect(() => reader.readUint32(bufferDecoder, 0)).toThrow();
  });

  for (const pair of getUint32Pairs()) {
    if (!pair.skip_reader) {
      it(`decode ${pair.name}`, () => {
        if (pair.error && CHECK_CRITICAL_STATE) {
          expect(() => reader.readUint32(pair.bufferDecoder, 0)).toThrow();
        } else {
          const d = reader.readUint32(pair.bufferDecoder, 0);
          expect(d).toEqual(pair.intValue);
        }
      });
    }
  }
});

/**
 *
 * @param {string} s
 * @return {!Uint8Array}
 */
function encodeString(s) {
  if (typeof TextEncoder !== 'undefined') {
    const textEncoder = new TextEncoder('utf-8');
    return textEncoder.encode(s);
  } else {
    return encode(s);
  }
}

/** @param {string} s */
function expectEncodedStringToMatch(s) {
  const array = encodeString(s);
  const length = array.length;
  if (length > 127) {
    throw new Error('Test only works for strings shorter than 128');
  }
  const encodedArray = new Uint8Array(length + 1);
  encodedArray[0] = length;
  encodedArray.set(array, 1);
  const bufferDecoder = BufferDecoder.fromArrayBuffer(encodedArray.buffer);
  expect(reader.readString(bufferDecoder, 0)).toEqual(s);
}

describe('readString does', () => {
  it('return empty string for zero length string', () => {
    const s = reader.readString(createBufferDecoder(0x00), 0);
    expect(s).toEqual('');
  });

  it('decode random strings', () => {
    // 1 byte strings
    expectEncodedStringToMatch('hello');
    expectEncodedStringToMatch('HELLO1!');

    // 2 byte String
    expectEncodedStringToMatch('©');

    // 3 byte string
    expectEncodedStringToMatch('❄');

    // 4 byte string
    expectEncodedStringToMatch('😁');
  });

  it('decode 1 byte strings', () => {
    for (let i = 0; i < 0x80; i++) {
      const s = String.fromCharCode(i);
      expectEncodedStringToMatch(s);
    }
  });

  it('decode 2 byte strings', () => {
    for (let i = 0xC0; i < 0x7FF; i++) {
      const s = String.fromCharCode(i);
      expectEncodedStringToMatch(s);
    }
  });

  it('decode 3 byte strings', () => {
    for (let i = 0x7FF; i < 0x8FFF; i++) {
      const s = String.fromCharCode(i);
      expectEncodedStringToMatch(s);
    }
  });

  it('throw exception on invalid bytes', () => {
    // This test will only succeed with the native TextDecoder since
    // our polyfill does not do any validation. IE10 and IE11 don't support
    // TextDecoder.
    // TODO: Remove this check once we no longer need to support IE
    if (typeof TextDecoder !== 'undefined') {
      expect(
          () => reader.readString(
              createBufferDecoder(0x01, /* invalid utf data point*/ 0xFF), 0))
          .toThrow();
    }
  });

  it('throw exception if data is too short', () => {
    const array = createBufferDecoder(0x02, '?'.charCodeAt(0));
    expect(() => reader.readString(array, 0)).toThrow();
  });
});

/******************************************************************************
 *                        REPEATED FUNCTIONS
 ******************************************************************************/

describe('readPackedBool does', () => {
  for (const pair of getPackedBoolPairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedBool(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.boolValues);
    });
  }
});

describe('readPackedDouble does', () => {
  for (const pair of getPackedDoublePairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedDouble(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.doubleValues);
    });
  }
});

describe('readPackedFixed32 does', () => {
  for (const pair of getPackedFixed32Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedFixed32(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.fixed32Values);
    });
  }
});

describe('readPackedFloat does', () => {
  for (const pair of getPackedFloatPairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedFloat(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.floatValues);
    });
  }
});

describe('readPackedInt32 does', () => {
  for (const pair of getPackedInt32Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedInt32(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.int32Values);
    });
  }
});

describe('readPackedInt64 does', () => {
  for (const pair of getPackedInt64Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedInt64(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.int64Values);
    });
  }
});

describe('readPackedSfixed32 does', () => {
  for (const pair of getPackedSfixed32Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedSfixed32(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.sfixed32Values);
    });
  }
});

describe('readPackedSfixed64 does', () => {
  for (const pair of getPackedSfixed64Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedSfixed64(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.sfixed64Values);
    });
  }
});

describe('readPackedSint32 does', () => {
  for (const pair of getPackedSint32Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedSint32(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.sint32Values);
    });
  }
});

describe('readPackedSint64 does', () => {
  for (const pair of getPackedSint64Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedSint64(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.sint64Values);
    });
  }
});

describe('readPackedUint32 does', () => {
  for (const pair of getPackedUint32Pairs()) {
    it(`decode ${pair.name}`, () => {
      const d = reader.readPackedUint32(pair.bufferDecoder, 0);
      expect(d).toEqual(pair.uint32Values);
    });
  }
});

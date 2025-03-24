import { ByteString } from '../bytestring.js';
declare class BufferDecoder {
    static merge(bufferDecoders: BufferDecoder[]): BufferDecoder;
    static fromArrayBuffer(arrayBuffer: ArrayBuffer): BufferDecoder;
    constructor(dataView: DataView, startIndex: number, length: number);
    /**
     * Returns the start index of the underlying buffer.
     */
    startIndex(): number;
    /**
     * Returns the end index of the underlying buffer.
     */
    endIndex(): number;
    /**
     * Returns the length of the underlying buffer.
     */
    length(): number;
    /**
     * Returns the start position of the next data, i.e. end position of the last
     * read data + 1.
     */
    cursor(): number;
    /**
     * Sets the cursor to the specified position.
     */
    setCursor(position: number): void;
    /**
     * Returns if there is more data to read after the current cursor position.
     */
    hasNext(): boolean;
    /**
     * Returns a float32 from a given index
     */
    getFloat32(index: number): number;
    /**
     * Returns a float64 from a given index
     */
    getFloat64(index: number): number;
    /**
     * Returns an int32 from a given index
     */
    getInt32(index: number): number;
    /**
     * Returns a uint32 from a given index
     */
    getUint32(index: number): number;
    /**
     * Returns two JS numbers each representing 32 bits of a 64 bit number. Also
     * sets the cursor to the start of the next block of data.
     */
    getVarint(index: number): {
        'lowBits': number;
        'highBits': number;
    };
    /**
     * Returns an unsigned int32 number at the current cursor position. The upper
     * bits are discarded if the varint is longer than 32 bits. Also sets the
     * cursor to the start of the next block of data.
     */
    getUnsignedVarint32(): number;
    /**
     * Returns an unsigned int32 number at the specified index. The upper bits are
     * discarded if the varint is longer than 32 bits. Also sets the cursor to the
     * start of the next block of data.
     */
    getUnsignedVarint32At(index: number): number;
    subBufferDecoder(startIndex: number, length: number): BufferDecoder;
    /**
     * Returns the buffer as a string.
     */
    asString(): string;
    /**
     * Returns the buffer as a ByteString.
     */
    asByteString(): ByteString;
}
export { BufferDecoder };

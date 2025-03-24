import { WireType } from './wire_type.js';
/**
 * An IndexEntry consists of the wire type and the position of a field in the
 * binary data. The wire type and the position are encoded into a single number
 * to save memory, which can be decoded using Field.getWireType() and
 * Field.getStartIndex() methods.
 */
export type IndexEntry = number;
/**
 * An entry containing the index into the binary data and/or the corresponding
 * cached JS object(s) for a field.
 */
export declare class Field<T = any> {
    /**
     * Creates a field and inserts the wireType and position of the first
     * occurrence of a field.
     */
    static fromFirstIndexEntry(wireType: WireType, startIndex: number): Field;
    static fromDecodedValue<T = any>(decodedValue: T | null, encoder: any): Field;
    static encodeIndexEntry(wireType: WireType, startIndex: number): IndexEntry;
    static getWireType(indexEntry: IndexEntry): WireType;
    static getStartIndex(indexEntry: IndexEntry): number;
    constructor(indexArray: IndexEntry[] | null, decodedValue?: T | null, encoder?: any);
    /**
     * Adds a new IndexEntry.
     */
    addIndexEntry(wireType: WireType, startIndex: number): void;
    /**
     * Returns the array of IndexEntry.
     */
    getIndexArray(): IndexEntry[] | null;
    /**
     * Caches the decoded value and sets the write function to encode cache into
     * binary bytes.
     */
    setCache(decodedValue: T | null, encoder: any): void;
    /**
     * If the decoded value has been set.
     */
    hasDecodedValue(): boolean;
    /**
     * Returns the cached decoded value. The value needs to be set when this
     * method is called.
     */
    getDecodedValue(): T | null;
    /**
     * Returns the write function to encode cache into binary bytes.
     */
    getEncoder(): (() => any) | undefined;
    /**
     * Returns a copy of the field, containing the original index entries and a
     * shallow copy of the cache.
     */
    shallowCopy(): Field;
}

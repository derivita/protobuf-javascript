import { BinaryReader } from './binary/reader.js';
import { BinaryWriter } from './binary/writer.js';
/**
 * Constructs a new Map. A Map is a container that is used to implement map
 * fields on message objects. It closely follows the ES6 Map API; however,
 * it is distinct because we do not want to depend on external polyfills or
 * on ES6 itself.
 *
 * This constructor should only be called from generated message code. It is not
 * intended for general use by library consumers.
 */
export declare class Map<K = any, V = any> {
    /**
     * Constructs a new Map. A Map is a container that is used to implement map
     * fields on message objects. It closely follows the ES6 Map API; however,
     * it is distinct because we do not want to depend on external polyfills or
     * on ES6 itself.
     *
     * This constructor should only be called from generated message code. It is not
     * intended for general use by library consumers.
     * @param opt_valueCtor The constructor for type V, if type V is a message type.
     */
    constructor(arr: any[][], opt_valueCtor?: {
        new (): V | null;
    });
    private noStructuralTyping____protobuf_javascript_map_Map;
    /**
     * Is `this.arr_ updated with respect to `this.map_`?
     */
    arrClean: boolean;
    /**
     * Synchronize content to underlying array, if needed, and return it.
     */
    toArray(): object[][];
    /**
     * Returns the map formatted as an array of key-value pairs, suitable for the
     * toObject() form of a message.
     * @param includeInstance Whether to include the JSPB instance for transitional soy proto support: http://goto/soy-param-migration
     * @param valueToObject The static toObject() method, if V is a message type.
     */
    toObject(includeInstance?: boolean, valueToObject?: () => object): object[][];
    /**
     * Returns a Map from the given array of key-value pairs when the values are of
     * message type. The values in the array must match the format returned by their
     * message type's toObject() method.
     * @param valueCtor The constructor for type V.
     * @param valueFromObject The fromObject function for type V.
     */
    static fromObject<K = any, V = any>(entries: object[][], valueCtor: {
        new (): V | null;
    }, valueFromObject: () => (V | null)): Map<K | null, V | null>;
    /**
     * Returns the map's length (number of key/value pairs).
     */
    getLength(): number;
    /**
     * Clears the map.
     */
    clear(): void;
    /**
     * Deletes a particular key from the map.
     * N.B.: differs in name from ES6 Map's `delete` because IE8 does not support
     * reserved words as property names.
     * @return Whether any entry with this key was deleted.
     */
    del(this: Map, key: K | null): boolean;
    /**
     * Returns an array of [key, value] pairs in the map.
     *
     * This is redundant compared to the plain entries() method, but we provide this
     * to help out Angular 1.x users.  Still evaluating whether this is the best
     * option.
     */
    getEntryList(): (K | V | null)[][];
    /**
     * Returns an iterator-iterable over [key, value] pairs in the map.
     * Closure compiler sadly doesn't support tuples, ie. Iterator<[K,V]>.
     * @return The iterator-iterable.
     */
    entries(): IterableIterator<(K | V | null)[]>;
    /**
     * Returns an iterator-iterable over keys in the map.
     * @return The iterator-iterable.
     */
    keys(): IterableIterator<K | null>;
    /**
     * Returns an iterator-iterable over values in the map.
     * @return The iterator-iterable.
     */
    values(): IterableIterator<V | null>;
    /**
     * Iterates over entries in the map, calling a function on each.
     */
    forEach<T = any>(cb: (this: T | null) => any, opt_thisArg?: T | null): void;
    /**
     * Sets a key in the map to the given value.
     * @param key The key
     * @param value The value
     */
    set(key: K | null, value: V | null): Map<K | null, V | null>;
    /**
     * Gets the value corresponding to a key in the map.
     * @return The value, or `undefined` if key not present
     */
    get(key: K | null): V | undefined | null;
    /**
     * Determines whether the given key is present in the map.
     * @return `true` if the key is present
     */
    has(key: K | null): boolean;
    /**
     * Write this Map field in wire format to a BinaryWriter, using the given field
     * number.
     * @param keyWriterFn The method on BinaryWriter that writes type K to the stream.
     * @param valueWriterFn The method on BinaryWriter that writes type V to the stream.  May be writeMessage, in which case the second callback arg form is used.
     * @param opt_valueWriterCallback The BinaryWriter serialization callback for type V, if V is a message type.
     */
    serializeBinary(fieldNumber: number, writer: BinaryWriter, keyWriterFn: (this: BinaryWriter | null) => any, valueWriterFn: ((this: BinaryWriter | null) => any) | ((this: BinaryWriter | null) => any), opt_valueWriterCallback?: () => any): void;
    /**
     * Read one key/value message from the given BinaryReader. Compatible as the
     * `reader` callback parameter to BinaryReader.readMessage, to be called
     * when a key/value pair submessage is encountered. If the Key is undefined,
     * we should default it to 0.
     * @param keyReaderFn The method on BinaryReader that reads type K from the stream.
     * @param valueReaderFn The method on BinaryReader that reads type V from the stream. May be readMessage, in which case the second callback arg form is used.
     * @param opt_valueReaderCallback The BinaryReader parsing callback for type V, if V is a message type
     * @param opt_defaultKey The default value for the type of map keys. Accepting map entries with unset keys is required for maps to be backwards compatible with the repeated message representation described here: goo.gl/zuoLAC
     * @param opt_defaultValue The default value for the type of map values. Accepting map entries with unset values is required for maps to be backwards compatible with the repeated message representation described here: goo.gl/zuoLAC
     */
    static deserializeBinary<K = any, V = any>(map: Map, reader: BinaryReader, keyReaderFn: (this: BinaryReader | null) => (K | null), valueReaderFn: ((this: BinaryReader | null) => (V | null)) | ((this: BinaryReader | null) => any), opt_valueReaderCallback?: (() => any) | null, opt_defaultKey?: K | null, opt_defaultValue?: V | null): void;
}
export declare namespace Map {
    /**
     * Helper: an IteratorIterable over an array.
     */
    class ArrayIteratorIterable_<T = any> implements IterableIterator<T | null> {
        /**
         * Helper: an IteratorIterable over an array.
         * @param arr the array
         */
        constructor(arr: (T | null)[]);
        private noStructuralTyping____protobuf_javascript_map_ArrayIteratorIterable_;
        next(): any;
        [Symbol.iterator](): this;
    }
    class Entry_<K = any, V = any> {
        /**
         *
         * @param key The entry's key.
         * @param opt_value The entry's value wrapper.
         */
        constructor(key: K | null, opt_value?: V | null);
        private noStructuralTyping____protobuf_javascript_map_Entry_;
        key: K | null;
        value: V | null;
        valueWrapper: V | null;
    }
}

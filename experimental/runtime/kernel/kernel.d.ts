import { BufferDecoder } from './buffer_decoder.js';
import { ByteString } from '../bytestring.js';
import { Int64 } from '../int64.js';
import { InternalMessage } from './internal_message.js';
import { Storage } from './storage.js';
import { Field } from './field.js';
/**
 * Accesses protobuf fields on binary format data. Binary data is decoded lazily
 * at the first access.
 */
declare class Kernel {
    /**
     * Create a Kernel for the given binary bytes.
     * The bytes array is kept by the Kernel. DON'T MODIFY IT.
     */
    static fromArrayBuffer(arrayBuffer: ArrayBuffer, pivot?: number): Kernel;
    /**
     * Creates an empty Kernel.
     */
    static createEmpty(pivot?: number): Kernel;
    constructor(bufferDecoder: BufferDecoder | null, fields: Storage<Field>);
    /**
     * Creates a shallow copy of the accessor.
     */
    shallowCopy(): Kernel;
    /**
     * See definition of the pivot parameter on the fromArrayBuffer() method.
     */
    getPivot(): number;
    /**
     * Clears the field for the given field number.
     */
    clearField(fieldNumber: number): void;
    /**
     * Serializes internal contents to binary format bytes array.
     */
    serialize(): ArrayBuffer;
    /**
     * Returns whether data exists at the given field number.
     */
    hasFieldNumber(fieldNumber: number): boolean;
    /**
     * *************************************************************************
     * OPTIONAL GETTER METHODS
     * *************************************************************************
     */
    getBoolWithDefault(fieldNumber: any, defaultValue?: boolean): void;
    /**
     * Returns data as a ByteString for the given field number.
     * If no default is given, use false as the default.
     */
    getBytesWithDefault(fieldNumber: number, defaultValue?: ByteString): ByteString;
    /**
     * Returns a double for the given field number.
     * If no default is given uses zero as the default.
     */
    getDoubleWithDefault(fieldNumber: number, defaultValue?: number): number;
    /**
     * Returns a fixed32 for the given field number.
     * If no default is given zero as the default.
     */
    getFixed32WithDefault(fieldNumber: number, defaultValue?: number): number;
    /**
     * Returns a fixed64 for the given field number.
     * Note: Since g.m.Long does not support unsigned int64 values we are going
     * the Java route here for now and simply output the number as a signed int64.
     * Users can get to individual bits by themselves.
     */
    getFixed64WithDefault(fieldNumber: number, defaultValue?: Int64): Int64;
    /**
     * Returns a float for the given field number.
     * If no default is given zero as the default.
     */
    getFloatWithDefault(fieldNumber: number, defaultValue?: number): number;
    /**
     * Returns a int32 for the given field number.
     * If no default is given zero as the default.
     */
    getInt32WithDefault(fieldNumber: number, defaultValue?: number): number;
    /**
     * Returns a int64 for the given field number.
     * If no default is given zero as the default.
     */
    getInt64WithDefault(fieldNumber: number, defaultValue?: Int64): Int64;
    /**
     * Returns a sfixed32 for the given field number.
     * If no default is given zero as the default.
     */
    getSfixed32WithDefault(fieldNumber: number, defaultValue?: number): number;
    /**
     * Returns a sfixed64 for the given field number.
     * If no default is given zero as the default.
     */
    getSfixed64WithDefault(fieldNumber: number, defaultValue?: Int64): Int64;
    /**
     * Returns a sint32 for the given field number.
     * If no default is given zero as the default.
     */
    getSint32WithDefault(fieldNumber: number, defaultValue?: number): number;
    /**
     * Returns a sint64 for the given field number.
     * If no default is given zero as the default.
     */
    getSint64WithDefault(fieldNumber: number, defaultValue?: Int64): Int64;
    /**
     * Returns a string for the given field number.
     * If no default is given uses empty string as the default.
     */
    getStringWithDefault(fieldNumber: number, defaultValue?: string): string;
    /**
     * Returns a uint32 for the given field number.
     * If no default is given zero as the default.
     */
    getUint32WithDefault(fieldNumber: number, defaultValue?: number): number;
    /**
     * Returns a uint64 for the given field number.
     * Note: Since g.m.Long does not support unsigned int64 values we are going
     * the Java route here for now and simply output the number as a signed int64.
     * Users can get to individual bits by themselves.
     */
    getUint64WithDefault(fieldNumber: number, defaultValue?: Int64): Int64;
    /**
     * Returns data as a mutable proto Message for the given field number.
     * If no value has been set, return null.
     * If hasFieldNumber(fieldNumber) == false before calling, it remains false.
     *
     * This method should not be used along with getMessage, since calling
     * getMessageOrNull after getMessage will not register the encoder.
     */
    getMessageOrNull<T = any>(fieldNumber: number, instanceCreator: () => (T | null), pivot?: number): T | null;
    /**
     * Returns data as a mutable proto Message for the given field number.
     * If no value has been set, return null.
     * If hasFieldNumber(fieldNumber) == false before calling, it remains false.
     *
     * This method should not be used along with getMessage, since calling
     * getMessageOrNull after getMessage will not register the encoder.
     */
    getGroupOrNull<T = any>(fieldNumber: number, instanceCreator: () => (T | null), pivot?: number): T | null;
    /**
     * Returns data as a mutable proto Message for the given field number.
     * If no value has been set previously, creates and attaches an instance.
     * Postcondition: hasFieldNumber(fieldNumber) == true.
     *
     * This method should not be used along with getMessage, since calling
     * getMessageAttach after getMessage will not register the encoder.
     */
    getMessageAttach<T = any>(fieldNumber: number, instanceCreator: () => (T | null), pivot?: number): T | null;
    /**
     * Returns data as a mutable proto Message for the given field number.
     * If no value has been set previously, creates and attaches an instance.
     * Postcondition: hasFieldNumber(fieldNumber) == true.
     *
     * This method should not be used along with getMessage, since calling
     * getMessageAttach after getMessage will not register the encoder.
     */
    getGroupAttach<T = any>(fieldNumber: number, instanceCreator: () => (T | null), pivot?: number): T | null;
    /**
     * Returns data as a proto Message for the given field number.
     * If no value has been set, return a default instance.
     * This default instance is guaranteed to be the same instance, unless this
     * field is cleared.
     * Does not register the encoder, so changes made to the returned
     * sub-message will not be included when serializing the parent message.
     * Use getMessageAttach() if the resulting sub-message should be mutable.
     *
     * This method should not be used along with getMessageOrNull or
     * getMessageAttach, since these methods register the encoder.
     */
    getMessage<T = any>(fieldNumber: number, instanceCreator: () => (T | null), pivot?: number): T | null;
    /**
     * Returns data as a proto Message for the given field number.
     * If no value has been set, return a default instance.
     * This default instance is guaranteed to be the same instance, unless this
     * field is cleared.
     * Does not register the encoder, so changes made to the returned
     * sub-message will not be included when serializing the parent message.
     * Use getMessageAttach() if the resulting sub-message should be mutable.
     *
     * This method should not be used along with getMessageOrNull or
     * getMessageAttach, since these methods register the encoder.
     */
    getGroup<T = any>(fieldNumber: number, instanceCreator: () => (T | null), pivot?: number): T | null;
    /**
     * Returns the accessor for the given singular message, or returns null if
     * it hasn't been set.
     */
    getMessageAccessorOrNull(fieldNumber: number, pivot?: number): Kernel | null;
    /**
     * *************************************************************************
     * REPEATED GETTER METHODS
     * *************************************************************************
     */
    getRepeatedBoolArray_(fieldNumber: any): void;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedBoolElement(fieldNumber: number, index: number): boolean;
    /**
     * Returns an Iterable instance containing boolean values for the given field
     * number.
     */
    getRepeatedBoolIterable(fieldNumber: number): Iterable<boolean>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedBoolSize(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedDoubleElement(fieldNumber: number, index: number): number;
    /**
     * Returns an Iterable instance containing double values for the given field
     * number.
     */
    getRepeatedDoubleIterable(fieldNumber: number): Iterable<number>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedDoubleSize(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedFixed32Element(fieldNumber: number, index: number): number;
    /**
     * Returns an Iterable instance containing fixed32 values for the given field
     * number.
     */
    getRepeatedFixed32Iterable(fieldNumber: number): Iterable<number>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedFixed32Size(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedFixed64Element(fieldNumber: number, index: number): Int64;
    /**
     * Returns an Iterable instance containing fixed64 values for the given field
     * number.
     */
    getRepeatedFixed64Iterable(fieldNumber: number): Iterable<Int64>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedFixed64Size(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedFloatElement(fieldNumber: number, index: number): number;
    /**
     * Returns an Iterable instance containing float values for the given field
     * number.
     */
    getRepeatedFloatIterable(fieldNumber: number): Iterable<number>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedFloatSize(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedInt32Element(fieldNumber: number, index: number): number;
    /**
     * Returns an Iterable instance containing int32 values for the given field
     * number.
     */
    getRepeatedInt32Iterable(fieldNumber: number): Iterable<number>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedInt32Size(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedInt64Element(fieldNumber: number, index: number): Int64;
    /**
     * Returns an Iterable instance containing int64 values for the given field
     * number.
     */
    getRepeatedInt64Iterable(fieldNumber: number): Iterable<Int64>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedInt64Size(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedSfixed32Element(fieldNumber: number, index: number): number;
    /**
     * Returns an Iterable instance containing sfixed32 values for the given field
     * number.
     */
    getRepeatedSfixed32Iterable(fieldNumber: number): Iterable<number>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedSfixed32Size(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedSfixed64Element(fieldNumber: number, index: number): Int64;
    /**
     * Returns an Iterable instance containing sfixed64 values for the given field
     * number.
     */
    getRepeatedSfixed64Iterable(fieldNumber: number): Iterable<Int64>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedSfixed64Size(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedSint32Element(fieldNumber: number, index: number): number;
    /**
     * Returns an Iterable instance containing sint32 values for the given field
     * number.
     */
    getRepeatedSint32Iterable(fieldNumber: number): Iterable<number>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedSint32Size(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedSint64Element(fieldNumber: number, index: number): Int64;
    /**
     * Returns an Iterable instance containing sint64 values for the given field
     * number.
     */
    getRepeatedSint64Iterable(fieldNumber: number): Iterable<Int64>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedSint64Size(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedUint32Element(fieldNumber: number, index: number): number;
    /**
     * Returns an Iterable instance containing uint32 values for the given field
     * number.
     */
    getRepeatedUint32Iterable(fieldNumber: number): Iterable<number>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedUint32Size(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number.
     */
    getRepeatedUint64Element(fieldNumber: number, index: number): Int64;
    /**
     * Returns an Iterable instance containing uint64 values for the given field
     * number.
     */
    getRepeatedUint64Iterable(fieldNumber: number): Iterable<Int64>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedUint64Size(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number as a bytes.
     */
    getRepeatedBytesElement(fieldNumber: number, index: number): ByteString;
    /**
     * Returns an Iterable instance containing bytes values for the given field
     * number.
     */
    getRepeatedBytesIterable(fieldNumber: number): Iterable<ByteString>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedBytesSize(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number as a string.
     */
    getRepeatedStringElement(fieldNumber: number, index: number): string;
    /**
     * Returns an Iterable instance containing string values for the given field
     * number.
     */
    getRepeatedStringIterable(fieldNumber: number): Iterable<string>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedStringSize(fieldNumber: number): number;
    /**
     * Returns the element at index for the given field number as a message.
     */
    getRepeatedMessageElement<T = any>(fieldNumber: number, instanceCreator: () => (T | null), index: number, pivot?: number): T | null;
    /**
     * Returns an Iterable instance containing message values for the given field
     * number.
     */
    getRepeatedMessageIterable<T = any>(fieldNumber: number, instanceCreator: () => (T | null), pivot?: number): Iterable<T | null>;
    /**
     * Returns an Iterable instance containing message accessors for the given
     * field number.
     */
    getRepeatedMessageAccessorIterable(fieldNumber: number, pivot?: number): Iterable<Kernel>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedMessageSize<T = any>(fieldNumber: number, instanceCreator: () => (T | null), pivot?: number): number;
    /**
     * Returns the element at index for the given field number as a group.
     */
    getRepeatedGroupElement<T = any>(fieldNumber: number, instanceCreator: () => (T | null), index: number, pivot?: number): T | null;
    /**
     * Returns an Iterable instance containing group values for the given field
     * number.
     */
    getRepeatedGroupIterable<T = any>(fieldNumber: number, instanceCreator: () => (T | null), pivot?: number): Iterable<T | null>;
    /**
     * Returns the size of the repeated field.
     */
    getRepeatedGroupSize<T = any>(fieldNumber: number, instanceCreator: () => (T | null), pivot?: number): number;
    /**
     * *************************************************************************
     * OPTIONAL SETTER METHODS
     * *************************************************************************
     */
    setBool(fieldNumber: any, value: any): void;
    /**
     * Sets a boolean value to the field with the given field number.
     */
    setBytes(fieldNumber: number, value: ByteString): void;
    /**
     * Sets a double value to the field with the given field number.
     */
    setDouble(fieldNumber: number, value: number): void;
    /**
     * Sets a fixed32 value to the field with the given field number.
     */
    setFixed32(fieldNumber: number, value: number): void;
    /**
     * Sets a uint64 value to the field with the given field number.\
     * Note: Since g.m.Long does not support unsigned int64 values we are going
     * the Java route here for now and simply output the number as a signed int64.
     * Users can get to individual bits by themselves.
     */
    setFixed64(fieldNumber: number, value: Int64): void;
    /**
     * Sets a float value to the field with the given field number.
     */
    setFloat(fieldNumber: number, value: number): void;
    /**
     * Sets a int32 value to the field with the given field number.
     */
    setInt32(fieldNumber: number, value: number): void;
    /**
     * Sets a int64 value to the field with the given field number.
     */
    setInt64(fieldNumber: number, value: Int64): void;
    /**
     * Sets a sfixed32 value to the field with the given field number.
     */
    setSfixed32(fieldNumber: number, value: number): void;
    /**
     * Sets a sfixed64 value to the field with the given field number.
     */
    setSfixed64(fieldNumber: number, value: Int64): void;
    /**
     * Sets a sint32 value to the field with the given field number.
     */
    setSint32(fieldNumber: number, value: number): void;
    /**
     * Sets a sint64 value to the field with the given field number.
     */
    setSint64(fieldNumber: number, value: Int64): void;
    /**
     * Sets a boolean value to the field with the given field number.
     */
    setString(fieldNumber: number, value: string): void;
    /**
     * Sets a uint32 value to the field with the given field number.
     */
    setUint32(fieldNumber: number, value: number): void;
    /**
     * Sets a uint64 value to the field with the given field number.\
     * Note: Since g.m.Long does not support unsigned int64 values we are going
     * the Java route here for now and simply output the number as a signed int64.
     * Users can get to individual bits by themselves.
     */
    setUint64(fieldNumber: number, value: Int64): void;
    /**
     * Sets a proto Group to the field with the given field number.
     * Instead of working with the Kernel inside of the message directly, we
     * need the message instance to keep its reference equality for subsequent
     * gettings.
     */
    setGroup(fieldNumber: number, value: InternalMessage): void;
    /**
     * Sets a proto Message to the field with the given field number.
     * Instead of working with the Kernel inside of the message directly, we
     * need the message instance to keep its reference equality for subsequent
     * gettings.
     */
    setMessage(fieldNumber: number, value: InternalMessage): void;
    /**
     * *************************************************************************
     * REPEATED SETTER METHODS
     * *************************************************************************
     */
    addRepeatedBoolIterable_(fieldNumber: any, values: any, encoder: any): void;
    /**
     * Adds a single boolean value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedBoolElement(fieldNumber: number, value: boolean): void;
    /**
     * Adds all boolean values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedBoolIterable(fieldNumber: number, values: Iterable<boolean>): void;
    /**
     * Adds a single boolean value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedBoolElement(fieldNumber: number, value: boolean): void;
    /**
     * Adds all boolean values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedBoolIterable(fieldNumber: number, values: Iterable<boolean>): void;
    /**
     * Sets a single boolean value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedBoolElement(fieldNumber: number, index: number, value: boolean): void;
    /**
     * Sets all boolean values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedBoolIterable(fieldNumber: number, values: Iterable<boolean>): void;
    /**
     * Sets a single boolean value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedBoolElement(fieldNumber: number, index: number, value: boolean): void;
    /**
     * Sets all boolean values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedBoolIterable(fieldNumber: number, values: Iterable<boolean>): void;
    /**
     * Adds a single double value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedDoubleElement(fieldNumber: number, value: number): void;
    /**
     * Adds all double values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedDoubleIterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single double value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedDoubleElement(fieldNumber: number, value: number): void;
    /**
     * Adds all double values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedDoubleIterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single double value into the field for the given field number at the
     * given index.
     * All values will be encoded as packed values.
     */
    setPackedDoubleElement(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all double values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedDoubleIterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single double value into the field for the given field number at the
     * given index.
     * All values will be encoded as unpacked values.
     */
    setUnpackedDoubleElement(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all double values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedDoubleIterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single fixed32 value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedFixed32Element(fieldNumber: number, value: number): void;
    /**
     * Adds all fixed32 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedFixed32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single fixed32 value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedFixed32Element(fieldNumber: number, value: number): void;
    /**
     * Adds all fixed32 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedFixed32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single fixed32 value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedFixed32Element(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all fixed32 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedFixed32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single fixed32 value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedFixed32Element(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all fixed32 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedFixed32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single fixed64 value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedFixed64Element(fieldNumber: number, value: Int64): void;
    /**
     * Adds all fixed64 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedFixed64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Adds a single fixed64 value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedFixed64Element(fieldNumber: number, value: Int64): void;
    /**
     * Adds all fixed64 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedFixed64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets a single fixed64 value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedFixed64Element(fieldNumber: number, index: number, value: Int64): void;
    /**
     * Sets all fixed64 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedFixed64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets a single fixed64 value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedFixed64Element(fieldNumber: number, index: number, value: Int64): void;
    /**
     * Sets all fixed64 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedFixed64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Adds a single float value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedFloatElement(fieldNumber: number, value: number): void;
    /**
     * Adds all float values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedFloatIterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single float value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedFloatElement(fieldNumber: number, value: number): void;
    /**
     * Adds all float values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedFloatIterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single float value into the field for the given field number at the
     * given index.
     * All values will be encoded as packed values.
     */
    setPackedFloatElement(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all float values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedFloatIterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single float value into the field for the given field number at the
     * given index.
     * All values will be encoded as unpacked values.
     */
    setUnpackedFloatElement(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all float values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedFloatIterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single int32 value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedInt32Element(fieldNumber: number, value: number): void;
    /**
     * Adds all int32 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedInt32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single int32 value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedInt32Element(fieldNumber: number, value: number): void;
    /**
     * Adds all int32 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedInt32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single int32 value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedInt32Element(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all int32 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedInt32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single int32 value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedInt32Element(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all int32 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedInt32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single int64 value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedInt64Element(fieldNumber: number, value: Int64): void;
    /**
     * Adds all int64 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedInt64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Adds a single int64 value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedInt64Element(fieldNumber: number, value: Int64): void;
    /**
     * Adds all int64 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedInt64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets a single int64 value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedInt64Element(fieldNumber: number, index: number, value: Int64): void;
    /**
     * Sets all int64 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedInt64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets a single int64 value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedInt64Element(fieldNumber: number, index: number, value: Int64): void;
    /**
     * Sets all int64 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedInt64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Adds a single sfixed32 value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedSfixed32Element(fieldNumber: number, value: number): void;
    /**
     * Adds all sfixed32 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedSfixed32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single sfixed32 value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedSfixed32Element(fieldNumber: number, value: number): void;
    /**
     * Adds all sfixed32 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedSfixed32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single sfixed32 value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedSfixed32Element(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all sfixed32 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedSfixed32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single sfixed32 value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedSfixed32Element(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all sfixed32 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedSfixed32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single sfixed64 value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedSfixed64Element(fieldNumber: number, value: Int64): void;
    /**
     * Adds all sfixed64 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedSfixed64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Adds a single sfixed64 value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedSfixed64Element(fieldNumber: number, value: Int64): void;
    /**
     * Adds all sfixed64 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedSfixed64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets a single sfixed64 value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedSfixed64Element(fieldNumber: number, index: number, value: Int64): void;
    /**
     * Sets all sfixed64 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedSfixed64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets a single sfixed64 value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedSfixed64Element(fieldNumber: number, index: number, value: Int64): void;
    /**
     * Sets all sfixed64 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedSfixed64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Adds a single sint32 value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedSint32Element(fieldNumber: number, value: number): void;
    /**
     * Adds all sint32 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedSint32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single sint32 value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedSint32Element(fieldNumber: number, value: number): void;
    /**
     * Adds all sint32 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedSint32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single sint32 value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedSint32Element(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all sint32 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedSint32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single sint32 value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedSint32Element(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all sint32 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedSint32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single sint64 value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedSint64Element(fieldNumber: number, value: Int64): void;
    /**
     * Adds all sint64 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedSint64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Adds a single sint64 value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedSint64Element(fieldNumber: number, value: Int64): void;
    /**
     * Adds all sint64 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedSint64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets a single sint64 value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedSint64Element(fieldNumber: number, index: number, value: Int64): void;
    /**
     * Sets all sint64 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedSint64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets a single sint64 value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedSint64Element(fieldNumber: number, index: number, value: Int64): void;
    /**
     * Sets all sint64 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedSint64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Adds a single uint32 value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedUint32Element(fieldNumber: number, value: number): void;
    /**
     * Adds all uint32 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedUint32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single uint32 value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedUint32Element(fieldNumber: number, value: number): void;
    /**
     * Adds all uint32 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedUint32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single uint32 value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedUint32Element(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all uint32 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedUint32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Sets a single uint32 value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedUint32Element(fieldNumber: number, index: number, value: number): void;
    /**
     * Sets all uint32 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedUint32Iterable(fieldNumber: number, values: Iterable<number>): void;
    /**
     * Adds a single uint64 value into the field for the given field number.
     * All values will be encoded as packed values.
     */
    addPackedUint64Element(fieldNumber: number, value: Int64): void;
    /**
     * Adds all uint64 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    addPackedUint64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Adds a single uint64 value into the field for the given field number.
     * All values will be encoded as unpacked values.
     */
    addUnpackedUint64Element(fieldNumber: number, value: Int64): void;
    /**
     * Adds all uint64 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    addUnpackedUint64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets a single uint64 value into the field for the given field number at
     * the given index. All values will be encoded as packed values.
     */
    setPackedUint64Element(fieldNumber: number, index: number, value: Int64): void;
    /**
     * Sets all uint64 values into the field for the given field number.
     * All these values will be encoded as packed values.
     */
    setPackedUint64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets a single uint64 value into the field for the given field number at
     * the given index. All values will be encoded as unpacked values.
     */
    setUnpackedUint64Element(fieldNumber: number, index: number, value: Int64): void;
    /**
     * Sets all uint64 values into the field for the given field number.
     * All these values will be encoded as unpacked values.
     */
    setUnpackedUint64Iterable(fieldNumber: number, values: Iterable<Int64>): void;
    /**
     * Sets all bytes values into the field for the given field number.
     */
    setRepeatedBytesIterable(fieldNumber: number, values: Iterable<ByteString>): void;
    /**
     * Adds all bytes values into the field for the given field number.
     */
    addRepeatedBytesIterable(fieldNumber: number, values: Iterable<ByteString>): void;
    /**
     * Sets a single bytes value into the field for the given field number at
     * the given index.
     */
    setRepeatedBytesElement(fieldNumber: number, index: number, value: ByteString): void;
    /**
     * Adds a single bytes value into the field for the given field number.
     */
    addRepeatedBytesElement(fieldNumber: number, value: ByteString): void;
    /**
     * Sets all string values into the field for the given field number.
     */
    setRepeatedStringIterable(fieldNumber: number, values: Iterable<string>): void;
    /**
     * Adds all string values into the field for the given field number.
     */
    addRepeatedStringIterable(fieldNumber: number, values: Iterable<string>): void;
    /**
     * Sets a single string value into the field for the given field number at
     * the given index.
     */
    setRepeatedStringElement(fieldNumber: number, index: number, value: string): void;
    /**
     * Adds a single string value into the field for the given field number.
     */
    addRepeatedStringElement(fieldNumber: number, value: string): void;
    /**
     * Sets all message values into the field for the given field number.
     */
    setRepeatedMessageIterable(fieldNumber: number, values: Iterable<InternalMessage>): void;
    /**
     * Adds all message values into the field for the given field number.
     */
    addRepeatedMessageIterable(fieldNumber: number, values: Iterable<InternalMessage>, instanceCreator: () => InternalMessage, pivot?: number): void;
    /**
     * Sets a single message value into the field for the given field number at
     * the given index.
     */
    setRepeatedMessageElement(fieldNumber: number, value: InternalMessage, instanceCreator: () => InternalMessage, index: number, pivot?: number): void;
    /**
     * Adds a single message value into the field for the given field number.
     */
    addRepeatedMessageElement(fieldNumber: number, value: InternalMessage, instanceCreator: () => InternalMessage, pivot?: number): void;
    /**
     * Sets all message values into the field for the given field number.
     */
    setRepeatedGroupIterable(fieldNumber: number, values: Iterable<InternalMessage>): void;
    /**
     * Adds all message values into the field for the given field number.
     */
    addRepeatedGroupIterable(fieldNumber: number, values: Iterable<InternalMessage>, instanceCreator: () => InternalMessage, pivot?: number): void;
    /**
     * Sets a single message value into the field for the given field number at
     * the given index.
     */
    setRepeatedGroupElement(fieldNumber: number, value: InternalMessage, instanceCreator: () => InternalMessage, index: number, pivot?: number): void;
    /**
     * Adds a single message value into the field for the given field number.
     */
    addRepeatedGroupElement(fieldNumber: number, value: InternalMessage, instanceCreator: () => InternalMessage, pivot?: number): void;
}
export { Kernel };

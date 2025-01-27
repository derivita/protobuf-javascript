import '../closure-library/closure/goog/array/array.js';
import { BinaryReader } from './binary/reader.js';
import { BinaryWriter } from './binary/writer.js';
import { Map } from './map.js';
/**
 * Stores information for a single extension field.
 *
 * For example, an extension field defined like so:
 *
 * extend BaseMessage {
 * optional MyMessage my_field = 123;
 * }
 *
 * will result in an ExtensionFieldInfo object with these properties:
 *
 * {
 * fieldIndex: 123,
 * fieldName: {my_field_renamed: 0},
 * ctor: proto.example.MyMessage,
 * toObjectFn: proto.example.MyMessage.toObject,
 * isRepeated: 0
 * }
 *
 * We include `toObjectFn` to allow the JSCompiler to perform dead-code removal
 * on unused toObject() methods.
 *
 * If an extension field is primitive, ctor and toObjectFn will be null.
 * isRepeated should be 0 or 1.
 *
 * binary{Reader,Writer}Fn and (if message type) binaryMessageSerializeFn are
 * always provided. binaryReaderFn and binaryWriterFn are references to the
 * appropriate methods on BinaryReader/BinaryWriter to read/write the value of
 * this extension, and binaryMessageSerializeFn is a reference to the message
 * class's .serializeBinary method, if available.
 */
export declare class ExtensionFieldInfo<T = any> {
    /**
     * Stores information for a single extension field.
     *
     * For example, an extension field defined like so:
     *
     * extend BaseMessage {
     * optional MyMessage my_field = 123;
     * }
     *
     * will result in an ExtensionFieldInfo object with these properties:
     *
     * {
     * fieldIndex: 123,
     * fieldName: {my_field_renamed: 0},
     * ctor: proto.example.MyMessage,
     * toObjectFn: proto.example.MyMessage.toObject,
     * isRepeated: 0
     * }
     *
     * We include `toObjectFn` to allow the JSCompiler to perform dead-code removal
     * on unused toObject() methods.
     *
     * If an extension field is primitive, ctor and toObjectFn will be null.
     * isRepeated should be 0 or 1.
     *
     * binary{Reader,Writer}Fn and (if message type) binaryMessageSerializeFn are
     * always provided. binaryReaderFn and binaryWriterFn are references to the
     * appropriate methods on BinaryReader/BinaryWriter to read/write the value of
     * this extension, and binaryMessageSerializeFn is a reference to the message
     * class's .serializeBinary method, if available.
     * @param fieldName This has the extension field name as a property.
     */
    constructor(fieldNumber: number, fieldName: object | null, ctor: {
        new (): Message ;
    } | null, toObjectFn: (() => object) | null, isRepeated: number);
    private noStructuralTyping____protobuf_javascript_message_ExtensionFieldInfo;
    fieldIndex: number;
    fieldName: object;
    ctor: {
        new (): Message;
    }|null;
    toObjectFn: (() => object) | null;
    isRepeated: number;
    isMessageType(): boolean;
}
/**
 * Stores binary-related information for a single extension field.
 */
export declare class ExtensionFieldBinaryInfo<T = any> {
    /**
     * Stores binary-related information for a single extension field.
     */
    constructor(fieldInfo: ExtensionFieldInfo<T | null>, binaryReaderFn: (this: BinaryReader | null) => any, binaryWriterFn: ((this: BinaryWriter | null) => any) | ((this: BinaryWriter | null) => any), opt_binaryMessageSerializeFn?: () => any, opt_binaryMessageDeserializeFn?: () => any, opt_isPacked?: boolean);
    private noStructuralTyping____protobuf_javascript_message_ExtensionFieldBinaryInfo;
    fieldInfo: any;
    binaryReaderFn: any;
    binaryWriterFn: any;
    binaryMessageSerializeFn: any;
    binaryMessageDeserializeFn: any;
    isPacked: any;
}
/**
 * Base class for all JsPb messages.
 *
 * Several common methods (toObject, serializeBinary, in particular) are not
 * defined on the prototype to encourage code patterns that minimize code bloat
 * due to otherwise unused code on all protos contained in the project.
 *
 * If you want to call these methods on a generic message, either
 * pass in your instance of method as a parameter:
 * someFunction(instanceOfKnownProto,
 * KnownProtoClass.prototype.serializeBinary);
 * or use a lambda that knows the type:
 * someFunction(()=>instanceOfKnownProto.serializeBinary());
 * or, if you don't care about code size, just suppress the
 * WARNING - Property serializeBinary never defined on Message
 * and call it the intuitive way.
 */
export declare class Message {
    /**
     * Base class for all JsPb messages.
     *
     * Several common methods (toObject, serializeBinary, in particular) are not
     * defined on the prototype to encourage code patterns that minimize code bloat
     * due to otherwise unused code on all protos contained in the project.
     *
     * If you want to call these methods on a generic message, either
     * pass in your instance of method as a parameter:
     * someFunction(instanceOfKnownProto,
     * KnownProtoClass.prototype.serializeBinary);
     * or use a lambda that knows the type:
     * someFunction(()=>instanceOfKnownProto.serializeBinary());
     * or, if you don't care about code size, just suppress the
     * WARNING - Property serializeBinary never defined on Message
     * and call it the intuitive way.
     */
    constructor();
    private noStructuralTyping____protobuf_javascript_message_Message;
    static GENERATE_TO_OBJECT: boolean;
    static GENERATE_FROM_OBJECT: boolean;
    static GENERATE_TO_STRING: boolean;
    static ASSUME_LOCAL_ARRAYS: boolean;
    /**
     * Repeated fields numbers.
     */
    protected repeatedFields: number[] | undefined | null;
    /**
     * Returns the JsPb message_id of this proto.
     * @return the message id or undefined if this message has no id.
     */
    getJsPbMessageId(): string | undefined;
    /**
     * Initializes a JsPb Message.
     * @param msg The JsPb proto to modify.
     * @param data An initial data array.
     * @param messageId For response messages, the message id or '' if no message id is specified. For non-response messages, 0.
     * @param suggestedPivot The field number at which to start putting fields into the extension object. This is only used if data does not contain an extension object already. -1 if no extension object is required for this message type.
     * @param repeatedFields The message's repeated fields.
     * @param opt_oneofFields The fields belonging to each of the message's oneof unions.
     */
    static initialize(msg: Message, data: any[] | undefined | null, messageId: string | number, suggestedPivot: number, repeatedFields: number[] | null, opt_oneofFields?: number[][] | null): void;
    /**
     * Converts a JsPb repeated message field into an object list.
     * @param field The repeated message field to be converted.
     * @param toObjectFn The toObject function for this field.  We need to pass this for effective dead code removal.
     * @param opt_includeInstance Whether to include the JSPB instance for transitional soy proto support: http://goto/soy-param-migration
     * @return An array of converted message objects.
     */
    static toObjectList<T = any>(field: (T | null)[], toObjectFn: ((() => (object | null)) | null) | (() => (object | null)) | null, opt_includeInstance?: boolean): (object | null)[];
    /**
     * Adds a proto's extension data to a Soy rendering object.
     * @param proto The proto whose extensions to convert.
     * @param obj The Soy object to add converted extension data to.
     * @param extensions The proto class' registered extensions.
     * @param getExtensionFn The proto class' getExtension function. Passed for effective dead code removal.
     * @param opt_includeInstance Whether to include the JSPB instance for transitional soy proto support: http://goto/soy-param-migration
     */
    static toObjectExtension(proto: Message, obj: object, extensions: object, getExtensionFn: (this: any) => any, opt_includeInstance?: boolean): void;
    /**
     * Writes a proto's extension data to a binary-format output stream.
     * @param proto The proto whose extensions to convert.
     * @param writer The binary-format writer to write to.
     * @param extensions The proto class' registered extensions.
     * @param getExtensionFn The proto class' getExtension function. Passed for effective dead code removal.
     */
    static serializeBinaryExtensions(proto: Message, writer: any, extensions: object, getExtensionFn: (this: Message | null) => any): void;
    /**
     * Reads an extension field from the given reader and, if a valid extension,
     * sets the extension value.
     * @param msg A jspb proto.
     * @param extensions The extensions object.
     */
    static readBinaryExtension(msg: Message, reader: BinaryReader, extensions: object, getExtensionFn: (this: Message ) => any, setExtensionFn: (this: Message | null) => any): void;
    /**
     * Gets the value of a non-extension field.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @return The field's value.
     */
    static getField(msg: Message, fieldNumber: number): string | number | boolean | Uint8Array | any[] | null | undefined | null;
    /**
     * Gets the value of a non-extension repeated field.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @return The field's value.
     */
    static getRepeatedField(msg: Message, fieldNumber: number): any[];
    /**
     * Gets the value of an optional float or double field.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @return The field's value.
     */
    static getOptionalFloatingPointField(msg: Message, fieldNumber: number): number | undefined | null;
    /**
     * Gets the value of an optional boolean field.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @return The field's value.
     */
    static getBooleanField(msg: Message, fieldNumber: number): boolean | undefined | null;
    /**
     * Gets the value of a repeated float or double field.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @return The field's value.
     */
    static getRepeatedFloatingPointField(msg: Message, fieldNumber: number): number[];
    /**
     * Gets the value of a repeated boolean field.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @return The field's value.
     */
    static getRepeatedBooleanField(msg: Message, fieldNumber: number): boolean[];
    /**
     * Coerce a 'bytes' field to a base 64 string.
     * @return The field's coerced value.
     */
    static bytesAsB64(value: string | Uint8Array | null | null): string | null;
    /**
     * Coerce a 'bytes' field to a Uint8Array byte buffer.
     * Note that Uint8Array is not supported on IE versions before 10 nor on Opera
     * Mini. @see http://caniuse.com/Uint8Array
     * @return The field's coerced value.
     */
    static bytesAsU8(value: string | Uint8Array | null | null): Uint8Array | null;
    /**
     * Coerce a repeated 'bytes' field to an array of base 64 strings.
     * Note: the returned array should be treated as immutable.
     * @return The field's coerced value.
     */
    static bytesListAsB64(value: string[] | Uint8Array[]): (string | null)[];
    /**
     * Coerce a repeated 'bytes' field to an array of Uint8Array byte buffers.
     * Note: the returned array should be treated as immutable.
     * Note that Uint8Array is not supported on IE versions before 10 nor on Opera
     * Mini. @see http://caniuse.com/Uint8Array
     * @return The field's coerced value.
     */
    static bytesListAsU8(value: string[] | Uint8Array[]): (Uint8Array | null)[];
    /**
     * Gets the value of a non-extension primitive field, with proto3 (non-nullable
     * primitives) semantics. Returns `defaultValue` if the field is not otherwise
     * set.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param defaultValue The default value.
     * @return The field's value.
     */
    static getFieldWithDefault<T = any>(msg: Message, fieldNumber: number, defaultValue: T | null): T | null;
    /**
     * Gets the value of a boolean field, with proto3 (non-nullable primitives)
     * semantics. Returns `defaultValue` if the field is not otherwise set.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param defaultValue The default value.
     * @return The field's value.
     */
    static getBooleanFieldWithDefault<T = any>(msg: Message, fieldNumber: number, defaultValue: boolean): boolean;
    /**
     * Gets the value of a floating point field, with proto3 (non-nullable
     * primitives) semantics. Returns `defaultValue` if the field is not otherwise
     * set.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param defaultValue The default value.
     * @return The field's value.
     */
    static getFloatingPointFieldWithDefault<T = any>(msg: Message, fieldNumber: number, defaultValue: number): number;
    /**
     * Alias for getFieldWithDefault used by older generated code.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param defaultValue The default value.
     * @return The field's value.
     */
    static getFieldProto3<T = any>(a: Message, b: number, c: T | null): T | null;
    /**
     * Gets the value of a map field, lazily creating the map container if
     * necessary.
     *
     * This should only be called from generated code, because it requires knowledge
     * of serialization/parsing callbacks (which are required by the map at
     * construction time, and the map may be constructed here).
     */
    static getMapField<K = any, V = any>(msg: Message, fieldNumber: number, noLazyCreate: boolean | undefined, opt_valueCtor?: any): Map<K | null, V | null> | undefined;
    /**
     * Sets the value of a non-extension field.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value New value
     * @return return msg
     */
    static setField<T = any>(msg: T | null, fieldNumber: number, value: string | number | boolean | Uint8Array | any[] | undefined | null): T | null;
    /**
     * Sets the value of a non-extension integer field of a proto3
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value New value
     * @return return msg
     */
    static setProto3IntField<T = any>(msg: T | null, fieldNumber: number, value: number): T | null;
    /**
     * Sets the value of a non-extension floating point field of a proto3
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value New value
     * @return return msg
     */
    static setProto3FloatField<T = any>(msg: T | null, fieldNumber: number, value: number): T | null;
    /**
     * Sets the value of a non-extension boolean field of a proto3
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value New value
     * @return return msg
     */
    static setProto3BooleanField<T = any>(msg: T | null, fieldNumber: number, value: boolean): T | null;
    /**
     * Sets the value of a non-extension String field of a proto3
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value New value
     * @return return msg
     */
    static setProto3StringField<T = any>(msg: T | null, fieldNumber: number, value: string): T | null;
    /**
     * Sets the value of a non-extension Bytes field of a proto3
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value New value
     * @return return msg
     */
    static setProto3BytesField<T = any>(msg: T | null, fieldNumber: number, value: Uint8Array | string): T | null;
    /**
     * Sets the value of a non-extension enum field of a proto3
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value New value
     * @return return msg
     */
    static setProto3EnumField<T = any>(msg: T | null, fieldNumber: number, value: number): T | null;
    /**
     * Sets the value of a non-extension int field of a proto3 that has jstype set
     * to String.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value New value
     * @return return msg
     */
    static setProto3StringIntField<T = any>(msg: T | null, fieldNumber: number, value: string): T | null;
    /**
     * Adds a value to a repeated, primitive field.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value New value
     * @param opt_index Index where to put new value.
     * @return return msg
     */
    static addToRepeatedField<T = any>(msg: T | null, fieldNumber: number, value: string | number | boolean | Uint8Array, opt_index?: number): T | null;
    /**
     * Sets the value of a field in a oneof union and clears all other fields in
     * the union.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param oneof The fields belonging to the union.
     * @param value New value
     * @return return msg
     */
    static setOneofField<T = any>(msg: T | null, fieldNumber: number, oneof: number[], value: string | number | boolean | Uint8Array | any[] | undefined | null): T | null;
    /**
     * Computes the selection in a oneof group for the given message, ensuring
     * only one field is set in the process.
     *
     * According to the protobuf language guide (
     * https://protobuf.dev/programming-guides/proto2/#oneof), "if the
     * parser encounters multiple members of the same oneof on the wire, only the
     * last member seen is used in the parsed message." Since JSPB serializes
     * messages to a JSON array, the "last member seen" will always be the field
     * with the greatest field number (directly corresponding to the greatest
     * array index).
     * @param msg A jspb proto.
     * @param oneof The field numbers belonging to the union.
     * @return The field number currently set in the union, or 0 if none.
     */
    static computeOneofCase(msg: Message, oneof: number[]): number;
    /**
     * Gets and wraps a proto field on access.
     * @param msg A jspb proto.
     * @param ctor Constructor for the field.
     * @param fieldNumber The field number.
     * @param opt_required True (1) if this is a required field.
     * @return The field as a jspb proto.
     */
    static getWrapperField(msg: Message, ctor: {
        new (): Message | null;
    }, fieldNumber: number, opt_required?: number): Message | null;
    /**
     * Gets and wraps a repeated proto field on access.
     * @param msg A jspb proto.
     * @param ctor Constructor for the field.
     * @param fieldNumber The field number.
     * @return The repeated field as an array of protos.
     */
    static getRepeatedWrapperField(msg: Message, ctor: {
        new (): Message | null;
    }, fieldNumber: number): Message[];
    /**
     * Sets a proto field and syncs it to the backing array.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value A new value for this proto field.
     * @return the msg
     */
    static setWrapperField<T = any>(msg: T | null, fieldNumber: number, value: Message | Map | undefined | null): T | null;
    /**
     * Sets a proto field in a oneof union and syncs it to the backing array.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param oneof The fields belonging to the union.
     * @param value A new value for this proto field.
     * @return the msg
     */
    static setOneofWrapperField<T = any>(msg: T | null, fieldNumber: number, oneof: number[], value: Message | undefined | null): T | null;
    /**
     * Sets a repeated proto field and syncs it to the backing array.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value An array of protos.
     * @return the msg
     */
    static setRepeatedWrapperField<T = any>(msg: T | null, fieldNumber: number, value: Message[] | undefined | null): T | null;
    /**
     * Add a message to a repeated proto field.
     * @param msg A jspb proto.
     * @param fieldNumber The field number.
     * @param value Proto that will be added to the repeated field.
     * @param ctor The constructor of the message type.
     * @param index Index at which to insert the value.
     * @return proto that was inserted to the repeated field
     */
    static addToRepeatedWrapperField<MessageType = any, T_CHILD = any, T_CHILD_NOT_UNDEFINED = any>(msg: Message, fieldNumber: number, value: T_CHILD | undefined | null, ctor: {
        new (): T_CHILD | null;
    }, index: number | undefined): T_CHILD_NOT_UNDEFINED | null;
    /**
     * Converts a JsPb repeated message field into a map. The map will contain
     * protos unless an optional toObject function is given, in which case it will
     * contain objects suitable for Soy rendering.
     * @param field The repeated message field to be converted.
     * @param mapKeyGetterFn The function to get the key of the map.
     * @param opt_toObjectFn The toObject function for this field. We need to pass this for effective dead code removal.
     * @param opt_includeInstance Whether to include the JSPB instance for transitional soy proto support: http://goto/soy-param-migration
     * @return A map of proto or Soy objects.
     */
    static toMap<T = any>(field: (T | null)[], mapKeyGetterFn: () => (string | null), opt_toObjectFn: ((() => (object | null)) | null) | (() => (object | null)) | null, opt_includeInstance?: boolean): {
        [key: string]: object | null;
    };
    /**
     * Returns the internal array of this proto.
     * <p>Note: If you use this array to construct a second proto, the content
     * would then be partially shared between the two protos.
     * @return The proto represented as an array.
     */
    toArray(): any[];
    /**
     * Gets the value of the extension field from the extended object.
     * @param fieldInfo Specifies the field to get.
     * @return The value of the field.
     */
    getExtension<T = any>(fieldInfo: ExtensionFieldInfo<T | null> | null): T | null;
    /**
     * Sets the value of the extension field in the extended object.
     * @param fieldInfo Specifies the field to set.
     * @param value The value to set.
     * @return For chaining
     */
    setExtension(fieldInfo: ExtensionFieldInfo | null, value: Message | string | Uint8Array | number | boolean | any[] | null): this;
    /**
     * Creates a difference object between two messages.
     *
     * The result will contain the top-level fields of m2 that differ from those of
     * m1 at any level of nesting. No data is cloned, the result object will
     * share its top-level elements with m2 (but not with m1).
     *
     * Note that repeated fields should not have null/undefined elements, but if
     * they do, this operation will treat repeated fields of different length as
     * the same if the only difference between them is due to trailing
     * null/undefined values.
     * @param m1 The first message object.
     * @param m2 The second message object.
     * @return The difference returned as a proto message. Note that the returned message may be missing required fields. This is currently tolerated in Js, but would cause an error if you tried to send such a proto to the server. You can access the raw difference array with result.toArray().
     */
    static difference(m1: Message, m2: Message): Message;
    /**
     * Tests whether two messages are equal.
     * @param m1 The first message object.
     * @param m2 The second message object.
     * @return true if both messages are null/undefined, or if both are of the same type and have the same field values.
     */
    static equals(m1: Message | undefined | null, m2: Message | undefined | null): boolean;
    /**
     * Compares two message extension fields recursively.
     * @param extension1 The first field.
     * @param extension2 The second field.
     * @return true if the extensions are null/undefined, or otherwise equal.
     */
    static compareExtensions(extension1: object, extension2: object): boolean;
    /**
     * Compares two message fields recursively.
     * @param field1 The first field.
     * @param field2 The second field.
     * @return true if the fields are null/undefined, or otherwise equal.
     */
    static compareFields(field1: any, field2: any): boolean;
    /**
     * Templated, type-safe cloneMessage definition.
     */
    cloneMessage(): this;
    /**
     * Alias clone to cloneMessage. goog.object.unsafeClone uses clone to
     * efficiently copy objects. Without this alias, copying jspb messages comes
     * with a large performance penalty.
     */
    clone(): this;
    /**
     * Static clone function. NOTE: A type-safe method called "cloneMessage"
     * exists
     * on each generated JsPb class. Do not call this function directly.
     * @param msg A message to clone.
     * @return A deep clone of the given message.
     */
    static clone(msg: Message): Message;
    /**
     *
     * @param msg A message to clone.
     * @return A deep clone of the given message.
     */
    protected static cloneMessage(msg: Message): Message;
    /**
     * Takes 2 messages of the same type and copies the contents of the first
     * message into the second. After this the 2 messages will equals in terms of
     * value semantics but share no state. All data in the destination message will
     * be overridden.
     * @param fromMessage Message that will be copied into toMessage.
     * @param toMessage Message which will receive a copy of fromMessage as its contents.
     */
    static copyInto<MESSAGE = any>(fromMessage: MESSAGE | null, toMessage: MESSAGE | null): void;
    /**
     * Registers a JsPb message type id with its constructor.
     * @param id The id for this type of message.
     * @param constructor The message constructor.
     */
    static registerMessageType(id: string, constructor: Function | null): void;
    /**
     * The extensions registered on MessageSet. This is a map of extension
     * field number to field info object. This should be considered as a
     * private API.
     *
     * This is similar to [jspb class name].extensions object for
     * non-MessageSet. We special case MessageSet so that we do not need
     * to goog.require MessageSet from classes that extends MessageSet.
     */
    static messageSetExtensions: {
        [key: number]: ExtensionFieldInfo | null;
    };
    static messageSetExtensionsBinary: {
        [key: number]: ExtensionFieldBinaryInfo | null;
    };
}
export declare namespace Message {
    class hiddenES6Property_ {
    }
}

declare namespace proto.jspb.test {
  export class Empty extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.Empty): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.Empty;
    static deserializeBinaryFromReader(msg: proto.jspb.test.Empty, reader: jspb.BinaryReader): proto.jspb.test.Empty;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.Empty, writer: jspb.BinaryWriter): void;
  }

  export class EnumContainer extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.EnumContainer): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.EnumContainer;
    static deserializeBinaryFromReader(msg: proto.jspb.test.EnumContainer, reader: jspb.BinaryReader): proto.jspb.test.EnumContainer;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.EnumContainer, writer: jspb.BinaryWriter): void;
    getOuterEnum(): proto.jspb.test.OuterEnum;
    setOuterEnum(value: proto.jspb.test.OuterEnum): proto.jspb.test.EnumContainer;
    clearOuterEnum(): proto.jspb.test.EnumContainer;
    hasOuterEnum(): boolean;
  }

  export class Simple1 extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.Simple1): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.Simple1;
    static deserializeBinaryFromReader(msg: proto.jspb.test.Simple1, reader: jspb.BinaryReader): proto.jspb.test.Simple1;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.Simple1, writer: jspb.BinaryWriter): void;
    getAString(): string;
    setAString(value: string): proto.jspb.test.Simple1;
    clearAString(): proto.jspb.test.Simple1;
    hasAString(): boolean;
    getARepeatedStringList(): string[];
    setARepeatedStringList(value: string[]): proto.jspb.test.Simple1;
    addARepeatedString(value: string, index?: number): proto.jspb.test.Simple1;
    clearARepeatedStringList(): proto.jspb.test.Simple1;
    getABoolean(): boolean;
    setABoolean(value: boolean): proto.jspb.test.Simple1;
    clearABoolean(): proto.jspb.test.Simple1;
    hasABoolean(): boolean;
  }

  export class Simple2 extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.Simple2): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.Simple2;
    static deserializeBinaryFromReader(msg: proto.jspb.test.Simple2, reader: jspb.BinaryReader): proto.jspb.test.Simple2;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.Simple2, writer: jspb.BinaryWriter): void;
    getAString(): string;
    setAString(value: string): proto.jspb.test.Simple2;
    clearAString(): proto.jspb.test.Simple2;
    hasAString(): boolean;
    getARepeatedStringList(): string[];
    setARepeatedStringList(value: string[]): proto.jspb.test.Simple2;
    addARepeatedString(value: string, index?: number): proto.jspb.test.Simple2;
    clearARepeatedStringList(): proto.jspb.test.Simple2;
  }

  export class SpecialCases extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.SpecialCases): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.SpecialCases;
    static deserializeBinaryFromReader(msg: proto.jspb.test.SpecialCases, reader: jspb.BinaryReader): proto.jspb.test.SpecialCases;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.SpecialCases, writer: jspb.BinaryWriter): void;
    getNormal(): string;
    setNormal(value: string): proto.jspb.test.SpecialCases;
    clearNormal(): proto.jspb.test.SpecialCases;
    hasNormal(): boolean;
    getDefault(): string;
    setDefault(value: string): proto.jspb.test.SpecialCases;
    clearDefault(): proto.jspb.test.SpecialCases;
    hasDefault(): boolean;
    getFunction(): string;
    setFunction(value: string): proto.jspb.test.SpecialCases;
    clearFunction(): proto.jspb.test.SpecialCases;
    hasFunction(): boolean;
    getVar(): string;
    setVar(value: string): proto.jspb.test.SpecialCases;
    clearVar(): proto.jspb.test.SpecialCases;
    hasVar(): boolean;
  }

  export class OptionalFields extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.OptionalFields): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.OptionalFields;
    static deserializeBinaryFromReader(msg: proto.jspb.test.OptionalFields, reader: jspb.BinaryReader): proto.jspb.test.OptionalFields;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.OptionalFields, writer: jspb.BinaryWriter): void;
    export class Nested extends jspb.Message {
      constructor(data?: any[] | null);
      toObject(includeInstance?: boolean): GlobalObject;
      static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.OptionalFields.Nested): GlobalObject;
      static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.OptionalFields.Nested;
      static deserializeBinaryFromReader(msg: proto.jspb.test.OptionalFields.Nested, reader: jspb.BinaryReader): proto.jspb.test.OptionalFields.Nested;
      serializeBinary(): Uint8Array;
      static serializeBinaryToWriter(message: proto.jspb.test.OptionalFields.Nested, writer: jspb.BinaryWriter): void;
      getAnInt(): number;
      setAnInt(value: number): proto.jspb.test.OptionalFields.Nested;
      clearAnInt(): proto.jspb.test.OptionalFields.Nested;
      hasAnInt(): boolean;
    }

    getAString(): string;
    setAString(value: string): proto.jspb.test.OptionalFields;
    clearAString(): proto.jspb.test.OptionalFields;
    hasAString(): boolean;
    getABool(): boolean;
    setABool(value: boolean): proto.jspb.test.OptionalFields;
    clearABool(): proto.jspb.test.OptionalFields;
    hasABool(): boolean;
    getANestedMessage(): proto.jspb.test.OptionalFields.Nested | null;
    setANestedMessage(value: proto.jspb.test.OptionalFields.Nested | null | undefined): proto.jspb.test.OptionalFields;
    clearANestedMessage(): proto.jspb.test.OptionalFields;
    hasANestedMessage(): boolean;
    getARepeatedMessageList(): proto.jspb.test.OptionalFields.Nested[];
    setARepeatedMessageList(value: proto.jspb.test.OptionalFields.Nested[]): proto.jspb.test.OptionalFields;
    addARepeatedMessage(value?: proto.jspb.test.OptionalFields.Nested, index?: number): proto.jspb.test.OptionalFields.Nested;
    clearARepeatedMessageList(): proto.jspb.test.OptionalFields;
    getARepeatedStringList(): string[];
    setARepeatedStringList(value: string[]): proto.jspb.test.OptionalFields;
    addARepeatedString(value: string, index?: number): proto.jspb.test.OptionalFields;
    clearARepeatedStringList(): proto.jspb.test.OptionalFields;
  }

  export class HasExtensions extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.HasExtensions): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.HasExtensions;
    static deserializeBinaryFromReader(msg: proto.jspb.test.HasExtensions, reader: jspb.BinaryReader): proto.jspb.test.HasExtensions;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.HasExtensions, writer: jspb.BinaryWriter): void;
    getStr1(): string;
    setStr1(value: string): proto.jspb.test.HasExtensions;
    clearStr1(): proto.jspb.test.HasExtensions;
    hasStr1(): boolean;
    getStr2(): string;
    setStr2(value: string): proto.jspb.test.HasExtensions;
    clearStr2(): proto.jspb.test.HasExtensions;
    hasStr2(): boolean;
    getStr3(): string;
    setStr3(value: string): proto.jspb.test.HasExtensions;
    clearStr3(): proto.jspb.test.HasExtensions;
    hasStr3(): boolean;
  }

  export class Complex extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.Complex): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.Complex;
    static deserializeBinaryFromReader(msg: proto.jspb.test.Complex, reader: jspb.BinaryReader): proto.jspb.test.Complex;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.Complex, writer: jspb.BinaryWriter): void;
    export class Nested extends jspb.Message {
      constructor(data?: any[] | null);
      toObject(includeInstance?: boolean): GlobalObject;
      static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.Complex.Nested): GlobalObject;
      static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.Complex.Nested;
      static deserializeBinaryFromReader(msg: proto.jspb.test.Complex.Nested, reader: jspb.BinaryReader): proto.jspb.test.Complex.Nested;
      serializeBinary(): Uint8Array;
      static serializeBinaryToWriter(message: proto.jspb.test.Complex.Nested, writer: jspb.BinaryWriter): void;
      getAnInt(): number;
      setAnInt(value: number): proto.jspb.test.Complex.Nested;
      clearAnInt(): proto.jspb.test.Complex.Nested;
      hasAnInt(): boolean;
    }

    getAString(): string;
    setAString(value: string): proto.jspb.test.Complex;
    clearAString(): proto.jspb.test.Complex;
    hasAString(): boolean;
    getAnOutOfOrderBool(): boolean;
    setAnOutOfOrderBool(value: boolean): proto.jspb.test.Complex;
    clearAnOutOfOrderBool(): proto.jspb.test.Complex;
    hasAnOutOfOrderBool(): boolean;
    getANestedMessage(): proto.jspb.test.Complex.Nested | null;
    setANestedMessage(value: proto.jspb.test.Complex.Nested | null | undefined): proto.jspb.test.Complex;
    clearANestedMessage(): proto.jspb.test.Complex;
    hasANestedMessage(): boolean;
    getARepeatedMessageList(): proto.jspb.test.Complex.Nested[];
    setARepeatedMessageList(value: proto.jspb.test.Complex.Nested[]): proto.jspb.test.Complex;
    addARepeatedMessage(value?: proto.jspb.test.Complex.Nested, index?: number): proto.jspb.test.Complex.Nested;
    clearARepeatedMessageList(): proto.jspb.test.Complex;
    getARepeatedStringList(): string[];
    setARepeatedStringList(value: string[]): proto.jspb.test.Complex;
    addARepeatedString(value: string, index?: number): proto.jspb.test.Complex;
    clearARepeatedStringList(): proto.jspb.test.Complex;
    getAFloatingPointField(): number;
    setAFloatingPointField(value: number): proto.jspb.test.Complex;
    clearAFloatingPointField(): proto.jspb.test.Complex;
    hasAFloatingPointField(): boolean;
  }

  export class OuterMessage extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.OuterMessage): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.OuterMessage;
    static deserializeBinaryFromReader(msg: proto.jspb.test.OuterMessage, reader: jspb.BinaryReader): proto.jspb.test.OuterMessage;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.OuterMessage, writer: jspb.BinaryWriter): void;
    export class Complex extends jspb.Message {
      constructor(data?: any[] | null);
      toObject(includeInstance?: boolean): GlobalObject;
      static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.OuterMessage.Complex): GlobalObject;
      static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.OuterMessage.Complex;
      static deserializeBinaryFromReader(msg: proto.jspb.test.OuterMessage.Complex, reader: jspb.BinaryReader): proto.jspb.test.OuterMessage.Complex;
      serializeBinary(): Uint8Array;
      static serializeBinaryToWriter(message: proto.jspb.test.OuterMessage.Complex, writer: jspb.BinaryWriter): void;
      getInnerComplexField(): number;
      setInnerComplexField(value: number): proto.jspb.test.OuterMessage.Complex;
      clearInnerComplexField(): proto.jspb.test.OuterMessage.Complex;
      hasInnerComplexField(): boolean;
    }

  }

  export class MineField extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.MineField): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.MineField;
    static deserializeBinaryFromReader(msg: proto.jspb.test.MineField, reader: jspb.BinaryReader): proto.jspb.test.MineField;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.MineField, writer: jspb.BinaryWriter): void;
    getCookie(): string;
    setCookie(value: string): proto.jspb.test.MineField;
    clearCookie(): proto.jspb.test.MineField;
    hasCookie(): boolean;
  }

  export class IsExtension extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.IsExtension): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.IsExtension;
    static deserializeBinaryFromReader(msg: proto.jspb.test.IsExtension, reader: jspb.BinaryReader): proto.jspb.test.IsExtension;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.IsExtension, writer: jspb.BinaryWriter): void;
    getExt1(): string;
    setExt1(value: string): proto.jspb.test.IsExtension;
    clearExt1(): proto.jspb.test.IsExtension;
    hasExt1(): boolean;
  }

  export class IndirectExtension extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.IndirectExtension): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.IndirectExtension;
    static deserializeBinaryFromReader(msg: proto.jspb.test.IndirectExtension, reader: jspb.BinaryReader): proto.jspb.test.IndirectExtension;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.IndirectExtension, writer: jspb.BinaryWriter): void;
  }

  export class DefaultValues extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.DefaultValues): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.DefaultValues;
    static deserializeBinaryFromReader(msg: proto.jspb.test.DefaultValues, reader: jspb.BinaryReader): proto.jspb.test.DefaultValues;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.DefaultValues, writer: jspb.BinaryWriter): void;
    enum Enum {
      E1 = 13,
      E2 = 77,
    }

    getStringField(): string;
    setStringField(value: string): proto.jspb.test.DefaultValues;
    clearStringField(): proto.jspb.test.DefaultValues;
    hasStringField(): boolean;
    getBoolField(): boolean;
    setBoolField(value: boolean): proto.jspb.test.DefaultValues;
    clearBoolField(): proto.jspb.test.DefaultValues;
    hasBoolField(): boolean;
    getIntField(): number;
    setIntField(value: number): proto.jspb.test.DefaultValues;
    clearIntField(): proto.jspb.test.DefaultValues;
    hasIntField(): boolean;
    getEnumField(): proto.jspb.test.DefaultValues.Enum;
    setEnumField(value: proto.jspb.test.DefaultValues.Enum): proto.jspb.test.DefaultValues;
    clearEnumField(): proto.jspb.test.DefaultValues;
    hasEnumField(): boolean;
    getEmptyField(): string;
    setEmptyField(value: string): proto.jspb.test.DefaultValues;
    clearEmptyField(): proto.jspb.test.DefaultValues;
    hasEmptyField(): boolean;
    getBytesField(): (string|Uint8Array);
    getBytesField_asB64(): string;
    getBytesField_asU8(): Uint8Array;
    setBytesField(value: (string|Uint8Array)): proto.jspb.test.DefaultValues;
    clearBytesField(): proto.jspb.test.DefaultValues;
    hasBytesField(): boolean;
  }

  export class FloatingPointFields extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.FloatingPointFields): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.FloatingPointFields;
    static deserializeBinaryFromReader(msg: proto.jspb.test.FloatingPointFields, reader: jspb.BinaryReader): proto.jspb.test.FloatingPointFields;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.FloatingPointFields, writer: jspb.BinaryWriter): void;
    getOptionalFloatField(): number;
    setOptionalFloatField(value: number): proto.jspb.test.FloatingPointFields;
    clearOptionalFloatField(): proto.jspb.test.FloatingPointFields;
    hasOptionalFloatField(): boolean;
    getRequiredFloatField(): number;
    setRequiredFloatField(value: number): proto.jspb.test.FloatingPointFields;
    clearRequiredFloatField(): proto.jspb.test.FloatingPointFields;
    hasRequiredFloatField(): boolean;
    getRepeatedFloatFieldList(): number[];
    setRepeatedFloatFieldList(value: number[]): proto.jspb.test.FloatingPointFields;
    addRepeatedFloatField(value: number, index?: number): proto.jspb.test.FloatingPointFields;
    clearRepeatedFloatFieldList(): proto.jspb.test.FloatingPointFields;
    getDefaultFloatField(): number;
    setDefaultFloatField(value: number): proto.jspb.test.FloatingPointFields;
    clearDefaultFloatField(): proto.jspb.test.FloatingPointFields;
    hasDefaultFloatField(): boolean;
    getOptionalDoubleField(): number;
    setOptionalDoubleField(value: number): proto.jspb.test.FloatingPointFields;
    clearOptionalDoubleField(): proto.jspb.test.FloatingPointFields;
    hasOptionalDoubleField(): boolean;
    getRequiredDoubleField(): number;
    setRequiredDoubleField(value: number): proto.jspb.test.FloatingPointFields;
    clearRequiredDoubleField(): proto.jspb.test.FloatingPointFields;
    hasRequiredDoubleField(): boolean;
    getRepeatedDoubleFieldList(): number[];
    setRepeatedDoubleFieldList(value: number[]): proto.jspb.test.FloatingPointFields;
    addRepeatedDoubleField(value: number, index?: number): proto.jspb.test.FloatingPointFields;
    clearRepeatedDoubleFieldList(): proto.jspb.test.FloatingPointFields;
    getDefaultDoubleField(): number;
    setDefaultDoubleField(value: number): proto.jspb.test.FloatingPointFields;
    clearDefaultDoubleField(): proto.jspb.test.FloatingPointFields;
    hasDefaultDoubleField(): boolean;
  }

  export class BooleanFields extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.BooleanFields): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.BooleanFields;
    static deserializeBinaryFromReader(msg: proto.jspb.test.BooleanFields, reader: jspb.BinaryReader): proto.jspb.test.BooleanFields;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.BooleanFields, writer: jspb.BinaryWriter): void;
    getOptionalBooleanField(): boolean;
    setOptionalBooleanField(value: boolean): proto.jspb.test.BooleanFields;
    clearOptionalBooleanField(): proto.jspb.test.BooleanFields;
    hasOptionalBooleanField(): boolean;
    getRequiredBooleanField(): boolean;
    setRequiredBooleanField(value: boolean): proto.jspb.test.BooleanFields;
    clearRequiredBooleanField(): proto.jspb.test.BooleanFields;
    hasRequiredBooleanField(): boolean;
    getRepeatedBooleanFieldList(): boolean[];
    setRepeatedBooleanFieldList(value: boolean[]): proto.jspb.test.BooleanFields;
    addRepeatedBooleanField(value: boolean, index?: number): proto.jspb.test.BooleanFields;
    clearRepeatedBooleanFieldList(): proto.jspb.test.BooleanFields;
    getDefaultBooleanField(): boolean;
    setDefaultBooleanField(value: boolean): proto.jspb.test.BooleanFields;
    clearDefaultBooleanField(): proto.jspb.test.BooleanFields;
    hasDefaultBooleanField(): boolean;
  }

  export class TestClone extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestClone): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestClone;
    static deserializeBinaryFromReader(msg: proto.jspb.test.TestClone, reader: jspb.BinaryReader): proto.jspb.test.TestClone;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.TestClone, writer: jspb.BinaryWriter): void;
    getStr(): string;
    setStr(value: string): proto.jspb.test.TestClone;
    clearStr(): proto.jspb.test.TestClone;
    hasStr(): boolean;
    getSimple1(): proto.jspb.test.Simple1 | null;
    setSimple1(value: proto.jspb.test.Simple1 | null | undefined): proto.jspb.test.TestClone;
    clearSimple1(): proto.jspb.test.TestClone;
    hasSimple1(): boolean;
    getSimple2List(): proto.jspb.test.Simple1[];
    setSimple2List(value: proto.jspb.test.Simple1[]): proto.jspb.test.TestClone;
    addSimple2(value?: proto.jspb.test.Simple1, index?: number): proto.jspb.test.Simple1;
    clearSimple2List(): proto.jspb.test.TestClone;
    getBytesField(): (string|Uint8Array);
    getBytesField_asB64(): string;
    getBytesField_asU8(): Uint8Array;
    setBytesField(value: (string|Uint8Array)): proto.jspb.test.TestClone;
    clearBytesField(): proto.jspb.test.TestClone;
    hasBytesField(): boolean;
    getUnused(): string;
    setUnused(value: string): proto.jspb.test.TestClone;
    clearUnused(): proto.jspb.test.TestClone;
    hasUnused(): boolean;
  }

  export class TestCloneExtension extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestCloneExtension): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestCloneExtension;
    static deserializeBinaryFromReader(msg: proto.jspb.test.TestCloneExtension, reader: jspb.BinaryReader): proto.jspb.test.TestCloneExtension;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.TestCloneExtension, writer: jspb.BinaryWriter): void;
    getF(): number;
    setF(value: number): proto.jspb.test.TestCloneExtension;
    clearF(): proto.jspb.test.TestCloneExtension;
    hasF(): boolean;
  }

  export class CloneExtension extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.CloneExtension): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.CloneExtension;
    static deserializeBinaryFromReader(msg: proto.jspb.test.CloneExtension, reader: jspb.BinaryReader): proto.jspb.test.CloneExtension;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.CloneExtension, writer: jspb.BinaryWriter): void;
    getExt(): string;
    setExt(value: string): proto.jspb.test.CloneExtension;
    clearExt(): proto.jspb.test.CloneExtension;
    hasExt(): boolean;
  }

  export class TestGroup extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestGroup): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestGroup;
    static deserializeBinaryFromReader(msg: proto.jspb.test.TestGroup, reader: jspb.BinaryReader): proto.jspb.test.TestGroup;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.TestGroup, writer: jspb.BinaryWriter): void;
    export class RepeatedGroup extends jspb.Message {
      constructor(data?: any[] | null);
      toObject(includeInstance?: boolean): GlobalObject;
      static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestGroup.RepeatedGroup): GlobalObject;
      static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestGroup.RepeatedGroup;
      static deserializeBinaryFromReader(msg: proto.jspb.test.TestGroup.RepeatedGroup, reader: jspb.BinaryReader): proto.jspb.test.TestGroup.RepeatedGroup;
      serializeBinary(): Uint8Array;
      static serializeBinaryToWriter(message: proto.jspb.test.TestGroup.RepeatedGroup, writer: jspb.BinaryWriter): void;
      getId(): string;
      setId(value: string): proto.jspb.test.TestGroup.RepeatedGroup;
      clearId(): proto.jspb.test.TestGroup.RepeatedGroup;
      hasId(): boolean;
      getSomeBoolList(): boolean[];
      setSomeBoolList(value: boolean[]): proto.jspb.test.TestGroup.RepeatedGroup;
      addSomeBool(value: boolean, index?: number): proto.jspb.test.TestGroup.RepeatedGroup;
      clearSomeBoolList(): proto.jspb.test.TestGroup.RepeatedGroup;
    }

    export class RequiredGroup extends jspb.Message {
      constructor(data?: any[] | null);
      toObject(includeInstance?: boolean): GlobalObject;
      static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestGroup.RequiredGroup): GlobalObject;
      static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestGroup.RequiredGroup;
      static deserializeBinaryFromReader(msg: proto.jspb.test.TestGroup.RequiredGroup, reader: jspb.BinaryReader): proto.jspb.test.TestGroup.RequiredGroup;
      serializeBinary(): Uint8Array;
      static serializeBinaryToWriter(message: proto.jspb.test.TestGroup.RequiredGroup, writer: jspb.BinaryWriter): void;
      getId(): string;
      setId(value: string): proto.jspb.test.TestGroup.RequiredGroup;
      clearId(): proto.jspb.test.TestGroup.RequiredGroup;
      hasId(): boolean;
    }

    export class OptionalGroup extends jspb.Message {
      constructor(data?: any[] | null);
      toObject(includeInstance?: boolean): GlobalObject;
      static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestGroup.OptionalGroup): GlobalObject;
      static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestGroup.OptionalGroup;
      static deserializeBinaryFromReader(msg: proto.jspb.test.TestGroup.OptionalGroup, reader: jspb.BinaryReader): proto.jspb.test.TestGroup.OptionalGroup;
      serializeBinary(): Uint8Array;
      static serializeBinaryToWriter(message: proto.jspb.test.TestGroup.OptionalGroup, writer: jspb.BinaryWriter): void;
      getId(): string;
      setId(value: string): proto.jspb.test.TestGroup.OptionalGroup;
      clearId(): proto.jspb.test.TestGroup.OptionalGroup;
      hasId(): boolean;
    }

    getRepeatedGroupList(): proto.jspb.test.TestGroup.RepeatedGroup[];
    setRepeatedGroupList(value: proto.jspb.test.TestGroup.RepeatedGroup[]): proto.jspb.test.TestGroup;
    addRepeatedGroup(value?: proto.jspb.test.TestGroup.RepeatedGroup, index?: number): proto.jspb.test.TestGroup.RepeatedGroup;
    clearRepeatedGroupList(): proto.jspb.test.TestGroup;
    getRequiredGroup(): proto.jspb.test.TestGroup.RequiredGroup;
    setRequiredGroup(value: proto.jspb.test.TestGroup.RequiredGroup): proto.jspb.test.TestGroup;
    clearRequiredGroup(): proto.jspb.test.TestGroup;
    hasRequiredGroup(): boolean;
    getOptionalGroup(): proto.jspb.test.TestGroup.OptionalGroup | null;
    setOptionalGroup(value: proto.jspb.test.TestGroup.OptionalGroup | null | undefined): proto.jspb.test.TestGroup;
    clearOptionalGroup(): proto.jspb.test.TestGroup;
    hasOptionalGroup(): boolean;
    getId(): string;
    setId(value: string): proto.jspb.test.TestGroup;
    clearId(): proto.jspb.test.TestGroup;
    hasId(): boolean;
    getRequiredSimple(): proto.jspb.test.Simple2;
    setRequiredSimple(value: proto.jspb.test.Simple2): proto.jspb.test.TestGroup;
    clearRequiredSimple(): proto.jspb.test.TestGroup;
    hasRequiredSimple(): boolean;
    getOptionalSimple(): proto.jspb.test.Simple2 | null;
    setOptionalSimple(value: proto.jspb.test.Simple2 | null | undefined): proto.jspb.test.TestGroup;
    clearOptionalSimple(): proto.jspb.test.TestGroup;
    hasOptionalSimple(): boolean;
  }

  export class TestGroup1 extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestGroup1): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestGroup1;
    static deserializeBinaryFromReader(msg: proto.jspb.test.TestGroup1, reader: jspb.BinaryReader): proto.jspb.test.TestGroup1;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.TestGroup1, writer: jspb.BinaryWriter): void;
    getGroup(): proto.jspb.test.TestGroup.RepeatedGroup | null;
    setGroup(value: proto.jspb.test.TestGroup.RepeatedGroup | null | undefined): proto.jspb.test.TestGroup1;
    clearGroup(): proto.jspb.test.TestGroup1;
    hasGroup(): boolean;
  }

  export class TestReservedNames extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestReservedNames): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestReservedNames;
    static deserializeBinaryFromReader(msg: proto.jspb.test.TestReservedNames, reader: jspb.BinaryReader): proto.jspb.test.TestReservedNames;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.TestReservedNames, writer: jspb.BinaryWriter): void;
    getExtension$(): number;
    setExtension$(value: number): proto.jspb.test.TestReservedNames;
    clearExtension$(): proto.jspb.test.TestReservedNames;
    hasExtension$(): boolean;
  }

  export class TestReservedNamesExtension extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestReservedNamesExtension): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestReservedNamesExtension;
    static deserializeBinaryFromReader(msg: proto.jspb.test.TestReservedNamesExtension, reader: jspb.BinaryReader): proto.jspb.test.TestReservedNamesExtension;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.TestReservedNamesExtension, writer: jspb.BinaryWriter): void;
  }

  export class TestMessageWithOneof extends jspb.Message {
    constructor(data?: any[] | null);
    enum PartialOneofCase = {
      PARTIAL_ONEOF_NOT_SET: 0,
      PONE: 3,
      PTHREE: 5,
    };
    getPartialOneofCase(): proto.jspb.test.TestMessageWithOneof.PartialOneofCase;
    enum RecursiveOneofCase = {
      RECURSIVE_ONEOF_NOT_SET: 0,
      RONE: 6,
      RTWO: 7,
    };
    getRecursiveOneofCase(): proto.jspb.test.TestMessageWithOneof.RecursiveOneofCase;
    enum DefaultOneofACase = {
      DEFAULT_ONEOF_A_NOT_SET: 0,
      AONE: 10,
      ATWO: 11,
    };
    getDefaultOneofACase(): proto.jspb.test.TestMessageWithOneof.DefaultOneofACase;
    enum DefaultOneofBCase = {
      DEFAULT_ONEOF_B_NOT_SET: 0,
      BONE: 12,
      BTWO: 13,
    };
    getDefaultOneofBCase(): proto.jspb.test.TestMessageWithOneof.DefaultOneofBCase;
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestMessageWithOneof): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestMessageWithOneof;
    static deserializeBinaryFromReader(msg: proto.jspb.test.TestMessageWithOneof, reader: jspb.BinaryReader): proto.jspb.test.TestMessageWithOneof;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.TestMessageWithOneof, writer: jspb.BinaryWriter): void;
    getPone(): string;
    setPone(value: string): proto.jspb.test.TestMessageWithOneof;
    clearPone(): proto.jspb.test.TestMessageWithOneof;
    hasPone(): boolean;
    getPthree(): string;
    setPthree(value: string): proto.jspb.test.TestMessageWithOneof;
    clearPthree(): proto.jspb.test.TestMessageWithOneof;
    hasPthree(): boolean;
    getRone(): proto.jspb.test.TestMessageWithOneof | null;
    setRone(value: proto.jspb.test.TestMessageWithOneof | null | undefined): proto.jspb.test.TestMessageWithOneof;
    clearRone(): proto.jspb.test.TestMessageWithOneof;
    hasRone(): boolean;
    getRtwo(): string;
    setRtwo(value: string): proto.jspb.test.TestMessageWithOneof;
    clearRtwo(): proto.jspb.test.TestMessageWithOneof;
    hasRtwo(): boolean;
    getNormalField(): boolean;
    setNormalField(value: boolean): proto.jspb.test.TestMessageWithOneof;
    clearNormalField(): proto.jspb.test.TestMessageWithOneof;
    hasNormalField(): boolean;
    getRepeatedFieldList(): string[];
    setRepeatedFieldList(value: string[]): proto.jspb.test.TestMessageWithOneof;
    addRepeatedField(value: string, index?: number): proto.jspb.test.TestMessageWithOneof;
    clearRepeatedFieldList(): proto.jspb.test.TestMessageWithOneof;
    getAone(): number;
    setAone(value: number): proto.jspb.test.TestMessageWithOneof;
    clearAone(): proto.jspb.test.TestMessageWithOneof;
    hasAone(): boolean;
    getAtwo(): number;
    setAtwo(value: number): proto.jspb.test.TestMessageWithOneof;
    clearAtwo(): proto.jspb.test.TestMessageWithOneof;
    hasAtwo(): boolean;
    getBone(): number;
    setBone(value: number): proto.jspb.test.TestMessageWithOneof;
    clearBone(): proto.jspb.test.TestMessageWithOneof;
    hasBone(): boolean;
    getBtwo(): number;
    setBtwo(value: number): proto.jspb.test.TestMessageWithOneof;
    clearBtwo(): proto.jspb.test.TestMessageWithOneof;
    hasBtwo(): boolean;
  }

  export class TestEndsWithBytes extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestEndsWithBytes): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestEndsWithBytes;
    static deserializeBinaryFromReader(msg: proto.jspb.test.TestEndsWithBytes, reader: jspb.BinaryReader): proto.jspb.test.TestEndsWithBytes;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.TestEndsWithBytes, writer: jspb.BinaryWriter): void;
    getValue(): number;
    setValue(value: number): proto.jspb.test.TestEndsWithBytes;
    clearValue(): proto.jspb.test.TestEndsWithBytes;
    hasValue(): boolean;
    getData(): (string|Uint8Array);
    getData_asB64(): string;
    getData_asU8(): Uint8Array;
    setData(value: (string|Uint8Array)): proto.jspb.test.TestEndsWithBytes;
    clearData(): proto.jspb.test.TestEndsWithBytes;
    hasData(): boolean;
  }

  export class TestLastFieldBeforePivot extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestLastFieldBeforePivot): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestLastFieldBeforePivot;
    static deserializeBinaryFromReader(msg: proto.jspb.test.TestLastFieldBeforePivot, reader: jspb.BinaryReader): proto.jspb.test.TestLastFieldBeforePivot;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.TestLastFieldBeforePivot, writer: jspb.BinaryWriter): void;
    getLastFieldBeforePivot(): number;
    setLastFieldBeforePivot(value: number): proto.jspb.test.TestLastFieldBeforePivot;
    clearLastFieldBeforePivot(): proto.jspb.test.TestLastFieldBeforePivot;
    hasLastFieldBeforePivot(): boolean;
  }

  export class Int64Types extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.Int64Types): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.Int64Types;
    static deserializeBinaryFromReader(msg: proto.jspb.test.Int64Types, reader: jspb.BinaryReader): proto.jspb.test.Int64Types;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.Int64Types, writer: jspb.BinaryWriter): void;
    getInt64Normal(): number;
    setInt64Normal(value: number): proto.jspb.test.Int64Types;
    clearInt64Normal(): proto.jspb.test.Int64Types;
    hasInt64Normal(): boolean;
    getInt64String(): string;
    setInt64String(value: string): proto.jspb.test.Int64Types;
    clearInt64String(): proto.jspb.test.Int64Types;
    hasInt64String(): boolean;
    getInt64Number(): number;
    setInt64Number(value: number): proto.jspb.test.Int64Types;
    clearInt64Number(): proto.jspb.test.Int64Types;
    hasInt64Number(): boolean;
  }

  export class TestMapFieldsNoBinary extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.TestMapFieldsNoBinary): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.TestMapFieldsNoBinary;
    static deserializeBinaryFromReader(msg: proto.jspb.test.TestMapFieldsNoBinary, reader: jspb.BinaryReader): proto.jspb.test.TestMapFieldsNoBinary;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.TestMapFieldsNoBinary, writer: jspb.BinaryWriter): void;
    getMapStringStringMap(noLazyCreate?: boolean): jspb.Map<string,string> | undefined;
    clearMapStringStringMap(): proto.jspb.test.TestMapFieldsNoBinary;
    getMapStringInt32Map(noLazyCreate?: boolean): jspb.Map<string,number> | undefined;
    clearMapStringInt32Map(): proto.jspb.test.TestMapFieldsNoBinary;
    getMapStringInt64Map(noLazyCreate?: boolean): jspb.Map<string,number> | undefined;
    clearMapStringInt64Map(): proto.jspb.test.TestMapFieldsNoBinary;
    getMapStringBoolMap(noLazyCreate?: boolean): jspb.Map<string,boolean> | undefined;
    clearMapStringBoolMap(): proto.jspb.test.TestMapFieldsNoBinary;
    getMapStringDoubleMap(noLazyCreate?: boolean): jspb.Map<string,number> | undefined;
    clearMapStringDoubleMap(): proto.jspb.test.TestMapFieldsNoBinary;
    getMapStringEnumMap(noLazyCreate?: boolean): jspb.Map<string,proto.jspb.test.MapValueEnumNoBinary> | undefined;
    clearMapStringEnumMap(): proto.jspb.test.TestMapFieldsNoBinary;
    getMapStringMsgMap(noLazyCreate?: boolean): jspb.Map<string,proto.jspb.test.MapValueMessageNoBinary> | undefined;
    clearMapStringMsgMap(): proto.jspb.test.TestMapFieldsNoBinary;
    getMapInt32StringMap(noLazyCreate?: boolean): jspb.Map<number,string> | undefined;
    clearMapInt32StringMap(): proto.jspb.test.TestMapFieldsNoBinary;
    getMapInt64StringMap(noLazyCreate?: boolean): jspb.Map<number,string> | undefined;
    clearMapInt64StringMap(): proto.jspb.test.TestMapFieldsNoBinary;
    getMapBoolStringMap(noLazyCreate?: boolean): jspb.Map<boolean,string> | undefined;
    clearMapBoolStringMap(): proto.jspb.test.TestMapFieldsNoBinary;
    getTestMapFields(): proto.jspb.test.TestMapFieldsNoBinary | null;
    setTestMapFields(value: proto.jspb.test.TestMapFieldsNoBinary | null | undefined): proto.jspb.test.TestMapFieldsNoBinary;
    clearTestMapFields(): proto.jspb.test.TestMapFieldsNoBinary;
    hasTestMapFields(): boolean;
    getMapStringTestmapfieldsMap(noLazyCreate?: boolean): jspb.Map<string,proto.jspb.test.TestMapFieldsNoBinary> | undefined;
    clearMapStringTestmapfieldsMap(): proto.jspb.test.TestMapFieldsNoBinary;
  }

  export class MapValueMessageNoBinary extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.MapValueMessageNoBinary): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.MapValueMessageNoBinary;
    static deserializeBinaryFromReader(msg: proto.jspb.test.MapValueMessageNoBinary, reader: jspb.BinaryReader): proto.jspb.test.MapValueMessageNoBinary;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.MapValueMessageNoBinary, writer: jspb.BinaryWriter): void;
    getFoo(): number;
    setFoo(value: number): proto.jspb.test.MapValueMessageNoBinary;
    clearFoo(): proto.jspb.test.MapValueMessageNoBinary;
    hasFoo(): boolean;
  }

  export class Deeply extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): GlobalObject;
    static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.Deeply): GlobalObject;
    static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.Deeply;
    static deserializeBinaryFromReader(msg: proto.jspb.test.Deeply, reader: jspb.BinaryReader): proto.jspb.test.Deeply;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: proto.jspb.test.Deeply, writer: jspb.BinaryWriter): void;
    export class Nested extends jspb.Message {
      constructor(data?: any[] | null);
      toObject(includeInstance?: boolean): GlobalObject;
      static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.Deeply.Nested): GlobalObject;
      static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.Deeply.Nested;
      static deserializeBinaryFromReader(msg: proto.jspb.test.Deeply.Nested, reader: jspb.BinaryReader): proto.jspb.test.Deeply.Nested;
      serializeBinary(): Uint8Array;
      static serializeBinaryToWriter(message: proto.jspb.test.Deeply.Nested, writer: jspb.BinaryWriter): void;
      export class Message extends jspb.Message {
        constructor(data?: any[] | null);
        toObject(includeInstance?: boolean): GlobalObject;
        static toObject(includeInstance: boolean | undefined, msg: proto.jspb.test.Deeply.Nested.Message): GlobalObject;
        static deserializeBinary(bytes: jspb.ByteSource): proto.jspb.test.Deeply.Nested.Message;
        static deserializeBinaryFromReader(msg: proto.jspb.test.Deeply.Nested.Message, reader: jspb.BinaryReader): proto.jspb.test.Deeply.Nested.Message;
        serializeBinary(): Uint8Array;
        static serializeBinaryToWriter(message: proto.jspb.test.Deeply.Nested.Message, writer: jspb.BinaryWriter): void;
        getCount(): number;
        setCount(value: number): proto.jspb.test.Deeply.Nested.Message;
        clearCount(): proto.jspb.test.Deeply.Nested.Message;
        hasCount(): boolean;
      }

    }

  }

  enum OuterEnum {
    FOO = 1,
    BAR = 2,
  }

  enum MapValueEnumNoBinary {
    MAP_VALUE_FOO_NOBINARY = 0,
    MAP_VALUE_BAR_NOBINARY = 1,
    MAP_VALUE_BAZ_NOBINARY = 2,
  }

  enum TestAllowAliasEnum {
    TEST_ALLOW_ALIAS_DEFAULT = 0,
    VALUE1 = 1,
  }

}

declare module "goog:proto.jspb.test.BooleanFields " {
  import BooleanFields = proto.jspb.test.BooleanFields;
  export default BooleanFields;
}

declare module "goog:proto.jspb.test.CloneExtension " {
  import CloneExtension = proto.jspb.test.CloneExtension;
  export default CloneExtension;
}

declare module "goog:proto.jspb.test.Complex " {
  import Complex = proto.jspb.test.Complex;
  export default Complex;
}

declare module "goog:proto.jspb.test.Deeply " {
  import Deeply = proto.jspb.test.Deeply;
  export default Deeply;
}

declare module "goog:proto.jspb.test.DefaultValues " {
  import DefaultValues = proto.jspb.test.DefaultValues;
  export default DefaultValues;
}

declare module "goog:proto.jspb.test.Empty " {
  import Empty = proto.jspb.test.Empty;
  export default Empty;
}

declare module "goog:proto.jspb.test.EnumContainer " {
  import EnumContainer = proto.jspb.test.EnumContainer;
  export default EnumContainer;
}

declare module "goog:proto.jspb.test.FloatingPointFields " {
  import FloatingPointFields = proto.jspb.test.FloatingPointFields;
  export default FloatingPointFields;
}

declare module "goog:proto.jspb.test.HasExtensions " {
  import HasExtensions = proto.jspb.test.HasExtensions;
  export default HasExtensions;
}

declare module "goog:proto.jspb.test.IndirectExtension " {
  import IndirectExtension = proto.jspb.test.IndirectExtension;
  export default IndirectExtension;
}

declare module "goog:proto.jspb.test.Int64Types " {
  import Int64Types = proto.jspb.test.Int64Types;
  export default Int64Types;
}

declare module "goog:proto.jspb.test.IsExtension " {
  import IsExtension = proto.jspb.test.IsExtension;
  export default IsExtension;
}

declare module "goog:proto.jspb.test.MapValueEnumNoBinary " {
  import MapValueEnumNoBinary = proto.jspb.test.MapValueEnumNoBinary;
  export default MapValueEnumNoBinary;
}

declare module "goog:proto.jspb.test.MapValueMessageNoBinary " {
  import MapValueMessageNoBinary = proto.jspb.test.MapValueMessageNoBinary;
  export default MapValueMessageNoBinary;
}

declare module "goog:proto.jspb.test.MineField " {
  import MineField = proto.jspb.test.MineField;
  export default MineField;
}

declare module "goog:proto.jspb.test.OptionalFields " {
  import OptionalFields = proto.jspb.test.OptionalFields;
  export default OptionalFields;
}

declare module "goog:proto.jspb.test.OuterEnum " {
  import OuterEnum = proto.jspb.test.OuterEnum;
  export default OuterEnum;
}

declare module "goog:proto.jspb.test.OuterMessage " {
  import OuterMessage = proto.jspb.test.OuterMessage;
  export default OuterMessage;
}

declare module "goog:proto.jspb.test.Simple1 " {
  import Simple1 = proto.jspb.test.Simple1;
  export default Simple1;
}

declare module "goog:proto.jspb.test.Simple2 " {
  import Simple2 = proto.jspb.test.Simple2;
  export default Simple2;
}

declare module "goog:proto.jspb.test.SpecialCases " {
  import SpecialCases = proto.jspb.test.SpecialCases;
  export default SpecialCases;
}

declare module "goog:proto.jspb.test.TestAllowAliasEnum " {
  import TestAllowAliasEnum = proto.jspb.test.TestAllowAliasEnum;
  export default TestAllowAliasEnum;
}

declare module "goog:proto.jspb.test.TestClone " {
  import TestClone = proto.jspb.test.TestClone;
  export default TestClone;
}

declare module "goog:proto.jspb.test.TestCloneExtension " {
  import TestCloneExtension = proto.jspb.test.TestCloneExtension;
  export default TestCloneExtension;
}

declare module "goog:proto.jspb.test.TestEndsWithBytes " {
  import TestEndsWithBytes = proto.jspb.test.TestEndsWithBytes;
  export default TestEndsWithBytes;
}

declare module "goog:proto.jspb.test.TestGroup " {
  import TestGroup = proto.jspb.test.TestGroup;
  export default TestGroup;
}

declare module "goog:proto.jspb.test.TestGroup1 " {
  import TestGroup1 = proto.jspb.test.TestGroup1;
  export default TestGroup1;
}

declare module "goog:proto.jspb.test.TestLastFieldBeforePivot " {
  import TestLastFieldBeforePivot = proto.jspb.test.TestLastFieldBeforePivot;
  export default TestLastFieldBeforePivot;
}

declare module "goog:proto.jspb.test.TestMapFieldsNoBinary " {
  import TestMapFieldsNoBinary = proto.jspb.test.TestMapFieldsNoBinary;
  export default TestMapFieldsNoBinary;
}

declare module "goog:proto.jspb.test.TestMessageWithOneof " {
  import TestMessageWithOneof = proto.jspb.test.TestMessageWithOneof;
  export default TestMessageWithOneof;
}

declare module "goog:proto.jspb.test.TestReservedNames " {
  import TestReservedNames = proto.jspb.test.TestReservedNames;
  export default TestReservedNames;
}

declare module "goog:proto.jspb.test.TestReservedNamesExtension " {
  import TestReservedNamesExtension = proto.jspb.test.TestReservedNamesExtension;
  export default TestReservedNamesExtension;
}

import BooleanFields = proto.jspb.test.BooleanFields;
import CloneExtension = proto.jspb.test.CloneExtension;
import Complex = proto.jspb.test.Complex;
import Deeply = proto.jspb.test.Deeply;
import DefaultValues = proto.jspb.test.DefaultValues;
import Empty = proto.jspb.test.Empty;
import EnumContainer = proto.jspb.test.EnumContainer;
import FloatingPointFields = proto.jspb.test.FloatingPointFields;
import HasExtensions = proto.jspb.test.HasExtensions;
import IndirectExtension = proto.jspb.test.IndirectExtension;
import Int64Types = proto.jspb.test.Int64Types;
import IsExtension = proto.jspb.test.IsExtension;
import MapValueEnumNoBinary = proto.jspb.test.MapValueEnumNoBinary;
import MapValueMessageNoBinary = proto.jspb.test.MapValueMessageNoBinary;
import MineField = proto.jspb.test.MineField;
import OptionalFields = proto.jspb.test.OptionalFields;
import OuterEnum = proto.jspb.test.OuterEnum;
import OuterMessage = proto.jspb.test.OuterMessage;
import Simple1 = proto.jspb.test.Simple1;
import Simple2 = proto.jspb.test.Simple2;
import SpecialCases = proto.jspb.test.SpecialCases;
import TestAllowAliasEnum = proto.jspb.test.TestAllowAliasEnum;
import TestClone = proto.jspb.test.TestClone;
import TestCloneExtension = proto.jspb.test.TestCloneExtension;
import TestEndsWithBytes = proto.jspb.test.TestEndsWithBytes;
import TestGroup = proto.jspb.test.TestGroup;
import TestGroup1 = proto.jspb.test.TestGroup1;
import TestLastFieldBeforePivot = proto.jspb.test.TestLastFieldBeforePivot;
import TestMapFieldsNoBinary = proto.jspb.test.TestMapFieldsNoBinary;
import TestMessageWithOneof = proto.jspb.test.TestMessageWithOneof;
import TestReservedNames = proto.jspb.test.TestReservedNames;
import TestReservedNamesExtension = proto.jspb.test.TestReservedNamesExtension;

export {
  BooleanFields,
  CloneExtension,
  Complex,
  Deeply,
  DefaultValues,
  Empty,
  EnumContainer,
  FloatingPointFields,
  HasExtensions,
  IndirectExtension,
  Int64Types,
  IsExtension,
  MapValueEnumNoBinary,
  MapValueMessageNoBinary,
  MineField,
  OptionalFields,
  OuterEnum,
  OuterMessage,
  Simple1,
  Simple2,
  SpecialCases,
  TestAllowAliasEnum,
  TestClone,
  TestCloneExtension,
  TestEndsWithBytes,
  TestGroup,
  TestGroup1,
  TestLastFieldBeforePivot,
  TestMapFieldsNoBinary,
  TestMessageWithOneof,
  TestReservedNames,
  TestReservedNamesExtension,
};

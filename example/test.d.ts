import * as jspb from 'google-protobuf';

export class Empty extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: Empty): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): Empty;
  static deserializeBinaryFromReader(msg: Empty, reader: jspb.BinaryReader): Empty;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
}

export class EnumContainer extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: EnumContainer): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): EnumContainer;
  static deserializeBinaryFromReader(msg: EnumContainer, reader: jspb.BinaryReader): EnumContainer;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: EnumContainer, writer: jspb.BinaryWriter): void;
  getOuterEnum(): OuterEnum;
  setOuterEnum(value: OuterEnum): EnumContainer;
  clearOuterEnum(): EnumContainer;
  hasOuterEnum(): boolean;
}

export class Simple1 extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: Simple1): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): Simple1;
  static deserializeBinaryFromReader(msg: Simple1, reader: jspb.BinaryReader): Simple1;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: Simple1, writer: jspb.BinaryWriter): void;
  getAString(): string;
  setAString(value: string): Simple1;
  clearAString(): Simple1;
  hasAString(): boolean;
  getARepeatedStringList(): string[];
  setARepeatedStringList(value: string[]): Simple1;
  addARepeatedString(value: string, index?: number): Simple1;
  clearARepeatedStringList(): Simple1;
  getABoolean(): boolean;
  setABoolean(value: boolean): Simple1;
  clearABoolean(): Simple1;
  hasABoolean(): boolean;
}

export class Simple2 extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: Simple2): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): Simple2;
  static deserializeBinaryFromReader(msg: Simple2, reader: jspb.BinaryReader): Simple2;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: Simple2, writer: jspb.BinaryWriter): void;
  getAString(): string;
  setAString(value: string): Simple2;
  clearAString(): Simple2;
  hasAString(): boolean;
  getARepeatedStringList(): string[];
  setARepeatedStringList(value: string[]): Simple2;
  addARepeatedString(value: string, index?: number): Simple2;
  clearARepeatedStringList(): Simple2;
}

export class SpecialCases extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: SpecialCases): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): SpecialCases;
  static deserializeBinaryFromReader(msg: SpecialCases, reader: jspb.BinaryReader): SpecialCases;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: SpecialCases, writer: jspb.BinaryWriter): void;
  getNormal(): string;
  setNormal(value: string): SpecialCases;
  clearNormal(): SpecialCases;
  hasNormal(): boolean;
  getDefault(): string;
  setDefault(value: string): SpecialCases;
  clearDefault(): SpecialCases;
  hasDefault(): boolean;
  getFunction(): string;
  setFunction(value: string): SpecialCases;
  clearFunction(): SpecialCases;
  hasFunction(): boolean;
  getVar(): string;
  setVar(value: string): SpecialCases;
  clearVar(): SpecialCases;
  hasVar(): boolean;
}

export class OptionalFields extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: OptionalFields): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): OptionalFields;
  static deserializeBinaryFromReader(msg: OptionalFields, reader: jspb.BinaryReader): OptionalFields;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: OptionalFields, writer: jspb.BinaryWriter): void;
  getAString(): string;
  setAString(value: string): OptionalFields;
  clearAString(): OptionalFields;
  hasAString(): boolean;
  getABool(): boolean;
  setABool(value: boolean): OptionalFields;
  clearABool(): OptionalFields;
  hasABool(): boolean;
  getANestedMessage(): OptionalFields.Nested | null;
  setANestedMessage(value: OptionalFields.Nested | null | undefined): OptionalFields;
  clearANestedMessage(): OptionalFields;
  hasANestedMessage(): boolean;
  getARepeatedMessageList(): OptionalFields.Nested[];
  setARepeatedMessageList(value: OptionalFields.Nested[]): OptionalFields;
  addARepeatedMessage(value?: OptionalFields.Nested, index?: number): OptionalFields.Nested;
  clearARepeatedMessageList(): OptionalFields;
  getARepeatedStringList(): string[];
  setARepeatedStringList(value: string[]): OptionalFields;
  addARepeatedString(value: string, index?: number): OptionalFields;
  clearARepeatedStringList(): OptionalFields;
}

export namespace OptionalFields {
  class Nested extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): { [key: string]: unknown };
    static toObject(includeInstance: boolean | undefined, msg: OptionalFields.Nested): { [key: string]: unknown };
    static deserializeBinary(bytes: jspb.ByteSource): OptionalFields.Nested;
    static deserializeBinaryFromReader(msg: OptionalFields.Nested, reader: jspb.BinaryReader): OptionalFields.Nested;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: OptionalFields.Nested, writer: jspb.BinaryWriter): void;
    getAnInt(): number;
    setAnInt(value: number): OptionalFields.Nested;
    clearAnInt(): OptionalFields.Nested;
    hasAnInt(): boolean;
  }

}

export class HasExtensions extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: HasExtensions): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): HasExtensions;
  static deserializeBinaryFromReader(msg: HasExtensions, reader: jspb.BinaryReader): HasExtensions;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: HasExtensions, writer: jspb.BinaryWriter): void;
  getStr1(): string;
  setStr1(value: string): HasExtensions;
  clearStr1(): HasExtensions;
  hasStr1(): boolean;
  getStr2(): string;
  setStr2(value: string): HasExtensions;
  clearStr2(): HasExtensions;
  hasStr2(): boolean;
  getStr3(): string;
  setStr3(value: string): HasExtensions;
  clearStr3(): HasExtensions;
  hasStr3(): boolean;
}

export class Complex extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: Complex): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): Complex;
  static deserializeBinaryFromReader(msg: Complex, reader: jspb.BinaryReader): Complex;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: Complex, writer: jspb.BinaryWriter): void;
  getAString(): string;
  setAString(value: string): Complex;
  clearAString(): Complex;
  hasAString(): boolean;
  getAnOutOfOrderBool(): boolean;
  setAnOutOfOrderBool(value: boolean): Complex;
  clearAnOutOfOrderBool(): Complex;
  hasAnOutOfOrderBool(): boolean;
  getANestedMessage(): Complex.Nested | null;
  setANestedMessage(value: Complex.Nested | null | undefined): Complex;
  clearANestedMessage(): Complex;
  hasANestedMessage(): boolean;
  getARepeatedMessageList(): Complex.Nested[];
  setARepeatedMessageList(value: Complex.Nested[]): Complex;
  addARepeatedMessage(value?: Complex.Nested, index?: number): Complex.Nested;
  clearARepeatedMessageList(): Complex;
  getARepeatedStringList(): string[];
  setARepeatedStringList(value: string[]): Complex;
  addARepeatedString(value: string, index?: number): Complex;
  clearARepeatedStringList(): Complex;
  getAFloatingPointField(): number;
  setAFloatingPointField(value: number): Complex;
  clearAFloatingPointField(): Complex;
  hasAFloatingPointField(): boolean;
}

export namespace Complex {
  class Nested extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): { [key: string]: unknown };
    static toObject(includeInstance: boolean | undefined, msg: Complex.Nested): { [key: string]: unknown };
    static deserializeBinary(bytes: jspb.ByteSource): Complex.Nested;
    static deserializeBinaryFromReader(msg: Complex.Nested, reader: jspb.BinaryReader): Complex.Nested;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: Complex.Nested, writer: jspb.BinaryWriter): void;
    getAnInt(): number;
    setAnInt(value: number): Complex.Nested;
    clearAnInt(): Complex.Nested;
    hasAnInt(): boolean;
  }

}

export class OuterMessage extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: OuterMessage): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): OuterMessage;
  static deserializeBinaryFromReader(msg: OuterMessage, reader: jspb.BinaryReader): OuterMessage;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: OuterMessage, writer: jspb.BinaryWriter): void;
}

export namespace OuterMessage {
  class Complex extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): { [key: string]: unknown };
    static toObject(includeInstance: boolean | undefined, msg: OuterMessage.Complex): { [key: string]: unknown };
    static deserializeBinary(bytes: jspb.ByteSource): OuterMessage.Complex;
    static deserializeBinaryFromReader(msg: OuterMessage.Complex, reader: jspb.BinaryReader): OuterMessage.Complex;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: OuterMessage.Complex, writer: jspb.BinaryWriter): void;
    getInnerComplexField(): number;
    setInnerComplexField(value: number): OuterMessage.Complex;
    clearInnerComplexField(): OuterMessage.Complex;
    hasInnerComplexField(): boolean;
  }

}

export class MineField extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: MineField): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): MineField;
  static deserializeBinaryFromReader(msg: MineField, reader: jspb.BinaryReader): MineField;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: MineField, writer: jspb.BinaryWriter): void;
  getCookie(): string;
  setCookie(value: string): MineField;
  clearCookie(): MineField;
  hasCookie(): boolean;
}

export class IsExtension extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: IsExtension): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): IsExtension;
  static deserializeBinaryFromReader(msg: IsExtension, reader: jspb.BinaryReader): IsExtension;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: IsExtension, writer: jspb.BinaryWriter): void;
  getExt1(): string;
  setExt1(value: string): IsExtension;
  clearExt1(): IsExtension;
  hasExt1(): boolean;
}

export class IndirectExtension extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: IndirectExtension): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): IndirectExtension;
  static deserializeBinaryFromReader(msg: IndirectExtension, reader: jspb.BinaryReader): IndirectExtension;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: IndirectExtension, writer: jspb.BinaryWriter): void;
}

export class DefaultValues extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: DefaultValues): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): DefaultValues;
  static deserializeBinaryFromReader(msg: DefaultValues, reader: jspb.BinaryReader): DefaultValues;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: DefaultValues, writer: jspb.BinaryWriter): void;
  getStringField(): string;
  setStringField(value: string): DefaultValues;
  clearStringField(): DefaultValues;
  hasStringField(): boolean;
  getBoolField(): boolean;
  setBoolField(value: boolean): DefaultValues;
  clearBoolField(): DefaultValues;
  hasBoolField(): boolean;
  getIntField(): number;
  setIntField(value: number): DefaultValues;
  clearIntField(): DefaultValues;
  hasIntField(): boolean;
  getEnumField(): DefaultValues.Enum;
  setEnumField(value: DefaultValues.Enum): DefaultValues;
  clearEnumField(): DefaultValues;
  hasEnumField(): boolean;
  getEmptyField(): string;
  setEmptyField(value: string): DefaultValues;
  clearEmptyField(): DefaultValues;
  hasEmptyField(): boolean;
  getBytesField(): (string|Uint8Array);
  getBytesField_asB64(): string;
  getBytesField_asU8(): Uint8Array;
  setBytesField(value: (string|Uint8Array)): DefaultValues;
  clearBytesField(): DefaultValues;
  hasBytesField(): boolean;
}

export namespace DefaultValues {
  enum Enum {
    E1 = 13,
    E2 = 77,
  }

}

export class FloatingPointFields extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: FloatingPointFields): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): FloatingPointFields;
  static deserializeBinaryFromReader(msg: FloatingPointFields, reader: jspb.BinaryReader): FloatingPointFields;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: FloatingPointFields, writer: jspb.BinaryWriter): void;
  getOptionalFloatField(): number;
  setOptionalFloatField(value: number): FloatingPointFields;
  clearOptionalFloatField(): FloatingPointFields;
  hasOptionalFloatField(): boolean;
  getRequiredFloatField(): number;
  setRequiredFloatField(value: number): FloatingPointFields;
  clearRequiredFloatField(): FloatingPointFields;
  hasRequiredFloatField(): boolean;
  getRepeatedFloatFieldList(): number[];
  setRepeatedFloatFieldList(value: number[]): FloatingPointFields;
  addRepeatedFloatField(value: number, index?: number): FloatingPointFields;
  clearRepeatedFloatFieldList(): FloatingPointFields;
  getDefaultFloatField(): number;
  setDefaultFloatField(value: number): FloatingPointFields;
  clearDefaultFloatField(): FloatingPointFields;
  hasDefaultFloatField(): boolean;
  getOptionalDoubleField(): number;
  setOptionalDoubleField(value: number): FloatingPointFields;
  clearOptionalDoubleField(): FloatingPointFields;
  hasOptionalDoubleField(): boolean;
  getRequiredDoubleField(): number;
  setRequiredDoubleField(value: number): FloatingPointFields;
  clearRequiredDoubleField(): FloatingPointFields;
  hasRequiredDoubleField(): boolean;
  getRepeatedDoubleFieldList(): number[];
  setRepeatedDoubleFieldList(value: number[]): FloatingPointFields;
  addRepeatedDoubleField(value: number, index?: number): FloatingPointFields;
  clearRepeatedDoubleFieldList(): FloatingPointFields;
  getDefaultDoubleField(): number;
  setDefaultDoubleField(value: number): FloatingPointFields;
  clearDefaultDoubleField(): FloatingPointFields;
  hasDefaultDoubleField(): boolean;
}

export class BooleanFields extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: BooleanFields): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): BooleanFields;
  static deserializeBinaryFromReader(msg: BooleanFields, reader: jspb.BinaryReader): BooleanFields;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: BooleanFields, writer: jspb.BinaryWriter): void;
  getOptionalBooleanField(): boolean;
  setOptionalBooleanField(value: boolean): BooleanFields;
  clearOptionalBooleanField(): BooleanFields;
  hasOptionalBooleanField(): boolean;
  getRequiredBooleanField(): boolean;
  setRequiredBooleanField(value: boolean): BooleanFields;
  clearRequiredBooleanField(): BooleanFields;
  hasRequiredBooleanField(): boolean;
  getRepeatedBooleanFieldList(): boolean[];
  setRepeatedBooleanFieldList(value: boolean[]): BooleanFields;
  addRepeatedBooleanField(value: boolean, index?: number): BooleanFields;
  clearRepeatedBooleanFieldList(): BooleanFields;
  getDefaultBooleanField(): boolean;
  setDefaultBooleanField(value: boolean): BooleanFields;
  clearDefaultBooleanField(): BooleanFields;
  hasDefaultBooleanField(): boolean;
}

export class TestClone extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestClone): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestClone;
  static deserializeBinaryFromReader(msg: TestClone, reader: jspb.BinaryReader): TestClone;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestClone, writer: jspb.BinaryWriter): void;
  getStr(): string;
  setStr(value: string): TestClone;
  clearStr(): TestClone;
  hasStr(): boolean;
  getSimple1(): Simple1 | null;
  setSimple1(value: Simple1 | null | undefined): TestClone;
  clearSimple1(): TestClone;
  hasSimple1(): boolean;
  getSimple2List(): Simple1[];
  setSimple2List(value: Simple1[]): TestClone;
  addSimple2(value?: Simple1, index?: number): Simple1;
  clearSimple2List(): TestClone;
  getBytesField(): (string|Uint8Array);
  getBytesField_asB64(): string;
  getBytesField_asU8(): Uint8Array;
  setBytesField(value: (string|Uint8Array)): TestClone;
  clearBytesField(): TestClone;
  hasBytesField(): boolean;
  getUnused(): string;
  setUnused(value: string): TestClone;
  clearUnused(): TestClone;
  hasUnused(): boolean;
}

export class TestCloneExtension extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestCloneExtension): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestCloneExtension;
  static deserializeBinaryFromReader(msg: TestCloneExtension, reader: jspb.BinaryReader): TestCloneExtension;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestCloneExtension, writer: jspb.BinaryWriter): void;
  getF(): number;
  setF(value: number): TestCloneExtension;
  clearF(): TestCloneExtension;
  hasF(): boolean;
}

export class CloneExtension extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: CloneExtension): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): CloneExtension;
  static deserializeBinaryFromReader(msg: CloneExtension, reader: jspb.BinaryReader): CloneExtension;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: CloneExtension, writer: jspb.BinaryWriter): void;
  getExt(): string;
  setExt(value: string): CloneExtension;
  clearExt(): CloneExtension;
  hasExt(): boolean;
}

export class TestGroup extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestGroup): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestGroup;
  static deserializeBinaryFromReader(msg: TestGroup, reader: jspb.BinaryReader): TestGroup;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestGroup, writer: jspb.BinaryWriter): void;
  getRepeatedGroupList(): TestGroup.RepeatedGroup[];
  setRepeatedGroupList(value: TestGroup.RepeatedGroup[]): TestGroup;
  addRepeatedGroup(value?: TestGroup.RepeatedGroup, index?: number): TestGroup.RepeatedGroup;
  clearRepeatedGroupList(): TestGroup;
  getRequiredGroup(): TestGroup.RequiredGroup;
  setRequiredGroup(value: TestGroup.RequiredGroup): TestGroup;
  clearRequiredGroup(): TestGroup;
  hasRequiredGroup(): boolean;
  getOptionalGroup(): TestGroup.OptionalGroup | null;
  setOptionalGroup(value: TestGroup.OptionalGroup | null | undefined): TestGroup;
  clearOptionalGroup(): TestGroup;
  hasOptionalGroup(): boolean;
  getId(): string;
  setId(value: string): TestGroup;
  clearId(): TestGroup;
  hasId(): boolean;
  getRequiredSimple(): Simple2;
  setRequiredSimple(value: Simple2): TestGroup;
  clearRequiredSimple(): TestGroup;
  hasRequiredSimple(): boolean;
  getOptionalSimple(): Simple2 | null;
  setOptionalSimple(value: Simple2 | null | undefined): TestGroup;
  clearOptionalSimple(): TestGroup;
  hasOptionalSimple(): boolean;
}

export namespace TestGroup {
  class RepeatedGroup extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): { [key: string]: unknown };
    static toObject(includeInstance: boolean | undefined, msg: TestGroup.RepeatedGroup): { [key: string]: unknown };
    static deserializeBinary(bytes: jspb.ByteSource): TestGroup.RepeatedGroup;
    static deserializeBinaryFromReader(msg: TestGroup.RepeatedGroup, reader: jspb.BinaryReader): TestGroup.RepeatedGroup;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: TestGroup.RepeatedGroup, writer: jspb.BinaryWriter): void;
    getId(): string;
    setId(value: string): TestGroup.RepeatedGroup;
    clearId(): TestGroup.RepeatedGroup;
    hasId(): boolean;
    getSomeBoolList(): boolean[];
    setSomeBoolList(value: boolean[]): TestGroup.RepeatedGroup;
    addSomeBool(value: boolean, index?: number): TestGroup.RepeatedGroup;
    clearSomeBoolList(): TestGroup.RepeatedGroup;
  }

  class RequiredGroup extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): { [key: string]: unknown };
    static toObject(includeInstance: boolean | undefined, msg: TestGroup.RequiredGroup): { [key: string]: unknown };
    static deserializeBinary(bytes: jspb.ByteSource): TestGroup.RequiredGroup;
    static deserializeBinaryFromReader(msg: TestGroup.RequiredGroup, reader: jspb.BinaryReader): TestGroup.RequiredGroup;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: TestGroup.RequiredGroup, writer: jspb.BinaryWriter): void;
    getId(): string;
    setId(value: string): TestGroup.RequiredGroup;
    clearId(): TestGroup.RequiredGroup;
    hasId(): boolean;
  }

  class OptionalGroup extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): { [key: string]: unknown };
    static toObject(includeInstance: boolean | undefined, msg: TestGroup.OptionalGroup): { [key: string]: unknown };
    static deserializeBinary(bytes: jspb.ByteSource): TestGroup.OptionalGroup;
    static deserializeBinaryFromReader(msg: TestGroup.OptionalGroup, reader: jspb.BinaryReader): TestGroup.OptionalGroup;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: TestGroup.OptionalGroup, writer: jspb.BinaryWriter): void;
    getId(): string;
    setId(value: string): TestGroup.OptionalGroup;
    clearId(): TestGroup.OptionalGroup;
    hasId(): boolean;
  }

}

export class TestGroup1 extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestGroup1): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestGroup1;
  static deserializeBinaryFromReader(msg: TestGroup1, reader: jspb.BinaryReader): TestGroup1;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestGroup1, writer: jspb.BinaryWriter): void;
  getGroup(): TestGroup.RepeatedGroup | null;
  setGroup(value: TestGroup.RepeatedGroup | null | undefined): TestGroup1;
  clearGroup(): TestGroup1;
  hasGroup(): boolean;
}

export class TestReservedNames extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestReservedNames): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestReservedNames;
  static deserializeBinaryFromReader(msg: TestReservedNames, reader: jspb.BinaryReader): TestReservedNames;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestReservedNames, writer: jspb.BinaryWriter): void;
  getExtension$(): number;
  setExtension$(value: number): TestReservedNames;
  clearExtension$(): TestReservedNames;
  hasExtension$(): boolean;
}

export class TestReservedNamesExtension extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestReservedNamesExtension): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestReservedNamesExtension;
  static deserializeBinaryFromReader(msg: TestReservedNamesExtension, reader: jspb.BinaryReader): TestReservedNamesExtension;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestReservedNamesExtension, writer: jspb.BinaryWriter): void;
}

export class TestMessageWithOneof extends jspb.Message {
  constructor(data?: any[] | null);
  getPartialOneofCase(): TestMessageWithOneof.PartialOneofCase;
  getRecursiveOneofCase(): TestMessageWithOneof.RecursiveOneofCase;
  getDefaultOneofACase(): TestMessageWithOneof.DefaultOneofACase;
  getDefaultOneofBCase(): TestMessageWithOneof.DefaultOneofBCase;
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestMessageWithOneof): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestMessageWithOneof;
  static deserializeBinaryFromReader(msg: TestMessageWithOneof, reader: jspb.BinaryReader): TestMessageWithOneof;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestMessageWithOneof, writer: jspb.BinaryWriter): void;
  getPone(): string;
  setPone(value: string): TestMessageWithOneof;
  clearPone(): TestMessageWithOneof;
  hasPone(): boolean;
  getPthree(): string;
  setPthree(value: string): TestMessageWithOneof;
  clearPthree(): TestMessageWithOneof;
  hasPthree(): boolean;
  getRone(): TestMessageWithOneof | null;
  setRone(value: TestMessageWithOneof | null | undefined): TestMessageWithOneof;
  clearRone(): TestMessageWithOneof;
  hasRone(): boolean;
  getRtwo(): string;
  setRtwo(value: string): TestMessageWithOneof;
  clearRtwo(): TestMessageWithOneof;
  hasRtwo(): boolean;
  getNormalField(): boolean;
  setNormalField(value: boolean): TestMessageWithOneof;
  clearNormalField(): TestMessageWithOneof;
  hasNormalField(): boolean;
  getRepeatedFieldList(): string[];
  setRepeatedFieldList(value: string[]): TestMessageWithOneof;
  addRepeatedField(value: string, index?: number): TestMessageWithOneof;
  clearRepeatedFieldList(): TestMessageWithOneof;
  getAone(): number;
  setAone(value: number): TestMessageWithOneof;
  clearAone(): TestMessageWithOneof;
  hasAone(): boolean;
  getAtwo(): number;
  setAtwo(value: number): TestMessageWithOneof;
  clearAtwo(): TestMessageWithOneof;
  hasAtwo(): boolean;
  getBone(): number;
  setBone(value: number): TestMessageWithOneof;
  clearBone(): TestMessageWithOneof;
  hasBone(): boolean;
  getBtwo(): number;
  setBtwo(value: number): TestMessageWithOneof;
  clearBtwo(): TestMessageWithOneof;
  hasBtwo(): boolean;
}

export namespace TestMessageWithOneof {
  enum PartialOneofCase {
    PARTIAL_ONEOF_NOT_SET = 0,
    PONE = 3,
    PTHREE = 5,
  }
  enum RecursiveOneofCase {
    RECURSIVE_ONEOF_NOT_SET = 0,
    RONE = 6,
    RTWO = 7,
  }
  enum DefaultOneofACase {
    DEFAULT_ONEOF_A_NOT_SET = 0,
    AONE = 10,
    ATWO = 11,
  }
  enum DefaultOneofBCase {
    DEFAULT_ONEOF_B_NOT_SET = 0,
    BONE = 12,
    BTWO = 13,
  }
}

export class TestEndsWithBytes extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestEndsWithBytes): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestEndsWithBytes;
  static deserializeBinaryFromReader(msg: TestEndsWithBytes, reader: jspb.BinaryReader): TestEndsWithBytes;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestEndsWithBytes, writer: jspb.BinaryWriter): void;
  getValue(): number;
  setValue(value: number): TestEndsWithBytes;
  clearValue(): TestEndsWithBytes;
  hasValue(): boolean;
  getData(): (string|Uint8Array);
  getData_asB64(): string;
  getData_asU8(): Uint8Array;
  setData(value: (string|Uint8Array)): TestEndsWithBytes;
  clearData(): TestEndsWithBytes;
  hasData(): boolean;
}

export class TestLastFieldBeforePivot extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestLastFieldBeforePivot): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestLastFieldBeforePivot;
  static deserializeBinaryFromReader(msg: TestLastFieldBeforePivot, reader: jspb.BinaryReader): TestLastFieldBeforePivot;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestLastFieldBeforePivot, writer: jspb.BinaryWriter): void;
  getLastFieldBeforePivot(): number;
  setLastFieldBeforePivot(value: number): TestLastFieldBeforePivot;
  clearLastFieldBeforePivot(): TestLastFieldBeforePivot;
  hasLastFieldBeforePivot(): boolean;
}

export class Int64Types extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: Int64Types): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): Int64Types;
  static deserializeBinaryFromReader(msg: Int64Types, reader: jspb.BinaryReader): Int64Types;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: Int64Types, writer: jspb.BinaryWriter): void;
  getInt64Normal(): number;
  setInt64Normal(value: number): Int64Types;
  clearInt64Normal(): Int64Types;
  hasInt64Normal(): boolean;
  getInt64String(): string;
  setInt64String(value: string): Int64Types;
  clearInt64String(): Int64Types;
  hasInt64String(): boolean;
  getInt64Number(): number;
  setInt64Number(value: number): Int64Types;
  clearInt64Number(): Int64Types;
  hasInt64Number(): boolean;
}

export class TestMapFieldsNoBinary extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestMapFieldsNoBinary): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestMapFieldsNoBinary;
  static deserializeBinaryFromReader(msg: TestMapFieldsNoBinary, reader: jspb.BinaryReader): TestMapFieldsNoBinary;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestMapFieldsNoBinary, writer: jspb.BinaryWriter): void;
  getMapStringStringMap(noLazyCreate?: boolean): jspb.Map<string,string> | undefined;
  clearMapStringStringMap(): TestMapFieldsNoBinary;
  getMapStringInt32Map(noLazyCreate?: boolean): jspb.Map<string,number> | undefined;
  clearMapStringInt32Map(): TestMapFieldsNoBinary;
  getMapStringInt64Map(noLazyCreate?: boolean): jspb.Map<string,number> | undefined;
  clearMapStringInt64Map(): TestMapFieldsNoBinary;
  getMapStringBoolMap(noLazyCreate?: boolean): jspb.Map<string,boolean> | undefined;
  clearMapStringBoolMap(): TestMapFieldsNoBinary;
  getMapStringDoubleMap(noLazyCreate?: boolean): jspb.Map<string,number> | undefined;
  clearMapStringDoubleMap(): TestMapFieldsNoBinary;
  getMapStringEnumMap(noLazyCreate?: boolean): jspb.Map<string,MapValueEnumNoBinary> | undefined;
  clearMapStringEnumMap(): TestMapFieldsNoBinary;
  getMapStringMsgMap(noLazyCreate?: boolean): jspb.Map<string,MapValueMessageNoBinary> | undefined;
  clearMapStringMsgMap(): TestMapFieldsNoBinary;
  getMapInt32StringMap(noLazyCreate?: boolean): jspb.Map<number,string> | undefined;
  clearMapInt32StringMap(): TestMapFieldsNoBinary;
  getMapInt64StringMap(noLazyCreate?: boolean): jspb.Map<number,string> | undefined;
  clearMapInt64StringMap(): TestMapFieldsNoBinary;
  getMapBoolStringMap(noLazyCreate?: boolean): jspb.Map<boolean,string> | undefined;
  clearMapBoolStringMap(): TestMapFieldsNoBinary;
  getTestMapFields(): TestMapFieldsNoBinary | null;
  setTestMapFields(value: TestMapFieldsNoBinary | null | undefined): TestMapFieldsNoBinary;
  clearTestMapFields(): TestMapFieldsNoBinary;
  hasTestMapFields(): boolean;
  getMapStringTestmapfieldsMap(noLazyCreate?: boolean): jspb.Map<string,TestMapFieldsNoBinary> | undefined;
  clearMapStringTestmapfieldsMap(): TestMapFieldsNoBinary;
}

export class MapValueMessageNoBinary extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: MapValueMessageNoBinary): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): MapValueMessageNoBinary;
  static deserializeBinaryFromReader(msg: MapValueMessageNoBinary, reader: jspb.BinaryReader): MapValueMessageNoBinary;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: MapValueMessageNoBinary, writer: jspb.BinaryWriter): void;
  getFoo(): number;
  setFoo(value: number): MapValueMessageNoBinary;
  clearFoo(): MapValueMessageNoBinary;
  hasFoo(): boolean;
}

export class Deeply extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: Deeply): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): Deeply;
  static deserializeBinaryFromReader(msg: Deeply, reader: jspb.BinaryReader): Deeply;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: Deeply, writer: jspb.BinaryWriter): void;
}

export namespace Deeply {
  class Nested extends jspb.Message {
    constructor(data?: any[] | null);
    toObject(includeInstance?: boolean): { [key: string]: unknown };
    static toObject(includeInstance: boolean | undefined, msg: Deeply.Nested): { [key: string]: unknown };
    static deserializeBinary(bytes: jspb.ByteSource): Deeply.Nested;
    static deserializeBinaryFromReader(msg: Deeply.Nested, reader: jspb.BinaryReader): Deeply.Nested;
    serializeBinary(): Uint8Array;
    static serializeBinaryToWriter(message: Deeply.Nested, writer: jspb.BinaryWriter): void;
  }

  namespace Nested {
    class Message extends jspb.Message {
      constructor(data?: any[] | null);
      toObject(includeInstance?: boolean): { [key: string]: unknown };
      static toObject(includeInstance: boolean | undefined, msg: Deeply.Nested.Message): { [key: string]: unknown };
      static deserializeBinary(bytes: jspb.ByteSource): Deeply.Nested.Message;
      static deserializeBinaryFromReader(msg: Deeply.Nested.Message, reader: jspb.BinaryReader): Deeply.Nested.Message;
      serializeBinary(): Uint8Array;
      static serializeBinaryToWriter(message: Deeply.Nested.Message, writer: jspb.BinaryWriter): void;
      getCount(): number;
      setCount(value: number): Deeply.Nested.Message;
      clearCount(): Deeply.Nested.Message;
      hasCount(): boolean;
    }

  }

}

export enum OuterEnum {
  FOO = 1,
  BAR = 2,
}

export enum MapValueEnumNoBinary {
  MAP_VALUE_FOO_NOBINARY = 0,
  MAP_VALUE_BAR_NOBINARY = 1,
  MAP_VALUE_BAZ_NOBINARY = 2,
}

export enum TestAllowAliasEnum {
  TEST_ALLOW_ALIAS_DEFAULT = 0,
  VALUE1 = 1,
}


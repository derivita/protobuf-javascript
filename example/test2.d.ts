import * as jspb from 'google-protobuf';

// comment added after generation for code review:
// ""../protos/" as the path is probably not correct. i.e. here it shouild be either './' or '../example/'
// ideally in the code we'd replace `proto_path` from the command line with `options.output_dir`. I don't see an
// easy way to get at `proto_path`, though, since that parameter goes directly to `protoc`, not to the plugin.
import * as protos_test_pb from '../protos/test.js';

export class TestExtensionsMessage extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: TestExtensionsMessage): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): TestExtensionsMessage;
  static deserializeBinaryFromReader(msg: TestExtensionsMessage, reader: jspb.BinaryReader): TestExtensionsMessage;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: TestExtensionsMessage, writer: jspb.BinaryWriter): void;
  getIntfield(): number;
  setIntfield(value: number): TestExtensionsMessage;
  clearIntfield(): TestExtensionsMessage;
  hasIntfield(): boolean;
}

export declare namespace TestExtensionsMessage {
  const displayName: string | undefined;
}

export class ExtensionMessage extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: ExtensionMessage): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): ExtensionMessage;
  static deserializeBinaryFromReader(msg: ExtensionMessage, reader: jspb.BinaryReader): ExtensionMessage;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: ExtensionMessage, writer: jspb.BinaryWriter): void;
  getExt1(): string;
  setExt1(value: string): ExtensionMessage;
  clearExt1(): ExtensionMessage;
  hasExt1(): boolean;
}

export declare namespace ExtensionMessage {
  const displayName: string | undefined;
}

export class ForeignNestedFieldMessage extends jspb.Message {
  constructor(data?: any[] | null);
  toObject(includeInstance?: boolean): { [key: string]: unknown };
  static toObject(includeInstance: boolean | undefined, msg: ForeignNestedFieldMessage): { [key: string]: unknown };
  static deserializeBinary(bytes: jspb.ByteSource): ForeignNestedFieldMessage;
  static deserializeBinaryFromReader(msg: ForeignNestedFieldMessage, reader: jspb.BinaryReader): ForeignNestedFieldMessage;
  serializeBinary(): Uint8Array;
  static serializeBinaryToWriter(message: ForeignNestedFieldMessage, writer: jspb.BinaryWriter): void;
  getDeeplyNestedMessage(): protos_test_pb.Deeply.Nested.Message | null;
  setDeeplyNestedMessage(value: protos_test_pb.Deeply.Nested.Message | null | undefined): ForeignNestedFieldMessage;
  clearDeeplyNestedMessage(): ForeignNestedFieldMessage;
  hasDeeplyNestedMessage(): boolean;
}

export declare namespace ForeignNestedFieldMessage {
  const displayName: string | undefined;
}


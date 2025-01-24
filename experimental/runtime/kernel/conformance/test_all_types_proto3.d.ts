import { InternalMessage } from '../internal_message.js';
import { Kernel } from '../kernel.js';
/**
 * Handwritten code of conformance.TestAllTypesProto3.
 * Check google/protobuf/test_messages_proto3.proto for more details.
 */
declare class TestAllTypesProto3 implements InternalMessage {
    constructor(accessor?: Kernel);
    /**
     * Create a request instance with the given bytes data.
     * If we directly use the accessor created by the binary decoding, the
     * Kernel instance will only copy the same data over for encoding.  By
     * explicitly fetching data from the previous accessor and setting all fields
     * into a new accessor, we will actually test encoding/decoding for the binary
     * format.
     */
    static deserialize(bytes: ArrayBuffer): TestAllTypesProto3;
    /**
     * Serializes into binary data.
     */
    serialize(): ArrayBuffer;
}
export { TestAllTypesProto3 };

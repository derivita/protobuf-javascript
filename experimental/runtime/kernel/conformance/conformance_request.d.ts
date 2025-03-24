import { WireFormat } from './wire_format.js';
/**
 * Handwritten code of conformance.ConformanceRequest.
 * This is used to send request from the conformance test runner to the testee.
 * Check //third_party/protobuf/testing/protobuf/conformance/conformance.proto
 * for more details.
 */
declare class ConformanceRequest {
    constructor(bytes: ArrayBuffer);
    /**
     * Create a request instance with the given bytes data.
     */
    static deserialize(bytes: ArrayBuffer): ConformanceRequest;
    /**
     * Gets the protobuf_payload.
     */
    getProtobufPayload(): ArrayBuffer;
    /**
     * Gets the requested_output_format.
     */
    getRequestedOutputFormat(): WireFormat;
    /**
     * Gets the message_type.
     */
    getMessageType(): string;
    /**
     * Gets the oneof case for payload field.
     * This implementation assumes only one field in a oneof group is set.
     */
    getPayloadCase(): ConformanceRequest.PayloadCase;
}
declare namespace ConformanceRequest {
    enum PayloadCase {
        PAYLOAD_NOT_SET = 0,
        PROTOBUF_PAYLOAD = 1,
        JSON_PAYLOAD = 2,
        TEXT_PAYLOAD = 8
    }
}
export { ConformanceRequest };

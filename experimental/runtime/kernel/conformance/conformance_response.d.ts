/**
 * Handwritten code of conformance.ConformanceResponse.
 * This is used to send response from the conformance testee to the test runner.
 * Check //third_party/protobuf/testing/protobuf/conformance/conformance.proto
 * for more details.
 */
declare class ConformanceResponse {
    constructor(bytes: ArrayBuffer);
    /**
     * Create an empty response instance.
     */
    static createEmpty(): ConformanceResponse;
    /**
     * Sets parse_error field.
     */
    setParseError(value: string): void;
    /**
     * Sets runtime_error field.
     */
    setRuntimeError(value: string): void;
    /**
     * Sets protobuf_payload field.
     */
    setProtobufPayload(value: ArrayBuffer): void;
    /**
     * Sets skipped field.
     */
    setSkipped(value: string): void;
    /**
     * Serializes into binary data.
     */
    serialize(): ArrayBuffer;
}
export { ConformanceResponse };

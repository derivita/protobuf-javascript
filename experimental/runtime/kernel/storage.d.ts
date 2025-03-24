/**
 * Interface for getting and storing fields of a protobuf message.
 */
interface Storage<FieldType = any> {
    /**
     * Returns the pivot value.
     */
    getPivot(): number;
    /**
     * Sets a field in the specified field number.
     */
    set(fieldNumber: number, field: FieldType): any;
    /**
     * Returns a field at the specified field number.
     */
    get(fieldNumber: number): FieldType | undefined;
    /**
     * Deletes a field from the specified field number.
     */
    delete(fieldNumber: number): any;
    /**
     * Executes the provided function once for each field.
     */
    forEach(callback: any): any;
    /**
     * Creates a shallow copy of the storage.
     */
    shallowCopy(): Storage;
}
declare namespace Storage {
    /**
     * 85% of the proto fields have a field number <= 24:
     * https://plx.corp.google.com/scripts2/script_5d._f02af6_0000_23b1_a15f_001a1139dd02
     */
    var DEFAULT_PIVOT: number;
}
export { Storage };

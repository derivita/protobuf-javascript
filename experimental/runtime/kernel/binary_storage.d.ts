import { Storage } from './storage.js';
/**
 * Class storing all the fields of a binary protobuf message.
 */
declare class BinaryStorage<FieldType = any> implements Storage {
    constructor(pivot?: number);
    /**
     * Fields having a field number no greater than the pivot value are stored
     * into an array for fast access. A field with field number X is stored into
     * the array position X - 1.
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
    shallowCopy(): BinaryStorage;
}
export { BinaryStorage };

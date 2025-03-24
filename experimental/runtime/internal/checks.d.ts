import { WireType } from '../kernel/wire_type.js';
/**
 * Ensures the truth of an expression involving the state of the calling
 * instance, but not involving any parameters to the calling method.
 *
 * For cases where failing fast is pretty important and not failing early could
 * cause bugs that are much harder to debug.
 */
declare function checkCriticalState(state: boolean, message?: string): void;
/**
 * Ensures the truth of an expression involving the state of the calling
 * instance, but not involving any parameters to the calling method.
 */
declare function checkState(state: boolean, message?: string): void;
/**
 * Ensures that `index` specifies a valid position in an indexable object of
 * size `size`. A position index may range from zero to size, inclusive.
 */
declare function checkPositionIndex(index: number, size: number): void;
/**
 * Ensures that `index` specifies a valid position in an indexable object of
 * size `size`. A position index may range from zero to size, inclusive.
 */
declare function checkCriticalPositionIndex(index: number, size: number): void;
/**
 * Ensures that `index` specifies a valid element in an indexable object of
 * size `size`. A element index may range from zero to size, exclusive.
 */
declare function checkElementIndex(index: number, size: number): void;
/**
 * Ensures that `index` specifies a valid element in an indexable object of
 * size `size`. A element index may range from zero to size, exclusive.
 */
declare function checkCriticalElementIndex(index: number, size: number): void;
/**
 * Ensures the range of [start, end) is with the range of [0, size).
 */
declare function checkRange(start: number, end: number, size: number): void;
/**
 * Ensures the range of [start, end) is with the range of [0, size).
 */
declare function checkCriticalRange(start: number, end: number, size: number): void;
/**
 * Ensures that field number is an integer and within the range of
 * [1, MAX_FIELD_NUMBER].
 */
declare function checkFieldNumber(fieldNumber: number): void;
/**
 * Ensures that the value is neither null nor undefined.
 */
declare function checkDefAndNotNull<T = any, R = any>(value: T | null): R | null;
/**
 * Ensures that the value exists and is a function.
 */
declare function checkFunctionExists(func: () => any): void;
/**
 * Ensures that field number is an integer and within the range of
 * [1, MAX_FIELD_NUMBER].
 */
declare function checkCriticalFieldNumber(fieldNumber: number): void;
/**
 * Ensures that wire type is valid.
 */
declare function checkWireType(wireType: WireType): void;
/**
 * Ensures that wire type is valid.
 */
declare function checkCriticalWireType(wireType: WireType): void;
/**
 * Ensures the given value has the correct type.
 */
declare function checkCriticalType(expression: boolean, errorMsg: string): void;
/**
 * Checks whether a given object is a boolean.
 */
declare function checkCriticalTypeBool(value: any): void;
/**
 * Checks whether a given object is an array of boolean.
 */
declare function checkCriticalTypeBoolArray(values: any): void;
/**
 * Checks whether a given object is a ByteString.
 */
declare function checkCriticalTypeByteString(value: any): void;
/**
 * Checks whether a given object is an array of ByteString.
 */
declare function checkCriticalTypeByteStringArray(values: any): void;
/**
 * Checks whether a given object is a number.
 */
declare function checkTypeDouble(value: any): void;
/**
 * Checks whether a given object is a number.
 */
declare function checkCriticalTypeDouble(value: any): void;
/**
 * Checks whether a given object is an array of double.
 */
declare function checkCriticalTypeDoubleArray(values: any): void;
/**
 * Checks whether a given object is a number.
 */
declare function checkTypeSignedInt32(value: any): void;
/**
 * Checks whether a given object is a number.
 */
declare function checkCriticalTypeSignedInt32(value: any): void;
/**
 * Checks whether a given object is an array of numbers.
 */
declare function checkCriticalTypeSignedInt32Array(values: any): void;
/**
 * Ensures that value is a long instance.
 */
declare function checkTypeSignedInt64(value: any): void;
/**
 * Ensures that value is a long instance.
 */
declare function checkCriticalTypeSignedInt64(value: any): void;
/**
 * Checks whether a given object is an array of long instances.
 */
declare function checkCriticalTypeSignedInt64Array(values: any): void;
/**
 * Checks whether a given object is a number and within float32 precision.
 */
declare function checkTypeFloat(value: any): void;
/**
 * Checks whether a given object is a number and within float32 precision.
 */
declare function checkCriticalTypeFloat(value: any): void;
/**
 * Checks whether a given object is an iterable of floats.
 */
declare function checkCriticalTypeFloatIterable(values: any): void;
/**
 * Checks whether a given object is a string.
 */
declare function checkCriticalTypeString(value: any): void;
/**
 * Checks whether a given object is an array of string.
 */
declare function checkCriticalTypeStringArray(values: any): void;
/**
 * Ensures that value is a valid unsigned int32.
 */
declare function checkTypeUnsignedInt32(value: any): void;
/**
 * Ensures that value is a valid unsigned int32.
 */
declare function checkCriticalTypeUnsignedInt32(value: any): void;
/**
 * Checks whether a given object is an array of unsigned int32.
 */
declare function checkCriticalTypeUnsignedInt32Array(values: any): void;
/**
 * Checks whether a given object is an array of message.
 */
declare function checkCriticalTypeMessageArray(values: any): void;
declare const _default: {
    checkDefAndNotNull: typeof checkDefAndNotNull;
    checkCriticalElementIndex: typeof checkCriticalElementIndex;
    checkCriticalFieldNumber: typeof checkCriticalFieldNumber;
    checkCriticalPositionIndex: typeof checkCriticalPositionIndex;
    checkCriticalRange: typeof checkCriticalRange;
    checkCriticalState: typeof checkCriticalState;
    checkCriticalTypeBool: typeof checkCriticalTypeBool;
    checkCriticalTypeBoolArray: typeof checkCriticalTypeBoolArray;
    checkCriticalTypeByteString: typeof checkCriticalTypeByteString;
    checkCriticalTypeByteStringArray: typeof checkCriticalTypeByteStringArray;
    checkCriticalTypeDouble: typeof checkCriticalTypeDouble;
    checkTypeDouble: typeof checkTypeDouble;
    checkCriticalTypeDoubleArray: typeof checkCriticalTypeDoubleArray;
    checkTypeFloat: typeof checkTypeFloat;
    checkCriticalTypeFloat: typeof checkCriticalTypeFloat;
    checkCriticalTypeFloatIterable: typeof checkCriticalTypeFloatIterable;
    checkCriticalTypeMessageArray: typeof checkCriticalTypeMessageArray;
    checkCriticalTypeSignedInt32: typeof checkCriticalTypeSignedInt32;
    checkCriticalTypeSignedInt32Array: typeof checkCriticalTypeSignedInt32Array;
    checkCriticalTypeSignedInt64: typeof checkCriticalTypeSignedInt64;
    checkTypeSignedInt64: typeof checkTypeSignedInt64;
    checkCriticalTypeSignedInt64Array: typeof checkCriticalTypeSignedInt64Array;
    checkCriticalTypeString: typeof checkCriticalTypeString;
    checkCriticalTypeStringArray: typeof checkCriticalTypeStringArray;
    checkCriticalTypeUnsignedInt32: typeof checkCriticalTypeUnsignedInt32;
    checkCriticalTypeUnsignedInt32Array: typeof checkCriticalTypeUnsignedInt32Array;
    checkCriticalType: typeof checkCriticalType;
    checkCriticalWireType: typeof checkCriticalWireType;
    checkElementIndex: typeof checkElementIndex;
    checkFieldNumber: typeof checkFieldNumber;
    checkFunctionExists: typeof checkFunctionExists;
    checkPositionIndex: typeof checkPositionIndex;
    checkRange: typeof checkRange;
    checkState: typeof checkState;
    checkTypeUnsignedInt32: typeof checkTypeUnsignedInt32;
    checkTypeSignedInt32: typeof checkTypeSignedInt32;
    checkWireType: typeof checkWireType;
    CHECK_BOUNDS: boolean;
    CHECK_CRITICAL_BOUNDS: boolean;
    CHECK_STATE: boolean;
    CHECK_CRITICAL_STATE: boolean;
    CHECK_TYPE: boolean;
    CHECK_CRITICAL_TYPE: boolean;
    MAX_FIELD_NUMBER: number;
    POLYFILL_TEXT_ENCODING: boolean;
};
export default _default;

/**
 * Throws an exception with the given message and "Assertion failed" prefixed
 * onto it.
 * @param defaultMessage The message to use if givenMessage is empty.
 * @param defaultArgs The substitution arguments for defaultMessage.
 * @param givenMessage Message supplied by the caller.
 * @param givenArgs The substitution arguments for givenMessage.
 */
export declare function doAssertFailure(defaultMessage: string, defaultArgs: any[] | null, givenMessage: string | undefined, givenArgs: any[]): void;
/**
 * Checks if the condition evaluates to true.
 * @param condition The condition to check.
 * @param opt_message Error message in case of failure.
 * @param args The items to substitute into the failure message.
 * @return The value of the condition.
 */
export declare function assert<T = any>(condition: T | null, opt_message?: string, ...args: any[]): T | null;
/**
 * Checks if the value is a string.
 * @param value The value to check.
 * @param opt_message Error message in case of failure.
 * @param args The items to substitute into the failure message.
 * @return The value, guaranteed to be a string when asserts enabled.
 */
export declare function assertString(value: any, opt_message?: string, ...args: any[]): string;
/**
 * Checks if the value is an Array.
 * @param value The value to check.
 * @param opt_message Error message in case of failure.
 * @param args The items to substitute into the failure message.
 * @return The value, guaranteed to be a non-null array.
 */
export declare function assertArray(value: any, opt_message?: string, ...args: any[]): any[];
/**
 * Triggers a failure. This function is useful in case when we want to add a
 * check in the unreachable area like switch-case statement:
 *
 * <pre>
 * switch(type) {
 * case FOO: doSomething(); break;
 * case BAR: doSomethingElse(); break;
 * default: JspbFail('Unrecognized type: ' + type);
 * // We have only 2 types - "default:" section is unreachable code.
 * }
 * </pre>
 * @param opt_message Error message in case of failure.
 * @param args The items to substitute into the failure message.
 */
export declare function fail(opt_message?: string, ...args: any[]): void;
/**
 * Checks if the value is an instance of the user-defined type.
 *
 * Do not use this to ensure a value is an HTMLElement or a subclass! Cross-
 * document DOM inherits from separate - though identical - browser classes, and
 * such a check will unexpectedly fail.
 * @param value The value to check.
 * @param type A user-defined constructor.
 * @param opt_message Error message in case of failure.
 * @param args The items to substitute into the failure message.
 */
export declare function assertInstanceof<T = any>(value: any, type: {
    new (): T | null;
}, opt_message?: string, ...args: any[]): T | null;

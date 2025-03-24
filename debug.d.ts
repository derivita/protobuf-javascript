import '../closure-library/closure/goog/array/array.js';
import { Message } from './message.js';
/**
 * Turns a proto into a human readable object that can i.e. be written to the
 * console: `console.log(dump(myProto))`.
 * This function makes a best effort and may not work in all cases. It will not
 * work in obfuscated and or optimized code.
 * Use this in environments where {@see Message.prototype.toObject} is
 * not available for code size reasons.
 * @param message A Message.
 */
export declare function dump(message: Message | null): object | null;

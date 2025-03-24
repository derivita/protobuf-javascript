import { InternalMessage } from './internal_message.js';
import { Kernel } from './kernel.js';
declare class MessageSet implements InternalMessage {
    static fromKernel(kernel: Kernel): MessageSet;
    static createEmpty(): MessageSet;
    constructor(kernel: Kernel, itemMap: Map<number, Item>);
    getMessageOrNull<T = any>(typeId: number, instanceCreator: () => (T | null), pivot?: number): T | null;
    getMessageAttach<T = any>(typeId: number, instanceCreator: () => (T | null), pivot?: number): T | null;
    getMessageAccessorOrNull(typeId: number, pivot?: number): Kernel | null;
    clearMessage(typeId: number): void;
    hasMessage(typeId: number): boolean;
    setMessage(typeId: number, value: InternalMessage): void;
    internalGetKernel(): Kernel;
}
declare class Item implements InternalMessage {
    static create(typeId: number, message: InternalMessage): Item;
    static fromKernel(kernel: Kernel): Item;
    constructor(kernel: Kernel);
    getMessage<T = any>(instanceCreator: () => (T | null), pivot?: number): T | null;
    getMessageOrNull<T = any>(instanceCreator: () => (T | null), pivot?: number): T | null;
    getMessageAttach<T = any>(instanceCreator: () => (T | null), pivot?: number): T | null;
    getMessageAccessorOrNull(pivot?: number): Kernel | null;
    setMessage(value: InternalMessage): void;
    getTypeId(): number;
    internalGetKernel(): Kernel;
}
export { MessageSet };

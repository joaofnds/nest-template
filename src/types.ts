export declare type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type constructor = new (...args: unknown[]) => unknown;

/**
 * Extracts the head of a tuple.
 * If you declare `Head<[A, B, C]>` you will get back `A`.
 */
export type Head<X extends readonly unknown[]> = ((
	...args: X
) => unknown) extends (arg: infer U, ...rest: unknown[]) => unknown
	? U
	: never;

/**
 * Extracts the tail of a tuple.
 * If you declare `Tail<[A, B, C]>` you will get back `[B, C]`.
 */
export type Tail<T extends unknown[]> = T extends [unknown, ...infer T]
	? T
	: never;

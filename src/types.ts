export declare type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type constructor = new (...args: unknown[]) => unknown;

/**
 * Extracts the head of a tuple.
 * If you declare `Head<[A, B, C]>` you will get back `A`.
 */
export type Head<X extends readonly any[]> = ((...args: X) => any) extends (
  arg: infer U,
  ...rest: any[]
) => any
  ? U
  : never;

/**
 * Extracts the tail of a tuple.
 * If you declare `Tail<[A, B, C]>` you will get back `[B, C]`.
 */
export type Tail<X extends readonly any[]> = ((...args: X) => any) extends (
  arg: any,
  ...rest: infer U
) => any
  ? U
  : never;

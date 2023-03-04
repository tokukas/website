/**
 * Make all props in `T` type as optional except for some `K` props.
 */
export type OptionalExceptFor<
  T, K extends keyof T
> = Partial<T> & Pick<T, K>;

/**
 * Set specific `K` props in a `T` Type as required.
 */
export type RequiredFor<
  T, K extends keyof T
> = Omit<T, K> & Required<Pick<T, K>>;

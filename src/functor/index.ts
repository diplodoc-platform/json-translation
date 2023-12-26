export interface IFunctor<T> {
    call(val: T): T;
}

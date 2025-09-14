export type UtilsFunction<R = any, P extends Array<any> = any[]> = (...args: P) => R

export declare namespace UtilsFunction {
  export type Return<F extends UtilsFunction> = ReturnType<F>
  export type Params<F extends UtilsFunction> = Parameters<F>
}

export const UtilsFunction = Object.freeze({
  parameters(target: UtilsFunction): string[] {
    throw new Error('Not Implemented')
  }
})

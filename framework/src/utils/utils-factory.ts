import { _Function } from './utils-function'

export type _Factory<R extends object = object, P extends Array<any> = any[]> = _Function<R, P>

export declare namespace _Factory {
  export type Return<F extends _Function> = ReturnType<F>
  export type Params<F extends _Function> = Parameters<F>
}

export const _Factory = Object.freeze(Object.assign({
  extractParameters(target: _Factory): string[] {
    return _Function.extractParameters(target)
  }
}))

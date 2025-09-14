export type UtilsConstructor<R extends object = object, P extends Array<any> = Array<any>> = 
  | ( new (...params: P) => R ) 
  | { new (...params: P): R }

export declare namespace UtilsConstructor {
  export type Instance<C extends UtilsConstructor> = InstanceType<C>

  export type Parameters<C extends UtilsConstructor> = C extends new (...args: infer P) => any ? P : never;
}

export const UtilsConstructor = Object.freeze({
  parameters(target: UtilsConstructor): string[] {
    throw new Error('Not Implemented')
  }
})
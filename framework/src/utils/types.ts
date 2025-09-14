export type Function<R = any, P extends Array<any> = any[]> = (...args: P) => R

export type Factory<R extends object = object, P extends Array<any> = any[]> = Function<R, P>

export type Constructor<R extends object = object, P extends Array<any> = Array<any>> = 
  | ( new (...params: P) => R ) 
  | { new (...params: P): R }

  export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

export type DeepReplace<T, U> = T extends object
  ? { [K in keyof T]: T[K] extends object ? DeepReplace<T[K], U> : U }
  : U

export type DeepRecord<Key extends string | keyof string, Value> = {
  [key in Key]: Value | DeepRecord<Key, Value>
}

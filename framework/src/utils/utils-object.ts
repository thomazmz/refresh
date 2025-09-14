export type UtilsObject = object

export declare namespace UtilsObject {
  export type DeepPartial<T> = T extends UtilsObject
    ? { [P in keyof T]?: DeepPartial<T[P]> }
    : T
  
  export type DeepReplace<T, U> = T extends UtilsObject
    ? { [K in keyof T]: T[K] extends UtilsObject ? DeepReplace<T[K], U> : U }
    : U
  
  export type DeepRecord<Key extends string | keyof string, Value> = {
    [key in Key]: Value | DeepRecord<Key, Value>
  }  
}

export const UtilsObject = {
  ...globalThis.Object,
}
import { CoreValidator } from './core-validator'
import { CoreConfigValidator } from './core-config-validator'

export type CoreConfig<T> =
  T extends readonly [string, CoreValidator<infer V>, ...any[]] ? V :
  T extends Record<string, any> ? { [K in keyof T]: CoreConfig<T[K]> } :
  never

export declare namespace CoreConfig {
  export  type Key = `REFRESH_${string}`

  export type Value = string | number | boolean

  export type Tupple<T extends CoreConfig.Value = CoreConfig.Value> = readonly [Key, CoreValidator<T>, T?]
  
  export type Profile = { readonly [key: Key]: CoreConfig.Tupple | CoreConfig.Profile }

  export type Loader = { load(key: CoreConfig.Key): string | undefined | Promise<string| undefined> }
}

export const CoreConfig = Object.freeze({
  profile<T extends CoreConfig.Profile>(profile: T): Readonly<T> {
    return Object.freeze(profile) 
  },
  
  number(key: CoreConfig.Key, value?: number): CoreConfig.Tupple<number> {
    return [key, CoreConfigValidator.number(), value]
  },
  
  string(key: CoreConfig.Key, value?: string): CoreConfig.Tupple<string> {
    return [key, CoreConfigValidator.string(), value]
  },
  
  boolean(key: CoreConfig.Key, value?: boolean): CoreConfig.Tupple<boolean> {
    return [key, CoreConfigValidator.boolean(), value]
  },
})


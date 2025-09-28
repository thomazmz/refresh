import z from 'zod'
import { Utils } from '@refresh/framework/utils';
import { ContractObject } from './contract-object';

export class ContractInput extends ContractObject {
  public static parse<T extends typeof ContractObject>(this: T, unknown: unknown, errorConstructor: Utils.Constructor<Error, [string]> = Error): z.infer<T['Schema']> {
    const { data, success, error } =  this.Schema.safeParse(unknown)

    if(success) {
      return data as z.infer<T['Schema']>
    }

    throw new errorConstructor(error.issues?.[0]?.message)
  }
}

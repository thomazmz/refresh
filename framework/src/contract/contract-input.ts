import z from 'zod'
import { ContractObject } from './contract-object';

export class ContractInput extends ContractObject {
  public static parse<T extends typeof ContractObject>(this: T, unknown: unknown): z.infer<T['Schema']> {
    return this.Schema.parse(unknown) as z.infer<T['Schema']>
  }
}

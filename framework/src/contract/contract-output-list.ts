import { Utils } from '@refresh/framework/utils'
import { ContractOutput } from './contract-output';

export abstract class ContractOutputList<T> {
  static create<T extends Utils.Constructor>(this: T, ...argumenti: Utils.Constructor.Parameters<T>): InstanceType<T> {
    return new this(...argumenti) as InstanceType<T>;
  }

  public readonly data: Readonly<T[]>;

  public constructor(schema: typeof ContractOutput.Schema, data: T[]) {
    this.data = Object.freeze(data);
  }
}
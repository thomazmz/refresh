import { ContractOutputList } from './contract-output-list'
import { ContractOutput } from './contract-output';

export declare namespace ContractOutputSlice {
  export type Metadata = {
    readonly next: number;
    readonly previous: number;
  }
}

export abstract class ContractOutputSlice<T> extends ContractOutputList<T> {
  readonly next: number;
  readonly previous: number;

  protected constructor(schema: typeof ContractOutput.Schema, data: T[], metadata: ContractOutputSlice.Metadata) {
    super(schema, data);
    this.next = metadata.next;
    this.previous = metadata.previous;
  }
}
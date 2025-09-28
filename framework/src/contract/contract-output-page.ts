import { ContractOutputList } from './contract-output-list'
import { ContractOutput } from './contract-output';

export declare namespace ContractOutputPage {
  export type Metadata = {
    readonly total: number,
    readonly limit: number,
    readonly offset: number,
  }
}

export abstract class ContractOutputPage<T> extends ContractOutputList<T> {
  readonly limit: number;
  readonly offset: number;
  readonly total: number;

  protected constructor(schema: typeof ContractOutput.Schema, data: T[], metadata: ContractOutputPage.Metadata) {
    super(schema, data);
    this.limit = metadata.limit;
    this.offset = metadata.offset;
    this.total = metadata.total;
  }
}
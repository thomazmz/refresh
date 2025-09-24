import z from 'zod'
import { Store } from '@refresh/domain/store'
import * as Contract from '@refresh/framework/contract'

export class CustomerStoreDto extends Contract.Output<Store> {
  @Contract.Schema(z.string())
  public readonly id: string = this._entries.id

  @Contract.Schema(z.string())
  public readonly slug: string = this._entries.slug

  @Contract.Schema(z.string())
  public readonly name: string = this._entries.name

  @Contract.Schema(z.iso.datetime())
  public readonly createdAt: string = this._entries.createdAt.toISOString()

  @Contract.Schema(z.iso.datetime())
  public readonly updatedAt: string = this._entries.updatedAt.toISOString()
}

export class CreateCustomerStoreBody extends Contract.Input {
  @Contract.Schema(z.string())
  public readonly slug: string
  @Contract.Schema(z.string())
  public readonly name: string
}

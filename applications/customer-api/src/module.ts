import * as Express from '@refresh/framework/express'
import { StoreModule } from '@refresh/domain/store'
import { CustomerStoreController } from './store/customer-store.controller'

export const CustomerModule = Express.Module.create()
CustomerModule.useController(CustomerStoreController)
CustomerModule.useModule(StoreModule)



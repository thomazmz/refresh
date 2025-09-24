import * as Express from '@refresh/framework/express'
import { StoreModule } from '@refresh/domain/store'
import { MerchantStoreController } from './store/merchant-store.controller'

export const MarketerModule = Express.Module.create()
MarketerModule.useController(MerchantStoreController)
MarketerModule.useModule(StoreModule)



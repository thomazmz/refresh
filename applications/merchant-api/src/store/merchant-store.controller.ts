import * as Http from '@refresh/framework/http'
import * as Controller from '@refresh/framework/controller'
import { StoreService } from '@refresh/domain/store'
import { CreateMerchantStoreBody, MerchantStoreDto } from './merchant-store.contracts'

@Controller.Router('/stores')
export class MerchantStoreController {
  public constructor(
    private readonly storeService: StoreService
  ) {}

  @Controller.Path('/:id')
  @Controller.Method(Http.Method.Get)
  @Controller.Success(Http.Status.Ok)
  public async getInstances(id: string): Promise<MerchantStoreDto> {
    const store = await this.storeService.getStoreById(id)
    return MerchantStoreDto.create(store)
  }

  @Controller.Path('/')
  @Controller.Method(Http.Method.Post)
  @Controller.Success(Http.Status.Created)
  @Controller.Body(CreateMerchantStoreBody)
  public async createInstance(body: CreateMerchantStoreBody): Promise<MerchantStoreDto> {
    const store = await this.storeService.createStore(body)
    return MerchantStoreDto.create(store)
  }
}
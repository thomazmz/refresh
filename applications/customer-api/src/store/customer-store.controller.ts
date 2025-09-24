import * as Http from '@refresh/framework/http'
import * as Controller from '@refresh/framework/controller'
import { StoreService } from '@refresh/domain/store'
import { CreateCustomerStoreBody, CustomerStoreDto } from './customer-store.contracts'

@Controller.Router('/stores')
export class CustomerStoreController {
  public constructor(
    private readonly storeService: StoreService
  ) {}

  @Controller.Path('/:id')
  @Controller.Method(Http.Method.Get)
  @Controller.Success(Http.Status.Ok)
  public async getInstances(id: string): Promise<CustomerStoreDto> {
    const store = await this.storeService.getStoreById(id)
    return CustomerStoreDto.create(store)
  }

  @Controller.Path('/')
  @Controller.Method(Http.Method.Post)
  @Controller.Success(Http.Status.Created)
  @Controller.Body(CreateCustomerStoreBody)
  public async createInstance(body: CreateCustomerStoreBody): Promise<CustomerStoreDto> {
    const store = await this.storeService.createStore(body)
    return CustomerStoreDto.create(store)
  }
}
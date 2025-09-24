import { StoreRepository } from './store.repository'
import { StoreConfig } from './store.config'
import { Store } from './store.domain'

export class StoreService {
  public constructor(
    private readonly storeRepository: StoreRepository,
    private readonly storeConfig: StoreConfig,
  ) {}

  public getStoreById(id: string): Promise<Store> {
    return this.storeRepository.getById(id)
  }

  public createStore(parameters: {
    name?: string,
    slug?: string,
  }): Promise<Store> {
    return this.storeRepository.create({
      name: parameters.name ?? this.storeConfig.defaultTitle,
      slug: parameters.slug ?? this.storeConfig.defaultSlug,
    })
  }
}
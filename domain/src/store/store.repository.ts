
import { randomUUID } from 'crypto'
import { Store } from './store.domain'

const map: Map<string, Store> = new Map()

export class StoreRepository {
  public create(parameters: { 
    name: string,
    slug: string,
  }): Promise<Store> {
    const id = randomUUID()
    const now = new Date()

    map.set(id, { 
      id,
      name: parameters.name,
      slug: parameters.slug,
      createdAt: now,
      updatedAt: now,
    })

    return this.getById(id)
  }
  
  public async getById(id: string): Promise<Store> {
    const store = await this.findById(id)
    if(!store) throw new Error(`Could not find a store with id ${id}`)
    return store
  }
  
  public async findById(id: string): Promise<Store | undefined> {
    return Promise.resolve(map.get(id))
  }
}
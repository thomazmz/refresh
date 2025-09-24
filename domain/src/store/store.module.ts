
import { Module } from '@refresh/framework/injection'
import { StoreConfigInitializer } from './store.config'
import { StoreRepository } from './store.repository'
import { StoreService } from './store.service'

export const StoreModule = Module.create()

StoreModule.register('storeConfig', {
  initializer: StoreConfigInitializer,
  visibility: 'private',
})

StoreModule.register('storeRepository', { 
  class: StoreRepository,
  visibility: 'private',
  lifecycle: 'scoped',
})

StoreModule.register('storeService', { 
  class: StoreService,
  visibility: 'public',
  lifecycle: 'scoped',
})

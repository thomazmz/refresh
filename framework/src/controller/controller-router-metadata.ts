import * as Utils from '@refresh/framework/utils';
import { ControllerRouteMetadata } from './controller-route-metadata';

const METADATA_KEY = Symbol('__controllerRouterMetadata')

export type ControllerRouterMetadata = {
  readonly path?: string | undefined
  readonly name?: string | undefined
}

export const ControllerRouterMetadata = Object.freeze({
  attach(constructor: Utils.Constructor, metadata: ControllerRouterMetadata): Utils.Constructor {
    const currentMetadata = constructor[METADATA_KEY]

    constructor[METADATA_KEY] = { ...currentMetadata,
      path: metadata.path ?? currentMetadata?.path,
      name: metadata.name ?? currentMetadata?.name,
    }

    return constructor
  },

  extract(constructor: Utils.Constructor): ControllerRouterMetadata {
    return { ...constructor[METADATA_KEY] }
  },

  entries(constructor: Utils.Constructor): [string, ControllerRouteMetadata][] {
    const entries = Object.entries(Object.getOwnPropertyDescriptors(constructor))
    return entries.filter(([_key, descriptor]) => {
      return (typeof descriptor.value === 'function')
    }).filter(([key, _descriptor]) => {
      return (key !== 'constructor')
    }).map(([key, descriptor]) => {
      const metadata = ControllerRouteMetadata.extract(descriptor)
      return [key, metadata]
    })
  }
})

import * as Utils from '@refresh/framework/utils'

const CONTROLLER_ROUTER_METADATA = Symbol('__controller_router_metadata')

export type ControllerRouterMetadata = Readonly<{
  readonly name?: string | undefined
  readonly path?: string | undefined
}>

export const ControllerRouterMetadata = Object.freeze({
  attach(constructor: Utils.Constructor, metadata: ControllerRouterMetadata): void {
    constructor[CONTROLLER_ROUTER_METADATA] = {
      name: metadata.name ?? constructor[CONTROLLER_ROUTER_METADATA]?.name,
      path: metadata.path ?? constructor[CONTROLLER_ROUTER_METADATA]?.path,
    }
  },

  extract(constructor: Utils.Constructor, defaults?: ControllerRouterMetadata): ControllerRouterMetadata {
    return Object.freeze({
      name: constructor[CONTROLLER_ROUTER_METADATA]?.name ?? defaults?.name,
      path: constructor[CONTROLLER_ROUTER_METADATA]?.path ?? defaults?.path,
    })
  },
})
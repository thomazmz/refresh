import * as Utils from '@refresh/framework/utils'

const CONTROLLER_ROUTER_METADATA = Symbol('__controller_router_metadata')

export type ControllerRouterMetadata = Readonly<{
  readonly name?: string | undefined
  readonly path?: string | undefined
}>

export function attachRouterMetadata(constructor: Utils.Constructor, metadata: ControllerRouterMetadata): void {
  constructor[CONTROLLER_ROUTER_METADATA] = {
    name: metadata.name ?? constructor[CONTROLLER_ROUTER_METADATA]?.name,
    path: metadata.path ?? constructor[CONTROLLER_ROUTER_METADATA]?.path,
  }
}

export function extractRouterMetadata(constructor: Utils.Constructor): ControllerRouterMetadata {
  return Object.freeze({
    name: constructor[CONTROLLER_ROUTER_METADATA]?.name,
    path: constructor[CONTROLLER_ROUTER_METADATA]?.path,
  })
}

export function Router<Result extends InstanceType<Utils.Constructor>, Args extends any[]>(path: string) {
  return (constructor: Utils.Constructor<Result, Args>) => {
    attachRouterMetadata(constructor, { path })
    return constructor
  }
}

export function Name<Result extends InstanceType<Utils.Constructor>, Args extends any[]>(name: string) {
  return (constructor: Utils.Constructor<Result, Args>) => {
    attachRouterMetadata(constructor, { name })
    return constructor
  }
}

export const ControllerRouterMetadata = Object.freeze({
  attach: attachRouterMetadata,
  extract: extractRouterMetadata,
})

export const ControllerRouterDecorators = Object.freeze({
  Router,
  Name,
})

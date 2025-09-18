import * as Utils from '@refresh/framework/utils'

const CONTROLLER_CLASS_METADATA_KEY = Symbol('__controller_class_metadata')

export type ControllerClassMetadata = Readonly<{
  readonly path?: string | undefined
  readonly name?: string | undefined
}>

export const ControllerClassMetadata = Object.freeze({
  attach(constructor: Utils.Constructor, metadata: ControllerClassMetadata): void {
    constructor[CONTROLLER_CLASS_METADATA_KEY] = {
      name: metadata.name ?? constructor[CONTROLLER_CLASS_METADATA_KEY]?.name,
      path: metadata.path ?? constructor[CONTROLLER_CLASS_METADATA_KEY]?.path,
    }
  },

  extract(constructor: Utils.Constructor, defaults?: ControllerClassMetadata): ControllerClassMetadata {
    return Object.freeze({
      name: constructor[CONTROLLER_CLASS_METADATA_KEY]?.name ?? defaults?.name,
      path: constructor[CONTROLLER_CLASS_METADATA_KEY]?.path ?? defaults?.path,
    })
  },
})
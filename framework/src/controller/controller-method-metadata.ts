import * as Utils from '@refresh/framework/utils'
import * as Http from '@refresh/framework/http'

const CONTROLLER_METHOD_METADATA_KEY = Symbol('__controller_method_metadata')

export type ControllerMethodMetadata = Readonly<{
  readonly description?: string | undefined
  readonly operation?: string | undefined
  readonly summary?: string | undefined
  readonly success?: Http.Status | undefined
  readonly method?: Http.Method | undefined
  readonly path?: string | undefined
  readonly key?: string | undefined
}>

export const ControllerMethodMetadata = Object.freeze({
  attach(descriptor: TypedPropertyDescriptor<Utils.Function>, metadata: ControllerMethodMetadata): void {
    if (descriptor.value) descriptor.value[CONTROLLER_METHOD_METADATA_KEY] = { ...descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY],
      description: metadata.description ?? descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.description,
      operation: metadata.operation ?? descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.operation,
      summary: metadata.summary ?? descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.summary,
      success: metadata.success ?? descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.success,
      method: metadata.method ?? descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.method,
      path: metadata.path ?? descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.path,
      key: metadata.key ?? descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.key,
    }
  },

  extract(descriptor: TypedPropertyDescriptor<Utils.Function>, defaults?: ControllerMethodMetadata): ControllerMethodMetadata {
    return Object.freeze({
      description: descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.description ?? defaults?.description,
      operation: descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.operation ?? defaults?.operation,
      summary: descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.summary ?? defaults?.summary,
      success: descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.success ?? defaults?.success,
      method: descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.method ?? defaults?.method,
      path: descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.path ?? defaults?.path,
      key: descriptor?.value?.[CONTROLLER_METHOD_METADATA_KEY]?.key ?? defaults?.key,
    })
  },
})

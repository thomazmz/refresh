import * as Utils from '@refresh/framework/utils';
import * as Http from '@refresh/framework/http';

const METADATA_KEY = Symbol('__controller_method_metadata')

export type ControllerRouteMetadata = {
  readonly description?: string | undefined
  readonly parameters?: string[] | undefined
  readonly operation?: string | undefined
  readonly summary?: string | undefined
  readonly success?: Http.Status | undefined
  readonly method?: Http.Method | undefined
  readonly path?: string | undefined
  readonly key?: string | undefined
}

export declare namespace ControllerRouteMetadata {
  export type Method = Utils.Function & { [METADATA_KEY]?: ControllerRouteMetadata}

  export type Descriptor = TypedPropertyDescriptor<ControllerRouteMetadata.Method>
}

export const ControllerRouteMetadata = Object.freeze({
  attach(descriptor: ControllerRouteMetadata.Descriptor, metadata: ControllerRouteMetadata): ControllerRouteMetadata.Descriptor {
    if (descriptor.value) {
      const currentMetadata = descriptor.value[METADATA_KEY]

      if(!currentMetadata?.parameters && !metadata.parameters) {
        const parameters = metadata.parameters ?? Utils.Function.parameters(descriptor.value)
        return this.attach(descriptor, { ...metadata, parameters })
      }

      descriptor.value[METADATA_KEY] = { ...currentMetadata,
        description: metadata.description ?? currentMetadata?.description,
        parameters: metadata.parameters ?? currentMetadata?.parameters,
        operation: metadata.operation ?? currentMetadata?.operation,
        summary: metadata.summary ?? currentMetadata?.summary,
        success: metadata.success ?? currentMetadata?.success,
        method: metadata.method ?? currentMetadata?.method,
        path: metadata.path ?? currentMetadata?.path,
        key: metadata.key ?? currentMetadata?.key,
      }
    }

    return descriptor
  },

  extract(descriptor: ControllerRouteMetadata.Descriptor): ControllerRouteMetadata {
    return Object.freeze({
      description: descriptor?.value?.[METADATA_KEY]?.description,
      parameters: descriptor?.value?.[METADATA_KEY]?.parameters,
      operation: descriptor?.value?.[METADATA_KEY]?.operation,
      summary: descriptor?.value?.[METADATA_KEY]?.summary,
      success: descriptor?.value?.[METADATA_KEY]?.success,
      method: descriptor?.value?.[METADATA_KEY]?.method,
      path: descriptor?.value?.[METADATA_KEY]?.path,
      key: descriptor?.value?.[METADATA_KEY]?.key,
    })
  },
})

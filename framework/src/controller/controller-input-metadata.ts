import * as Utils from '@refresh/framework/utils';

const CONTROLLER_INPUT_METADATA = Symbol('__controller_input_metadata')

export type ControllerInputMetadata = Readonly<{
  readonly [key: number]: string
}>

export const ControllerInputMetadata = Object.freeze({
  attach(descriptor: TypedPropertyDescriptor<Utils.Function>, metadata: ControllerInputMetadata): void {
    if (descriptor.value) descriptor.value[CONTROLLER_INPUT_METADATA] = {
      ...(descriptor.value[CONTROLLER_INPUT_METADATA] ?? {}),
      ...metadata,
    }
  },

  extract(descriptor: TypedPropertyDescriptor<Utils.Function>): ControllerInputMetadata {
    const parameters = typeof descriptor.value === 'function'
      ? Utils.Function.extractParameters(descriptor.value)
      : []

    return Object.freeze({
      ...Object.fromEntries(parameters.entries()),
      ...(descriptor?.value?.[CONTROLLER_INPUT_METADATA] ?? {}),
    });
  },
})

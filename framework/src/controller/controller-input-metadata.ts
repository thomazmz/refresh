import * as Utils from '@refresh/framework/utils';

const CONTROLLER_INPUT_METADATA = Symbol('__controller_input_metadata')

export type ControllerInputMetadata = Readonly<{
  readonly [key: number]: string
}>

function extractInputMetadata(descriptor: TypedPropertyDescriptor<Utils.Function>): ControllerInputMetadata {
  if (descriptor.value && descriptor.value[CONTROLLER_INPUT_METADATA]) {
    return descriptor.value[CONTROLLER_INPUT_METADATA]
  }

  if(typeof descriptor.value === 'function') {
    const parameters = Utils.Function.extractParameters(descriptor.value)

    return Object.freeze({
      ...Object.fromEntries(parameters.entries()),
    });
  }

  return descriptor?.value?.[CONTROLLER_INPUT_METADATA] ?? []
}

export const ControllerInputMetadata = Object.freeze({
  extract: extractInputMetadata,
})

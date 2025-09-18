import * as Http from '@refresh/framework/http'
import * as Utils from '@refresh/framework/utils'
import { ControllerMethodMetadata } from './controller-method-metadata';

export function Summary(summary: string) {
  return (_: unknown, key: string, descriptor: TypedPropertyDescriptor<Utils.Function>) => {
    ControllerMethodMetadata.attach({ ...descriptor }, { key, summary });
  };
}

export function Description(description: string) {
  return (_: unknown, key: string, descriptor: TypedPropertyDescriptor<Utils.Function>) => {
    return ControllerMethodMetadata.attach({ ...descriptor }, { key, description });
  };
}

export function Operation(operation?: string) {
  return (_: unknown, key: string, descriptor: TypedPropertyDescriptor<Utils.Function>) => {
    return ControllerMethodMetadata.attach({ ...descriptor }, { key, operation });
  };
}

export function Success(success: Http.Status) {
  return (_: unknown, key: string, descriptor: TypedPropertyDescriptor<Utils.Function>) => {
    return ControllerMethodMetadata.attach({ ...descriptor }, { key, success });
  };
}

export function Method(method: Http.Method) {
  return (_: unknown, key: string, descriptor: TypedPropertyDescriptor<Utils.Function>) => {
    ControllerMethodMetadata.attach({ ...descriptor }, { key, method });
  };
}

export function Path(path?: string) {
  return (_: unknown, key: string, descriptor: TypedPropertyDescriptor<Utils.Function>) => {
    ControllerMethodMetadata.attach({ ...descriptor }, { key, path });
  };
}

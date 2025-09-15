import * as Http from '@refresh/framework/http'
import { ControllerRouteMetadata } from './controller-route-metadata';

export function Summary(summary: string) {
  return (_: unknown, key: string, descriptor: ControllerRouteMetadata.Descriptor) => {
    return ControllerRouteMetadata.attach(descriptor, { key, summary });
  };
}

export function Description(description: string) {
  return (_: unknown, key: string, descriptor: ControllerRouteMetadata.Descriptor) => {
    return ControllerRouteMetadata.attach(descriptor, { key, description });
  };
}

export function Operation(operation?: string) {
  return (_: unknown, key: string, descriptor: ControllerRouteMetadata.Descriptor) => {
    return ControllerRouteMetadata.attach(descriptor, { key, operation });
  };
}

export function Success(success: Http.Status) {
  return (_: unknown, key: string, descriptor: ControllerRouteMetadata.Descriptor) => {
    return ControllerRouteMetadata.attach(descriptor, { key, success });
  };
}

export function Method(method: Http.Method) {
  return (_: unknown, key: string, descriptor: ControllerRouteMetadata.Descriptor) => {
    return ControllerRouteMetadata.attach(descriptor, { key, method });
  };
}

export function Path(path?: string) {
  return (_: unknown, key: string, descriptor: ControllerRouteMetadata.Descriptor) => {
    return ControllerRouteMetadata.attach(descriptor, { key, path });
  };
}

import * as Utils from '@refresh/framework/utils'
import { ControllerClassMetadata } from './controller-class-metadata';

export function Router<Result extends InstanceType<Utils.Constructor>, Args extends any[]>(path: string) {
  return (constructor: Utils.Constructor<Result, Args>) => {
    ControllerClassMetadata.attach(constructor, { path })
    return constructor;
  };
}

export function Name<Result extends InstanceType<Utils.Constructor>, Args extends any[]>(name: string) {
  return (constructor: Utils.Constructor<Result, Args>) => {
    ControllerClassMetadata.attach(constructor, { name })
    return constructor;
  };
}

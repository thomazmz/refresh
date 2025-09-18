import * as Http from '@refresh/framework/http';
import * as Utils from '@refresh/framework/utils';
import { ControllerInputMetadata } from './controller-input-metadata';
import { ControllerMethodMetadata } from './controller-method-metadata';
import { ControllerClassMetadata } from './controller-class-metadata';

export type ControllerAggregate = ControllerClassMetadata & {
  path: string,
  routes: (ControllerMethodMetadata & {
    inputs: ControllerInputMetadata
    success: Http.Status
    method: Http.Method
    path: string,
    key: string,
  })[]
}

export const ControllerAggregate = Object.freeze({
  extract(controller: Utils.Constructor): ControllerAggregate {
    const members = Utils.Object.extractMembers(controller.prototype).filter((member) => {
      return !Utils.Object.isConstructorMember(member)
        && Utils.Object.isFunctionMember(member)
    })

    const routes = members.map((member) => {
      const methodMetadata = ControllerMethodMetadata.extract(member)
      const inputMetadata = ControllerInputMetadata.extract(member)
      return { ...methodMetadata,
        success: methodMetadata.success ?? Http.Status.Ok,
        method: methodMetadata.method ?? Http.Method.Get,
        inputs: inputMetadata,
      }
    })

    const routerMetadata = ControllerClassMetadata.extract(controller)
    return { ...routerMetadata,
      path: routerMetadata.path ?? '/',
      name: routerMetadata.name ?? controller.name,
      routes: routes.filter((metadata): metadata is ControllerAggregate['routes'][number] => {
        return !!metadata.path && !!metadata.key
      })
    }
  }
})

import * as Http from '@refresh/framework/http';
import * as Utils from '@refresh/framework/utils';
import { ControllerInputMetadata } from './controller-input-metadata';
import { ControllerRouteMetadata } from './controller-route-metadata';
import { ControllerRouterMetadata } from './controller-router-metadata';

export type ControllerRootMetadata = ControllerRouterMetadata & {
  readonly path: string,
  readonly routes: (ControllerRouteMetadata & {
    readonly inputs: ControllerInputMetadata
    readonly success: Http.Status
    readonly method: Http.Method
    readonly path: string,
    readonly key: string,
  })[]
}

export const ControllerRootMetadata = Object.freeze({
  extract: extractControllerRootMetadata
})

export function extractControllerRootMetadata(controller: Utils.Constructor): ControllerRootMetadata {
  const routerMetadata = ControllerRouterMetadata.extract(controller)

  const routerMembers = Utils.Object.extractMembers(controller.prototype).filter((member) => {
    return !Utils.Object.isConstructorMember(member)
      && Utils.Object.isFunctionMember(member)
  })

  const routerRoutes = routerMembers.map((member) => {
    const methodMetadata = ControllerRouteMetadata.extract(member)
    const inputMetadata = ControllerInputMetadata.extract(member)

    return { ...methodMetadata,
      success: methodMetadata.success ?? Http.Status.Ok,
      method: methodMetadata.method ?? Http.Method.Get,
      inputs: inputMetadata,
    }
  })

  return { ...routerMetadata,
    path: routerMetadata.path ?? '/',
    name: routerMetadata.name ?? controller.name,
    routes: routerRoutes.filter((metadata): metadata is ControllerRootMetadata['routes'][number] => {
      return !!metadata.path && !!metadata.key
    })
  }
}

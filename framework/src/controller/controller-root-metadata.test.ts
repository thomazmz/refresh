import * as Http from '@refresh/framework/http'
import { ControllerRootMetadata as RootMetadata } from './controller-root-metadata'
import { ControllerRouteDecorators as RouteDecorators } from './controller-route-metadata'
import { ControllerRouterDecorators as RouterDecorators } from './controller-router-metadata'

describe('ControllerAggregate', () => {
  it('should resolve default root metadata', () => {

    @RouterDecorators.Router('/routee')
    class SomeController {
      @RouteDecorators.Path('/barbarbar')
      public getBarById(headers: string, query: string, body: string, id: string) {
        throw new Error('Should not be called')
      }
    }

    const rootMetadata = RootMetadata.extract(SomeController)

    expect(rootMetadata.name).toEqual('SomeController')
    expect(rootMetadata.path).toEqual('/routee')

    expect(rootMetadata.routes?.[0]?.success).toEqual(Http.Status.Ok)
    expect(rootMetadata.routes?.[0]?.method).toEqual(Http.Method.Get)

    expect(rootMetadata.routes?.[0]?.description).toEqual(undefined)
    expect(rootMetadata.routes?.[0]?.operation).toEqual(undefined)
    expect(rootMetadata.routes?.[0]?.summary).toEqual(undefined)

    expect(rootMetadata.routes?.[0]?.path).toEqual('/barbarbar')
    expect(rootMetadata.routes?.[0]?.key).toEqual('getBarById')
    expect(rootMetadata.routes?.[0]?.inputs).toEqual({
      0: 'headers',
      1: 'query',
      2: 'body',
      3: 'id'
    })
  })

  it('should resolve explicit rootMetadata metadata', () => {

    @RouterDecorators.Name('SomeController')
    @RouterDecorators.Router('/routee')
    class SomeController {
      @RouteDecorators.Path('/foofoofoo')
      @RouteDecorators.Method(Http.Method.Post)
      @RouteDecorators.Success(Http.Status.Created)
      @RouteDecorators.Operation('CreateFoo')
      @RouteDecorators.Summary('Create Foo')
      @RouteDecorators.Description('Creates a nice foo.')
      public createFoo(headers: string, query: string, body: string, id: string) {
        throw new Error('Should not be called')
      }
    }

    const rootMetadata = RootMetadata.extract(SomeController);

    expect(rootMetadata.name).toEqual('SomeController')
    expect(rootMetadata.path).toEqual('/routee')

    expect(rootMetadata.routes?.[0]?.success).toEqual(Http.Status.Created)
    expect(rootMetadata.routes?.[0]?.method).toEqual(Http.Method.Post)

    expect(rootMetadata.routes?.[0]?.description).toEqual('Creates a nice foo.')
    expect(rootMetadata.routes?.[0]?.operation).toEqual('CreateFoo')
    expect(rootMetadata.routes?.[0]?.summary).toEqual('Create Foo')

    expect(rootMetadata.routes?.[0]?.path).toEqual('/foofoofoo')
    expect(rootMetadata.routes?.[0]?.key).toEqual('createFoo')
    expect(rootMetadata.routes?.[0]?.inputs).toEqual({
      0: 'headers',
      1: 'query',
      2: 'body',
      3: 'id'
    })
  });
});

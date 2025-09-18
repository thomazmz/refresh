import * as Http from '@refresh/framework/http'
import * as MethodDecorators from './controller-method-decorators'
import * as InputDecorators from './controller-input-decorators'
import * as ClassDecorators from './controller-class-decorators'
import { ControllerAggregate } from './controller-aggregate';

describe('ControllerAggregate', () => {
  it('should resolve default metadata', () => {

    @ClassDecorators.Router('/routee')
    class RouteeController {
      @MethodDecorators.Path('/barbarbar')
      public getBarById(headers: string, query: string, body: string, id: string) {
        throw new Error('Should not be called')
      }
    }

    const aggregate = ControllerAggregate.extract(RouteeController)

    expect(aggregate.name).toEqual('RouteeController')
    expect(aggregate.path).toEqual('/routee')

    expect(aggregate.routes?.[0]?.success).toEqual(Http.Status.Ok)
    expect(aggregate.routes?.[0]?.method).toEqual(Http.Method.Get)

    expect(aggregate.routes?.[0]?.description).toEqual(undefined)
    expect(aggregate.routes?.[0]?.operation).toEqual(undefined)
    expect(aggregate.routes?.[0]?.summary).toEqual(undefined)

    expect(aggregate.routes?.[0]?.path).toEqual('/barbarbar')
    expect(aggregate.routes?.[0]?.key).toEqual('getBarById')
    expect(aggregate.routes?.[0]?.inputs).toEqual({
      0: 'headers',
      1: 'query',
      2: 'body',
      3: 'id'
    })
  })

  it('should aggregate metadata', () => {

    @ClassDecorators.Name('Routee')
    @ClassDecorators.Router('/routee')
    class RouteeController {
      @MethodDecorators.Path('/foofoofoo')
      @MethodDecorators.Method(Http.Method.Post)
      @MethodDecorators.Success(Http.Status.Created)
      @MethodDecorators.Operation('CreateFoo')
      @MethodDecorators.Summary('Create Foo')
      @MethodDecorators.Description('Creates a nice foo.')
      public createFoo(
        @InputDecorators.Parameter('headers') noHeaders: string,
        @InputDecorators.Parameter('query') noQuery: string,
        @InputDecorators.Parameter('body') noBody: string,
        @InputDecorators.Parameter('name') noName: string,
      ) {
        throw new Error('Should not be called')
      }
    }

    const aggregate = ControllerAggregate.extract(RouteeController);

    expect(aggregate.name).toEqual('Routee')
    expect(aggregate.path).toEqual('/routee')

    expect(aggregate.routes?.[0]?.success).toEqual(Http.Status.Created)
    expect(aggregate.routes?.[0]?.method).toEqual(Http.Method.Post)

    expect(aggregate.routes?.[0]?.description).toEqual('Creates a nice foo.')
    expect(aggregate.routes?.[0]?.operation).toEqual('CreateFoo')
    expect(aggregate.routes?.[0]?.summary).toEqual('Create Foo')

    expect(aggregate.routes?.[0]?.path).toEqual('/foofoofoo')
    expect(aggregate.routes?.[0]?.key).toEqual('createFoo')
    expect(aggregate.routes?.[0]?.inputs).toEqual({
      0: 'headers',
      1: 'query',
      2: 'body',
      3: 'name'
    })
  });
});

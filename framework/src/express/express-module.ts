import express from 'express'
import * as Http from '@refresh/framework/http'
import * as Utils from '@refresh/framework/utils'
import * as Injection from '@refresh/framework/injection'
import * as Controller from '@refresh/framework/controller'

export class ExpressModule extends Injection.Module {
  public static create(context?: Injection.Context): ExpressModule {
    return new ExpressModule(context ?? Injection.Context.create())
  }

  private readonly controllers: Utils.Constructor[] = []

  public useController(controller: Utils.Constructor): this {
    this.controllers.push(controller)
    return this.useClass(controller, {
      // Controllers are scoped because we want to spawn
      // one instance of them for each incomming http request.
      lifecycle: 'scoped'
    })
  }

  public resolveApplication(): express.Express {
    const router = this.resolveRouter()
    return express().use(router)
  }

  public resolveRouter(): express.Router {
    return this.controllers.reduce((applicationRouter, constructor) => {
      // Calling the extract method here will already take care of
      // routes that are not fully annotated, which otherwise could
      // result in missing medatata. This should happen before the
      // application handler is declared so that we keep the the
      // returned aggregate static across different http calls.
      const { path, routes } = Controller.Aggregate.extract(constructor)

      return applicationRouter.use(path, routes.reduce((controllerRouter, metadata) => {
        // Typescript will suggest converting this to an async
        // function. Since Express can't handle async operations
        // nativelly, we should stick with regular Promise chains
        // so that asyncronicity is handled as explicitly as possible.
        const handler: express.RequestHandler = (request, response, next) => {

          // This will resolve the controller instance to be
          // called, allowing dependency injection to happen
          // on the scope of each http request. 
          const controller = this.resolve(constructor)
          

          // The strings here are the allowed values to be passed
          // during the controller method call. When no match is
          // found, it attempts to find a request parameter value
          // that matches the method parameter identifier. This
          // allow injection of headers, queries, bodies and any
          // parameters included on the method path declaration.
          const argumentz = Object.values(metadata.inputs).map(parameter => {
            if(parameter === 'body') return request.body
            if(parameter === 'query') return request.query
            if(parameter === 'headers') return request.headers
            if(parameter === 'response') return response
            if(parameter === 'request') return request
            return request.params[parameter]
          })

          // Finally, this calls the controller method (identified by
          // the metadata.key) and handles the returned value either
          // as a promise or as a synchronous operation.
          const promise = (() => {
            try {
              return Promise.resolve(controller[metadata.key](...argumentz))
            } catch(error: unknown) {
              return Promise.resolve(error)
            }
          })()

          return promise.then((result: unknown) => {
            return metadata.success !== Http.Status.NoContent
              ? response.status(metadata.success).json(result)
              : response.status(metadata.success).send()
          }).catch((error: Error) => {
            // Any errors that might be catched are passed down the
            // request handler chain, through which it should eventually
            // reach a global error handler.
            return next(error)
          })
        }

        // Append the route handler to the controller router.
        // This mimics router.get('/path', (req, res, next) => { ... })
        return controllerRouter[metadata.method](metadata.path, handler)
      }, express.Router()))
    }, express.Router())
  }
}
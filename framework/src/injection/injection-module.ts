import { InjectionContext } from './injection-context';
import { InjectionContainer } from './injection-container';
import { InjectionRegistration } from './injection-registration';

export class InjectionModule extends InjectionContainer {

  public static create(context?: InjectionContext): InjectionModule {
    return new InjectionModule(context ?? InjectionContext.create())
  }

  protected readonly modules: Set<InjectionModule> = new Set()

  protected get entries(): [InjectionRegistration.Token, InjectionRegistration][] {
    const entries = [...this.modules].flatMap(module => {
      return module.entries.filter(([_token, registration]) => {
        return registration.visibility === 'public'
      })
    })

    return [ ...entries, ...super.entries ]
  }

  public useModule(module: InjectionModule): void {
    this.modules.add(module.clone(this.context))
  }

  public useModules(modules: InjectionModule[]): void {
    modules.forEach((module) => this.useModule(module))
  }

  public clone(context?: InjectionContext | undefined): InjectionModule {
    const module = InjectionModule.create(context)
    module.useModules([...this.modules.values()])
    // module.useInitializers([...this.initializers.values()])
    module.useRegistrations([...this.registrations.values()])
    return module
  }
}

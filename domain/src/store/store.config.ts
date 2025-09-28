import { Core }  from '@refresh/framework/core'

export type StoreConfig = Core.Config<InstanceType<typeof StoreConfigInitializer>['profile']>

export class StoreConfigInitializer extends Core.ConfigInitializer {
  protected readonly profile = Core.Config.profile({
    defaultTitle: Core.Config.string('REFRESH_STORE_DEFAULT_TITLE', 'The Cool Store!'),
    defaultSlug: Core.Config.string('REFRESH_STORE_DEFAULT_SLUG', 'TheCoolStore'),
  })
}

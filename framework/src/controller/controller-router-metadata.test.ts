import { ControllerRouterMetadata } from './controller-router-metadata'

describe('ControllerRouteMetadata', () => {
  it('should attach and extract all metadata fields', () => {
    class Constructore {}

    ControllerRouterMetadata.attach(Constructore, {
      name: 'Bar',
      path: '/bar',
    })

    const extracted = ControllerRouterMetadata.extract(Constructore)

    expect(extracted).toEqual({
      name: 'Bar',
      path: '/bar',
    })
  })

  it('should merge metadata fields', () => {
    class Constructore {}

    ControllerRouterMetadata.attach(Constructore, {
      name: 'Bar',
    });

    ControllerRouterMetadata.attach(Constructore, {
      path: '/bar',
    });

    const extracted = ControllerRouterMetadata.extract(Constructore);

    expect(extracted).toEqual({
      name: 'Bar',
      path: '/bar'
    })
  });

  it('should override metadata fields', () => {
    class Constructore {}

    ControllerRouterMetadata.attach(Constructore, {
      name: 'Foo',
      path: '/bar',
    })

    ControllerRouterMetadata.attach(Constructore, {
      path: '/foo'
    })

    const extracted = ControllerRouterMetadata.extract(Constructore)

    expect(extracted).toEqual({
      name: 'Foo',
      path: '/foo',
    })
  })

  it('should return empty metadata', () => {
    class Constructore {}
    const extracted = ControllerRouterMetadata.extract(Constructore)

    expect(extracted).toEqual({
      name: undefined,
      path: undefined,
    })
  })
})

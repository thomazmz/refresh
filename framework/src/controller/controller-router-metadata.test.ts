import { ControllerRouterMetadata } from './controller-router-metadata'

describe('ControllerRouterMetadata', () => {
  it('should attach and extract all metadata fields', () => {
    class SomeClass {}
    ControllerRouterMetadata.attach(SomeClass, { name: 'Bar', path: '/bar' })
    const extracted = ControllerRouterMetadata.extract(SomeClass)
    expect(extracted).toEqual({ name: 'Bar', path: '/bar' })
  })

  it('should merge metadata fields', () => {
    class SomeClass {}
    ControllerRouterMetadata.attach(SomeClass, { path: '/bar' });
    ControllerRouterMetadata.attach(SomeClass, { name: 'Bar' });
    const extracted = ControllerRouterMetadata.extract(SomeClass);
    expect(extracted).toEqual({ name: 'Bar', path: '/bar' })
  });

  it('should override metadata fields', () => {
    class SomeClass {}
    ControllerRouterMetadata.attach(SomeClass, { path: '/bar', name: 'Foo' })
    ControllerRouterMetadata.attach(SomeClass, { path: '/foo' })
    const extracted = ControllerRouterMetadata.extract(SomeClass)
    expect(extracted).toEqual({ name: 'Foo', path: '/foo' })
  })

  it('should return empty metadata', () => {
    class Constructore {}
    const extracted = ControllerRouterMetadata.extract(Constructore)
    expect(extracted).toEqual({ name: undefined, path: undefined })
  })
})

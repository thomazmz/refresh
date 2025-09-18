import { ControllerClassMetadata } from './controller-class-metadata'

describe('ControllerClassMetadata', () => {
  it('should attach and extract all metadata fields', () => {
    class SomeClass {}
    ControllerClassMetadata.attach(SomeClass, { name: 'Bar', path: '/bar' })
    const extracted = ControllerClassMetadata.extract(SomeClass)
    expect(extracted).toEqual({ name: 'Bar', path: '/bar' })
  })

  it('should merge metadata fields', () => {
    class SomeClass {}
    ControllerClassMetadata.attach(SomeClass, { path: '/bar' });
    ControllerClassMetadata.attach(SomeClass, { name: 'Bar' });
    const extracted = ControllerClassMetadata.extract(SomeClass);
    expect(extracted).toEqual({ name: 'Bar', path: '/bar' })
  });

  it('should override metadata fields', () => {
    class SomeClass {}
    ControllerClassMetadata.attach(SomeClass, { path: '/bar', name: 'Foo' })
    ControllerClassMetadata.attach(SomeClass, { path: '/foo' })
    const extracted = ControllerClassMetadata.extract(SomeClass)
    expect(extracted).toEqual({ name: 'Foo', path: '/foo' })
  })

  it('should return empty metadata', () => {
    class Constructore {}
    const extracted = ControllerClassMetadata.extract(Constructore)
    expect(extracted).toEqual({ name: undefined, path: undefined })
  })
})

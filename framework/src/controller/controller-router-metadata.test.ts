import { ControllerRouterMetadata as Metadata } from './controller-router-metadata'
import { ControllerRouterDecorators as Decorators } from './controller-router-metadata'

describe('ControllerRouterDecorators', () => {
  it('should merge metadata fields', () => {
    class SomeClass {}
    Metadata.attach(SomeClass, { path: '/bar' });
    Metadata.attach(SomeClass, { name: 'Bar' });
    const extracted = Metadata.extract(SomeClass);
    expect(extracted).toEqual({ name: 'Bar', path: '/bar' })
  });

  it('should override metadata fields', () => {
    class SomeClass {}
    Metadata.attach(SomeClass, { path: '/bar', name: 'Foo' })
    Metadata.attach(SomeClass, { path: '/foo' })
    const extracted = Metadata.extract(SomeClass)
    expect(extracted).toEqual({ name: 'Foo', path: '/foo' })
  })

  it('should return empty metadata', () => {
    class Constructore {}
    const extracted = Metadata.extract(Constructore)
    expect(extracted).toEqual({ name: undefined, path: undefined })
  })

  it('should merge with existing name metadata', () => {
    class Constructore {}
    Decorators.Name('Foo')(Constructore);
    Decorators.Router('/foo')(Constructore);
    const extracted = Metadata.extract(Constructore);
    expect(extracted).toEqual({ path: '/foo', name: 'Foo' });
  });

  it('should attach name metadata with Name decorator', () => {
    class Constructore {}
    Decorators.Name('Bar')(Constructore);
    const extracted = Metadata.extract(Constructore);
    expect(extracted).toEqual({ path: undefined, name: 'Bar' });
  });

  it('should override previous path metadata', () => {
    class Constructore {}
    Decorators.Router('/foo')(Constructore);
    Decorators.Router('/bar')(Constructore);
    const extracted = Metadata.extract(Constructore);
    expect(extracted).toEqual({ path: '/bar', name: undefined });
  });

  it('should attach path metadata with Router decorator', () => {
    class Constructore {}
    Decorators.Router('/foo')(Constructore);
    const extracted = Metadata.extract(Constructore);
    expect(extracted).toEqual({ path: '/foo', name: undefined });
  });
})

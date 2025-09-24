import * as Metadata from './controller-router-metadata'

describe('ControllerRouterMetadata', () => {
  it('should merge metadata fields', () => {
    class SomeClass {}
    Metadata.attachRouterMetadata(SomeClass, { path: '/bar' });
    Metadata.attachRouterMetadata(SomeClass, { name: 'Bar' });
    const extracted = Metadata.extractRouterMetadata(SomeClass);
    expect(extracted).toEqual({ name: 'Bar', path: '/bar' })
  });

  it('should override metadata fields', () => {
    class SomeClass {}
    Metadata.attachRouterMetadata(SomeClass, { path: '/bar', name: 'Foo' })
    Metadata.attachRouterMetadata(SomeClass, { path: '/foo' })
    const extracted = Metadata.extractRouterMetadata(SomeClass)
    expect(extracted).toEqual({ name: 'Foo', path: '/foo' })
  })

  it('should return empty metadata', () => {
    class Constructore {}
    const extracted = Metadata.extractRouterMetadata(Constructore)
    expect(extracted).toEqual({ name: undefined, path: undefined })
  })

  it('should merge with existing name metadata', () => {
    class Constructore {}
    Metadata.Name('Foo')(Constructore);
    Metadata.Router('/foo')(Constructore);
    const extracted = Metadata.extractRouterMetadata(Constructore);
    expect(extracted).toEqual({ path: '/foo', name: 'Foo' });
  });

  it('should attach name metadata with Name decorator', () => {
    class Constructore {}
    Metadata.Name('Bar')(Constructore);
    const extracted = Metadata.extractRouterMetadata(Constructore);
    expect(extracted).toEqual({ path: undefined, name: 'Bar' });
  });

  it('should override previous path metadata', () => {
    class Constructore {}
    Metadata.Router('/foo')(Constructore);
    Metadata.Router('/bar')(Constructore);
    const extracted = Metadata.extractRouterMetadata(Constructore);
    expect(extracted).toEqual({ path: '/bar', name: undefined });
  });

  it('should attach path metadata with Router decorator', () => {
    class Constructore {}
    Metadata.Router('/foo')(Constructore);
    const extracted = Metadata.extractRouterMetadata(Constructore);
    expect(extracted).toEqual({ path: '/foo', name: undefined });
  });
})

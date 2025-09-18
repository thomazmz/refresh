import * as Decorators from './controller-class-decorators';
import { ControllerClassMetadata } from './controller-class-metadata';

describe('ControllerClassMetadata', () => {
  it('should attach path metadata', () => {
    class Constructore {}
    Decorators.Router('/foo')(Constructore);
    const extracted = ControllerClassMetadata.extract(Constructore);
    expect(extracted).toEqual({ path: '/foo', name: undefined });
  });

  it('should attach name metadata', () => {
    class Constructore {}
    Decorators.Name('/foo')(Constructore);
    const extracted = ControllerClassMetadata.extract(Constructore);
    expect(extracted).toEqual({ path: undefined, name: '/foo' });
  });

  it('should merge with existing name metadata', () => {
    class Constructore {}
    Decorators.Name('Foo')(Constructore);
    Decorators.Router('/foo')(Constructore);
    const extracted = ControllerClassMetadata.extract(Constructore);
    expect(extracted).toEqual({ path: '/foo', name: 'Foo' });
  });

  it('should override previous path metadata', () => {
    class Constructore {}
    Decorators.Router('/foo')(Constructore);
    Decorators.Router('/bar')(Constructore);
    const extracted = ControllerClassMetadata.extract(Constructore);
    expect(extracted).toEqual({ path: '/bar', name: undefined });
  });
});

import * as Decorators from './controller-router-decorators';
import { ControllerRouterMetadata } from './controller-router-metadata';

describe('ControllerRouterMetadata', () => {
  it('should attach path metadata', () => {
    class Constructore {}
    Decorators.Router('/foo')(Constructore);
    const extracted = ControllerRouterMetadata.extract(Constructore);
    expect(extracted).toEqual({ path: '/foo', name: undefined });
  });

  it('should attach name metadata', () => {
    class Constructore {}
    Decorators.Name('/foo')(Constructore);
    const extracted = ControllerRouterMetadata.extract(Constructore);
    expect(extracted).toEqual({ path: undefined, name: '/foo' });
  });

  it('should merge with existing name metadata', () => {
    class Constructore {}
    Decorators.Name('Foo')(Constructore);
    Decorators.Router('/foo')(Constructore);
    const extracted = ControllerRouterMetadata.extract(Constructore);
    expect(extracted).toEqual({ path: '/foo', name: 'Foo' });
  });

  it('should override previous path metadata', () => {
    class Constructore {}
    Decorators.Router('/foo')(Constructore);
    Decorators.Router('/bar')(Constructore);
    const extracted = ControllerRouterMetadata.extract(Constructore);
    expect(extracted).toEqual({ path: '/bar', name: undefined });
  });
});

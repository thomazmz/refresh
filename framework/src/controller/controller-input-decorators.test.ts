import * as Decorators from './controller-input-decorators';
import { ControllerInputMetadata } from './controller-input-metadata';

describe('Parameter decorator', () => {
  it('should attach input metadata for a single parameter', () => {
    class TestClass { method(foo: string) {} }
    Decorators.Parameter('foo')(TestClass.prototype, 'method', 0);
    const descriptor = Object.getOwnPropertyDescriptor(TestClass.prototype, 'method');
    const extracted = ControllerInputMetadata.extract(descriptor!);
    expect(extracted).toEqual({ 0: 'foo' });
  });

  it('should attach input metadata for multiple parameters', () => {
    class TestClass { method(foo: string, bar: string) {} }
    Decorators.Parameter('foo')(TestClass.prototype, 'method', 0);
    Decorators.Parameter('bar')(TestClass.prototype, 'method', 1);
    const descriptor = Object.getOwnPropertyDescriptor(TestClass.prototype, 'method');
    const extracted = ControllerInputMetadata.extract(descriptor!);
    expect(extracted).toEqual({ 0: 'foo', 1: 'bar' });
  });

  it('should override input metadata for the same parameter', () => {
    class TestClass { method(foo: string, bar: string, baz: string) {} }
    Decorators.Parameter('foo')(TestClass.prototype, 'method', 0);
    Decorators.Parameter('bar')(TestClass.prototype, 'method', 1);
    Decorators.Parameter('baz')(TestClass.prototype, 'method', 2);
    // Override parameter 1
    Decorators.Parameter('override')(TestClass.prototype, 'method', 1);
    const descriptor = Object.getOwnPropertyDescriptor(TestClass.prototype, 'method');
    const extracted = ControllerInputMetadata.extract(descriptor!);
    expect(extracted).toEqual({ 0: 'foo', 1: 'override', 2: 'baz' });
  });

  it('should return empty metadata if no decorator is used', () => {
    class TestClass { method(foo: string) {} }
    const descriptor = Object.getOwnPropertyDescriptor(TestClass.prototype, 'method');
    const extracted = ControllerInputMetadata.extract(descriptor!);
    expect(extracted).toEqual({ 0: 'foo' });
  });
});

import { ControllerInputMetadata } from './controller-input-metadata';

describe('ControllerInputMetadata', () => {
  it('should attach and extract input metadata for a single parameter', () => {
    const descriptor = { value: function(a: any) {} };
    ControllerInputMetadata.attach(descriptor, { 0: 'b' });
    const extracted = ControllerInputMetadata.extract(descriptor);
    expect(extracted).toEqual({ 0: 'b' });
  });

  it('should merge input metadata for multiple parameters', () => {
    const descriptor = { value: function(a: any, b: any) {} };
    ControllerInputMetadata.attach(descriptor, { 0: 'b' });
    ControllerInputMetadata.attach(descriptor, { 1: 'c' });
    const extracted = ControllerInputMetadata.extract(descriptor);
    expect(extracted).toEqual({ 0: 'b', 1: 'c' });
  });

  it('should override input metadata for the same parameter', () => {
    const descriptor = { value: function(a: any) {} };
    ControllerInputMetadata.attach(descriptor, { 0: 'b' });
    ControllerInputMetadata.attach(descriptor, { 0: 'c' });
    const extracted = ControllerInputMetadata.extract(descriptor);
    expect(extracted).toEqual({ 0: 'c' });
  });

  it('should return empty metadata if nothing is attached', () => {
    const descriptor = { value: function(a: any) {} };
    const extracted = ControllerInputMetadata.extract(descriptor);
    expect(extracted).toEqual({ 0: 'a' });
  });

  it('should return named parameters', () => {
    const descriptor = { value: function(a: any, b: any) {} };
    const extracted = ControllerInputMetadata.extract(descriptor);
    expect(extracted).toEqual({ 0: 'a', 1: 'b' })
  });

  it('should merge named parameters with assigned parameters', () => {
    const descriptor = { value: function(a: any, b: any) {} };
    ControllerInputMetadata.attach(descriptor, { 1: 'b' });
    const extracted = ControllerInputMetadata.extract(descriptor);
    expect(extracted).toEqual({ 0: 'a', 1: 'b' })
  })
});

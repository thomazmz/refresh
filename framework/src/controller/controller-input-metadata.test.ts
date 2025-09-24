import * as Metadata from './controller-input-metadata';

describe('ControllerInputMetadata', () => {

  it('should return empty metadata for no parameter', () => {
    const descriptor = { value: function() {} };
    const extracted = Metadata.extractInputMetadata(descriptor);
    expect(extracted).toEqual({});
  });

  it('should extract input metadata for a single parameter', () => {
    const descriptor = { value: function(a: any) {} };
    const extracted = Metadata.extractInputMetadata(descriptor);
    expect(extracted).toEqual({ 0: 'a' });
  });

  it('should extract input metadata for a multiple parameters', () => {
    const descriptor = { value: function(a: any, b: any) {} };
    const extracted = Metadata.extractInputMetadata(descriptor);
    expect(extracted).toEqual({ 0: 'a', 1: 'b' });
  })
});

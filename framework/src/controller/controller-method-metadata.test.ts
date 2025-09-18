import { ControllerMethodMetadata } from './controller-method-metadata'

describe('ControllerMethodMetadata', () => {
  it('should attach and extract all metadata fields', () => {
    const descriptor = { value: function() {} }

    ControllerMethodMetadata.attach(descriptor, {
      description: 'desc',
      operation: 'op',
      summary: 'sum',
      success: 200,
      method: 'get',
      path: '/foo',
    });

    const extracted = ControllerMethodMetadata.extract(descriptor);

    expect(extracted).toEqual({
      description: 'desc',
      operation: 'op',
      summary: 'sum',
      success: 200,
      method: 'get',
      path: '/foo',
    })
  });

  it('should merge metadata fields', () => {
    const descriptor = { value: function() {} }

    ControllerMethodMetadata.attach(descriptor, {
      method: 'post', 
      summary: 'sum'
    });

    ControllerMethodMetadata.attach(descriptor, {
      description: 'desc',
      key: 'k2'
    });

    const extracted = ControllerMethodMetadata.extract(descriptor);
    expect(extracted).toEqual({
      description: 'desc',
      operation: undefined,
      summary: 'sum',
      success: undefined,
      method: 'post',
      path: undefined,
      key: 'k2',
    })
  });

  it('should override metadata fields', () => {
    const descriptor = { value: function() {} }

    ControllerMethodMetadata.attach(descriptor, {
      method: 'post',
    });

    ControllerMethodMetadata.attach(descriptor, {
      description: 'desc',
      method: 'get',
    });

    const extracted = ControllerMethodMetadata.extract(descriptor);
    expect(extracted).toEqual({
      description: 'desc',
      operation: undefined,
      summary: undefined,
      success: undefined,
      method: 'get',
      path: undefined,
      key: undefined,
    })
  });

  it('should return empty metadata when metadata is not attach', () => {
    const descriptor = { value: function() {} }

    const extracted = ControllerMethodMetadata.extract(descriptor);
    expect(extracted).toEqual({
      description: undefined,
      operation: undefined,
      summary: undefined,
      success: undefined,
      method: undefined,
      path: undefined,
      key: undefined,
    });
  });

  it('should return empty metadata when descriptor.value is missing', () => {
    const descriptor = {} as any
    ControllerMethodMetadata.attach(descriptor, { description: 'desc' })
    const extracted = ControllerMethodMetadata.extract(descriptor)
    expect(extracted).toEqual({
      description: undefined,
      operation: undefined,
      summary: undefined,
      success: undefined,
      method: undefined,
      path: undefined,
      key: undefined
    });
  });
});

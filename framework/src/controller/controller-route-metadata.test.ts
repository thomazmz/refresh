import { ControllerRouteMetadata } from './controller-route-metadata'

describe('ControllerRouteMetadata', () => {
  it('should attach and extract all metadata fields', () => {
    const descriptor = { value: function() {} }

    ControllerRouteMetadata.attach(descriptor, {
      description: 'desc',
      parameters: ['param1'],
      operation: 'op',
      summary: 'sum',
      success: 200,
      method: 'get',
      path: '/foo',
      key: 'k1',
    });

    const extracted = ControllerRouteMetadata.extract(descriptor);
    expect(extracted).toEqual({
      description: 'desc',
      parameters: ['param1'],
      operation: 'op',
      summary: 'sum',
      success: 200,
      method: 'get',
      path: '/foo',
      key: 'k1',
    })
  });

  it('should merge metadata fields', () => {
    const descriptor = { value: function() {} }

    ControllerRouteMetadata.attach(descriptor, {
      method: 'post', 
      summary: 'sum'
    });

    ControllerRouteMetadata.attach(descriptor, {
      description: 'desc',
      key: 'k1'
    });

    const extracted = ControllerRouteMetadata.extract(descriptor);
    expect(extracted).toEqual({
      description: 'desc',
      parameters: [],
      operation: undefined,
      summary: 'sum',
      success: undefined,
      method: 'post',
      path: undefined,
      key: 'k1',
    })
  });

  it('should override metadata fields', () => {
    const descriptor = { value: function() {} }

    ControllerRouteMetadata.attach(descriptor, {
      method: 'post',
      key: 'k1',
    });

    ControllerRouteMetadata.attach(descriptor, {
      description: 'desc',
      key: 'k2'
    });

    const extracted = ControllerRouteMetadata.extract(descriptor);
    expect(extracted).toEqual({
      description: 'desc',
      parameters: [],
      operation: undefined,
      summary: undefined,
      success: undefined,
      method: 'post',
      path: undefined,
      key: 'k2',
    })
  });

  it('should return empty metadata when metadata is not attach', () => {
    const descriptor = { value: function() {} }
    const extracted = ControllerRouteMetadata.extract(descriptor);
    expect(extracted).toEqual({
      description: undefined,
      parameters: undefined,
      operation: undefined,
      summary: undefined,
      success: undefined,
      method: undefined,
      path: undefined,
      key: undefined,
    });
  });

  it('should return empty metadata when descriptor.value is missing', () => {
    const descriptor = {}
    ControllerRouteMetadata.attach(descriptor, { description: 'desc' })
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted).toEqual({
      description: undefined,
      parameters: undefined,
      operation: undefined,
      summary: undefined,
      success: undefined,
      method: undefined,
      path: undefined,
      key: undefined
    });
  });
});

import * as Decorators from './controller-route-decorators'
import { ControllerRouteMetadata } from './controller-route-metadata'

describe('ControllerRouteDecorators', () => {
  it('should attach summary metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Summary('sum')(null, 'k1', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.summary).toBe('sum')
    expect(extracted.key).toBe('k1')
  })

  it('should attach description metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Description('desc')(null, 'k1', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.description).toBe('desc')
    expect(extracted.key).toBe('k1')
  })

  it('should attach operation metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Operation('op')(null, 'k1', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.operation).toBe('op')
    expect(extracted.key).toBe('k1')
  })

  it('should attach success metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Success(200)(null, 'k1', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.success).toBe(200)
    expect(extracted.key).toBe('k1')
  })

  it('should attach method metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Method('get')(null, 'k1', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.method).toBe('get')
    expect(extracted.key).toBe('k1')
  })

  it('should attach path metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Path('/bar')(null, 'k1', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.path).toBe('/bar')
    expect(extracted.key).toBe('k1')
  })

  it('should merge metadata when chaining Operation, Path, and Method', () => {
    const descriptor = { value: function() {} }
    Decorators.Operation('op')(null, 'k1', descriptor)
    Decorators.Method('put')(null, 'k1', descriptor)
    Decorators.Path('/bar')(null, 'k1', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.operation).toBe('op')
    expect(extracted.method).toBe('put')
    expect(extracted.path).toBe('/bar')
    expect(extracted.key).toBe('k1')
  })

  it('should handle undefined arguments gracefully', () => {
    const descriptor = { value: function() {} }
    Decorators.Summary(undefined as unknown as string)(null, 'k1', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.summary).toBe(undefined)
    expect(extracted.key).toBe('k1')
  })
})
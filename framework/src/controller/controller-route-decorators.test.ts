import * as Decorators from './controller-route-decorators'
import { ControllerRouteMetadata } from './controller-route-metadata'

describe('ControllerRouteMetadata', () => {
  it('should attach summary metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Summary('sum')(null, 'k2', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.summary).toBe('sum')
    expect(extracted.key).toBe('k2')
  })

  it('should attach description metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Description('desc')(null, 'k2', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.description).toBe('desc')
    expect(extracted.key).toBe('k2')
  })

  it('should attach operation metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Operation('op')(null, 'k2', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.operation).toBe('op')
    expect(extracted.key).toBe('k2')
  })

  it('should attach success metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Success(200)(null, 'k2', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.success).toBe(200)
    expect(extracted.key).toBe('k2')
  })

  it('should attach method metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Method('get')(null, 'k2', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.method).toBe('get')
    expect(extracted.key).toBe('k2')
  })

  it('should attach path metadata', () => {
    const descriptor = { value: function() {} }
    Decorators.Path('/bar')(null, 'k2', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.path).toBe('/bar')
    expect(extracted.key).toBe('k2')
  })

  it('should merge metadata when chaining Operation, Path, and Method', () => {
    const descriptor = { value: function() {} }
    Decorators.Operation('op')(null, 'k2', descriptor)
    Decorators.Method('put')(null, 'k2', descriptor)
    Decorators.Path('/bar')(null, 'k2', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.operation).toBe('op')
    expect(extracted.method).toBe('put')
    expect(extracted.path).toBe('/bar')
    expect(extracted.key).toBe('k2')
  })

  it('should handle undefined arguments gracefully', () => {
    const descriptor = { value: function() {} }
    Decorators.Summary(undefined as unknown as string)(null, 'k2', descriptor)
    const extracted = ControllerRouteMetadata.extract(descriptor)
    expect(extracted.summary).toBe(undefined)
    expect(extracted.key).toBe('k2')
  })
})
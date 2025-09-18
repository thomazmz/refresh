import { _Object } from './utils-object'

describe('_Object', () => {
  describe('extractMember', () => {
    it('should extract a property descriptor with key', () => {
      const object = { foo: 1, bar: 2 }
      const member = _Object.extractMember(object, 'foo')
      expect(member).toBeDefined()
      expect(member?.key).toBe('foo')
      expect(member?.value).toBe(1)
    })
    it('should return undefined for non-existent key', () => {
      const object = { foo: 1, bar: 2 }
      const member = _Object.extractMember(object, 'baz' as any)
      expect(member).toBeUndefined()
    })
  })

  describe('extractMembers', () => {
    it('should extract all property descriptors with keys', () => {
      const object = { foo: 1, bar: 2 }
      const members = _Object.extractMembers(object)
      const keys = members.map(member => member.key)
      expect(keys).toContain('foo')
      expect(keys).toContain('bar')
      expect(members.find(member => member.key === 'foo')?.value).toBe(1)
      expect(members.find(member => member.key === 'bar')?.value).toBe(2)
    })
    it('should return an empty array for empty object', () => {
      expect(_Object.extractMembers({})).toEqual([])
    })
  })

  describe('isFunctionMember', () => {
    it('should return true for a function member', () => {
      const object = { fn: () => 42 }
      const member = _Object.extractMember(object, 'fn')!
      expect(_Object.isFunctionMember(member)).toBe(true)
    })
    it('should return false for a non function member', () => {
      const object = { foo: 123 }
      const member = _Object.extractMember(object, 'foo')!
      expect(_Object.isFunctionMember(member)).toBe(false)
    })
  })

  describe('isConstructorMember', () => {
    it('should return true for a constructor member', () => {
      class MyClass {
        constructor() {}
        method() {}
      }
      const prototype = MyClass.prototype
      const members = _Object.extractMembers(prototype)

      const constructorMember = members.find(member => {
        return member.key === 'constructor'
      })!

      constructorMember.value = prototype.constructor
      expect(_Object.isConstructorMember(constructorMember)).toBe(true)
    })
    it('should return false for a non-constructor function member', () => {
      class MyClass {
        method() {}
      }
      const proto = MyClass.prototype
      const members = _Object.extractMembers(proto)
      const methodMember = members.find(m => m.key === 'method')!
      methodMember.value = proto.method
      expect(_Object.isConstructorMember(methodMember)).toBe(false)
    })
    it('should return false for a non-function member', () => {
      const member = { key: 'foo', value: 123 }
      expect(_Object.isConstructorMember(member as any)).toBe(false)
    })
  })
})
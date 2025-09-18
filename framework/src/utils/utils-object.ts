import { _Function } from "./utils-function"

export type _Object = object

export declare namespace _Object {
  export type FunctionMember = Member<_Function> & {
    value: _Function
  }

  export type Member<T = any> = TypedPropertyDescriptor<T> & {
    key: string | number | symbol
  }
}

export const _Object = {
  extractMember<T extends _Object>(object: T, key: keyof T): _Object.Member | undefined {
    const descriptor = Object.getOwnPropertyDescriptor(object, key)
    return descriptor ? { ...descriptor, key } : undefined
  },

  extractMembers<T extends _Object>(object: T): _Object.Member[] {
    const descriptors = Object.getOwnPropertyDescriptors(object)
    return Object.entries(descriptors).map(([key, descriptor]) => {
      return ({ ...descriptor, key })
    })
  },

  isConstructorMember(member: _Object.Member): boolean {
    return _Object.isFunctionMember(member)
       && member.key === 'constructor'
  },

  isFunctionMember(member: _Object.Member): boolean {
    return typeof member.value === 'function'
  },
}

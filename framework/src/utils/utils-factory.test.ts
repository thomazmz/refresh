import { _Factory } from './utils-factory'

describe('_Factory', () => {
  describe('extractParameters', () => {
    it('should return regular function declaration parameters', () => {
     const arrowFunction = (param1: string, param2: number) => {
        throw new Error('Not to be called!')
     }

     const result = _Factory.extractParameters(arrowFunction)
     expect(result.length).toBe(2)
     expect(result[0]).toEqual('param1')
     expect(result[1]).toEqual('param2')
    })

    it('should return anonymous regular function declaration parameters', () => {
      const result = _Factory.extractParameters((param1: string, param2: number) => {
        throw new Error('Not to be called!')
     })

      expect(result.length).toBe(2)
      expect(result[0]).toEqual('param1')
      expect(result[1]).toEqual('param2')

    })

    it('should return arrow function declaration parameters', () => {
      function regularFunction(param1: string, param2: number) {
        throw new Error('Not to be called!')
      }

      const result = _Factory.extractParameters(regularFunction)
      expect(result.length).toBe(2)
      expect(result[0]).toEqual('param1')
      expect(result[1]).toEqual('param2')
    })

    it('should return anonymous arrow function declaration parameters', () => {
      const result = _Factory.extractParameters(function regularFunction(param1: string, param2: number) {
        throw new Error('Not to be called!')
      })

      expect(result.length).toBe(2)
      expect(result[0]).toEqual('param1')
      expect(result[1]).toEqual('param2')
    })
  })
})
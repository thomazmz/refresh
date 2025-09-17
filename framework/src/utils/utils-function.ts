import * as esprima from 'esprima'
import * as estree from 'estree'

export type UtilsFunction<R = any, P extends Array<any> = any[]> = (...args: P) => R

export declare namespace UtilsFunction {
  export type Return<F extends UtilsFunction> = ReturnType<F>
  export type  Prameters<F extends UtilsFunction> = Parameters<F>
}

export const UtilsFunction = Object.freeze({
  parameters(target: UtilsFunction): string[] {
    const code = Function.prototype.toString.call(target).trim()
    
    // try as function or arrow function expression
    let envelope = `(${code})`;
    try {
      const program = esprima.parseScript(envelope, { range: true }) as estree.Program
      const statement = program.body[0] as estree.ExpressionStatement | undefined
      const expression = statement?.expression
    
      // We can not continue in case the AST parsed code
      // does not yield a valid expression.
      if(!expression) {
        throw new Error('The provided function code could not be parsed into an AST expression')
      }
    
      // We can not continue in case the AST parsed code 
      // does not yield a valid function expression.
      if(!(expression.type === 'FunctionExpression' || expression.type === 'ArrowFunctionExpression')) {
        throw new Error('The provided function code could not be parsed into a function AST expression')
      }

      return expression.params.map(parameter => {
        return envelope.slice(...(parameter.range as [number, number]))
      });
    } catch { /* fall through */ }

    // try as object shorthand method
    envelope = `({ ${code} })`
    try {
      const program = esprima.parseScript(envelope, { range: true }) as estree.Program
      const statement = program.body[0] as estree.ExpressionStatement | undefined
      const expression = statement?.expression
    
      // We can not continue in case the AST parsed code
      // does not yield a valid expression.
      if(!expression) {
        throw new Error('The provided function code could not be parsed into an AST expression')
      }
    
      // We can not continue in case the AST parsed code 
      // does not yield a valid object expression.
      if(!(expression.type === 'ObjectExpression')) {
        throw new Error('The provided function code could not be parsed into a function AST expression')
      }

      const property = expression.properties.find((property) => {
        return (property.type === 'Property') 
          && (property.value.type === 'FunctionExpression'
            || property.value.type === 'ArrowFunctionExpression')
      }) as estree.Property | undefined

      const value = property?.value as undefined
        | estree.ArrowFunctionExpression
        | estree.FunctionExpression 

      return value?.params.map(parameter => {
        return envelope.slice(...(parameter.range as [number, number]))
      }) ?? [];
    } catch { /* fall through */ }

    throw new Error('Could not parse target. The provided target is not a valid function.')
  }
})

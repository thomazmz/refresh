import * as esprima from 'esprima'
import * as estree from 'estree'

export type _Function<R = any, P extends Array<any> = any[]> = (...args: P) => R

export declare namespace _Function {
  export type Return<F extends _Function> = ReturnType<F>
  export type  Prameters<F extends _Function> = Parameters<F>
}

export const _Function = Object.freeze({
  extractParameters(target: _Function): string[] {
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
        return envelope.slice(...(parameter.range ?? [0,0]))
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

      // Locate the first property whose value is either a normal
      // function expression or an arrow function expression.
      const property = expression.properties.find((property) => {
        return (property.type === 'Property') 
          && (property.value.type === 'FunctionExpression'
            || property.value.type === 'ArrowFunctionExpression')
      }) as estree.Property | undefined

      // Narrow the value down to only the cases we care
      // about: FunctionExpression or ArrowFunctionExpression.
      const value = property?.value as undefined
        | estree.ArrowFunctionExpression
        | estree.FunctionExpression 

      return value?.params.map(parameter => {
        return envelope.slice(...(parameter.range ?? [0,0]))
      }) ?? [];
    } catch { /* fall through */ }

    throw new Error('Could not parse target. The provided target is not a valid function.')
  },
})

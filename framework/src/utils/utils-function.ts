import * as esprima from 'esprima'
import * as estree from 'estree'

export type UtilsFunction<R = any, P extends Array<any> = any[]> = (...args: P) => R

export declare namespace UtilsFunction {
  export type Return<F extends UtilsFunction> = ReturnType<F>
  export type  Prameters<F extends UtilsFunction> = Parameters<F>
}

export const UtilsFunction = Object.freeze({
  parameters(target: UtilsFunction): string[] {
    // Ensure we the original toString method is
    // used and not one that overrides it.
    const code = Function.prototype.toString.call(target);
  
    // There exists native code that we can not
    // get parameters for. This shortcuts these
    // cases into an empty array.
    if (/\{\s*\[native code\]\s*\}/.test(code)) {
      throw new Error('Cannot parameters for native code.')
    };

    // Wrapping the code into parenthesis make sure
    // both arrow functions and regular functions 
    // expressions are parsed safelly.
    const wrapped = `(${code})`;

    // Check https://docs.esprima.org/en/latest/syntactic-analysis.html
    const program = esprima.parseScript(wrapped, { range: true }) as estree.Program;
    const statement = program.body[0] as estree.ExpressionStatement | undefined;
    const expression = statement?.expression;
  
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
      // The range method returns a tupple of two numbers
      // that we sohuld spread into the slice constructor.
      return wrapped.slice(...parameter.range as [number, number]);
    });
  }
})

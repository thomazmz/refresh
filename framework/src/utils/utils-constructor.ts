import * as esprima from 'esprima'
import * as estree from 'estree'

export type UtilsConstructor<R extends object = object, P extends Array<any> = Array<any>> = 
  | ( new (...params: P) => R ) 
  | { new (...params: P): R }

export declare namespace UtilsConstructor {
  export type Instance<C extends UtilsConstructor> = InstanceType<C>

  export type Parameters<C extends UtilsConstructor> = C extends new (...args: infer P) => any ? P : never;
}

export const UtilsConstructor = Object.freeze({
  parameters(target: UtilsConstructor): string[] {
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
  
    // // We can not continue in case the AST parsed code
    // // does not yield a valid class expression.
    if (expression.type !== 'ClassExpression') {
      throw new Error('The provided function code could not be parsed into a class AST expression')
    }

    // In case this is a class expression we need to traverse
    // it and figure which method is the constructor.
    const constructor = (expression.body?.body ?? []).find((method: estree.MethodDefinition) => {
      return method.kind === 'constructor' && method.type === 'MethodDefinition'
    }) as estree.MethodDefinition

    // A class might not have a declared constructor,
    // this leads us to an empty parameter list.
    if(!constructor) {
      return []
    }

    return constructor.value.params.map(parameter => {
      // The range method returns a tupple of two numbers
      // that we sohuld spread into the slice constructor.
      return wrapped.slice(...parameter.range as [number, number]);
    });
  }
})

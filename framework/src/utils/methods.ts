export function extractParameters(target: any): string[] {
  const functionArgumentListRegex = new RegExp(/(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/gm)

  const functionArgumentIdentifiersRegex = new RegExp(/([^\s,]+)/g)

  const functionString = target.toString().replace(functionArgumentListRegex, '')

  const argumentDeclarationFirstIndex = functionString.indexOf('(') + 1

  const argumentDeclarationLastIndex = functionString.indexOf(')')

  const argumentString = functionString.slice(argumentDeclarationFirstIndex, argumentDeclarationLastIndex)

  const argumentNames = argumentString.match(functionArgumentIdentifiersRegex)

  return argumentNames ?? []
}

export function isSafeExpression(expr: string, allowedKeys: Set<string>): boolean {
  const identifiers = expr.match(/([a-zA-Z_$][\w$]*)/g) || [];
  return identifiers.every((id) => allowedKeys.has(id));
}
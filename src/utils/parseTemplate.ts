import { compileExpression } from './compileExpression';
import { Context } from '../types';

export function parseTemplate(template: string, context: Context): string {
  const keys = Object.keys(context);
  const values = keys.map(k => context[k]);

  return template.replace(/\{\{(.*?)\}\}/g, (_, rawExpr) => {
    const expr = rawExpr.trim();
    const fn = compileExpression(expr, keys);
    if (!fn) return `{{${expr}}}`;

    try {
      return String(fn(...values));
    } catch {
      return `{{${expr}}}`;
    }
  });
}

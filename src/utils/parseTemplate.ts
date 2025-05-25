import { countBraces } from './countBraces';
import { compileExpression } from './compileExpression';
import type { Context } from '../types';

export function parseTemplate(
  template: string,
  context: Context,
  maxDepth = 10
): string {
  const keys = Object.keys(context);
  const values = keys.map(k => context[k]);

  let current: string = template;
  let loops = 0;

  while (countBraces(current) > 0 && loops < maxDepth) {
    current = current.replace(/\{([^{}]+)\}/g, (_, rawExpr: string): string => {
      const expr = rawExpr.trim();

      const evaluatedExpr = expr.replace(
        /`([^`]*)`/g,
        (_, inner: string): string => {
          const nestedEvaluated = inner.replace(
            /\{([^{}]+)\}/g,
            (_, nested: string): string => {
              const fn = compileExpression(nested.trim(), keys);
              if (!fn) return `{${nested}}`;
              try {
                return String(fn(...values));
              } catch {
                return `{${nested}}`;
              }
            }
          );
          return `\`${nestedEvaluated}\``;
        }
      );

      const fn = compileExpression(evaluatedExpr, keys);
      if (!fn) return `{${rawExpr}}`;
      try {
        return String(fn(...values));
      } catch {
        return `{${rawExpr}}`;
      }
    });

    loops++;
  }

  return current;
}

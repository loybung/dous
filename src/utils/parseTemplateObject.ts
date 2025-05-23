import { parseTemplate } from './parseTemplate';
import { Context } from '../types';

export function parseTemplateObject(
  obj: Record<string, string>,
  context: Context
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    result[key] = parseTemplate(obj[key], context);
  }
  return result;
}

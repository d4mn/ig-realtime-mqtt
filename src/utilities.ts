import { TypedRegex } from './types';

/**
 * Creates a typed wrapper around a regex with named groups
 * @param {RegExp} regex
 * @returns {(input: string) => (Record<T, string> | null)}
 */
export function createTypedRegex<T extends string>(regex: RegExp): TypedRegex<T> {
  return input => (regex.exec(input)?.groups ?? null) as Record<T, string> | null;
}

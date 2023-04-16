export interface TimeComponents {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  microseconds: number
  nanoseconds: number
}

/**
 * Parse milliseconds into an object.
 * @param milliseconds milliseconds
 * @example
 * ```
 * import parseMilliseconds from '@elonehoo/concise-ms'
 * parseMilliseconds(1337000001);
 * ```
 */
export default function parseMilliseconds(milliseconds: number): TimeComponents {
  if (typeof milliseconds !== 'number')
    throw new TypeError('Expected a number')

  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
    microseconds: Math.trunc(milliseconds * 1000) % 1000,
    nanoseconds: Math.trunc(milliseconds * 1e6) % 1000,
  }
}

import { expect, test } from 'vitest'
import { conciseMilliseconds } from '../src'

test('prettify milliseconds', () => {
  expect(conciseMilliseconds(0)).toBe('0ms')
  expect(conciseMilliseconds(0.1)).toBe('1ms')
  expect(conciseMilliseconds(1)).toBe('1ms')
  expect(conciseMilliseconds(999)).toBe('999ms')
  expect(conciseMilliseconds(1000)).toBe('1s')
  expect(conciseMilliseconds(1000 + 400)).toBe('1.4s')
  expect(conciseMilliseconds((1000 * 2) + 400)).toBe('2.4s')
  expect(conciseMilliseconds(1000 * 55)).toBe('55s')
  expect(conciseMilliseconds(1000 * 67)).toBe('1m 7s')
  expect(conciseMilliseconds(1000 * 60 * 5)).toBe('5m')
  expect(conciseMilliseconds(1000 * 60 * 67)).toBe('1h 7m')
  expect(conciseMilliseconds(1000 * 60 * 60 * 12)).toBe('12h')
  expect(conciseMilliseconds(1000 * 60 * 60 * 40)).toBe('1d 16h')
  expect(conciseMilliseconds(1000 * 60 * 60 * 999)).toBe('41d 15h')
  expect(conciseMilliseconds(1000 * 60 * 60 * 24 * 465)).toBe('1y 100d')
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465)).toBe('1y 154d 6h')
  expect(conciseMilliseconds(119_999)).toBe('1m 59.9s')
  expect(conciseMilliseconds(120_000)).toBe('2m')
})

test('have a compact option', () => {
  expect(conciseMilliseconds(1000 + 4, { compact: true })).toBe('1s')
  expect(conciseMilliseconds(1000 * 60 * 60 * 999, { compact: true })).toBe('41d')
  expect(conciseMilliseconds(1000 * 60 * 60 * 24 * 465, { compact: true })).toBe('1y')
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465, { compact: true })).toBe('1y')
})

test('have a unitCount option', () => {
  expect(conciseMilliseconds(1000 * 60, { unitCount: 0 })).toBe('1m')
  expect(conciseMilliseconds(1000 * 60, { unitCount: 1 })).toBe('1m')
  expect(conciseMilliseconds(1000 * 60 * 67, { unitCount: 1 })).toBe('1h')
  expect(conciseMilliseconds(1000 * 60 * 67, { unitCount: 2 })).toBe('1h 7m')
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465, { unitCount: 1 })).toBe('1y')
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465, { unitCount: 2 })).toBe('1y 154d')
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465, { unitCount: 3 })).toBe('1y 154d 6h')
})

test('have a secondsDecimalDigits option', () => {
  expect(conciseMilliseconds(10_000)).toBe('10s')
  expect(conciseMilliseconds(33_333)).toBe('33.3s')
  expect(conciseMilliseconds(999, { secondsDecimalDigits: 0 })).toBe('999ms')
  expect(conciseMilliseconds(1000, { secondsDecimalDigits: 0 })).toBe('1s')
  expect(conciseMilliseconds(1999, { secondsDecimalDigits: 0 })).toBe('1s')
  expect(conciseMilliseconds(2000, { secondsDecimalDigits: 0 })).toBe('2s')
  expect(conciseMilliseconds(33_333, { secondsDecimalDigits: 0 })).toBe('33s')
  expect(conciseMilliseconds(33_333, { secondsDecimalDigits: 4 })).toBe('33.3330s')
})

test('have a millisecondsDecimalDigits option', () => {
  expect(conciseMilliseconds(33.333)).toBe('33ms')
  expect(conciseMilliseconds(33.333, { millisecondsDecimalDigits: 0 })).toBe('33ms')
  expect(conciseMilliseconds(33.333, { millisecondsDecimalDigits: 4 })).toBe('33.3330ms')
})

test('have a keepDecimalsOnWholeSeconds option', () => {
  expect(conciseMilliseconds(1000 * 33, { secondsDecimalDigits: 2, keepDecimalsOnWholeSeconds: true })).toBe('33.00s')
  expect(conciseMilliseconds(1000 * 33.000_04, { secondsDecimalDigits: 2, keepDecimalsOnWholeSeconds: true })).toBe('33.00s')
})

test('have a verbose option', () => {
  const fn = (milliseconds: number) => conciseMilliseconds(milliseconds, { verbose: true })

  expect(fn(0)).toBe('0 milliseconds')
  expect(fn(0.1)).toBe('1 millisecond')
  expect(fn(1)).toBe('1 millisecond')
  expect(fn(1000)).toBe('1 second')
  expect(fn(1000 + 400)).toBe('1.4 seconds')
  expect(fn((1000 * 2) + 400)).toBe('2.4 seconds')
  expect(fn(1000 * 5)).toBe('5 seconds')
  expect(fn(1000 * 55)).toBe('55 seconds')
  expect(fn(1000 * 67)).toBe('1 minute 7 seconds')
  expect(fn(1000 * 60 * 5)).toBe('5 minutes')
  expect(fn(1000 * 60 * 67)).toBe('1 hour 7 minutes')
  expect(fn(1000 * 60 * 60 * 12)).toBe('12 hours')
  expect(fn(1000 * 60 * 60 * 40)).toBe('1 day 16 hours')
  expect(fn(1000 * 60 * 60 * 999)).toBe('41 days 15 hours')
  expect(fn(1000 * 60 * 60 * 24 * 465)).toBe('1 year 100 days')
  expect(fn(1000 * 60 * 67 * 24 * 465)).toBe('1 year 154 days 6 hours')
})

test('have a separateMilliseconds option', () => {
  expect(conciseMilliseconds(1100, { separateMilliseconds: false })).toBe('1.1s')
  expect(conciseMilliseconds(1100, { separateMilliseconds: true })).toBe('1s 100ms')
})

test('have a formatSubMilliseconds option', () => {
  expect(conciseMilliseconds(0.4, { formatSubMilliseconds: true })).toBe('400µs')
  expect(conciseMilliseconds(0.123_571, { formatSubMilliseconds: true })).toBe('123µs 571ns')
  expect(conciseMilliseconds(0.123_456_789, { formatSubMilliseconds: true })).toBe('123µs 456ns')
  expect(conciseMilliseconds((60 * 60 * 1000) + (23 * 1000) + 433 + 0.123_456, { formatSubMilliseconds: true })).toBe('1h 23s 433ms 123µs 456ns')
})

test('work with verbose and compact options', () => {
  const fn = (milliseconds: number) => conciseMilliseconds(milliseconds, { verbose: true, compact: true })

  expect(fn(1000)).toBe('1 second')
  expect(fn(1000 + 400)).toBe('1 second')
  expect(fn((1000 * 2) + 400)).toBe('2 seconds')
  expect(fn(1000 * 5)).toBe('5 seconds')
  expect(fn(1000 * 55)).toBe('55 seconds')
  expect(fn(1000 * 67)).toBe('1 minute')
  expect(fn(1000 * 60 * 5)).toBe('5 minutes')
  expect(fn(1000 * 60 * 67)).toBe('1 hour')
  expect(fn(1000 * 60 * 60 * 12)).toBe('12 hours')
  expect(fn(1000 * 60 * 60 * 40)).toBe('1 day')
  expect(fn(1000 * 60 * 60 * 999)).toBe('41 days')
  expect(fn(1000 * 60 * 60 * 24 * 465)).toBe('1 year')
  expect(fn(1000 * 60 * 60 * 24 * 750)).toBe('2 years')
})

test('work with verbose and unitCount options', () => {
  expect(conciseMilliseconds(1000 * 60, { verbose: true, unitCount: 1 })).toBe('1 minute')
  expect(conciseMilliseconds(1000 * 60 * 67, { verbose: true, unitCount: 1 })).toBe('1 hour')
  expect(conciseMilliseconds(1000 * 60 * 67, { verbose: true, unitCount: 2 })).toBe('1 hour 7 minutes')
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465, { verbose: true, unitCount: 1 })).toBe('1 year')
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465, { verbose: true, unitCount: 2 })).toBe('1 year 154 days')
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465, { verbose: true, unitCount: 3 })).toBe('1 year 154 days 6 hours')
})

test('work with verbose and secondsDecimalDigits options', () => {
  const fn = (milliseconds: number) => conciseMilliseconds(milliseconds, { verbose: true, secondsDecimalDigits: 4 })

  expect(fn(1000)).toBe('1 second')
  expect(fn(1000 + 400)).toBe('1.4000 seconds')
  expect(fn((1000 * 2) + 400)).toBe('2.4000 seconds')
  expect(fn((1000 * 5) + 254)).toBe('5.2540 seconds')
  expect(fn(33_333)).toBe('33.3330 seconds')
})

test('work with verbose and millisecondsDecimalDigits options', () => {
  const fn = (milliseconds: number) => conciseMilliseconds(milliseconds, { verbose: true, millisecondsDecimalDigits: 4 })

  expect(fn(1)).toBe('1.0000 millisecond')
  expect(fn(1 + 0.4)).toBe('1.4000 milliseconds')
  expect(fn((1 * 2) + 0.4)).toBe('2.4000 milliseconds')
  expect(fn((1 * 5) + 0.254)).toBe('5.2540 milliseconds')
  expect(fn(33.333)).toBe('33.3330 milliseconds')
})

test('work with verbose and formatSubMilliseconds options', () => {
  expect(conciseMilliseconds(0.4, { formatSubMilliseconds: true, verbose: true })).toBe('400 microseconds')
  expect(conciseMilliseconds(0.123_571, { formatSubMilliseconds: true, verbose: true })).toBe('123 microseconds 571 nanoseconds')
  expect(conciseMilliseconds(0.123_456_789, { formatSubMilliseconds: true, verbose: true })).toBe('123 microseconds 456 nanoseconds')
  expect(conciseMilliseconds(0.001, { formatSubMilliseconds: true, verbose: true })).toBe('1 microsecond')
})

test('compact option overrides unitCount option', () => {
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465, { verbose: true, compact: true, unitCount: 1 })).toBe('1 year')
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465, { verbose: true, compact: true, unitCount: 2 })).toBe('1 year')
  expect(conciseMilliseconds(1000 * 60 * 67 * 24 * 465, { verbose: true, compact: true, unitCount: 3 })).toBe('1 year')
})

test('work with separateMilliseconds and formatSubMilliseconds options', () => {
  expect(conciseMilliseconds(1010.340_067, { separateMilliseconds: true, formatSubMilliseconds: true })).toBe('1s 10ms 340µs 67ns')
  expect(conciseMilliseconds((60 * 1000) + 34 + 0.000_005, { separateMilliseconds: true, formatSubMilliseconds: true })).toBe('1m 34ms 5ns')
})

test('properly rounds milliseconds with secondsDecimalDigits', () => {
  const fn = (milliseconds: number) => conciseMilliseconds(milliseconds, { verbose: true, secondsDecimalDigits: 0 })
  expect(fn(3 * 60 * 1000)).toBe('3 minutes')
  expect(fn((3 * 60 * 1000) - 1)).toBe('2 minutes 59 seconds')
  expect(fn(365 * 24 * 3600 * 1e3)).toBe('1 year')
  expect(fn((365 * 24 * 3600 * 1e3) - 1)).toBe('364 days 23 hours 59 minutes 59 seconds')
  expect(fn(24 * 3600 * 1e3)).toBe('1 day')
  expect(fn((24 * 3600 * 1e3) - 1)).toBe('23 hours 59 minutes 59 seconds')
  expect(fn(3600 * 1e3)).toBe('1 hour')
  expect(fn((3600 * 1e3) - 1)).toBe('59 minutes 59 seconds')
  expect(fn(2 * 3600 * 1e3)).toBe('2 hours')
  expect(fn((2 * 3600 * 1e3) - 1)).toBe('1 hour 59 minutes 59 seconds')
})

test('`colonNotation` option', () => {
  expect(conciseMilliseconds(1000, { colonNotation: true })).toBe('0:01')
  expect(conciseMilliseconds(1543, { colonNotation: true })).toBe('0:01.5')
  expect(conciseMilliseconds(1000 * 60, { colonNotation: true })).toBe('1:00')
  expect(conciseMilliseconds(1000 * 90, { colonNotation: true })).toBe('1:30')
  expect(conciseMilliseconds(95_543, { colonNotation: true })).toBe('1:35.5')
  expect(conciseMilliseconds((1000 * 60 * 10) + 543, { colonNotation: true })).toBe('10:00.5')
  expect(conciseMilliseconds((1000 * 60 * 59) + (1000 * 59) + 543, { colonNotation: true })).toBe('59:59.5')
  expect(conciseMilliseconds((1000 * 60 * 60 * 15) + (1000 * 60 * 59) + (1000 * 59) + 543, { colonNotation: true })).toBe('15:59:59.5')
  expect(conciseMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 0 })).toBe('0:00')
  expect(conciseMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 1 })).toBe('0:00.9')
  expect(conciseMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 2 })).toBe('0:00.99')
  expect(conciseMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 3 })).toBe('0:00.999')
  expect(conciseMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 0 })).toBe('0:01')
  expect(conciseMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 1 })).toBe('0:01')
  expect(conciseMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 2 })).toBe('0:01')
  expect(conciseMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 3 })).toBe('0:01')
  expect(conciseMilliseconds(1001, { colonNotation: true, secondsDecimalDigits: 0 })).toBe('0:01')
  expect(conciseMilliseconds(1001, { colonNotation: true, secondsDecimalDigits: 1 })).toBe('0:01')
  expect(conciseMilliseconds(1001, { colonNotation: true, secondsDecimalDigits: 2 })).toBe('0:01')
  expect(conciseMilliseconds(1001, { colonNotation: true, secondsDecimalDigits: 3 })).toBe('0:01.001')
  expect(conciseMilliseconds(1543, { colonNotation: true, secondsDecimalDigits: 0 })).toBe('0:01')
  expect(conciseMilliseconds(1543, { colonNotation: true, secondsDecimalDigits: 1 })).toBe('0:01.5')
  expect(conciseMilliseconds(1543, { colonNotation: true, secondsDecimalDigits: 2 })).toBe('0:01.54')
  expect(conciseMilliseconds(1543, { colonNotation: true, secondsDecimalDigits: 3 })).toBe('0:01.543')
  expect(conciseMilliseconds(95_543, { colonNotation: true, secondsDecimalDigits: 0 })).toBe('1:35')
  expect(conciseMilliseconds(95_543, { colonNotation: true, secondsDecimalDigits: 1 })).toBe('1:35.5')
  expect(conciseMilliseconds(95_543, { colonNotation: true, secondsDecimalDigits: 2 })).toBe('1:35.54')
  expect(conciseMilliseconds(95_543, { colonNotation: true, secondsDecimalDigits: 3 })).toBe('1:35.543')
  expect(conciseMilliseconds((1000 * 60 * 10) + 543, { colonNotation: true, secondsDecimalDigits: 3 })).toBe('10:00.543')
  expect(conciseMilliseconds((1000 * 60 * 60 * 15) + (1000 * 60 * 59) + (1000 * 59) + 543, { colonNotation: true, secondsDecimalDigits: 3 })).toBe('15:59:59.543')

  expect(conciseMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 0, keepDecimalsOnWholeSeconds: true })).toBe('0:00')
  expect(conciseMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 1, keepDecimalsOnWholeSeconds: true })).toBe('0:00.9')
  expect(conciseMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 2, keepDecimalsOnWholeSeconds: true })).toBe('0:00.99')
  expect(conciseMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 3, keepDecimalsOnWholeSeconds: true })).toBe('0:00.999')

  expect(conciseMilliseconds(1000, { colonNotation: true, keepDecimalsOnWholeSeconds: true })).toBe('0:01.0')
  expect(conciseMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 0, keepDecimalsOnWholeSeconds: true })).toBe('0:01')
  expect(conciseMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 1, keepDecimalsOnWholeSeconds: true })).toBe('0:01.0')
  expect(conciseMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 3, keepDecimalsOnWholeSeconds: true })).toBe('0:01.000')

  expect(conciseMilliseconds(1000 * 90, { colonNotation: true, secondsDecimalDigits: 0, unitCount: 1 })).toBe('1')
  expect(conciseMilliseconds(1000 * 90, { colonNotation: true, secondsDecimalDigits: 0, unitCount: 2 })).toBe('1:30')
  expect(conciseMilliseconds(1000 * 60 * 90, { colonNotation: true, secondsDecimalDigits: 0, unitCount: 3 })).toBe('1:30:00')

  expect(conciseMilliseconds(95_543, { colonNotation: true, secondsDecimalDigits: 1, unitCount: 1 })).toBe('1')
  expect(conciseMilliseconds(95_543, { colonNotation: true, secondsDecimalDigits: 1, unitCount: 2 })).toBe('1:35.5')
  expect(conciseMilliseconds(95_543 + (1000 * 60 * 60), { colonNotation: true, secondsDecimalDigits: 1, unitCount: 3 })).toBe('1:01:35.5')

  expect(conciseMilliseconds((1000 * 60 * 59) + (1000 * 59) + 543, { colonNotation: true, formatSubMilliseconds: true })).toBe('59:59.5')
  expect(conciseMilliseconds((1000 * 60 * 59) + (1000 * 59) + 543, { colonNotation: true, separateMilliseconds: true })).toBe('59:59.5')
  expect(conciseMilliseconds((1000 * 60 * 59) + (1000 * 59) + 543, { colonNotation: true, verbose: true })).toBe('59:59.5')
  expect(conciseMilliseconds((1000 * 60 * 59) + (1000 * 59) + 543, { colonNotation: true, compact: true })).toBe('59:59.5')
})

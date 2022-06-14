import { prettyMilliseconds } from '@elonehoo/concise-ms'

import {test,expect} from 'vitest'

test('prettify milliseconds',()=>{
  expect(prettyMilliseconds(0)).toBe('0ms')
  expect(prettyMilliseconds(0.1)).toBe('1ms')
  expect(prettyMilliseconds(1)).toBe('1ms')
  expect(prettyMilliseconds(999)).toBe('999ms')
  expect(prettyMilliseconds(1000)).toBe('1s')
  expect(prettyMilliseconds(1000 + 400)).toBe('1.4s')
  expect(prettyMilliseconds((1000 * 2) + 400)).toBe('2.4s')
  expect(prettyMilliseconds(1000 * 55)).toBe('55s')
  expect(prettyMilliseconds(1000 * 67)).toBe('1m 7s')
  expect(prettyMilliseconds(1000 * 60 * 5)).toBe('5m')
  expect(prettyMilliseconds(1000 * 60 * 67)).toBe('1h 7m')
  expect(prettyMilliseconds(1000 * 60 * 60 * 12)).toBe('12h')
  expect(prettyMilliseconds(1000 * 60 * 60 * 40)).toBe('1d 16h')
  expect(prettyMilliseconds(1000 * 60 * 60 * 999)).toBe('41d 15h')
  expect(prettyMilliseconds(1000 * 60 * 60 * 24 * 465)).toBe('1y 100d')
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465)).toBe('1y 154d 6h')
  expect(prettyMilliseconds(119_999)).toBe('1m 59.9s')
  expect(prettyMilliseconds(120_000)).toBe('2m')
})

test('have a compact option',()=>{
  expect(prettyMilliseconds(1000 + 4, {compact: true})).toBe('1s')
  expect(prettyMilliseconds(1000 * 60 * 60 * 999, {compact: true})).toBe('41d')
  expect(prettyMilliseconds(1000 * 60 * 60 * 24 * 465, {compact: true})).toBe('1y')
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {compact: true})).toBe('1y')
})

test('have a unitCount option',()=>{
  expect(prettyMilliseconds(1000 * 60, {unitCount: 0})).toBe('1m')
  expect(prettyMilliseconds(1000 * 60, {unitCount: 1})).toBe('1m')
  expect(prettyMilliseconds(1000 * 60 * 67, {unitCount: 1})).toBe('1h')
  expect(prettyMilliseconds(1000 * 60 * 67, {unitCount: 2})).toBe('1h 7m')
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {unitCount: 1})).toBe('1y')
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {unitCount: 2})).toBe('1y 154d')
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {unitCount: 3})).toBe('1y 154d 6h')
})

test('have a secondsDecimalDigits option',()=>{
  expect(prettyMilliseconds(10_000)).toBe('10s')
  expect(prettyMilliseconds(33_333)).toBe('33.3s')
  expect(prettyMilliseconds(999, {secondsDecimalDigits: 0})).toBe('999ms')
  expect(prettyMilliseconds(1000, {secondsDecimalDigits: 0})).toBe('1s')
  expect(prettyMilliseconds(1999, {secondsDecimalDigits: 0})).toBe('1s')
  expect(prettyMilliseconds(2000, {secondsDecimalDigits: 0})).toBe('2s')
  expect(prettyMilliseconds(33_333, {secondsDecimalDigits: 0})).toBe('33s')
  expect(prettyMilliseconds(33_333, {secondsDecimalDigits: 4})).toBe('33.3330s')
})

test('have a millisecondsDecimalDigits option',()=>{
  expect(prettyMilliseconds(33.333)).toBe('33ms')
  expect(prettyMilliseconds(33.333, {millisecondsDecimalDigits: 0})).toBe('33ms')
  expect(prettyMilliseconds(33.333, {millisecondsDecimalDigits: 4})).toBe('33.3330ms')
})

test('have a keepDecimalsOnWholeSeconds option',()=>{
  expect(prettyMilliseconds(1000 * 33, {secondsDecimalDigits: 2, keepDecimalsOnWholeSeconds: true})).toBe('33.00s')
  expect(prettyMilliseconds(1000 * 33.000_04, {secondsDecimalDigits: 2, keepDecimalsOnWholeSeconds: true})).toBe('33.00s')
})

test('have a verbose option',()=>{
  const fn = (milliseconds:number) => prettyMilliseconds(milliseconds, {verbose: true});

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

test('have a separateMilliseconds option',()=>{
  expect(prettyMilliseconds(1100, {separateMilliseconds: false})).toBe('1.1s')
  expect(prettyMilliseconds(1100, {separateMilliseconds: true})).toBe('1s 100ms')
})

test('have a formatSubMilliseconds option',()=>{
  expect(prettyMilliseconds(0.4, {formatSubMilliseconds: true})).toBe('400µs')
  expect(prettyMilliseconds(0.123_571, {formatSubMilliseconds: true})).toBe('123µs 571ns')
  expect(prettyMilliseconds(0.123_456_789, {formatSubMilliseconds: true})).toBe('123µs 456ns')
  expect(prettyMilliseconds((60 * 60 * 1000) + (23 * 1000) + 433 + 0.123_456, {formatSubMilliseconds: true})).toBe('1h 23s 433ms 123µs 456ns')
})

test('work with verbose and compact options',()=>{
  const fn = (milliseconds:number) => prettyMilliseconds(milliseconds, {verbose: true,compact: true})

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

test('work with verbose and unitCount options',()=>{
  expect(prettyMilliseconds(1000 * 60, {verbose: true, unitCount: 1})).toBe('1 minute')
  expect(prettyMilliseconds(1000 * 60 * 67, {verbose: true, unitCount: 1})).toBe('1 hour')
  expect(prettyMilliseconds(1000 * 60 * 67, {verbose: true, unitCount: 2})).toBe('1 hour 7 minutes')
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, unitCount: 1})).toBe('1 year')
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, unitCount: 2})).toBe('1 year 154 days')
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {verbose: true, unitCount: 3})).toBe('1 year 154 days 6 hours')
})

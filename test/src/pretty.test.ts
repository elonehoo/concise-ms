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

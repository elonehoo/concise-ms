<div align="center">
  <img src="./public/logo.svg" width="100px" height="100px" />
</div>

<h1 align="center">concise-ms</h1>

<p align="center">
  <em>Convert milliseconds to string: `1337000000` ➡️ `15d 11h 23m 20s`</em>
</p>

## install

```bash
# npm
npm install @elonehoo/concise-ms
#yarn
yarn add @elonehoo/concise-ms
#pnpm
pnpm install @elonehoo/concise-ms
```

## usage

```
```typescript
import { conciseMilliseconds } from '@elonehoo/concise-ms'

conciseMilliseconds(1337000000) //=> '15d 11h 23m 20s'

conciseMilliseconds(1337)//=> '1.3s'

conciseMilliseconds(133)//=> '133ms'

// `compact` option
conciseMilliseconds(1337, {compact: true})//=> '1s'

// `verbose` option
conciseMilliseconds(1335669000, {verbose: true})//=> '15 days 11 hours 1 minute 9 seconds'

// `colonNotation` option
conciseMilliseconds(95500, {colonNotation: true})//=> '1:35.5'

// `formatSubMilliseconds` option
conciseMilliseconds(100.400080, {formatSubMilliseconds: true})//=> '100ms 400µs 80ns'

// Can be useful for time durations
conciseMilliseconds(new Date(2014, 0, 1, 10, 40) - new Date(2014, 0, 1, 10, 5))//=> '35m'
```

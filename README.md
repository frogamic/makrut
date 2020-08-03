# Makrut
Yes, this is another javascript logger, but this one is tiny and functional.

## Quickstart

**Install Makrut:**
```bash
npm install makrut
```

**Use Makrut:**
```Javascript
import makrut from "makrut";

// Supported levels are: trace, debug, info, warn, error
const logger = makrut("info");

logger.debug("This won't print because 'debug' is more verbose than 'info'.");
logger.info("This will print");
try {
  theImpossible();
} catch (error) {
  logger.error("This will print too, and so will the error", error);
}
```

## Prerequisites

Since this is an es6 module only, it requires Node.js `>= 12.17.0` (LTS) or `>= 13.2.0`, the `--experimental-modules` flag, or an alternative module loader. There are zero npm dependencies.

## API

### Initialisation

A logger instance is created in Makrut by calling the single function returned as the default import.
```javascript
import makrut from 'makrut';
const logger = makrut(level);
```
**Input:**

**`level`** Optional string from `'trace'`, `'debug'`, `'info'`, `'warn'`, `'error'` (not case sensitive), defaults to `'info'`.

**Returns:** An object of the following form. Each key is a callable logging function.

```javascript
{
  trace: [Function],
  debug: [Function],
  info: [Function],
  warn: [Function],
  error: [Function]
};
```

### Logging

Logging is done by calling one of the functions on the returned `logger` object:

```javascript
logger.trace(message, data);
logger.debug(message, data);
logger.info(message, data);
logger.warn(message, data);
logger.error(message, data);
```
These are listed in increasing verbosity order, Makrut will only print messages that are equal or less verbose than the `level` you originally provided on initialisation. The corresponding function from `console` is used for each level, meaning that `logger.trace` will include the stacktrace of the calling context and `logger.error` will output to `stdout`.

**Input:**

**`message`** A string to print out to the console.

**`data`** Optional additional data to print after the message. This is printed by `console.dir`, so it would bypass any `inspect()` method on the data.

**Returns:** Nothing.

### Inspect

Makrut allows you to easily log objects in a promise or map chain using the inspect function:

```javascript
logger.trace.inspect(message)(data);
logger.debug.inspect(message)(data);
logger.info.inspect(message)(data);
logger.warn.inspect(message)(data);
logger.error.inspect(message)(data);
// or
logger.trace.inspect(data);
logger.debug.inspect(data);
logger.info.inspect(data);
logger.warn.inspect(data);
logger.error.inspect(data);
```
This is mathematically an identity function with a side effect, i.e. it returns the value it was called with, and logs it to the console.

**Input:**

**`message`** An optional string to print out before the object.

**`data`** An object to print after the message. This is printed by `console.dir`, so it would bypass any `inspect()` method on the data. If this will be a string, then a blank message must be provided or the data will be interpreted as the message.

**Returns:** `data`

This gives you some options when inspecting data in a chain of `.map` functions or promises. Each level has an accompanying inspect function, which will only log something if that level would output something. Note that the identity behaviour of returning the input remains while the log level is disabled so that it is safe to have in a map/promise chain still.

**Example:**
```javascript
import makrut from "makrut";
const logger = makrut("debug");

const numbersPlus10 = [1, 2, 3]
  .map(logger.debug.inspect)
  .map(x => x + 10)
  .map(logger.info.inspect("after adding 10"));

/* Output:
DEBUG:
1
DEBUG:
2
DEBUG:
3
INFO: after adding 10
11
INFO: after adding 10
12
INFO: after adding 10
13
*/

new Promise((resolve, reject) => resolve("Hello World"))
  .then(logger.info.inspect(""));

/* Output:
INFO: 
Hello World
*/
```

## Development

Get started by cloning this repo and installing the development dependencies:

```bash
git clone git+https://github.com/frogamic/makrut
npm install
```

There are currently no tests, but there linting is set up with eslint. I am using lightly customized `airbnb-base` rules, check `.eslint.cjs` for the full definition.

```bash
npm run lint
```

## What is a Makrut

The makrut lime is widely known as the _kaffir_ lime, however [the k word is an offensive racial slur in parts of Africa](https://en.wikipedia.org/wiki/Kaffir_(racial_term)).

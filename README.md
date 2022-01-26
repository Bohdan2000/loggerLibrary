# 24OnOff Logger

Relevant SoftwareThere, `24onoff-logger` package for logging.

- [24OnOff Logger](#24onoff-logger)
  - [About](#about)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Linting](#linting)
  - [Unit testing](#unit-testing)
  - [Design](#design)

## About

This is TypeScript library for logging and should be used in `24OnOff` projects.

## Installation

Install this package, use:

```
npm --registry https://24onoff-v2.bytesafe.dev/r/default install -S @24onoff/24onoff-logger
```

## Usage

Use definitions from `24onoff-logger` package, example:

```JavaScript
import { LogClass } from '@24onoff/24onoff-logger'

@LogClass()
class Greeter {
  message: string;
  constructor(m: string) {
    this.message = m;
  }
  private showMessage(): void {
    console.log(this.message)
  }
}

...
const greeter = new Greeter();
greeter.showMessage();

```

## Linting

For check eslint rules, use:

```
npm run lint
```

For auto fix all eslint bugs, use:

```
npm run lint:fix
```

## Unit testing

For run unit tests, use:

```
npm run test
```

All unit test report you can find at `report/` folder.

For run test at watch mode, use:

```
npm run test:dev
```

## Developing

Run this command to copy `.npmrc_config` npm configuration file to real `.npmrc`, and replace `${NPM_TOKEN}` to real available token

```
cp .npmrc_config .npmrc
```

Install NPM dependencies, use:

```
npm i
```

## Documentation

For generate code documentation, use:

```
npm run doc
```

All docs files you can find at `report/doc/` folder.

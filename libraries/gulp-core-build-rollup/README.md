# @gulp-utils/gulp-core-build-rollup

`gulp-core-build-rollup` is a `gulp-core-build` subtask which introduces the ability to bundle various source files into a set of bundles, using rollup.

[![npm version](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-rollup.svg)](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-rollup)
[![Dependencies](https://david-dm.org/tnc1997/gulp-utils%3Fpath%3Dlibraries%2Fgulp-core-build-rollup.svg)](https://david-dm.org/tnc1997/gulp-utils%3Fpath%3Dlibraries%2Fgulp-core-build-rollup)

# Tasks

## RollupTask

### Description
This task invokes rollup using a consumer-specified `rollup.config.js` on a package.

### Command Line Options
If the `--initrollup` flag is passed to the command line, this task will initialize a `rollup.config.js` which bundles `lib/index.js` into `dist/{packagename}.js` as a UMD module.

### Usage
```javascript
const {rollup} = require("@gulp-utils/gulp-core-build-rollup");
const {initialize, parallel, serial, task} = require("@microsoft/gulp-core-build");
const {tscCmd, tslintCmd} = require("@microsoft/gulp-core-build-typescript");

rollup.setConfig({
  configPath: "./rollup.config.js"
});

task("default", serial(parallel(tscCmd, tslintCmd), rollup));

initialize(require("gulp"));
```

### Config
```typescript
interface IRollupConfig {
    configPath?: string;
    config?: RollupOptions | RollupOptions[];
    suppressWarnings?: (string | RegExp)[];
    rollup?: typeof Rollup;
    printStats?: boolean;
}
```

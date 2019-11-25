# @gulp-utils/gulp-core-build-rollup

`gulp-core-build-rollup` is a `gulp-core-build` subtask which introduces the ability to bundle various source files into a set of bundles, using rollup.

[![npm version](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-rollup.svg)](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-rollup)
[![Dependencies](https://david-dm.org/tnc1997/gulp-utils%3Fpath%3Dlibraries%2Fgulp-core-build-rollup.svg)](https://david-dm.org/tnc1997/gulp-utils?path=libraries/gulp-core-build-rollup)

# Tasks

## RollupTask

### Description
This task invokes rollup on a package, using a consumer-specified `rollup.config.js`.

### Command Line Options
If the `--initrollup` flag is passed to the command line, this task will initialize a `rollup.config.js` which bundles `lib/index.js` into `dist/{packagename}.js` as a UMD module.

### Usage
```javascript
const {rollup} = require("@gulp-utils/gulp-core-build-rollup");
const {tsc} = require("@gulp-utils/gulp-core-build-tsc");
const {initialize, serial, task} = require("@microsoft/gulp-core-build");

rollup.setConfig({
  configPath: "./rollup.config.js"
});

task("default", serial(tsc, rollup));

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

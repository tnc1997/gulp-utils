# @gulp-utils/gulp-core-build-tsc

`gulp-core-build-tsc` is a `gulp-core-build` subtask which introduces the ability to compile a Node.js module, using tsc.

[![npm version](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-tsc.svg)](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-tsc)
[![Dependencies](https://david-dm.org/tnc1997/gulp-utils%3Fpath%3Dlibraries%2Fgulp-core-build-tsc.svg)](https://david-dm.org/tnc1997/gulp-utils?path=libraries/gulp-core-build-tsc)

# Tasks

## TscTask

### Description
This task invokes tsc on a package, using a consumer-specified `tsconfig.json`.

### Usage
```javascript
const {tsc} = require("@gulp-utils/gulp-core-build-tsc");
const {initialize, task} = require("@microsoft/gulp-core-build");

tsc.setConfig({
  configPath: "./tsconfig.json"
});

task("default", tsc);

initialize(require("gulp"));
```

### Config
```typescript
interface ITscTaskConfig {
  config?: CompilerOptions;
  configPath?: string;
}
```

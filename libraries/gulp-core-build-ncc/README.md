# @gulp-utils/gulp-core-build-ncc

`gulp-core-build-ncc` is a `gulp-core-build` subtask which introduces the ability to compile a Node.js module into a single file together with all its dependencies, using ncc.

[![npm version](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-ncc.svg)](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-ncc)
[![Dependencies](https://david-dm.org/tnc1997/gulp-utils%3Fpath%3Dlibraries%2Fgulp-core-build-ncc.svg)](https://david-dm.org/tnc1997/gulp-utils?path=libraries/gulp-core-build-ncc)

# Tasks

## NccTask

### Description
This task invokes ncc on a package.

### Usage
```javascript
const {ncc} = require("@gulp-utils/gulp-core-build-ncc");
const {initialize, task} = require("@microsoft/gulp-core-build");

ncc.setConfig({
  config: {
    sourceMap: true
  }
});

task("default", ncc);

initialize(require("gulp"));
```

### Config
```typescript
interface INccOptions {
  cache?: string | boolean;
  externals?: string[];
  filterAssetBase?: string;
  minify?: boolean;
  sourceMap?: boolean;
  sourceMapBasePrefix?: string;
  sourceMapRegister?: boolean;
  v8cache?: boolean;
}

interface INccTaskConfig {
  config?: INccOptions;
  inputFile?: string;
  outputFile?: string;
}
```

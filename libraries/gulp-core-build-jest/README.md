# @gulp-utils/gulp-core-build-jest

`gulp-core-build-jest` is a `gulp-core-build` subtask which introduces the ability to test packages, using jest.

[![npm version](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-jest.svg)](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-jest)
[![Dependencies](https://david-dm.org/tnc1997/gulp-utils%3Fpath%3Dlibraries%2Fgulp-core-build-jest.svg)](https://david-dm.org/tnc1997/gulp-utils?path=libraries/gulp-core-build-jest)

# Tasks

## JestTask

### Description
This task invokes jest using a consumer-specified `jest.config.js` on a package.

### Usage
```javascript
const {jest} = require("@gulp-utils/gulp-core-build-jest");
const {initialize, task} = require("@microsoft/gulp-core-build");

jest.setConfig({
  configPath: "./jest.config.js"
});

task("default", jest);

initialize(require("gulp"));
```

### Config
```typescript
interface IJestTaskConfig {
    configPath?: string;
    config?: Config.Argv;
}
```

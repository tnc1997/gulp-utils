# @gulp-utils/gulp-core-build-api-documenter

`gulp-core-build-api-documenter` is a `gulp-core-build` subtask which introduces the ability to generate documentation, using api-documenter.

[![npm version](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-api-documenter.svg)](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-api-documenter)
[![Dependencies](https://david-dm.org/tnc1997/gulp-utils%3Fpath%3Dlibraries%2Fgulp-core-build-api-documenter.svg)](https://david-dm.org/tnc1997/gulp-utils?path=libraries/gulp-core-build-api-documenter)

# Tasks

## ApiDocumenterTask

### Description
This task invokes api-documenter on a package.

### Usage
```javascript
const {apiDocumenter} = require("@gulp-utils/gulp-core-build-api-documenter");
const {initialize, parallel, serial, task} = require("@microsoft/gulp-core-build");
const {tscCmd, tslintCmd, apiExtractor} = require("@microsoft/gulp-core-build-typescript");

apiDocumenter.setConfig({
  format: "markdown"
});

task("default", serial(parallel(tscCmd, tslintCmd), apiExtractor, apiDocumenter));

initialize(require("gulp"));
```

### Config
```typescript
interface IApiDocumenterTaskConfig {
  format?: Format;
  inputFolder?: string;
  outputFolder?: string;
}

type Format = 'markdown' | 'yaml';
```

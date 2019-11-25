# @gulp-utils/gulp-core-build-api-extractor

`gulp-core-build-api-extractor` is a `gulp-core-build` subtask which introduces the ability to generate documentation, using api-extractor.

[![npm version](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-api-extractor.svg)](https://badge.fury.io/js/%40gulp-utils%2Fgulp-core-build-api-extractor)
[![Dependencies](https://david-dm.org/tnc1997/gulp-utils%3Fpath%3Dlibraries%2Fgulp-core-build-api-extractor.svg)](https://david-dm.org/tnc1997/gulp-utils?path=libraries/gulp-core-build-api-extractor)

# Tasks

## ApiExtractorTask

### Description
This task invokes api-extractor on a package, using a consumer-specified `api-extractor.json`.

### Usage
```javascript
const {apiExtractor} = require("@gulp-utils/gulp-core-build-api-extractor");
const {tsc} = require("@gulp-utils/gulp-core-build-tsc");
const {initialize, serial, task} = require("@microsoft/gulp-core-build");

apiExtractor.setConfig({
  configPath: "./config/api-extractor.json"
});

task("default", serial(tsc, apiExtractor));

initialize(require("gulp"));
```

### Config
```typescript
interface IApiExtractorTaskConfig {
  config?: ExtractorConfig;
  configPath?: string;
  options?: IExtractorInvokeOptions;
}
```

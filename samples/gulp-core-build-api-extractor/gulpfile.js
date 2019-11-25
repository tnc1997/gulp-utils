"use strict";

const {apiExtractor} = require("@gulp-utils/gulp-core-build-api-extractor");
const {tsc} = require("@gulp-utils/gulp-core-build-tsc");
const {initialize, serial, task} = require("@microsoft/gulp-core-build");

apiExtractor.setConfig({
  options: {
    localBuild: true
  }
});

task("default", serial(tsc, apiExtractor));

initialize(require("gulp"));

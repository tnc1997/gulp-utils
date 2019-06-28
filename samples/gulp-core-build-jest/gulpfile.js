"use strict";

const {jest} = require("@gulp-utils/gulp-core-build-jest");
const {initialize, parallel, serial, task} = require("@microsoft/gulp-core-build");
const {tscCmd, tslintCmd} = require("@microsoft/gulp-core-build-typescript");

task("default", serial(parallel(tscCmd, tslintCmd), jest));

initialize(require("gulp"));

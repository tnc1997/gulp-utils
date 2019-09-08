"use strict";

const {ncc} = require("@gulp-utils/gulp-core-build-ncc");
const {initialize, parallel, task} = require("@microsoft/gulp-core-build");
const {tslintCmd} = require("@microsoft/gulp-core-build-typescript");

task("default", parallel(ncc, tslintCmd));

initialize(require("gulp"));

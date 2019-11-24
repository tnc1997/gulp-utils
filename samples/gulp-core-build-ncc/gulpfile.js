"use strict";

const {ncc} = require("@gulp-utils/gulp-core-build-ncc");
const {initialize, task} = require("@microsoft/gulp-core-build");

task("default", ncc);

initialize(require("gulp"));

"use strict";

const {tsc} = require("@gulp-utils/gulp-core-build-tsc");
const {initialize, task} = require("@microsoft/gulp-core-build");

task("default", tsc);

initialize(require("gulp"));

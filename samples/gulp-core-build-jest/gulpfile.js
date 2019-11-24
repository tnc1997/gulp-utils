"use strict";

const {jest} = require("@gulp-utils/gulp-core-build-jest");
const {initialize, task} = require("@microsoft/gulp-core-build");

task("default", jest);

initialize(require("gulp"));

"use strict";

/**
 * When using the PNPM package manager, you can use pnpmfile.js to workaround
 * dependencies that have mistakes in their package.json file.  (This feature is
 * functionally similar to Yarn's "resolutions".)
 *
 * For details, see the PNPM documentation:
 * https://pnpm.js.org/docs/en/hooks.html
 *
 * IMPORTANT: SINCE THIS FILE CONTAINS EXECUTABLE CODE, MODIFYING IT IS LIKELY
 * TO INVALIDATE ANY CACHED DEPENDENCY ANALYSIS.  We recommend to run "rush update --full"
 * after any modification to pnpmfile.js.
 *
 */
module.exports = {
  hooks: {
    readPackage
  }
};

/**
 * This hook is invoked during installation before a package's dependencies
 * are selected.
 * The `packageJson` parameter is the deserialized package.json
 * contents for the package that is about to be installed.
 * The `context` parameter provides a log() function.
 * The return value is the updated object.
 */
function readPackage(packageJson, context) {
  // // The karma types have a missing dependency on typings from the log4js package.
  // if (packageJson.name === '@types/karma') {
  //  context.log('Fixed up dependencies for @types/karma');
  //  packageJson.dependencies['log4js'] = '0.6.38';
  // }

  // @jest/core is in beta and has missing dependencies.
  if (packageJson.name === "@jest/core") {
    packageJson.dependencies["@types/yargs"] = "^13.0.0";
    packageJson.dependencies["yargs"] = "^13.0.0";
    context.log("Fixed up dependencies for @jest/core");
  }

  // @jest/reporters is in beta and has missing dependencies.
  if (packageJson.name === "@jest/reporters") {
    packageJson.dependencies["istanbul-lib-coverage"] = "^2.0.0";
    context.log("Fixed up dependencies for @jest/reporters");
  }

  // jest-cli is in beta and has missing dependencies.
  if (packageJson.name === "jest-cli") {
    packageJson.dependencies["@types/yargs"] = "^13.0.0";
    packageJson.dependencies["yargs"] = "^13.0.0";
    context.log("Fixed up dependencies for jest-cli");
  }

  // jest-resolve is in beta and has missing dependencies.
  if (packageJson.name === "jest-resolve") {
    packageJson.dependencies["jest-haste-map"] = "^24.0.0";
    context.log("Fixed up dependencies for jest-resolve");
  }

  // jest-runtime is in beta and has missing dependencies.
  if (packageJson.name === "jest-runtime") {
    packageJson.dependencies["istanbul-lib-coverage"] = "^2.0.0";
    context.log("Fixed up dependencies for jest-runtime");
  }

  return packageJson;
}

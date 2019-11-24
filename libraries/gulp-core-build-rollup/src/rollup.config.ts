// tslint:disable
import { join } from "path";
import { RollupOptions } from "rollup";

import { RollupTask } from "./rollupTask";

const rollupTask: RollupTask = require('@gulp-utils/gulp-core-build-rollup').rollup;
const inDir: string = join(__dirname, rollupTask.buildConfig.libFolder);
const outDir: string = join(__dirname, rollupTask.buildConfig.distFolder);

const packageJson: { name: string } = require('./package.json');

const rollupConfiguration: RollupOptions = {
  input: join(inDir, "index.js"),
  output: {
    file: join(outDir, packageJson.name),
    format: "umd",
    name: packageJson.name,
    sourcemap: true
  }
};

exports = rollupConfiguration;

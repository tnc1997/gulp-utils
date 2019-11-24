// @microsoft/gulp-core-build-webpack
//
// Copyright (c) Microsoft Corporation. All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { GulpTask } from "@microsoft/gulp-core-build";
// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
import { default as Rollup, RollupBuild, RollupOptions } from "rollup";

import { IRollupTaskConfig } from "./iRollupTaskConfig";

/**
 * A gulp core build subtask which introduces the ability to bundle various source files into a set of bundles, using rollup.
 * @public
 */
export class RollupTask<TExtendedConfig = {}> extends GulpTask<
  IRollupTaskConfig & TExtendedConfig
> {
  public constructor(
    extendedName: string = "rollup",
    extendedConfig?: TExtendedConfig
  ) {
    super(extendedName, {
      configPath: "./rollup.config.js",
      printStats: true,
      suppressWarnings: [],
      ...(extendedConfig as {})
      // tslint:disable-next-line:no-any
    } as any);
  }

  /**
   * {@inheritDoc GulpTask.executeTask}
   */
  public async executeTask(): Promise<void> {
    const shouldInitRollup: boolean = process.argv.indexOf("--initrollup") > -1;

    if (shouldInitRollup) {
      this.log(
        "Initializing a rollup.config.js, which bundles lib/index.js " +
          "into dist/packagename.js as a UMD module."
      );

      const path: string = this.resolvePath("rollup.config.js");

      this.copyFile(path);

      return;
    }

    let rollupOptions: RollupOptions[];

    if (
      this.taskConfig.configPath !== undefined &&
      this.fileExists(this.taskConfig.configPath)
    ) {
      try {
        const path: string = this.resolvePath(this.taskConfig.configPath);
        const config: RollupOptions | RollupOptions[] = require(path) as
          | RollupOptions
          | RollupOptions[];

        rollupOptions = config instanceof Array ? config : [config];
      } catch (err) {
        throw new Error(
          `Error parsing rollup config '${this.taskConfig.configPath}': ${err}`
        );
      }
    } else if (this.taskConfig.config !== undefined) {
      const config: RollupOptions | RollupOptions[] = this.taskConfig.config;

      rollupOptions = config instanceof Array ? config : [config];
    } else {
      this.logWarning(
        "No rollup config has been provided. Run again using --initrollup to create a default config, " +
          "or call rollup.setConfig({ configPath: null }) in your gulpfile."
      );

      return;
    }

    const rollup: typeof Rollup =
      this.taskConfig.rollup !== undefined
        ? // tslint:disable-next-line:no-unnecessary-type-assertion
          (this.taskConfig.rollup as typeof Rollup)
        : // tslint:disable-next-line:no-unnecessary-type-assertion
          (Rollup as typeof Rollup);

    for (const rollupOption of rollupOptions) {
      const { input, output } = rollupOption;

      if (output instanceof Array) {
        for (const value of output) {
          this.log(
            `Bundling '${input.toString()}' into '${value.file}' as a '${
              value.format
            }' module.`
          );
        }

        // tslint:disable-next-line:no-unsafe-any
        const build: RollupBuild = await (rollup.rollup(
          rollupOption
        ) as Promise<RollupBuild>);

        for (const value of output) {
          await build.write(value);
        }
      } else if (output !== undefined) {
        this.log(
          `Bundling '${input.toString()}' into '${output.file}' as a '${
            output.format
          }' module.`
        );

        // tslint:disable-next-line:no-unsafe-any
        const build: RollupBuild = await (rollup.rollup(
          rollupOption
        ) as Promise<RollupBuild>);

        await build.write(output);
      } else {
        this.log(
          `Bundling '${input.toString()}' into 'dist/index.js' as a 'cjs' module.`
        );

        // tslint:disable-next-line:no-unsafe-any
        const build: RollupBuild = await (rollup.rollup(
          rollupOption
        ) as Promise<RollupBuild>);

        await build.write({ file: "dist/index.js", format: "cjs" });
      }
    }
  }
}

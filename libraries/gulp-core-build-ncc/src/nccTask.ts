import { GulpTask } from "@microsoft/gulp-core-build";
import { ensureFile, writeFile } from "fs-extra";

import { INccTaskConfig } from "./iNccTaskConfig";
import { IOutput } from "./iOutput";

/**
 * A gulp core build subtask which introduces the ability to compile a Node.js module into a single file together with all its dependencies, using ncc.
 * @public
 */
export class NccTask extends GulpTask<INccTaskConfig> {
  public constructor() {
    super("ncc", {
      inputFile: "./src/index.ts",
      outputFile: "./dist/index.js"
    });
  }

  /**
   * {@inheritDoc GulpTask.executeTask}
   */
  public async executeTask(): Promise<void> {
    const inputPath: string = this.resolvePath(
      this.taskConfig.inputFile !== undefined
        ? this.taskConfig.inputFile
        : "./src/index.ts"
    );

    // tslint:disable-next-line:no-require-imports no-unsafe-any
    const { code, map }: IOutput = await require("@zeit/ncc")(inputPath, {
      ...this.taskConfig.config,
      quiet: true
    });

    const outputPath: string = this.resolvePath(
      this.taskConfig.outputFile !== undefined
        ? this.taskConfig.outputFile
        : "./dist/index.js"
    );

    if (code !== undefined) {
      await ensureFile(outputPath);

      await writeFile(outputPath, code, "utf8");
    }

    if (map !== undefined) {
      await ensureFile(`${outputPath}.map`);

      await writeFile(`${outputPath}.map`, code, "utf8");
    }
  }
}

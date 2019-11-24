// tslint:disable-next-line:no-submodule-imports
import { ApiDocumenterCommandLine } from "@microsoft/api-documenter/lib/cli/ApiDocumenterCommandLine";
import { GulpTask } from "@microsoft/gulp-core-build";

import { IApiDocumenterTaskConfig } from "./iApiDocumenterTaskConfig";

/**
 * A gulp core build subtask which introduces the ability to generate documentation, using api-documenter.
 * @public
 */
export class ApiDocumenterTask extends GulpTask<IApiDocumenterTaskConfig> {
  public constructor() {
    super("apiDocumenter", {
      format: "markdown",
      inputFolder: "./temp",
      outputFolder: "./docs"
    });
  }

  /**
   * {@inheritDoc GulpTask.executeTask}
   */
  public async executeTask(): Promise<boolean> {
    const args: string[] = [
      this.taskConfig.format !== undefined ? this.taskConfig.format : "markdown"
    ];

    if (this.taskConfig.inputFolder !== undefined) {
      args.push("--input-folder", this.taskConfig.inputFolder);
    }

    if (this.taskConfig.outputFolder !== undefined) {
      args.push("--output-folder", this.taskConfig.outputFolder);
    }

    return new ApiDocumenterCommandLine().execute(args);
  }
}

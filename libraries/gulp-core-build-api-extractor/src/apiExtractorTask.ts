import {
  Extractor,
  ExtractorConfig,
  ExtractorResult
} from "@microsoft/api-extractor";
import { GulpTask } from "@microsoft/gulp-core-build";

import { IApiExtractorTaskConfig } from "./iApiExtractorTaskConfig";

/**
 * A gulp core build subtask which introduces the ability to generate documentation, using api-extractor.
 * @public
 */
export class ApiExtractorTask extends GulpTask<IApiExtractorTaskConfig> {
  public constructor() {
    super("apiExtractor", {
      configPath: "./config/api-extractor.json"
    });
  }

  /**
   * {@inheritDoc GulpTask.executeTask}
   */
  public async executeTask(): Promise<boolean> {
    let extractorConfig: ExtractorConfig;

    if (
      this.taskConfig.configPath !== undefined &&
      this.fileExists(this.taskConfig.configPath)
    ) {
      try {
        const path: string = this.resolvePath(this.taskConfig.configPath);

        extractorConfig = ExtractorConfig.loadFileAndPrepare(path);
      } catch (err) {
        throw new Error(
          `Error parsing api-extractor config '${this.taskConfig.configPath}': ${err}`
        );
      }
    } else if (this.taskConfig.config !== undefined) {
      extractorConfig = this.taskConfig.config;
    } else {
      this.logWarning(
        "No api-extractor config has been provided. Run again after you have created a default config."
      );

      return false;
    }

    const extractorResult: ExtractorResult = Extractor.invoke(
      extractorConfig,
      this.taskConfig.options
    );

    return extractorResult.succeeded;
  }
}

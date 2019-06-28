import {runCLI} from '@jest/core';
import {AggregatedResult} from '@jest/test-result';
import {Config} from '@jest/types';
import {GulpTask, IBuildConfig} from '@microsoft/gulp-core-build';

/**
 * @public
 */
export interface IJestTaskConfig {
  /**
   * Path to a jest config. A path to a config takes precedence over the "config" option.
   */
  configPath?: string;

  /**
   * Jest config object. If a path is specified by "configPath" and it is valid, this option is ignored.
   */
  config?: Config.Argv;
}

/**
 * @public
 */
export class JestTask extends GulpTask<IJestTaskConfig> {
  constructor() {
    super(
      'jest',
      {
        configPath: './jest.config.js'
      }
    );
  }

  public async executeTask(): Promise<void> {
    let jestOptions: Config.Argv;

    if (this.taskConfig.configPath && this.fileExists(this.taskConfig.configPath)) {
      try {
        const path: string = this.resolvePath(this.taskConfig.configPath);

        jestOptions = require(path);
      } catch (err) {
        throw new Error(`Error parsing jest config '${this.taskConfig.configPath}': ${err}`);
      }
    } else if (this.taskConfig.config) {
      jestOptions = this.taskConfig.config;
    } else {
      this.logWarning('No jest config has been provided. Run again after creating a default config.');

      return;
    }

    jestOptions = {
      ...jestOptions,
      reporters: [
        ...(jestOptions.reporters as string[] || [])
      ]
    };

    const result: Result = await runCLI(jestOptions, jestOptions.projects || [this.buildConfig.rootPath]);

    this.log(`Suites: ${result.results.numPassedTestSuites} passed, ${result.results.numTotalTestSuites} total`);
    this.log(`Tests: ${result.results.numPassedTests} passed, ${result.results.numTotalTests} total`);
    this.log(`Snapshots: ${result.results.snapshot.total} total`);
    this.log(`Time: ${(Date.now() - result.results.startTime) / 1000} seconds`);
  }

  public isEnabled(buildConfig: IBuildConfig): boolean {
    return super.isEnabled(buildConfig) && !!this.taskConfig.configPath;
  }
}

/**
 * @private
 */
type Result = {
  results: AggregatedResult;
  globalConfig: Config.GlobalConfig;
};

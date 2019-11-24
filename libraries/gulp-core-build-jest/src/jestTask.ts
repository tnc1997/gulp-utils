import { runCLI } from "@jest/core";
import { TestResult } from "@jest/test-result";
import { Config } from "@jest/types";
import { GulpTask } from "@microsoft/gulp-core-build";

import { IJestTaskConfig } from "./iJestTaskConfig";
import { IResult } from "./iResult";

/**
 * A gulp core build subtask which introduces the ability to test packages, using jest.
 * @public
 */
export class JestTask extends GulpTask<IJestTaskConfig> {
  public constructor() {
    super("jest", {
      configPath: "./jest.config.js"
    });
  }

  /**
   * {@inheritDoc GulpTask.executeTask}
   */
  public async executeTask(): Promise<void> {
    let jestOptions: Config.Argv;

    if (
      this.taskConfig.configPath !== undefined &&
      this.fileExists(this.taskConfig.configPath)
    ) {
      try {
        const path: string = this.resolvePath(this.taskConfig.configPath);

        jestOptions = require(path) as Config.Argv;
      } catch (err) {
        this.logError(
          `Error parsing jest config '${this.taskConfig.configPath}': ${err}`
        );

        return;
      }
    } else if (this.taskConfig.config !== undefined) {
      jestOptions = this.taskConfig.config;
    } else {
      this.logWarning(
        "No jest config has been provided. Run again after creating a default config."
      );

      return;
    }

    const reporters: string[] =
      jestOptions.reporters !== undefined
        ? (jestOptions.reporters as string[])
        : [];

    jestOptions = {
      ...jestOptions,
      reporters
    };

    const {
      results: {
        numFailedTests,
        numPassedTestSuites,
        numPassedTests,
        numTotalTestSuites,
        numTotalTests,
        snapshot,
        startTime,
        testResults
      }
    }: IResult = await runCLI(
      jestOptions,
      jestOptions.projects !== undefined
        ? jestOptions.projects
        : [this.buildConfig.rootPath]
    );

    const noOfMilliseconds: number = 1000;

    this.log(
      `Suites: ${numPassedTestSuites} passed, ${numTotalTestSuites} total`
    );
    this.log(`Tests: ${numPassedTests} passed, ${numTotalTests} total`);
    this.log(`Snapshots: ${snapshot.total} total`);
    this.log(`Time: ${(Date.now() - startTime) / noOfMilliseconds} seconds`);

    if (numFailedTests > 0) {
      testResults
        .filter(
          (testResult: TestResult) => testResult.failureMessage !== undefined
        )
        .forEach((testResult: TestResult) => {
          this.log(testResult.failureMessage);
        });

      this.logError("One or more tests failed, please review the logs above.");

      return;
    }
  }
}

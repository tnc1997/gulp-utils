import { GulpTask } from "@microsoft/gulp-core-build";
import * as glob from "glob";
import {
  CompilerOptions,
  createProgram,
  ParseConfigHost,
  parseJsonSourceFileConfigFileContent,
  readJsonConfigFile,
  sys,
  TsConfigSourceFile
} from "typescript";

import { ITscTaskConfig } from "./iTscTaskConfig";

/**
 * A gulp core build subtask which introduces the ability to compile a Node.js module, using tsc.
 * @public
 */
export class TscTask extends GulpTask<ITscTaskConfig> {
  /**
   * The config host used by typescript to parse directories and files.
   */
  private readonly parseConfigHost: ParseConfigHost;

  public constructor() {
    super("tsc", {
      configPath: "./tsconfig.json"
    });

    this.parseConfigHost = {
      fileExists: (file: string): boolean => sys.fileExists(file),
      readDirectory: (
        path: string,
        extensions?: readonly string[],
        exclude?: readonly string[],
        include?: readonly string[],
        depth?: number
      ): string[] =>
        sys.readDirectory(path, extensions, exclude, include, depth),
      readFile: (path: string, encoding?: string): string | undefined =>
        sys.readFile(path, encoding),
      useCaseSensitiveFileNames: true
    };
  }

  /**
   * {@inheritDoc GulpTask.executeTask}
   */
  public async executeTask(): Promise<void> {
    let compilerOptions: CompilerOptions;

    if (
      this.taskConfig.configPath !== undefined &&
      this.fileExists(this.taskConfig.configPath)
    ) {
      try {
        const path: string = this.resolvePath(this.taskConfig.configPath);

        const tsConfigSourceFile: TsConfigSourceFile = readJsonConfigFile(
          path,
          (path1: string) => sys.readFile(path1)
        );

        compilerOptions = parseJsonSourceFileConfigFileContent(
          tsConfigSourceFile,
          this.parseConfigHost,
          "./"
        ).options;
      } catch (err) {
        throw new Error(
          `Error parsing tsc config '${this.taskConfig.configPath}': ${err}`
        );
      }
    } else if (this.taskConfig.config !== undefined) {
      compilerOptions = this.taskConfig.config;
    } else {
      this.logWarning(
        "No tsc config has been provided. Run again after you have created a default config."
      );

      return;
    }

    const fileNames: string[] = await new Promise(
      (
        resolve: (value?: PromiseLike<string[]> | string[]) => void,
        reject: (reason?: string) => void
      ): void => {
        const pattern: string =
          compilerOptions.rootDir !== undefined
            ? `${compilerOptions.rootDir}/**/*.ts`
            : "**/*.ts";

        glob(pattern, (err: Error | undefined, matches: string[]) => {
          if (matches !== undefined && matches.length > 0) {
            resolve(matches);
          } else if (err !== undefined) {
            reject(err.message);
          } else {
            reject();
          }
        });
      }
    );

    createProgram(fileNames, compilerOptions).emit();
  }
}

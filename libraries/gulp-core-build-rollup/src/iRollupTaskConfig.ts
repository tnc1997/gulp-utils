// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
import { default as Rollup, RollupOptions } from "rollup";

/**
 * @public
 */
export interface IRollupTaskConfig {
  /**
   * Rollup config object. If a path is specified by "configPath," and it is valid, this option is ignored.
   */
  config?: RollupOptions | RollupOptions[];

  /**
   * Path to a rollup config. A path to a config takes precedence over the "config" option.
   */
  configPath?: string;

  /**
   * If true, a summary of the compilation will be printed after it completes. Defaults to true.
   */
  printStats?: boolean;

  /**
   * An instance of the rollup compiler object.
   */
  rollup?: typeof Rollup;

  /**
   * An array of regular expressions or regular expression strings.
   */
  suppressWarnings?: Array<string | RegExp>;
}

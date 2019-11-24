import { Config } from "@jest/types";

/**
 * @public
 */
export interface IJestTaskConfig {
  /**
   * The jest config object. If a path is specified by "configPath" and it is valid, this option is ignored.
   */
  config?: Config.Argv;

  /**
   * The path to a jest config. A path to a config takes precedence over the "config" option.
   */
  configPath?: string;
}

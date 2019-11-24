import { CompilerOptions } from "typescript";

/**
 * @public
 */
export interface ITscTaskConfig {
  /**
   * The tsc config object. If a path is specified by "configPath" and it is valid, this option is ignored.
   */
  config?: CompilerOptions;

  /**
   * The path to a tsc config. A path to a config takes precedence over the "config" option.
   */
  configPath?: string;
}

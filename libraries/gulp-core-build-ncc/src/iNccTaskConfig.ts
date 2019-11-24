import { INccOptions } from "./iNccOptions";

/**
 * @public
 */
export interface INccTaskConfig {
  /**
   * The ncc config object.
   */
  config?: INccOptions;

  /**
   * The input file.
   */
  inputFile?: string;

  /**
   * The output file.
   */
  outputFile?: string;
}

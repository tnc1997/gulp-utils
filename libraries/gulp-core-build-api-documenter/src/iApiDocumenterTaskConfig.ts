import { Format } from "./format";

/**
 * @public
 */
export interface IApiDocumenterTaskConfig {
  /**
   * The documentation format.
   */
  format?: Format;

  /**
   * The input folder.
   */
  inputFolder?: string;

  /**
   * The output folder.
   */
  outputFolder?: string;
}

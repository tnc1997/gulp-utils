import { AggregatedResult } from "@jest/test-result";
import { Config } from "@jest/types";

/**
 * @private
 */
export interface IResult {
  /**
   * The global configuration.
   */
  globalConfig: Config.GlobalConfig;

  /**
   * The aggregated results.
   */
  results: AggregatedResult;
}

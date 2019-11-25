import {
  ExtractorConfig,
  IExtractorInvokeOptions
} from "@microsoft/api-extractor";

/**
 * @public
 */
export interface IApiExtractorTaskConfig {
  /**
   * The api-extractor config object. If a path is specified by "configPath" and it is valid, this option is ignored.
   */
  config?: ExtractorConfig;

  /**
   * The path to an api-extractor config. A path to a config takes precedence over the "config" option.
   */
  configPath?: string;

  /**
   * The additional options to pass to api-extractor during invocation.
   */
  options?: IExtractorInvokeOptions;
}

import { ApiExtractorTask } from "./apiExtractorTask";

export { ApiExtractorTask } from "./apiExtractorTask";
export { IApiExtractorTaskConfig } from "./iApiExtractorTaskConfig";

/**
 * @public
 */
export const apiExtractor: ApiExtractorTask = new ApiExtractorTask();

// tslint:disable-next-line:no-default-export
export default apiExtractor;

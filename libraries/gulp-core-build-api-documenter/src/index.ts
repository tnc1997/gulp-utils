import { ApiDocumenterTask } from "./apiDocumenterTask";

export { ApiDocumenterTask } from "./apiDocumenterTask";
export { IApiDocumenterTaskConfig } from "./iApiDocumenterTaskConfig";
export { Format } from "./format";

/**
 * @public
 */
export const apiDocumenter: ApiDocumenterTask = new ApiDocumenterTask();

// tslint:disable-next-line:no-default-export
export default apiDocumenter;

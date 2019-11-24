import { NccTask } from "./nccTask";

export { INccOptions } from "./iNccOptions";
export { INccTaskConfig } from "./iNccTaskConfig";
export { NccTask } from "./nccTask";

/**
 * @public
 */
export const ncc: NccTask = new NccTask();

// tslint:disable-next-line:no-default-export
export default ncc;

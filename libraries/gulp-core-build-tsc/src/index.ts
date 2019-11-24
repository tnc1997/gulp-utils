import { TscTask } from "./tscTask";

export { ITscTaskConfig } from "./iTscTaskConfig";
export { TscTask } from "./tscTask";

/**
 * @public
 */
export const tsc: TscTask = new TscTask();

// tslint:disable-next-line:no-default-export
export default tsc;

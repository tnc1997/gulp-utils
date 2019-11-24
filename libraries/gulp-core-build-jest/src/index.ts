import { JestTask } from "./jestTask";

export { IJestTaskConfig } from "./iJestTaskConfig";
export { JestTask } from "./jestTask";

/**
 * @public
 */
export const jest: JestTask = new JestTask();

// tslint:disable-next-line:no-default-export
export default jest;

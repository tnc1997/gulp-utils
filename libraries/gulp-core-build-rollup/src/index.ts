import { RollupTask } from "./rollupTask";

export { IRollupTaskConfig } from "./iRollupTaskConfig";
export { RollupTask } from "./rollupTask";

/**
 * @public
 */
export const rollup: RollupTask = new RollupTask<{}>();

// tslint:disable-next-line:no-default-export
export default rollup;

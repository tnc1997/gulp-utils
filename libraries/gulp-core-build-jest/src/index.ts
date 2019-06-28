import {JestTask} from './JestTask';

export {
  IJestTaskConfig,
  JestTask
} from './JestTask';

/**
 * @public
 */
export const jest: JestTask = new JestTask(); // tslint:disable-line:export-name

export default jest;

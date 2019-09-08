import {NccTask} from './NccTask';

export {
  INccOptions,
  INccTaskConfig,
  NccTask
} from './NccTask';

/**
 * @public
 */
export const ncc: NccTask = new NccTask(); // tslint:disable-line:export-name

export default ncc;

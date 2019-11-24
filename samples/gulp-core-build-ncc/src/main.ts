/* tslint:disable:no-magic-numbers */
import { max, min } from "@ts-utils/array";

export const main: () => void = (): void => {
  const array: number[] = [1, 2, 3];

  max(array);
  min(array);
};

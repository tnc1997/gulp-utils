/* tslint:disable:no-magic-numbers */
import { subtract } from "../src";

describe("subtract", () => {
  it("should subtract two numbers", () => {
    expect(subtract(3, 2)).toEqual(1);
  });
});

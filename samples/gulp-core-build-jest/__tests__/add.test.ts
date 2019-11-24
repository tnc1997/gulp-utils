/* tslint:disable:no-magic-numbers */
import { add } from "../src";

describe("add", () => {
  it("should add two numbers", () => {
    expect(add(1, 2)).toEqual(3);
  });
});

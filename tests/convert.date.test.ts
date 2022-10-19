import { assert } from "chai";
import { convertDate } from "../transactions/utils/convert.date";

describe("Convert date function test", () => {
  let dateToConvert: string = "2022-10-18T12:00:12.811Z";

  it("should add 5 days when txStatus is false", () => {
    const result = convertDate(new Date(dateToConvert), false);

    assert.deepEqual(new Date("2022-10-23T12:00:12.811Z"), result);
  });
  it("should add a month when txStatus is true", () => {
    const result = convertDate(new Date(dateToConvert), true);

    assert.deepEqual(new Date("2022-11-18T12:00:12.811Z"), result);
  });
  it("should convert date to last day of following month if current date is last day of month with higher number of days", () => {
    dateToConvert = "2022-10-31T12:00:12.811Z"
    const result = convertDate(new Date(dateToConvert), true);
    
    assert.deepEqual(new Date("2022-11-30T12:00:12.811Z"), result);
  });
});

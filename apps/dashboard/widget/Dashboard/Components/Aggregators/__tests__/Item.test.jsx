import { formatValue } from "./Item.mock";
describe("formatValue", () => {
  // Test case for when value is null
  it('returns "n/a" when value is null', () => {
    expect(formatValue(null)).toBe("n/a");
  });
  // Test case for when value is undefined
  it('returns  "n/a" when value is undefined', () => {
    expect(formatValue(undefined)).toBe("n/a");
  });
  // Test case for when value is NaN
  it('returns "n/a" when value is NaN', () => {
    expect(formatValue(NaN)).toBe("n/a");
  });
  // Test case for when value is not a number
  it('returns "n/a" when value is not a number', () => {
    expect(formatValue("abcd")).toBe("n/a");
  });
  //Test that the function returns the value with 2 decimal places when value is a number less than 1000.
  it("returns the value with 2 decimal places when value is a number less than 1000.", () => {
    expect(formatValue("123.456")).toBe("123.46");
  });
  //Test that the function returns the value with 2 decimal places and "K" when value is a number greater than or equal to 1000 and less than 1000000.
  it('returns the value with 2 decimal places and "K" when value is a number greater than or equal to 1000 and less than 1000000.', () => {
    expect(formatValue("12345")).toBe("12.35K");
  });
  //Test that the function returns the value with 2 decimal places and "M" when value is a number greater than or equal to 1000000 and less than 1000000000.
  it('returns the value with 2 decimal places and "M" when value is a number greater than or equal to 1000000 and less than 1000000000', () => {
    expect(formatValue("1234567")).toBe("1.23M");
  });
  //Test that the function returns the value with 2 decimal places and "B" when value is a number greater than or equal to 1000000000.
  it('returns the value with 2 decimal places and "B" when value is a number greater than or equal to 1000000000.', () => {
    expect(formatValue("1234567890")).toBe("1.23B");
  });
});

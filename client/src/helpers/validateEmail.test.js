import { validateEmail } from "./validateEmail";

describe("validateEmail", () => {
  it("accepts a valid address", () => {
    expect(validateEmail("adam.j.kliegman@gmail.com")).toBe(true);
  });

  it("rejects a malformed address", () => {
    expect(validateEmail("not-an-email")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(validateEmail("")).toBe(false);
  });
});

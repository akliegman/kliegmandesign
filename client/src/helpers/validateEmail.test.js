import { validateEmail } from "./validateEmail";

describe("validateEmail", () => {
  it("should return true for a valid email", () => {
    const validEmail = "test@example.com";
    expect(validateEmail(validEmail)).toBe(true);
  });

  it("should return false for an invalid email", () => {
    const invalidEmail = "test";
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it("should return false for an empty email", () => {
    const emptyEmail = "";
    expect(validateEmail(emptyEmail)).toBe(false);
  });
});

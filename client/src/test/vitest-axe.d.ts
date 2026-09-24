import "vitest";

declare module "vitest" {
  // The declaration must repeat Vitest's own type parameter exactly to merge with it.
  // biome-ignore lint/suspicious/noExplicitAny: mirrors Vitest's `Assertion<T = any>`
  interface Assertion<T = any> {
    toHaveNoViolations(): T;
  }
}

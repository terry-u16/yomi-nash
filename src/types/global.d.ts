declare global {
  // Enable React's act() enforcement in tests that rely on this flag.
  // Vitest runs in a browser-like env where this property is optional.
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

export {};

export const DATA_SCHEMA_VERSION = 1 as const;
export const SHARE_SCHEMA_VERSION = 2 as const;
export const SUPPORTED_SHARE_SCHEMA_VERSIONS: readonly number[] = [
  DATA_SCHEMA_VERSION,
  SHARE_SCHEMA_VERSION,
];

export const STORAGE_KEYS = {
  inputUI: "yomiNash:input",
  result: "yomiNash:result",
  firstVisitHelpToastSeen: "yomiNash:firstVisitHelpToastSeen",
} as const;

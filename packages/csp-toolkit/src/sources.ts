import type { HashAlgorithms } from "./types";

export type CspKeyword =
  | "self"
  | "none"
  | "unsafe-inline"
  | "unsafe-eval"
  | "unsafe-hashes"
  | "strict-dynamic"
  | "report-sample"
  | "wasm-unsafe-eval"
  | "inline-speculation-rules";

export type CspSchemeToken =
  | "data:"
  | "blob:"
  | "filesystem:"
  | "mediastream:"
  | "https:"
  | "http:"
  | "ws:"
  | "wss:";

/** Unquoted keyword / scheme token, host expression, or URL string */
export type CspSource = CspKeyword | CspSchemeToken | (string & {});

export const nonce = (value: string) => `'nonce-${value}'` as const;

export const hash = (algorithm: HashAlgorithms, value: string) =>
  `'${algorithm}-${value}'` as const;

/** CSP keyword tokens — use in definePolicy as [self] instead of ['self'] */
export const self = "self" as const satisfies CspKeyword;
export const none = "none" as const satisfies CspKeyword;
export const unsafeInline = "unsafe-inline" as const satisfies CspKeyword;
export const unsafeEval = "unsafe-eval" as const satisfies CspKeyword;
export const unsafeHashes = "unsafe-hashes" as const satisfies CspKeyword;
export const strictDynamic = "strict-dynamic" as const satisfies CspKeyword;
export const reportSample = "report-sample" as const satisfies CspKeyword;
export const wasmUnsafeEval = "wasm-unsafe-eval" as const satisfies CspKeyword;
export const inlineSpeculationRules =
  "inline-speculation-rules" as const satisfies CspKeyword;

/** Scheme sources — values are the real CSP tokens ('data:', 'https:', …) */
export const data = "data:" as const satisfies CspSchemeToken;
export const blob = "blob:" as const satisfies CspSchemeToken;
export const filesystem = "filesystem:" as const satisfies CspSchemeToken;
export const mediastream = "mediastream:" as const satisfies CspSchemeToken;
export const https = "https:" as const satisfies CspSchemeToken;
export const http = "http:" as const satisfies CspSchemeToken;
export const ws = "ws:" as const satisfies CspSchemeToken;
export const wss = "wss:" as const satisfies CspSchemeToken;

/** @internal Used by definePolicy to emit quoted keyword sources */
export const KEYWORDS = new Set<CspKeyword>([
  "self",
  "none",
  "unsafe-inline",
  "unsafe-eval",
  "unsafe-hashes",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "inline-speculation-rules",
]);

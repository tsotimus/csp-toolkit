import { PluginContext } from "rollup";

export type CSPKeys =
  //Fetch directives
  | "default-src"
  | "script-src"
  | "style-src"
  | "connect-src"
  | "object-src"
  | "img-src"
  | "frame-src"
  | "child-src"
  | "font-src"
  | "manifest-src"
  | "media-src"
  | "object-src"
  | "report-to"
  | "sandbox"
  | "script-src-attr"
  | "script-src-elem"
  | "style-src-attr"
  | "style-src-elem"
  | "upgrade-insecure-requests"
  | "worker-src"
  | "fenced-frame-src"
  //Document directives
  | "base-uri"
  | "sandbox"
  //Navigation directives
  | "form-action"
  | "frame-ancestors"
  //Reporting directives
  | "report-to"
  //Other directives
  | "require-trusted-types-for"
  | "trusted-types"
  | "upgrade-insecure-requests";

export type CSPPolicy = Partial<{
  [n in CSPKeys]: string[];
}>;

export type HashAlgorithms = "sha256" | "sha384" | "sha512";

export type Outlier = "tailwind" | "sass" | "scss" | "less" | "stylus" | "vue";

export type DevOptions = {
  /**
   * Allows this plugin to run in dev mode. The trade-off is that developers can see the CSP policy in action in dev mode, at the cost of performance.
   * @default false
   */
  run?: boolean;
  /**
   * This is a list of outliers that require special treatment during dev mode.
   * @example ["tailwind", "sass"]
   */
  outlierSupport?: Array<Outlier>;
};

export type BuildOptions = {
  /**
   * Indicates whether to hash the application at build time.
   * @default false
   */
  hash?: boolean;
};

export type MyPluginOptions = {

};

export type HashCache = {
  fileType: "script" | "style";
  contents: string;
};

export type CryptoSources = `sha256-${string}`;

export const validCrypto = ["sha256", "sha384", "sha512"];

export type HashDataCollection = {
  algorithm: HashAlgorithms;
  content: string;
};

export type HashCollection = {
  "style-src": Map<string, HashDataCollection>; //In line styles
  "style-src-elem": Map<string, HashDataCollection>; //External styles
  "style-src-attr": Map<string, HashDataCollection>; //In line scripts

  "script-src": Map<string, HashDataCollection>; //External styles
  "script-src-attr": Map<string, HashDataCollection>; //External scripts
  "script-src-elem": Map<string, HashDataCollection>;
};

export type HashCollectionKey = keyof HashCollection;

export type WarnMissingPolicyProps = {
  source: string;
  currentPolicy: string[];
  sourceType?: CSPKeys;
  context?: PluginContext;
};

export type OverrideCheckerProps = {
  userPolicy: CSPPolicy | undefined;
  override: boolean;
};

export type TransformationStatus = Map<string, boolean>;

export type ShouldSkip = {
  "style-src": boolean;
  "style-src-elem": boolean;
  "style-src-attr": boolean;
  "script-src": boolean;
  "script-src-attr": boolean;
  "script-src-elem": boolean;
};

export type BundleContext = Record<
  string,
  { type: "chunk" | "asset"; hash: string }
>;

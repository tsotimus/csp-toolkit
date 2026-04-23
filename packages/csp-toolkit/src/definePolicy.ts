import { KEYWORDS, type CspKeyword, type CspSource } from "./sources";
import { policyToString } from "./stringify";
import type { CSPKeys, CSPPolicy } from "./types";

const CAMEL_TO_KEBAB = {
  defaultSrc: "default-src",
  scriptSrc: "script-src",
  styleSrc: "style-src",
  connectSrc: "connect-src",
  objectSrc: "object-src",
  imgSrc: "img-src",
  frameSrc: "frame-src",
  childSrc: "child-src",
  fontSrc: "font-src",
  manifestSrc: "manifest-src",
  mediaSrc: "media-src",
  reportTo: "report-to",
  sandbox: "sandbox",
  scriptSrcAttr: "script-src-attr",
  scriptSrcElem: "script-src-elem",
  styleSrcAttr: "style-src-attr",
  styleSrcElem: "style-src-elem",
  upgradeInsecureRequests: "upgrade-insecure-requests",
  workerSrc: "worker-src",
  fencedFrameSrc: "fenced-frame-src",
  baseUri: "base-uri",
  formAction: "form-action",
  frameAncestors: "frame-ancestors",
  requireTrustedTypesFor: "require-trusted-types-for",
  trustedTypes: "trusted-types",
  blockAllMixedContent: "block-all-mixed-content",
  reportUri: "report-uri",
} as const satisfies Record<string, CSPKeys>;

export type CamelDirective = keyof typeof CAMEL_TO_KEBAB;

export type DefinePolicyInput = Partial<
  Record<CamelDirective, readonly CspSource[]>
>;

function normalizeSource(src: string): string {
  if (KEYWORDS.has(src as CspKeyword)) {
    return `'${src}'`;
  }
  return src;
}

export type DefinedPolicy = CSPPolicy & { toString(): string };

/**
 * Build a {@link CSPPolicy} from camelCase directive keys and unquoted keyword tokens.
 * The returned object includes {@link DefinedPolicy.toString} for header values.
 */
export const definePolicy = (input: DefinePolicyInput): DefinedPolicy => {
  const out: CSPPolicy = {};

  for (const camel of Object.keys(input) as CamelDirective[]) {
    const kebab = CAMEL_TO_KEBAB[camel];
    const sources = input[camel];
    if (!sources?.length) continue;
    out[kebab] = [...sources].map((s) => normalizeSource(s));
  }

  return Object.assign(out, {
    toString(): string {
      return policyToString(out);
    },
  }) as DefinedPolicy;
};

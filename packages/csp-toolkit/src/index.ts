import type { CSPPolicy } from "./types";

/**
 *
 * @param  {CSPPolicy} basePolicy - Base Policy, used as a starting point
 * @param  {CSPPolicy} newPolicy - New Policy, will be merged to the Base Policy
 * @param  {boolean} shouldOverride - New Policy overrides the Base Policy
 * @returns
 */
export const mergePolicies = (
  basePolicy: CSPPolicy,
  newPolicy: CSPPolicy | undefined,
  shouldOverride: boolean,
): CSPPolicy => {
  const newPolicyExists = newPolicy && Object.keys(newPolicy).length > 0;

  if (shouldOverride) {
    return newPolicy as CSPPolicy;
  }
  if (!newPolicyExists) return basePolicy;

  const mergedPolicy: CSPPolicy = { ...basePolicy };

  for (const key in newPolicy as CSPPolicy) {
    const _key = key as keyof CSPPolicy;
    if (newPolicy.hasOwnProperty(key)) {
      const defaultValues = basePolicy[_key] || [];
      const userValues = newPolicy[_key] || [];

      if (Array.isArray(userValues)) {
        mergedPolicy[_key] = Array.from(
          new Set([...defaultValues, ...userValues]),
        );
      } else {
        mergedPolicy[_key] = userValues;
      }
    }
  }

  return mergedPolicy;
};

export { policyToString } from "./stringify";
export { definePolicy } from "./definePolicy";
export type { CamelDirective, DefinePolicyInput, DefinedPolicy } from "./definePolicy";
export {
  nonce,
  hash,
  self,
  none,
  unsafeInline,
  unsafeEval,
  unsafeHashes,
  strictDynamic,
  reportSample,
  wasmUnsafeEval,
  inlineSpeculationRules,
  data,
  blob,
  filesystem,
  mediastream,
  https,
  http,
  ws,
  wss,
  type CspSource,
  type CspKeyword,
  type CspSchemeToken,
} from "./sources";

export * from "./types";

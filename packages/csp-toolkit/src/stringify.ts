import type { CSPPolicy } from "./types";

/**
 * Transforms your policy into a csp string to be used in a meta tag or header
 * @param {CSPPolicy} policy
 * @returns
 */
export const policyToString = (policy: CSPPolicy): string => {
  return Object.keys(policy).reduce((acc, key) => {
    const policyValue = policy[key as keyof CSPPolicy];
    if (!policyValue?.length) return acc;
    const policyValueStr = policyValue
      .map((v) => {
        if (v.startsWith("sha")) return `'${v}'`;
        if (v.startsWith("nonce")) return `'${v}'`;
        else return v;
      })
      .join(" ");
    return `${acc} ${key} ${policyValueStr};`;
  }, "").trimStart();
};

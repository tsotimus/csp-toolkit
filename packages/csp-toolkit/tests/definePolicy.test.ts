import { describe, expect, test } from "vitest";
import {
  blob,
  data,
  definePolicy,
  hash,
  none,
  nonce,
  policyToString,
  self,
  strictDynamic,
  unsafeInline,
} from "../src/index";

describe("definePolicy", () => {
  test("maps camelCase keys to kebab-case CSPPolicy", () => {
    const policy = definePolicy({
      defaultSrc: [self],
      scriptSrcElem: ["self"],
    });

    expect(policy["default-src"]).toEqual(["'self'"]);
    expect(policy["script-src-elem"]).toEqual(["'self'"]);
  });

  test("string literals and exported consts produce the same output", () => {
    const a = definePolicy({
      defaultSrc: ["self"],
      objectSrc: ["none"],
      styleSrc: ["unsafe-inline"],
    });
    const b = definePolicy({
      defaultSrc: [self],
      objectSrc: [none],
      styleSrc: [unsafeInline],
    });

    const { toString: _ta, ...shapeA } = a;
    const { toString: _tb, ...shapeB } = b;
    expect(shapeA).toEqual(shapeB);
  });

  test("strict-dynamic is quoted like other keywords", () => {
    const policy = definePolicy({
      scriptSrc: [self, strictDynamic],
    });
    expect(policy["script-src"]).toEqual(["'self'", "'strict-dynamic'"]);
  });

  test("nonce() and hash() pass through unchanged", () => {
    const policy = definePolicy({
      scriptSrc: [self, nonce("abc123"), hash("sha256", "dGVzdA==")],
    });
    expect(policy["script-src"]).toEqual([
      "'self'",
      "'nonce-abc123'",
      "'sha256-dGVzdA=='",
    ]);
  });

  test("scheme consts and hosts are not double-wrapped as keywords", () => {
    const policy = definePolicy({
      imgSrc: [self, data, blob, "https://cdn.example.com"],
    });
    expect(policy["img-src"]).toEqual([
      "'self'",
      "data:",
      "blob:",
      "https://cdn.example.com",
    ]);
  });

  test("toString matches policyToString on the same policy shape", () => {
    const policy = definePolicy({
      defaultSrc: [self],
      imgSrc: [self, data],
    });
    const { toString: ts, ...plain } = policy;
    expect(ts.call(policy)).toBe(policyToString(plain));
  });

  test("empty directive lists are omitted", () => {
    const policy = definePolicy({
      defaultSrc: [self],
      imgSrc: [],
    });
    expect(policy["default-src"]).toEqual(["'self'"]);
    expect(policy["img-src"]).toBeUndefined();
  });
});

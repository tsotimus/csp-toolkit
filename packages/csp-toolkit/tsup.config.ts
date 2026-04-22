import { defineConfig, type Options } from "tsup";

const outExtension: Options["outExtension"] = ({ format }) => ({
  js: format === "esm" ? ".esm.js" : ".cjs.js",
});

const sharedJs: Options = {
  format: ["cjs", "esm"],
  dts: false,
  outDir: "dist",
  sourcemap: true,
  minify: true,
  treeshake: true,
  splitting: false,
  target: "es2022",
  outExtension,
  shims: false,
  tsconfig: "tsconfig.json",
};

export default defineConfig([
  {
    ...sharedJs,
    clean: true,
    entry: { index: "src/index.ts" },
    platform: "neutral",
  },
  {
    ...sharedJs,
    clean: false,
    entry: { "node/node": "src/node.ts" },
    platform: "node",
  },
  {
    ...sharedJs,
    clean: false,
    entry: { "edge/edge": "src/edge.ts" },
    platform: "browser",
  },
  {
    clean: false,
    entry: { index: "src/index.ts" },
    dts: { only: true, resolve: true },
    outDir: "dist/types",
    tsconfig: "tsconfig.json",
  },
  {
    clean: false,
    entry: { node: "src/node.ts" },
    dts: { only: true, resolve: true },
    outDir: "dist/node/types",
    tsconfig: "tsconfig.json",
  },
  {
    clean: false,
    entry: { edge: "src/edge.ts" },
    dts: { only: true, resolve: true },
    outDir: "dist/edge/types",
    tsconfig: "tsconfig.json",
  },
]);

import { Plugin, ViteDevServer } from "vite";
import { PluginContext } from "rollup";
import { MyPluginOptions } from "./types";

export default function vitePluginCSP(
  options: MyPluginOptions | undefined = {}
): Plugin {
  let pluginContext: PluginContext | undefined = undefined; //Needed for logging
  let server: ViteDevServer | undefined = undefined;

  return {
    name: "package-template",
    enforce: "post",
    buildStart() {
      pluginContext = this;
    },
    apply(config, { command }) {
      // If we are in dev mode return true
      if (command === "serve" && config.mode === "development") return true;
      // apply only on build but not for SSR
      if (command === "build" && !config.build?.ssr) {
        return true;
      }
      if (command === "build" && config.build?.ssr) {
        return true;
      }
      return false;
    },
    onLog(_level, log) {
      if (log.plugin === "package-template") {
        this.warn(log);
      }
    },
    configureServer(thisServer) {
      server = thisServer;
    },
  };
}

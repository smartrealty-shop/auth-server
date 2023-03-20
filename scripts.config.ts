import { DenonConfig } from "./src/deps.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd:
        "deno fmt && deno lint --unstable && deno run --allow-net --allow-env --allow-read --unstable src/server.ts",
      desc: "run my app.ts file",
    },
  },
};

export default config;

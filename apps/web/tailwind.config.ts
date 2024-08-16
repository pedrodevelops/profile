import type { Config } from "tailwindcss";
import sharedConfig from "@profile/tailwind-config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;

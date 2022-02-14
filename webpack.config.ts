const path = require("path");

import { Configuration, BannerPlugin } from "webpack";
import { generateHeader } from "./plugins/userscript";

const config: Configuration = {
  mode: "none",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "./userscript"),
    filename: "tw-command-sender.user.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    luxon: "luxon",
  },
  plugins: [
    new BannerPlugin({
      banner: generateHeader(),
      raw: true,
      entryOnly: true,
    }),
  ],
};

export default config;

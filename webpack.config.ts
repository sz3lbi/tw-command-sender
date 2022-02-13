const path = require("path");

import { Configuration, BannerPlugin } from "webpack";
import { generateHeader } from "./plugins/userscript";

const config: Configuration = {
  mode: "none",
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "./userscript"),
    filename: "tw-command-sender.user.js",
  },
  resolve: {
    extensions: [".ts", ".d.ts"],
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
  externals: {},
  plugins: [
    new BannerPlugin({
      banner: generateHeader(),
      raw: true,
      entryOnly: true,
    }),
  ],
};

export default config;

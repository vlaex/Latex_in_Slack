const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { version } = require("./package.json");

/** @type {webpack.Configuration} */
module.exports = {
  entry: {
    "index": [
      "./src/render.js",
      "./src/equationsPreview.js"
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        "LICENSE",
        "icon.png",
        "src/style.css",
        { from: "node_modules/katex/dist/katex.min.css", to: "katex" },
        { from: "node_modules/katex/dist/fonts", to: "katex/fonts" },
        {
          from: "manifest.json",
          transform: (_content) => {
            return JSON.stringify({ ...JSON.parse(_content), version });
          }
        }
      ]
    })
  ],
  resolve: {
    extensions: [".js"],
  },
  target: "web",
  devtool: "inline-cheap-source-map",
  output: {
    path: path.resolve(__dirname, "build"),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          output: { 
            ascii_only: true 
          },
        },
      }),
    ],
  }
};
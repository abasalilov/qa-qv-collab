const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

const config = {
  // Tell webpack the root file of our
  // server application
  entry: "./src/client/client.js",

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },

  mode: "development",
  node: {
    child_process: "empty",
    fs: "empty",
    crypto: "empty",
    net: "empty",
    tls: "empty"
  }
};

module.exports = merge(baseConfig, config);

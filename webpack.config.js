const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/client.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "client.bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};

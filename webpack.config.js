const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    home: "./src/scripts.js",
    edge: "./src/pages/edge/scripts.js",
  },
  output: {
    filename: "[name]/bundle.js",
    path: path.resolve(__dirname, "docs"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.json$/,
        type: "asset/resource",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Home",
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["home"],
    }),
    new HtmlWebpackPlugin({
      title: "Edge",
      filename: "edge/index.html",
      template: "./src/pages/edge/index.html",
      chunks: ["edge"],
    }),
  ],
  devServer: {
    client: {
      logging: "info",
    },
  },
};
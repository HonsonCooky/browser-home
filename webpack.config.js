const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    ".": "./src/pages/home/scripts.js",
    edge: "./src/pages/edge/scripts.js",
    "dev-tools": "./src/pages/dev-tools/scripts.js",
  },
  output: {
    filename: "[name]/bundle.js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
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
      template: "./src/pages/home/index.html",
      inject: "head",
      favicon: "./src/assets/HC_LOGO_LIGHT_48x48.png",
      scriptLoading: "blocking",
      chunks: ["."],
    }),
    new HtmlWebpackPlugin({
      title: "Edge",
      filename: "edge/index.html",
      template: "./src/pages/edge/index.html",
      inject: "head",
      favicon: "./src/assets/HC_LOGO_LIGHT_48x48.png",
      scriptLoading: "blocking",
      chunks: ["edge"],
    }),
    new HtmlWebpackPlugin({
      title: "DevTools",
      filename: "dev-tools/index.html",
      template: "./src/pages/dev-tools/index.html",
      inject: "head",
      favicon: "./src/assets/HC_LOGO_LIGHT_48x48.png",
      scriptLoading: "blocking",
      chunks: ["dev-tools"],
    }),
  ],
  devServer: {
    client: {
      logging: "info",
    },
  },
};

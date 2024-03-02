const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    ".": "./src/pages/home/scripts.js",
    canvas: "./src/pages/canvas/scripts.js",
    "dev-tools": "./src/pages/dev-tools/scripts.js",
    edge: "./src/pages/edge/scripts.js",
    layout: "./src/pages/layout/scripts.js",
    todo: "./src/pages/todo/scripts.js",
    vim: "./src/pages/vim/scripts.js",
    vimium: "./src/pages/vimium/scripts.js",
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
      title: "Canvas",
      filename: "canvas/index.html",
      template: "./src/pages/canvas/index.html",
      inject: "head",
      favicon: "./src/assets/HC_LOGO_LIGHT_48x48.png",
      scriptLoading: "blocking",
      chunks: ["canvas"],
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
      title: "Keyboard Layout",
      filename: "layout/index.html",
      template: "./src/pages/layout/index.html",
      inject: "head",
      favicon: "./src/assets/HC_LOGO_LIGHT_48x48.png",
      scriptLoading: "blocking",
      chunks: ["layout"],
    }),
    new HtmlWebpackPlugin({
      title: "To Do List",
      filename: "todo/index.html",
      template: "./src/pages/todo/index.html",
      inject: "head",
      favicon: "./src/assets/HC_LOGO_LIGHT_48x48.png",
      scriptLoading: "blocking",
      chunks: ["todo"],
    }),
    new HtmlWebpackPlugin({
      title: "Vim",
      filename: "vim/index.html",
      template: "./src/pages/vim/index.html",
      inject: "head",
      favicon: "./src/assets/HC_LOGO_LIGHT_48x48.png",
      scriptLoading: "blocking",
      chunks: ["vim"],
    }),
    new HtmlWebpackPlugin({
      title: "Vimium",
      filename: "vimium/index.html",
      template: "./src/pages/vimium/index.html",
      inject: "head",
      favicon: "./src/assets/HC_LOGO_LIGHT_48x48.png",
      scriptLoading: "blocking",
      chunks: ["vimium"],
    }),
  ],
  devServer: {
    client: {
      logging: "info",
    },
  },
};

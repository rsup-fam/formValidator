const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["src/scss/stylesheets.scss"],
              sourceMap: true,
              output: "./dist/stylesheets.css",
              outputStyle: "compressed",
            },
          },
        ],
      },
      {
        test: /\.(mp4|mp3|png|jpg|gif|jpeg)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
};

import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
  entry: {
    app: "./src/js/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/icons", to: "icons" },
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/icon-192.png", to: "icon-192.png" },
        { from: "src/icon-512.png", to: "icon-512.png" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.svg$/i,
        include: path.resolve(__dirname, "src/icons/animated"),
        type: "asset/source",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv');

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});


module.exports = {
  // we add entry point polyfil for promis to work
  // https://github.com/babel/babel/issues/8829
  entry: ['@babel/polyfill', "./src/index.js"],
  mode: "development",
  devServer: {
    port: 3000,
    // historyApiFallback: true,
    hot: true,
  },
  devtool: "source-map",


  // output: {
  //   path: path.join(__dirname, "dist"),
  //   filename: "app.bundle.js",
  //   publicPath: '/'
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        // exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "react-hot-loader/babel",
            "@babel/plugin-proposal-class-properties",
          ],
        },
      },
      //
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      //   // exclude: /node_modules/,
      // },
      //
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // Creates `style` nodes from JS strings
      //     'style-loader',
      //     // Translates CSS into CommonJS
      //     'css-loader',
      //     // Compiles Sass to CSS
      //     'sass-loader',
      //   ],
      // },
      //
      // {
      //   test: /\.(png|svg|jpg|gif)$/i,
      //   loader: "file-loader",
      //   options: {
      //     name: '[path][name].[ext]',
      //     esModule: false,
      //   },
      // },
      //
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: [
      //     'file-loader',
      //   ],
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),

    new webpack.DefinePlugin(envKeys)
  ],
};
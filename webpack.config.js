const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public'
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src/js'),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/env", {
                "targets": {
                  "browsers": ["last 2 versions"]
                }
              }]
            ]
          }
        }
    }, {
     test: /\.css$/,
     use: [
       {
         loader: MiniCssExtractPlugin.loader
       },
       {
         loader: 'css-loader',
         options: {
          modules: true
         }
       }
     ]
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
        limit: 8192
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "index.html",
      'title': 'Graphledger webapp',
      'meta': {
        'viewport': 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
};
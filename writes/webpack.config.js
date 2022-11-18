const path = require('path');
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.platform': JSON.stringify('darwin'),
      'process.env.NODE_BINDINGS_ARROW': JSON.stringify(' → '),
      'process.env.NODE_BINDINGS_COMPILED_DIR': JSON.stringify('compiled'),
      'process.arch': JSON.stringify('x64'),
      'process.versions.modules': JSON.stringify('108'),
      'process.versions.node': JSON.stringify("18.11.0"),
      'process.env.NODE_DEBUG':JSON.stringify("node")
    })
  ],
  resolve: {

    extensions: ['.ts', '.js'],
    fallback: {
      "fs": require.resolve("browserify-fs"),
      "os": false,
      "util": false,
      // "util": require.resolve("util/"),
      "file-uri-to-path": false,
      "assert": false,
      "stream": false,
      "path": require.resolve("path-browserify"),
      "process": require.resolve("browser-process"),
      "Error": false,
      "readable-stream": false,
      "Readable": false,
      "buffer": require.resolve("buffer/")
    },
  },
  mode: 'development',

  entry: {

    writeTest: './src/writes.ts',
  },

  output: {

    path: path.resolve(__dirname, 'dist'),

    libraryTarget: 'commonjs',

    filename: '[name].bundle.js'

  },

  module: {

    rules: [

      {

        test: /\.ts$/,

        // exclude: /node_modules/,

        loader: 'babel-loader',

        options: {

          presets: [['@babel/typescript']],

          plugins: [

            '@babel/proposal-class-properties',

            '@babel/proposal-object-rest-spread'

          ]

        }

      }

    ]

  },

  stats: {

    colors: true

  },

  // target: 'web',

  externals: /k6(\/.*)?/,

  devtool: 'source-map',
};






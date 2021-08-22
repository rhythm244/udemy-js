const path = require('path');
// eslint-disable-next-line quotes
const ClearnPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/'
  },
  devtool: 'cheap-module-eval-source-map',
  // devServer: {
  //   contentBase: './'
  // }
  plugins: [
    new ClearnPlugin.CleanWebpackPlugin()
  ],

};
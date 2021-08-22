const path = require('path');
const ClearnPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    //ใช้ชื่อไฟล์อื่น ที่ไม่ใช่มาจาก src -app.js-
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/'
  },
  devtool: 'cheap-source-map',
  // devServer: {
  //   contentBase: './'
  // }
  plugins: [
    new ClearnPlugin.CleanWebpackPlugin()
  ],
};
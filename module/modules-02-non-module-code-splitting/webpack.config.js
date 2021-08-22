const path = require('path')

module.exports = {
  //ต้องการรู้ว่า starting point อยู่ตรงไหน
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
//   devServer: {
//       contentBase: './'
//   },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./js/index.js", // 진입점 파일
  output: {
    filename: "bundle.js", // 번들 파일 이름
    path: path.resolve(__dirname, "dist"), // 출력 디렉토리
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // CSS 파일 처리
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", // 이미지 파일 처리
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // HTML 파일 템플릿 경로
    }),
  ],
};

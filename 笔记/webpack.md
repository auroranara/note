[参考文档](https://juejin.im/post/5bd66efcf265da0a8a6af2d2)

```
// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件用于构建时清理文件（如dist）
// path.join()来拼接路径
module.exports = {
  entry: path.join(__dirname, "/src/index.js"), // 入口文件
  output: {
    path: path.join(__dirname, "/dist"), // 打包后的存放路径，不存在该文件加会创建
    filename: "bundle.js", // 打包后输出文件的文件名
  },
  // webpack本地服务器配置
  devServer: {
    contentBase: './dist', // 本地服务器加载的目录
    port: '8088', // 端口号
    inline: true, // 当源文件改变自动刷新页面
    historyApiFallback: true, // 所有跳转指向index.html
    // scripts中命令：webpack-dev-server --open 启动本地服务器并打开浏览器
    // 默认打开index.html
  },
  devtool: 'source-map', // 打包时生成对应于打包文件的.map文件，使得编译后的代码可读性更高，更易于调试，但会减慢打包速度。
  /* loader在打包过程中处理源文件，plugins对整个构建过程起作用 */
  module: {
    rules: [
      // 增加loader，调用外部脚本或工具
      {
        test: /\.css$/, // 匹配.css结尾的文件
        use: ['style-loader', 'css-loader'], // 需要用到的loader，顺序不能变，从左往右编译
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { // jsx配置
        test: /\.(jsx|js)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/, // 派出匹配node_modules模块
      },
    ],
  },
  // 插件用于构建的整个过程，用法都一样 new一个实例，可传入参数
  plugins: [
    new webpack.BannerPlugin('版权所有'), // new一个插件实例
    new HtmlWebpackPlugin({  // 使用html模板，会在出口文件夹中生成.html文件,并引入打包后的文件bundle.js
      template: path.join(__dirname, "/src/index.template.html"),
    }),
    new CleanWebpackPlugin(['dist']),// 所有要清理的文件夹名称
    new webpack.HotModuleReplacementPlugin(), // 热更新插件 
  ],
}


```
const extractTextPlugin = require("extract-text-webpack-plugin");

const rules = [
  {
    test: /\.(css|scss|sass)$/,
    // 区别开发环境和生成环境
    use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "sass-loader", "postcss-loader"] : extractTextPlugin.extract({
      fallback: "style-loader",
      use: ["css-loader", "sass-loader", "postcss-loader"],
      // css中的基础路径
      publicPath: "./css"
    })
  },
  {
    test: /\.js$/,
    use: ["babel-loader"],
    // 不检查node_modules下的js文件
    exclude: "/node_modules/"
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [{
      // 需要下载file-loader和url-loader
      loader: "url-loader",
      options: {
        limit: 2 * 1024, //小于这个时将会已base64位图片打包处理
        // 图片文件输出的文件夹
        outputPath: "images"
      }
    }]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
    }
  },
  {
    test: /\.(html|ejs)$/,
    // html中的img标签
    use: ["html-withimg-loader"]
  },
  {
    test: /\.ejs$/,
    loader: 'ejs-html-loader'
  }
];
module.exports = rules;

const path = require('path')
const glob = require("glob")
const rules = require('./webpack.rules')
const webpack = require('webpack')
//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
// html模板
const htmlWebpackPlugin = require("html-webpack-plugin");
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
  return {
    template: `./src/pages/${name}/index.ejs`,
    filename: `${name}.html`,
    // favicon: './favicon.ico',
    inject: true,
    hash: true, //开启hash  ?[hash]
    chunks: chunks,
    minify: process.env.NODE_ENV === "development" ? false : {
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //折叠空白区域 也就是压缩代码
      removeAttributeQuotes: true, //去除属性引用
    }
  };
}

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

function getEntry() {
  var entry = {}
  //读取src目录所有page入口
  glob.sync('./src/pages/**/*.js')
    .forEach(function (name) {
      var start = name.indexOf('src/') + 4,
        end = name.length - 3
      var eArr = []
      var n = name.slice(start, end)
      n = n.slice(0, n.lastIndexOf('/')) //保存各个组件的入口
      n = n.split('/')[1]
      eArr.push(name)
      // 'pages/xxx': [path]
      entry[n] = eArr
    })
  return entry
}

module.exports = {
  entry: getEntry(),
  module: {
    rules: [...rules]
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  // 提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {   // 抽离第三方插件
          test: /node_modules/,   // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor',  // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        }
      }
    }
  },
  plugins: [
    //静态资源输出
    new copyWebpackPlugin([{
      from: resolve('src/assets'),
      to: './assets',
      ignore: ['.*']
    }]),
    // 消除冗余的css代码
    new purifyCssWebpack({
      paths: glob.sync(resolve("src/pages/*/*.html"))
    }),
    new webpack.ProvidePlugin({
      _: "underscore"
    })
  ]
}

//配置页面
const entryObj = getEntry();
const htmlArray = [];
Object.keys(entryObj).forEach(element => {
  htmlArray.push({
    _html: element,
    title: element,
    chunks: ['vendor', element]
  })
})

//自动生成html模板
htmlArray.forEach((element) => {
  module.exports.plugins.push(
    new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks))
  );
})

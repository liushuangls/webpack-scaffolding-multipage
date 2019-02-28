一个适用于官网、个人博客等多页面应用的webpack脚手架。

版本：webpack4

支持功能：
- ejs模板引擎
- es6模块化
- eslint
- 静态资源目录
- sass
- 热更新服务器

使用说明：
```
git clone git@github.com:liushuangls/webpack-scaffolding-multipage.git your-app-name

cd your-app-name

git remote set-url origin your-git-url // 修改远程仓库地址

yarn or npm i

yarn run dev or npm run dev // 开发

yarn run build or npm run build // 打包
```

目录结构：
```
├─build # webpack配置文件
├─.babelrc # babel的配置文件
├─.eslintrc # ESLint的配置文件
├─.eslintignore # ESLint忽略文件
├─package.json # npm的配置文件
├─src # 项目源码
    ├─pages # 此目录下的每个文件夹代表一个独立页面
    │  ├─index
    │  │  └─index.ejs
    │  │  └─index.js
    │  │  └─index.scss
    │  ├─page1
    │  │  └─index.ejs
    │  │  └─index.js
    │  │  └─index.scss
    └─components # ejs组件
    └─common # 公共代码和资源
    └─assets # 静态资源文件
```

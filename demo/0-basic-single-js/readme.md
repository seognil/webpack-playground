# 0 编译 JS 文件

## 目标

没什么特别的，最简单的先打包两个（多个） JS 文件成一个 JS 文件。

之后我们慢慢循序渐进。

## 配置

安装所有依赖（你至少得懂 npm 怎么用吧…）：`npm i`

依赖有两个，一个 `webpack` 本身，一个是 `webpack-cli` 用来在命令行中调用 `webpack`

```json
{
  "webpack": "^4.42.1",
  "webpack-cli": "^3.3.11"
}
```

Webpack 的配置文件默认会读取 `webpack.config.js`

我们简单地设定输入输出：

```js
const webpackConfig = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve('./dist'),
  },
};
```

被打包的源码（业务代码）在 `src/`

`index.js`

```js
require('./lib');

console.log('Hello World!');
```

`lib.js`

```js
console.log('load lib');
```

## 执行

执行打包：`npm run build`

## 结果

观察打包目录 `dist/` 可以发现打包出了一个 JS 文件

测试：`npm run test`  
将运行这个文件，会打印以下内容，和源码的逻辑是一致的。

```sh
load lib
Hello World!
```

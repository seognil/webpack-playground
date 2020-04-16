# 2 dev-server 即时预览

## 目标

在开发的时候，每次改了源码都要手动 `build` 并预览，非常麻烦，  
我们可以将这一过程自动化，当修改源码后，自动重新打包并刷新在浏览器上的预览页面。

这需要借助一个新的工具 `webpack-dev-server` 实现（当然也有其他的类似工具）

## 配置

`package.json` 中新增一个依赖：

```js
"webpack-dev-server": "^3.10.3"
```

同时，为了将开发和打包命令分离，调整 `package.json` 中的 `scripts`：

```js
"start": "webpack-dev-server --open",
"build": "webpack",
```

`webpack.config.js` 中添加一些 [配置](https://webpack.js.org/configuration/dev-server/)（当然不加也会有一些默认的效果）：

```js
devServer: {
  contentBase: 'dist',
  overlay: true,
  hot: true,
},
```

## 执行

- 执行开发自动编译：`npm run start`
- 执行一次性打包：`npm run build`

## 结果

打包的效果和上一节中一样。

而 `start` 则会自动打开浏览器，随着我们修改 `src/` 中的源码而刷新页面。  
注意，这不会像 `build` 一样在 `dist/` 生成具体的打包文件，只有浏览器的页面预览效果。

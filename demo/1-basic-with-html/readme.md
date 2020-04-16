# 1 打包 HTML+JS

## 目标

但是我们一般用 Webpack，是要做 Web 应用的，只打包 JS 可不行。

所以我们还要加入 HTML 的支持。

## 配置

`package.json` 中新增一个依赖：

```js
"html-webpack-plugin": "^4.0.4",
```

同时在 `webpack.config.js` 中搭载这个插件：

```js
plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve('./public/index.html'),
  }),
],
```

新增的源码文件自然是这个 './public/index.html' 的 HTML 空壳文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Document</title>
  </head>
  <body>
    Hello HTML!
  </body>
</html>
```

`HtmlWebpackPlugin` 会自动将打包后的 JS 文件以 `script` 标签的形式写入其中。

## 执行

执行打包：`npm run build`

## 结果

在打包目录 `dist/` 中，看到最终输出了一个 HTML 文件、一个 JS 文件。  
其中的 JS 文件和上一节中的效果类似，而 HTML 文件则是我们的模板文件 + 一段 `<script>` 标签指向生成的 JS 文件。

测试：`npm run test`  
（将会打开浏览器）可以看到 JS 的内容是成功执行的。

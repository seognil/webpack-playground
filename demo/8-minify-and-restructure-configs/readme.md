# 8 代码压缩配置

## 目标

在第 4 节中，我们了解了 prod 和 dev 打包的区别，  
在这一节，我们着重看看代码压缩。

涉及几个方面：

- JS 代码的压缩、CSS 代码的压缩
- 源码、压缩后的代码、sourcemap

## 配置

对于 JS 和 CSS 我这里分别选择这两个工具，`@types` 不再赘述

```js
"optimize-css-assets-webpack-plugin": "^5.0.3",
"terser-webpack-plugin": "^2.3.5",
```

JS 代码压缩

terser 的配置也可以调整，比如是否保留注释，参考 [文档](https://github.com/webpack-contrib/terser-webpack-plugin)

```js
config.optimization
  .minimizer('terser')
  .use('terser-webpack-plugin', [
    {
      terserOptions: {
        compress: { drop_console: false },
        output: { comments: false },
      },
    },
  ]);
```

CSS 代码压缩

将插件搭载到 Webpack 配置中，

```js
config.optimization
  .minimizer('css')
  .use('optimize-css-assets-webpack-plugin');
```

以及，各个样式 loader 需要调整选项 `{ sourceMap: true }`

详情查看 `style-loader.ts` 中的代码和 loader 们自己的文档

```js
// * 之前
cssRule.use('css').loader('css-loader');
// * 之后
cssRule
  .use('css')
  .loader('css-loader')
  .options({ sourceMap: true });
```

Webpack 中支持 sourcemap，  
sourcemap 的作用是，在开发的时候，无论源码怎么处理（即使不考虑压缩，源码也需要被处理，参考上一节 Babel），在调试的时候能够将编译的代码还原成源码，以便进行分析。  
sourcemap 的原理这里不表，可以看看 [这篇文章](https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)。

这里我们设置 Webpack 的 `devtool` 字段，可选项参考这个 [文档](https://webpack.js.org/configuration/devtool/)。

```js
config.devtool('source-map');
```

为了处理压缩而进行的一些 `config/` 结构性调整，这里不展开说明。

## 执行

命令无变化，和之前一样。

```json
{
  "start": "cross-env TS_NODE_PROJECT=config/tsconfig-for-webpack-config.json webpack-dev-server --open --config=config/webpack/webpack.server.ts",
  "build": "npm run build:prod",
  "build:dev": "cross-env TS_NODE_PROJECT=config/tsconfig-for-webpack-config.json webpack --config=config/webpack/webpack.dev.ts",
  "build:prod": "cross-env TS_NODE_PROJECT=config/tsconfig-for-webpack-config.json webpack --config=config/webpack/webpack.prod.ts",
  "test": "open dist/index.html"
}
```

## 结果

`prod` 打包，这里配置成有压缩 + 没有 sourcemap，所以效果和之前基本一致。

`dev` 打包，这里配置成无压缩 + 有 sourcemap

打包后，在 `dist/` 中可以发现有 `app.js` 和 `app.js.map`（css 同理），多了一个 map 文件。

其中的 `app.js.map` 也就是 sourcemap 文件。而 `app.js` 中的我们的源码相应的代码，相比之前更清晰了。虽然有比如箭头语法被转义，但是行文结构和源码类似，不会出现之前小节中难以阅读的一串 eval。这是因为我们设定的 `devtool` 参数是 `source-map`，所以会有这样的效果。

`start` 的时候，打开浏览器的控制台查看文件（比如 `index.ts`），我们能直接看到源码代码，表明 sourcemap 发挥了它的作用。

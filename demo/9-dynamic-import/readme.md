# 9 Dynamic Import

## 目标

Dynamic Import，后文称之为动态加载

当我们要做大型 Web 应用的时候，为了打开速度，可能一部分功能需要延迟异步加载。

那么我们需要对打包代码进行切割。毕竟只有拆分成多个文件，才有可能进行按需加载。

其实 Webpack 已经直接支持 ESM 的动态加载特性，只需要正确调整配置即可。

关于动态加载，参考这个 [文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import#%E5%8A%A8%E6%80%81import)。

查看 `src/` 中我写好的代码，语法如下：

```js
// * -------- 之前

import { initLib } from './lib';
initLib();

// * -------- 改成 Dynamic Import

import('./lib').then(({ initLib }) => {
  initLib();
});

// * 或者 await

const { initLib } = await import('./lib');
initLib();
```

不过 await 需要额外处理，我们在后续的小节中再来回顾，这里先使用普通的 Promise 形式。

## 配置

这一节没有需要新增的工具，`@babel/preset-env` 已经直接支持解析。

我们调整 Babel 的配置：

```json
[
  "@babel/preset-env",
  {
    "modules": false
  }
]
```

其中的 `modules` 字段作用是指定模块化规范，可选项为：  
`"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false`  
默认值 `"auto"`

`false` 也就是指 ESM

详情查看 [文档](https://babeljs.io/docs/en/babel-preset-env#modules)

其中

> Dynamic import can only be supported when transforming ES modules to AMD, CommonJS or SystemJS.

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

打包后 `dist` 文件夹中会出现 `app.js` 和 `0.js` 两个文件，而不是像之前只有 `app.js` 一个，这样就算成功地分离输出了业务代码。

而（通过 `start` 或 `test`）打开浏览器，打开调试器的 Network 面板，可以观察到 `0.js` （其实是我们的源码 `lib.ts`）是按需加载的。

那么我们就成功实现了 Dynamic Import 功能。

至于想把输出的 `0.js` 调整成 `lib.js` 或别的名字，这是后话了，这里不做展开。

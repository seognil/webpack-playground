# 11 Let's: Polyfill + async

基于上一小节的代码

## 目标

async 是一个写异步代码的新方式，在第 9 节中我们也提到过。

上一小节我们了解了 Polyfill，以及提到了要排除 node_modules，  
导致 Babel 转义了一部分代码，同时跳过了一部分代码（`corejs` 等）

我特地没有尝试 async，因为 async 其实是 generator 的语法糖，而处理 generator 碰到了一个问题。

这一节我们来处理这个问题，实现同时支持 Polyfill + async。

## 配置

在 `src/` 中我们写上测试用的 await 代码,  
顺便还有上一节中提到的带箭头函数的 [query-string](https://unpkg.com/query-string) 包。

```js
(async () => {
  const result = await new Promise((res) =>
    setTimeout(() => {
      res('666');
    }, 500),
  );
  prettyLog('await', result);
})();

const queryString = require('query-string');
console.log(queryString);
```

接着我们试试调整 Babel，采取用 `plugin-transform-runtime` 实施 Polyfill 的方式。

以及将本来在 Webpack 中的 `exclude` 移动到 Babel 中处理。

```js
const byRuntime = {
  sourceType: 'unambiguous',
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
  ],
  exclude: [/node_modules\/(webpack|core-js)/],
};

module.exports = byRuntime;
```

在具体实践过程中，发现如果 `modules` 设定为 `false`，也就是 Babel 以 ESM 模块化输出，就会报错：

`TypeError: Cannot set property 'wrap' of undefined`

追踪代码发现是 [regenerator-runtime/runtime.js](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) 其中的 `exports.wrap = wrap;` 这句，看上去像是模块化的问题。

Webpack 读取所有的依赖然后打包，但因为组件代码的模块化规范不统一，那么可能就会产生兼容性问题。

哪里调用了这个代码呢？  
继续追踪，发现是我们源码中的 await：

```js
await new Promise();
```

所翻译成的：

```js
_regenerator["default"].wrap(function _callee$(_context) {...})
```

~~解决方法是，将 `modules` 设定为除了 `false` 和 `'auto'` 的值，比如 `'cjs'`。~~

解决方法的是，在 babel 中加一行配置：

```js
sourceType: 'unambiguous',
```

[文档在这里](https://babeljs.io/docs/en/options#sourcetype)，总之解决了模块化的处理问题。

这个问题**很难直接在众多文档中找到**的解决方案和原因，  
在以后的实践中，我们可能还会碰到类似这样的迷之问题。  
（~~这也是为什么 Webpack 这么难配~~）

## 执行

命令无变化，和上次一样。

```json
{
  "build": "webpack --mode=production",
  "build:dev": "webpack --mode=development",
  "test": "node ./dist/app.js",
  "build:babel": "babel src --out-dir dist",
  "test:babel": "node ./dist/index.js"
}
```

## 结果

打包后检查 `dist/` 中的 JS 文件，

不包含 `await`、`yield`、`=>` 等关键字和语法，

并且代码能够正常执行无报错，

那么就是成功的。

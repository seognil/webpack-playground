# 10 [Let's]: Polyfill

作为实验，本小节重新将配置简化，去掉了其他无关内容的干扰，只保留最精简的所需代码。

## 目标

编译源码的目的是为了提高浏览器兼容性，  
比如 TS 的源码、 React 中的 JSX，都需要编译到常规的 JS 语法才能在浏览器上运行。  
更朴素一点的需求是，将 ES6 转义到 ES5 以便兼容 IE 比如箭头函数语法到 function 函数。

但是这不是事情的全貌。

另一个需求，则是 Polyfill。

比如，以下代码是等价的：

```js
[1, 2].includes(2);
[1, 2].indexOf(2) !== -1;
```

它们本身都已经是朴素的 JS 语法了
但是 `Array.prototype.includes` 是 ES7 规范才加入的新 API，旧的浏览器可能并不支持。

那么通过朴素 JS 代码实现一个浏览器引擎缺失的 `Array.prototype.includes`，以便在不修改源码的情况下，也能在旧浏览器上正常运行，这就算 Polyfill。

用 Babel 实施 Polyfill 有几种做法：

- [Babel 学习系列 4-polyfill 和 runtime 差别(必看)](https://zhuanlan.zhihu.com/p/58624930)
- [babel-polyfill VS babel-runtime VS babel-preset-env](https://juejin.im/post/5aefe0a6f265da0b9e64fa54)

而关于目标环境的设定，我们在第 6 节高级 CSS 中，已经设定了 [browserslist](https://github.com/browserslist/browserslist)，这里 Babel 也可以直接读取使用。

## 配置

除了最基本的 Webpack + Babal

Babel 需要新增一些 Polyfill 相关的工具。

```js
"@babel/plugin-transform-runtime": "^7.9.0",
"@babel/runtime-corejs3": "^7.9.2",
"core-js": "^3.6.5"
```

其中两个名字为 `corejs` 的库就是包含大量现成 Polyfill 代码库。

`@babel/plugin-transform-runtime` 是分析源码并载入相应 Polyfill 的加载库。

Babel 的配置，`babel.config.js` 中我已经事先写好两种不同的实施方式：  
（详情可以参考上面提到的两篇文章）

```js
const byEnv = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
};

const byRuntime = {
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
  presets: ['@babel/preset-env'],
};
```

其实 Webpack + Babel 原本是编译所有文件的。  
比如有一个 npm 包叫 [query-string](https://unpkg.com/query-string)，其代码中有箭头函数。  
如果无配置直接编译 `require('query-string')`，那么编译结果中不会包含箭头函数，而是 `function`。

但是如果要做 Polyfill，需要排除 `node_modules/` 中的一些目录，  
这是因为，有些代码本身不需要转义，比如 `corejs` 本身已经就是 Polyfill 了，没必要再次处理。

而且如果不排除这些目录，就会产生一些奇妙报错……  
`__webpack_require__(...) is not a function`

所以要注意排除一部分，但不要排除所有 `node_modules/`  
（想想 [query-string](https://unpkg.com/query-string)）

```js
exclude: [/node_modules\/(webpack|core-js)/],
```

然后我们写一些测试源码，查看这个 [文档](https://github.com/inexorabletash/polyfill)，看看哪些是新的内置对象 API。

比如：

```js
// * includes
const es2016_arr = [1, 2, 3].includes(2);

// * padStart
const es2017_str = '1'.padStart('2', '0');

// * entries
const es2017_obj = Object.entries({ a: 1, b: 2 });

// * Promise
const p = new Promise((res) => res());

// * 箭头函数
const arrow = () => {};
```

## 执行

新增两条只通过 Babel 不通过 Webpack 编译的命令

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

分别尝试两种不同的打包方式，

打包后检查 `dist/` 中的 JS 文件，

不包含 `=>`，以及 `includes` 等语句被转义，

并且代码能够正常执行无报错，

那么就是成功的。

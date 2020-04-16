# 7 Babel 基本

## 目标

现代化 Web 应用开发，写业务逻辑不只需要 JS（ES5），可能还需要 ES6、TS、React 的 JSX 等，以及处理浏览器兼容性等琐事。

我们需要一个自动处理过程，将我们的源码编译为 ES5 才能更好地使用，同时不影响开发体验。

那么我们可以借助 [Babel](https://babeljs.io/) 这个工具做到这件事。

我们先试试简单地将 TS 文件编译成 JS 文件。

## 配置

TypeScript 在第 5 节重构 config 的时候就已经装好了

新增一些 Babel 相关的工具，`@types` 不再赘述

```js
"@babel/core": "^7.9.0",
"@babel/preset-env": "^7.9.5",
"@babel/preset-typescript": "^7.9.0",
"babel-loader": "^8.1.0",
```

作用：

- Babel
  - `@babel/core`：Babel 编译器核心
  - `@babel/preset-env`：一组方便的预设，内置一堆设定，能满足大部分需求。详情请看 [文档](https://babeljs.io/docs/en/babel-preset-env)，以及这个 [更新说明](https://babeljs.io/blog/2020/01/11/7.8.0#ecmascript-2020-default-support-10811-https-githubcom-babel-babel-pull-10811-10817-https-githubcom-babel-babel-pull-10817-10819-https-githubcom-babel-babel-pull-10819-10843-https-githubcom-babel-babel-pull-10843)。
  - `@babel/preset-typescript`：顾名思义，编译 TS 到 JS 的（通常目标是 ESNext，还不是 ES5 的，这样改动比较小，剩下的事交给另外的工具处理，这里也就是交给 `preset-env`）
- `babel-loader`：我想你能猜到~

以及写 TS 少不了 `tsconfig.json`，具体含义请看 [文档](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    "baseUrl": "./",
    "paths": {
      "src": ["src"]
    }
  },
  "include": ["src"]
}
```

调整 Webpack 的配置，加入 Babel（这里的配置风格，请回顾 第 4、5 节）

`config/webpack/configs/babel-loader.ts`

```ts
import babelConfig from './babel.config';

config.module
  .rule('script')
  .test(/\.(ts|tsx|js|jsx)$/)
  .use('babel')
  .loader('babel-loader')
  .options(babelConfig);
```

`config/webpack/configs/babel.config.js`

```js
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],
};
```

（这个为啥是 JS 文件？因为这个文件名有 [图标](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) … 反正配置也没什么复杂的代码…）

关于 Babel 的配置，

- plugins：（这一节中没有），效果针对更细节的需求（请看 [文档](https://babeljs.io/docs/en/plugins/)），作用顺序是从前到后
- presets：是一些集成预设（请看 [文档](https://babeljs.io/docs/en/presets)），作用顺序是从后到前

顺便，还可以调整 Webpack 的解析配置

`config/webpack/configs/resolve.ts`

```js
config.resolve.extensions.merge([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
]);
```

好处是，在写业务源码时，可以省略文件类型后缀。

```js
// * 之前
import './lib.ts';
// * 之后
import './lib';
```

将 `src/` 源码文件夹中的 JS 文件全部改成 TS 文件，这里不做展开。

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

能正常执行打包，且解析源码 TS 文件无报错，并打包结果能正常运行。

就算成功。

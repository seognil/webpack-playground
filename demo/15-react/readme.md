# 15 React

## 目标

之前提到，所谓“现代前端开发”，实际上说的是用一些成熟的框架进行开发。  
不再是刀耕火种、重复造轮子、手动处理数据-视图变更。

而这些框架的其中一个便是 [React](https://zh-hans.reactjs.org/)。

虽然 React 有自己的 [CLI](https://github.com/facebook/create-react-app)，直接支持了一大堆特性（包括 TypeScript），新项目可以直接用它。

但在一些情况下，我们还是需要自己配置打包系统。比方说：迁移公司旧的 jQuery 项目到 React，而不是从零开始；或者有特殊的业务需求，想要自己控制编译过程。

事实上 React CLI 的打包效果本身也是基于 Webpack，查看 [react-scripts 命令的源码](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/scripts/build.js#L37) 就能发现。

这次我们以 React 为例，看看我们自己写的 Webpack 配置怎样和 React 结合。

## 配置

关于资源加载的需求，我们已经在上一节中解决。

那么本次新增的依赖（在 `devDependencies` 中）：

```js
"@babel/preset-react": "^7.9.4",
```

别忘了 React 自己（在 `dependencies` 中）

```js
"react": "^16.13.1",
"react-dom": "^16.13.1"
```

在 `src/react/` 中，我直接借用了 `create-react-app --typescript` 生成的项目初始文件。
并在 `scr/index.ts`、我们的入口文件中 `import './react';`。这里不多展开。

其实要支持 React 很简单，只需要给 Babel 搭载 `@babel/preset-react` 这个预设即可。

`babel.config.js`

```js
presets: [
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-typescript',
],
```

为什么？

我们需要先了解一下 React 是如何运行的。

其实 React 本身也不是黑魔法，React 的源码只是朴素的 JS，它提供了一套合适的视图运行机制，所以成为了框架。
而 React 真正超出 JS 范围的部分，是 JSX 语法 —— 在 JS 中直接写 HTML。
这个语法是为了方便开发者而设计的，只是语法糖，它当然有 JS 语法的等价形式。

`@babel/preset-react` 插件的作用，就是将 JSX 还原成普通 JS 语法。

我们可以通过 [Babel - 试一试](https://www.babeljs.cn/repl) 进行在线尝试。

```jsx
// * ---------------- 输入

<App>
  <Child>Hello React!</Child>
</App>;

// * ---------------- 输出

React.createElement(
  App,
  null,
  React.createElement(Child, null, 'Hello React!'),
);
```

这个原理不难理解，对吧。  
（同时，也很好地解释了，为什么组件代码中总是需要 `import React`）

（详情可以查看 [React 文档中的 JSX 章节](https://zh-hans.reactjs.org/docs/introducing-jsx.html#jsx-represents-objects)）

（关于 presets 的加载顺序，可以回顾第 7 节）

## 执行

```json
{
  "tn": "cross-env TS_NODE_PROJECT=config/tsconfig-for-webpack-config.json",
  "start": "npm run tn -- webpack-dev-server --open --config=config/webpack/webpack.server.ts",
  "build": "npm run build:prod",
  "build:dev": "npm run tn -- webpack --config=config/webpack/webpack.dev.ts",
  "build:prod": "npm run tn -- webpack --config=config/webpack/webpack.prod.ts",
  "test": "open dist/index.html"
}
```

## 结果

编译 tsx 文件无报错，并且预览是正常的。就算成功。

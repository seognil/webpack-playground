# 16 Vue

## 目标

在上一节中，我们尝试了 Webpack + React，这次我们尝试 Webpack + Vue。

鉴于 Vue 3.0 还没更新，以及 Vue 对 TypeScript 的支持还不像 React 那么成熟。  
所以这里我们只用最基本的 Vue with JS。  
~~（其实是我对 Vue 不熟悉）~~
~~（以后有机会再更？）~~

## 配置

方法和上一节我们处理 React 类似。

本次新增的依赖（在 `devDependencies` 中）：

```js
"vue-loader": "^15.9.1",
"vue-template-compiler": "^2.6.11",
```

分别是 webpack 的 loader，和 vue 模板语法的编译器。

同样别忘了 Vue 自己（在 `dependencies` 中）

```js
"vue": "^2.6.11"
```

同样的，在 `src/vue/` 中，我直接借用了 `vue create` 生成的项目初始文件。
并在我们的入口文件 `scr/index.ts` 中 `import './vue/main';`。这里不多展开。

Vue 的哲学是一个组件，视图、数据逻辑、样式都写在一个文件中。  
Vue 提供了自己的 Loader，所以我们不需要借助 Babel。  
以及除了 Loader 还需要有 Plugin。

（具体可以参考 [Vue 的文档](https://vue-loader.vuejs.org/zh/guide/#vue-cli)）

```js
config.module
  .rule('vue')
  .test(/\.vue$/)
  .use('vue')
  .loader('vue-loader')
  .options({
    esModule: false,
  });

config.plugin('vue').use('vue-loader/lib/plugin');
```

原理就不多说了，和 React 类似。

## 执行

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

编译 vue 文件无报错，并且预览是正常的。就算成功。

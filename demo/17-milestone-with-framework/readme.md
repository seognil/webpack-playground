# 17 目前为止的功能\*（二）

## 目标

在之前的三节中，我们支持了 React 和 Vue 两个框架。

（Angular 本身就有非常健全的生态体系，一般没人会自己重新搭架子吧，所以这里先不做研究。）  
~~（其实是 Angular 我不太熟悉…）~~  
~~（下次一定？）~~

这一节我们整理一下配置

- Webpack
  - TypeScript
  - webpack-chain 组织代码结构
  - dev、prod、server 等面向多个环境的打包命令
  - 清除打包目录等辅助功能
- 源码
  - HTML
  - Sass、Less、CSS
  - TypeScript、ESNext
  - async、await
  - Dynamic Import
  - React
  - Vue
- 发布
  - 代码压缩、sourcemap
  - Polyfill
  - Tree Shaking

相比上次，新增了对 React 和 Vue 的支持。  
那么现在，我们的配置终于能保证基本的框架开发了。  
后续可以逐渐尝试更多有用的功能。

## 配置

略

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

可以同时运行 React 和 Vue 了。

上文提到的技术需求都覆盖、编译正常、运行正常，就算成功。

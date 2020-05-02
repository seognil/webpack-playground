# 13 目前为止的功能\*（一）

## 目标

前三个小节我们单独做了一些实验，

现在我们整理一下目前完成的功能，已经有不少东西了：

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
- 发布
  - 代码压缩、sourcemap
  - Polyfill
  - Tree Shaking

这一节我们基于之前第 9 节的配置，补上 Polyfill。

## 配置

没有新东西，前面都介绍过了。

我们在 `src/features/` 源码文件夹中写一些效果相关代码用于测试可行性，这里不做展开。

现在的配置，已经能够满足当前提及的全部技术需求。

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

应当有以下结果：

- HTML 能运行
- Style 能加载
- TS 代码能运行
- 语法被转义（输出文件中不包含 `await`、`yield`、`=>`、`includes` 等）
- Polyfill 起作用
- Dynamic Import，编译输出多个文件
- Tree Shaking（`build:prod` 后的输出文件中不包含源码文件中的 `DEADBEAF` 变量）

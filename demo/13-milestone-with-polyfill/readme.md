# 13 目前为止的功能（一）

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
  - TypeScript
  - Dynamic Import
- 发布
  - 代码压缩、sourcemap
  - Polyfill
  - ~~Tree Shaking（和 Polyfill 冲突，放弃）~~

这一节我们基于之前第 9 节的配置，补上 Polyfill。

## 配置

没有新东西，前面都介绍过了。

`src/` 源码文件夹写一些效果相关代码用于测试，这里不做展开。

然而碰到一个新的问题，  
根据前几节的经验，Babel 的模块化选项：

- 动态加载（第 9 节）需要：`esm`、`cjs`、`amd`、~~SystemJS（这个不熟悉，划了）~~
- Polyfill + async（第 11 节）需要：不是 `esm`
- ~~Tree Shaking（第 12 节）需要：只能是 `esm`，这个不重要，放弃~~

那么按道理 'cjs' 是可以的，但是在实践的时候不知道又哪里冲突了… 动态加载效果失效（文件没有分离输出）

（并没有搞明白为什么会这样）

所以只好改成 `amd`，行叭… 反正 Babel 处理完，Webpack 的模块封装还是要处理的。先这样吧…想要的功能都通过了，又不是不能用.jpg

~~（以后有机会再研究吧）~~

```json
[
  "@babel/preset-env",
  {
    "modules": "amd"
  }
]
```

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

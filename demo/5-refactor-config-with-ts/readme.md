# 5 用 TypeScript 重构打包配置

## 目标

趁热打铁，我们再把 Webpack 配置改成用 TypeScript 来编写。

## 配置

安装 TS 相关的工具，以及 `cross-env` 是用来配置环境参数的。

```js
"cross-env": "^7.0.2",
"ts-node": "^8.8.2",
"typescript": "^3.8.3",
```

以及当我们要用 TypeScript 的时候，我们还需要一些 `@types` （关于这个，咱们以后有机会再补充）

```js
"@types/glob": "^7.1.1",
"@types/node": "^13.11.0",
"@types/webpack": "^4.41.10",
"@types/webpack-dev-server": "^3.10.1",
```

新增一个名为 `tsconfig-for-webpack-config.json` 的 `tsconfig` 文件，作用是为我们的 `config/` 配置文件夹开启 TS 支持和语法检查（否则用 TS 有啥意义…）。  
（具体含义请看 [文档](https://www.typescriptlang.org/docs/handbook/compiler-options.html)）

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "strict": true,
    "allowJs": true
  }
}
```

关于 `config/` 中的结构性调整这里不赘述。

## 执行

`scripts` 中的命令要相应的进行改变，关于参数的含义这里不展开（都是字面意思，不懂的自行搜索文档）

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

能正常执行打包就算成功。

打包配置未进行调整，所以打包效果应当和之前一样。

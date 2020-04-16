# 4 用 webpack-chain 重构打包配置

## 目标

如果我们要实现更多的打包功能，Webpack 的配置文件可能会变得很复杂。

所以我们需要一种方式来组织这些配置代码。

有一个工具叫做 `webpack-chain`，能够实现这一目标。

## 配置

安装两个新工具到 `package.json` 的 `devDependencies` 中：

```js
"glob": "^7.1.6",
"webpack-chain": "^6.4.0",
```

其中的 `webpack-chain` 就是我们要用的工具了，  
而 `glob` 是用来做文件模糊搜索的（和我的实现方式有关）。

关于 `webpack-chain` 的用法，这里不展开，请看 [文档](https://github.com/neutrinojs/webpack-chain)

我们新建一个 `config/` 文件夹，然后在其中重构我们的 Webpack 配置。

这里我最终设计的目录结构是这样：

```sh
config
└── webpack
    ├── configs
    │   ├── app-entry.js
    │   ├── clean-dist.js
    │   ├── html.js
    │   └── style.js
    ├── load-configs.js
    ├── webpack.dev.js
    └── webpack.prod.js
```

其中顺便拆分出两个打包配置文件 `webpack.dev.js`、`webpack.prod.js`，  
用于开发和发布分别使用不同的配置。

相应的需要两个 `scripts` 命令，
这里我们先简单分离，不做过多配置：

```js
"build": "webpack --config=config/webpack/webpack.prod.js --mode=production",
"build:dev": "webpack --config=config/webpack/webpack.dev.js --mode=development",
```

而原本 `webpack.config.js` 中的配置代码，我把它拆分成子配置，和一个加载文件。

```sh
    ├── configs
    │   ├── app-entry.js
    │   ├── clean-dist.js
    │   ├── html.js
    │   └── style.js
    ├── load-configs.js
```

对了，顺便还新增了一个插件给 Webpack 用，作用是每次打包时清除上次的结果，保持打包目录干净。

```js
"clean-webpack-plugin": "^3.0.0",
```

以及再顺便，我将 `public/index.html` 移动到了 `src/index.html` 中。  
（这算个人喜好？）

## 执行

分别试试两个不同的打包命令。

- `npm run build`
- `npm run build:dev`

## 结果

能正确打包就算成功。

观察 `dist/` 中的文件可以发现，

`build:dev` 后的代码是未压缩的（当然，源码代码被处理过了），  
而 `build` 的代码是压缩的

这个行为差异是 Webpack 的 `--mode=development` 这一参数造成的，  
同时这个参数的默认值是 `production`，所以在之前小节中我们的打包代码直接就是压缩的。

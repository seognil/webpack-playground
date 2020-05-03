# 18 输出文件名、Vendor

## 目标

单刀直入。做打包，通常我们会想要控制输出文件的名字，有几个理由：

- 之前我们在动态加载小节中输出的 `1.js` 异步文件，文件名的可读性不好。
- 想要利用浏览器缓存提高加载性能，要在文件名中写上 hash。
- 为了更好的利用缓存，频繁变动的业务代码和不常变动第三方依赖代码可以拆分成不同的文件（Vendor）。

那么这一节我们就来调整打包的输出文件。

扩展阅读：

- [一文读懂前端缓存](https://zhuanlan.zhihu.com/p/44789005)
- [The 100% correct way to split your chunks with Webpack](https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)
- [The Correct Way to Import Lodash Libraries - A Benchmark](https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark)

关于 Webpack 的 hash，可以查看以下文档：

- [Hash vs chunkhash vs ContentHash](https://medium.com/@sahilkkrazy/hash-vs-chunkhash-vs-contenthash-e94d38a32208)
- [缓存 - Webpack](https://webpack.docschina.org/guides/caching/)

## 配置

没有新的依赖，只需要调整一些配置。共涉及几个地方：

- Webpack 的 output 设定（因为 js 文件的输出是根据它来设定的）
- `mini-css-extract-plugin` 插件的设定（因为 css 文件的输出是它来完成的）
- Webpack 的 optimization 设定（用来拆分 Vendor）
- Dynamic Import 文件的名字

我们逐一来看。

- `configs/app-entry.ts`

  [输出 - Webpack](https://webpack.docschina.org/configuration/output/#output-sourcemapfilename)

  我们可以根据打包模式，设定输出文件的 hash 方式，  
  以及将 sourcemap（在 dev mode 下生成）全都整理到一个文件夹内。

  ```js
  const hashMode = isDevMode ? `` : `.[contenthash:8]`;

  config.output.merge({
    filename: `[name]${hashMode}.js`,
    sourceMapFilename: `sourcemap/[file].map`,
    path: resolver('./dist'),
  });
  ```

- `configs/style-loader.ts`

  [MiniCssExtractPlugin - Webpack](https://webpack.js.org/plugins/mini-css-extract-plugin/)

  同样，对样式我们也可以做出相应调整。

  ```js
  config
    .plugin('mini-css-extract')
    .use('mini-css-extract-plugin', [
      {
        filename: `[name]${hashMode}.css`,
        chunkFilename: `[name]${hashMode}.css`,
      },
    ]);
  ```

- `configs/split-chunk.ts`

  [优化 - Webpack](https://webpack.docschina.org/configuration/optimization/)

  关于代码拆分，

  我们可以进行两个设定，一是拆分 Webpack 的模块加载器的代码，也就是 runtimeChunk。

  ```js
  config.optimization.merge({
    runtimeChunk: {
      name: 'webpack',
    },
  });
  ```

  另一个就是所谓 Vendor。这里我们写一个简单的配置（直接抄文档里的），意思是对于所有引入的 npm 包，我们打包成一个 `npm.js` 文件（带 hash），这样就和我们自己写的 src 代码拆分开来。

  ```js
  config.optimization.splitChunks({
    chunks: 'all',

    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,

        name: 'npm',
      },
    },
  });
  ```

  `name` 参数也可以是函数（配置在 Stack Overflow 上抄的），意思是对于不同的 npm 包，分别打包出不同的文件。比如：`npm-react.js`、`npm-react-dom.js`、`npm-core-js.js`……

  ```js
  config.optimization.splitChunks({
    chunks: 'all',

    maxInitialRequests: Infinity,
    maxAsyncRequests: Infinity,
    minSize: 0,

    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,

        name: (module: any) => {
          const packageName = module.context.match(
            /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
          )[1];

          return `npm-${packageName.replace('@', '')}`;
        },
      },
    },
  });
  ```

- `src/features/load-async-dynamic.ts`

  - [Magic Comments - Webpack](https://webpack.docschina.org/api/module-methods/#magic-comments)
  - [动态导入 - Webpack](https://webpack.docschina.org/guides/code-splitting/#%E5%8A%A8%E6%80%81%E5%AF%BC%E5%85%A5-dynamic-imports-)

  目前好像只能用这种方式来手动设定文件名。没有什么道理，API 就是这么设计的……

  ```js
  const { initLib } = await import(
    /* webpackChunkName: "async-lib" */
    './async-lib'
  );
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

`build` 之后 `dist/` 文件夹内有正确的文件和文件名，且预览正常，就算成功。

```
dist
├── app.70f08f6b.css
├── app.7412e505.js
├── async-lib.5e057c6c.js
├── index.html
├── npm.4a974018.js
└── webpack.24a97dcf.js
```

如果设置成函数形式的 `name`，则可以输出成更琐碎的文件。

例如：

```
├── npm-babel.dc3c6769.js
├── npm-core-js-pure.63d9470b.js
├── npm-decode-uri-component.46870f21.js
├── npm-object-assign.e63521b3.js
├── npm-process.d1e6ab4c.js
├── npm-query-string.2817d922.js
├── npm-react-dom.8762495f.js
├── npm-react.4fba699f.js
├── npm-regenerator-runtime.40f796aa.js
├── npm-scheduler.d04682c2.js
├── npm-split-on-first.7ed066ae.js
├── npm-strict-uri-encode.31c6b06c.js
├── npm-vue-loader.d5f53abd.js
├── npm-vue.10bbc670.js
├── npm-webpack.8b12736b.js
```

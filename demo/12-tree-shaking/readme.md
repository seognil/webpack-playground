# 12 Tree Shaking

## 目标

Tree Shaking，干嘛的？打包的时候清除死代码（没有使用的代码）

## 配置

根据 Webpack [文档](https://webpack.js.org/guides/tree-shaking/#conclusion)，

需要调整 Babel 成编译为 ESM 模块化格式，比如：

```json
[
  "@babel/preset-env",
  {
    "modules": false
  }
]
```

这样就和上一节的 Polyfill + async 需求相冲突，

所以现在只能选择其中一个特性？或许芭？

参考资料：

- [When using dynamic imports, dead code elimination no longer works for chunks.](https://github.com/webpack/webpack/issues/7500)
- [The unexpected impact of dynamic imports on tree shaking](https://medium.com/@christiango/the-unexpected-impact-of-dynamic-imports-on-tree-shaking-ddadeb135dd7)
- [Dynamic Import and Tree Shaking in JavaScript](https://medium.com/better-programming/dynamic-import-and-tree-shaking-in-javascript-ddc2f3cd69f)

## 执行

命令无变化，和上次一样。

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

`build`（`production` 模式）打包后检查 `dist/` 中的 JS 文件，

除了 Polyfill 的效果，

如果没有 `lib.js` 中的 `DEADBEAF` 相应代码，

那么 Tree Shaking 是成功的。

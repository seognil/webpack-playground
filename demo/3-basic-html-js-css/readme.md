# 3 打包 HTML+JS+CSS

## 目标

同样的，做 Web 应用也少不了 CSS。

这里我们先简单地尝试加载普通的 CSS 文件。

（Less、Sass 等高级版，我们之后章节再做）

## 配置

`package.json` 中新增两个依赖：

```js
"css-loader": "^3.5.1",
"style-loader": "^1.1.3",
```

简单增加一下源码：

`index.js`

```js
require('./style.css');
```

`style.css`

```css
body {
  background-color: hsla(0, 70%, 70%, 0.3);
}
```

`webpack.config.js` 中调整一下配置（参考这里的 [文档](https://webpack.js.org/concepts/loaders/)）：

```js
module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
  ],
},
```

意思是对于 `.css` 结尾的文件，  
通过两个 `loader` 进行加载，  
顺序是倒序（文档里有说明）

这两个插件的效果是，

- `css-loader`：支持 `require('./style.css')` 这句话的解析（因为后缀是 `.css`）
- `style-loader`：将 `css-loader` 解析后的数据神奇地应用到网页中（其实是用一段 JS 代码写入 CSS 的内容到 HTML 中）

思考，如果不启用 `style-loader` 那么会有什么结果，以及 `require('./style.css')` 这句话得到的数据是什么。

## 执行

和上一节中一样

- 执行开发自动编译：`npm run start`
- 执行一次性打包：`npm run build`

## 结果

可以看到我们的网页中成功加载了 CSS 样式

以及打包的 `dist/app.js` 中能找到 CSS 的代码  
（试试搜索 `background-color: hsla(0, 70%, 70%, 0.3);`）

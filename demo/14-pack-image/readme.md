# 14 打包静态资源（如图片字体）

## 目标

我们在开发 Web 应用的时候，除了基本的 HTML、JS、CSS 以外，  
我们可能还需要加载静态资源，如图片、字体。

传统的方式是在 HTML 中直接写标签和路径：`<img src="xxx.png">`，但是现代前端开发中，几乎不再直接在 HTML 中编写业务了，都是使用基于 JS 的组件的形式来完成。

如何用 JS 编写 HTML 标签呢？很简单，用浏览器提供的 API 来操作 DOM。

```js
const img = document.createElement('img');
img.src = './xxx.png';
document.body.appendChild(img);
```

但是这就产生了一个疑问，Webpack 将如何处理我的资源？能不能正确打包？

根据之前小节的经验，我们使用打包工具，可以且一定会对代码和文件名进行处理。  
对于文件资源，我们要控制输出的文件名（路径）和代码中使用的一致，即可实现资源加载的效果。

那么作为后续小节支持 React 和 Vue 的铺垫，这一节我们先来看看如何打包静态资源。

## 配置

我们安装两个额外的 Webpack Loader：

```js
"url-loader": "^4.1.0",
"file-loader": "^6.0.0",
```

并编写相应的配置：

`config/webpack/configs/url-loader.ts`

```js
config.module
  .rule('url-loader')
  .test(/\.(eot|ttf|TTF|woff|woff2|svg|png|jpg|gif)$/i)
  .use('url-loader')
  .loader('url-loader')
  .options({
    limit: 8192,
    fallback: 'file-loader',
    esModule: false,
  });
```

直接解释一下，这段配置的作用是：

- 对于这些后缀结尾的文件（也就是我们的资源文件），通过 loader 来处理
- 如果资源文件的大小 >= 8192 bytes，使用 `file-loader`，否则使用 `url-loader`
- file-loader 的作用是，将文件加载为路径（字符串）
- url-loader 的作用是，将文件加载为 [DataURL](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs)

（详情参考 [Webpack url-loader 文档](https://webpack.js.org/loaders/url-loader/)）

这使得我们可以直接在源码中 `import` 资源文件：

`src/index.ts`

```js
import webpackImg from './webpack-icon-square-big.png';
import smallImg from './webpack-small.png';
console.log(webpackImg);
console.log(smallImg);

const img = document.createElement('img');
img.src = webpackImg;
```

在控制台可以发现变量 `webpackImg` 其实是一个值为 `47692505d122dbcae490be2492a60b2e.png` 的字符串。

而 `smallImg` 则是 `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAA....`。

（也就是两个不同 loader 的不同效果）

需要注意的是，正常情况下，如果我们在代码中 `import 'xxx.png'`，编辑器会提示报错：

```js
Cannot find module './xxx.png'.
```

这是因为 `.png` 不是 JS 或 TS 的后缀名，也不存在以 `xxx.png` 为名的代码文件（`xxx.png.ts`），总之编译器（用于编辑器中做代码检查）不认识我们写的这句话。

解决方案是，我们手动进行处理，写一段 TS 的声明内容：

`src/asset.d.ts`

```ts
declare module '*.png' {
  const src: string;
  export default src;
}
```

意思是：把 `*.png` 也当做模块化文件，`import` 进来的内容是字符串（正好符合 loader 的行为）。这样编译器就能读懂我们的代码了。

（如果你用过 React CLI，你不会遇到这个报错。这是因为 React CLI 已经自己进行了处理，可以查看 `node_modules/react-scripts/lib/react-app.d.ts` 这个文件，原理是一致的。）

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

能够正确显示图片就算成功。

在 `build` 后，查看 `dist/app.js` 中的代码，可以找到和 `dist/` 中 `xxx.png` 文件名一致的代码片段。

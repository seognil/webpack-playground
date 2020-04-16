# 6 Scss、Less、CSS

## 目标

这次我们来看看之前提到的高级样式

试试打包 Less 和 Scss（别名 Sass）

## 配置

新增一些所需的工具，`@types` 不再赘述

```js
"mini-css-extract-plugin": "^0.9.0",
"postcss-loader": "^3.0.0",
"autoprefixer": "^9.7.6",
"less-loader": "^5.0.0",
"less": "^3.11.1",
"sass-loader": "^8.0.2",
"dart-sass": "^1.25.0",
```

按分类：

- 提高兼容性
  - `postcss-loader`：支持 `postcss` 文件，但是我们一般不写 `postcss`，那么这里的作用是下面这个插件。
    - `autoprefixer`：比如如果有 `transform`，那么增加一句 `-webkit-transform` 提高旧浏览器兼容性。
- 加载到页面
  - `style-loader`：我们之前就装好的，实施方式是通过 JS 写入 CSS 到页面
  - `mini-css-extract-plugin`：实施方式是分离出单独的 CSS 文件，在 HTML 中通过标签加载
- 加载样式
  - `css-loader`：我们之前就见过的，效果不赘述
- Less
  - `less-loader`：加载器，作用类似 `css-loader`，需要下面这个编译器
    - `less`：编译 Less 文件到 CSS 文件
- Sass
  - `sass-loader`：加载器，作用类似 `css-loader`
    - `dart-sass`：编译 Sass 文件到 CSS 文件。其实 `sass-loader` 的默认编译器是 `node-sass`，但是这里我选择 `dart-sass` 来代替，作用是一致的，但是安装包的时候更方便。

Webpack 配置的改动在 `config/webpack/configs/style-loader.ts`，  
具体代码不进行解析，  
最终生成的结果类似这样（已简化，去掉了选项等代码）：

```json
{
  "rules": [
    {
      "test": /\.css$/i,
      "use": [
        "mini-css-extract-plugin",
        "css-loader",
        "postcss-loader"
      ]
    },
    {
      "test": /\.less$/i,
      "use": [
        "mini-css-extract-plugin",
        "css-loader",
        "postcss-loader",
        "less-loader"
      ]
    },
    {
      "test": /\.(sass|scss)$/i,
      "use": [
        "mini-css-extract-plugin",
        "css-loader",
        "postcss-loader",
        "sass-loader"
      ]
    }
  ]
}
```

刚才提到了 `autoprefixer` 的兼容性处理，那么兼容的目标设定我们通过 `browserslist` 进行（详情参考 [文档](https://github.com/browserslist/browserslist)），比如我在 `package.json` 中设定的：

```js
"browserslist": [
  "> 1%",
  "last 2 versions",
  "chrome >= 35",
  "ie >= 10",
  "safari >=10"
]
```

当然，我们的需求是支持这些高级样式，那我们编写业务源码看看。

Less 和 Scss 都支持变量，而 CSS 是不支持的。我们写个变量，以便和普通 CSS 区分开。

`style.less`

```less
@color: hsla(100, 80%, 20%, 1);

* {
  color: @color;
}
```

`style.scss`

```scss
$color: hsla(0, 70%, 70%, 0.3);

body {
  background-color: $color;
  transform: none;
}
```

## 执行

命令无变化，和之前一样。

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

能正常执行打包，且解析样式文件无报错，并正常加载样式。

就算成功。

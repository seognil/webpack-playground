# Webpack 从零开始

Webpack 对于现代前端开发来说是一个必不可少的工具。无论你是主动配置，还是被动地通过 CLI 调用。如果你想使用 ES6、TypeScript、JSX 等新技术，你的项目中总是会有它。

Webpack 虽然很强大，但是想要用好它并不是一件轻松的事情。它的难点不是说理解原理和机制有多么的复杂，而在于如何编写配置。究其原因，在于文档庞杂，部分文档语焉不详，以及不同的配置项、插件可能会互相影响。

本 Repo 的目的，便是总结一些 Webpack 配置上的实践经验。以便后来人在学习使用 Webpack 的过程中可以少走一些弯路。通过可运行的 Demo，循序渐进地学习使用 Webpack 解决项目打包的具体需求。

> 所有示例在 `demo/` 文件夹中，包含可运行的配置和代码，以及 readme。  
> 不定期更新版本并重构

<!-- demo start -->

- [0 编译 JS 文件](demo/0-basic-single-js)
- [1 打包 HTML+JS](demo/1-basic-with-html)
- [2 dev-server 即时预览](demo/2-basic-dev-server-and-hot-reload)
- [3 打包 HTML+JS+CSS](demo/3-basic-html-js-css)
- [4 用 webpack-chain 重构打包配置](demo/4-webpack-chain)
- [5 用 TypeScript 重构打包配置](demo/5-refactor-config-with-ts)
- [6 Scss、Less、CSS](demo/6-more-style)
- [7 Babel 基本, 用 TypeScript 写业务代码](demo/7-babel-basic)
- [8 代码压缩配置](demo/8-minify-and-restructure-configs)
- [9 Dynamic Import](demo/9-dynamic-import)
- [10 [Let's]: Polyfill](demo/10-webpack-babel-polyfill-basic)
- [11 [Let's]: Polyfill + async](demo/11-polyfill-and-async)
- [12 [Let's]: Tree Shaking](demo/12-tree-shaking)
- [13 目前为止的功能\*（一）](demo/13-milestone-with-polyfill)
- [14 打包静态资源（如图片字体）](demo/14-pack-image)
- [15 React](demo/15-react)
- [16 Vue](demo/16-vue)
- [17 目前为止的功能\*（二）](demo/17-milestone-with-framework)
- [18 输出文件名、Vendor](demo/18-webpack-output-filename)

<!-- demo end -->

- TODO
  - Webpack
    - 提高编译速度

* TODO
  - alias
  - 编写 custom plugin

## 补充

如果你要为团队实现可配置的打包工作。  
可能会有这些注意点。

- 打包任务可以从命令行调用，也可以在代码中参数化调用。
- `createWebpackConfig(options)`
  - 为实现批量打包，可以设计带参数的配置生成函数，而不直接通过 `argv` 读取命令行参数。
- `simpleBundler(input, output, opts)`
  - 除了为整个项目打包，也可以写一个简单编译函数，诸如老项目中的局部代码库文件，支持编译 JS 和 CSS。
- `hashBurner(templates, patterns)`
  - 如果在你们的项目中，HTML 页面来源于 Django、Spring 等后端框架管理的非标准 HTML 文件，你可能需要手动处理模板中的资源引用路径（build 之后带了 hash）。（可能 HtmlWebpackPlugin 等插件无法满足需求）
- Log 信息
  - 打包所涉及的所有资源路径（用于项目清理分析）
  - 打包时间，当前配置（mode、watch 等），输入输出路径等友好的信息。
- 给其他开发人员设计的编译可选项
  - `slient`，批量编译的时候你应该不希望 console 疯狂输出太多信息
  - `hash`，是否给输出文件添加 hash
  - `polyfill`，对于 JS 是转义诸如 `[].flat` 这样的 API，对于 CSS 是 autoprefixer 功能
  - `clean`，模糊检测以前的打包文件并清除，比如文件名相同但 hash 不同。（和 CleanWebpackPlugin 区别开，只清除相关文件，并非清空整个目录）
- 运行环境的支持
  - 支持运行 TypeScript 编写的脚本：Webpack、Babel、Jest 等
  - 项目和脚本的 tsconfig、babel.config 等可以区别开。（毕竟项目可能要兼容 IE，但是跑编译任务应该不用）
  - Alias 统一化，从 `tsconfig.json` 中读取 `paths` 字段（路径映射配置项），转义成 Webpack、Babel、Jest 等不同工具支持的 alias 字段。拒绝到处复制粘贴。
  - 你编写脚本的代码可能也用了高级语法（比如可选链），如果你的部署环境是诸如 Node 10 等老版本，你可能还是需要 babel-node（语法 + Polyfill）
- 有这么多技术需求，要注意管理项目的文件夹结构，可以建一个 `scripts/` 文件夹

关于这些话题，我以后有机会另写文章详细展开。

## 参考资料

- [webpack-starter](https://github.com/seognil-lab/webpack-starter)：~~我很久之前做的，现在有点毛病，重构计划中~~ References 可以看看。
- [fe-workflow - 制定你自己的前端工作流](https://github.com/luoxue-victor/fe-workflow)
- [webpack-chain](https://github.com/neutrinojs/webpack-chain)

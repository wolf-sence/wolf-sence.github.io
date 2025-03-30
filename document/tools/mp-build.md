# 小程序构建工具: esbuild+sucrase+chokidar


## 基础概念的区分
* Parser: babel/esbuild/ts/swc/TS/uglify.js
* Transforme: babel/esbuild/swc/sucrase/TS
* Bundlers: webpack/rollup/esbuild/parcel

## 解决什么问题
* bundler将monorepo打包为了几个大的chunk，无法做hmr
* 多数rollup/webpack/vite对于monorepo无法有效的做单文件的hmr，只能统一全局rebuild

## 脚手架构建能力
* 使用esbuil转ts esm为js esm
* 使用sucrase转esm为cjs
* 最后使用chokidar做hmr热更新

### esbuild
* 基于go编写，多线程bundle效率相比js的工具提升一个数量级，
* 避免了js的运行时开销，类似用fs做文件io，用js解析ast，而esbuild直接将其编译为机器码然后转为ast
* 高效的内存管理和垃圾回收
* 避免了依赖node环境的api，直接调用底层系统的api如文件的io，使得这些操作更快
> 但是不提供hmr能力，且拆chunk能力极弱

### sucrase
作为做快的单文件转换工具，sucrase与传统的以ast为基础转义的工具不同，他以token即即词法单元为基础进行转译，避免了转ast的开销，极大的提升了效率
> 由于sucrase的版本老旧，对于许多ts语法都无法转译，所以会使用esbuild做前置转换

### chokidar
跨平台兼容/高性能可靠/以及丰富的社区支持

chokidar 的文件监听能力依赖于操作系统的文件系统事件通知机制（如果可用），或者通过轮询作为备选方案

#### 监听文件的原理


## 为什么没有使用其他脚手架
目标是提升开发效率，即提升构建速度，且解决hmr问题
* rollup/webpack都是基于js编写，受限于原生js的单线程问题，构建效率较慢
* webpack构建过程中大量的js解析和插件执行
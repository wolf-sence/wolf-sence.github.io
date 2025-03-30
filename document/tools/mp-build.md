# 小程序构建工具: esbuild+sucrase+chokidar


## 基础概念的区分
* Parser: babel/esbuild/ts/swc/TS/uglify.js
* Transforme: babel/esbuild/swc/sucrase/TS
* Bundlers: webpack/rollup/esbuild/parcel

## 脚手架构建能力
* 使用esbuil转ts esm为js esm
* 使用sucrase转esm为cjs
* 最后使用chokidar做hmr热更新

### esbuild的优点
基于go编写，多线程bundle效率相比js的工具提升一个数量级，
> 但是不提供hmr能力，且拆chunk能力极弱

### sucrase的优点
作为做快的单文件转换工具，sucrase与传统的以ast为基础转义的工具不同，他以token即即词法单元为基础进行转译，避免了转ast的开销，极大的提升了效率
> 由于sucrase的版本老旧，对于许多ts语法都无法转译，所以会使用esbuild做前置转换

### chokidar的优点

#### 监听文件的原理


## 为什么没有使用其他脚手架

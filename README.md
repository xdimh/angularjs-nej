## angularjs + NEJ.define + nej-build

为了能够是项目能够在使用angularjs框架的基础上，使用nej打包工具进行打包，模块依赖管理就不能够使用requirejs而需要使用nej本身的NEJ.define 进行模块化依赖管理。根据这个需求写了个demo。按照下面步骤可以运行起来。

### 1. 下载
`` git clone https://github.com/xdimh/angularjs-nej ``

### 2. 安装第三方库如jquery,angular,angular-route

`` bower install ``

### 3. 编译ftl文件本地进行测试

`` gulp `` 注意config.fmpp文件的配置

[参考基于gulp的前端Server](https://github.com/zjzhome/Gulp-Mock-Server)

### 4. 起一个本地服务

`` puer ``

[参考puer]()

然后访问statichtml/introduction/index.html 查看结果。
![打包前](http://7oxjbb.com1.z0.glb.clouddn.com/before-deploy.jpg)


demo中的代码比较简单
![目录结构](http://7oxjbb.com1.z0.glb.clouddn.com/directory.jpg)

js中是一些js文件，包括angular路由配置定义，模块定义，控制器定义，tpl目录下是一些ftl模板文件，modules下是一些页面片段html。

### 5.打包输出
`` cd deploy `` 
`` nej-build release-admin.conf ``
执行特定的打包配置文件针对admin项目进行打包。

```
DIR_WEBROOT        = ../
# 项目HTML文件根路径，默认为DIR_WEBROOT配置信息
DIR_SOURCE        = ./src/admin/modules/
# 输入HTML文件子目录配置，多个目录用逗号或者分号分隔，如果是相对路径相对于DIR_SOURCE配置
#DIR_SOURCE_SUB    = ./a/,./b/,./c/
# 打包输出路径，默认为DIR_WEBROOT配置信息
DIR_OUTPUT        = ./pub/
# 静态文件输出目录，默认为DIR_OUTPUT配置信息
DIR_OUTPUT_STATIC = ./cjs/
# 项目服务器端模板文件根路径
# 服务器端模板文件确保页面所需的CSS、JS文件的引用均出现在模板文件中
DIR_SOURCE_TP      = ./src/admin/tpl/
# 输入服务器端模板文件子目录配置，多个目录用逗号或者分号分隔，如果是相对路径相对于DIR_SOURCE_TP配置
#DIR_SOURCE_TP_SUB = ./wap/
# 项目服务器端模板输出路径，默认为DIR_SOURCE_TP配置信息
DIR_OUTPUT_TP      = ./tpl/
# 静态资源路径，默认为WEB根路径下的res目录，
# 此目录下的资源在打包输出时会做以下调整
# × 页面中指向此目录下的路径会根据输出情况做相应调整
DIR_STATIC         = ./src/admin/res/
NEJ_DIR           = ./lib/nej/src
```
打包配置文件中的一些配置，文件本身有比较详细的解释，打包配置主要是根据自己的项目进行路径的配置。DIR_SOURCE 指定html文件的输入目录，输出目录是./pub/ 其他类似，打包完后新的ftl为自己修改引用路径。打包完成后修改config.fmpp 中的ftl模板路径为打包后的路径，编译后在本地查看http://localhost:8000/statichtml/introduction/index.html
![打包后](http://7oxjbb.com1.z0.glb.clouddn.com/after-deploy.jpg)
# ddlisting天天列表

主页：[http://www.ddlisting.com](http://www.ddlisting.com)

ddlisting的主旨是：**天天清，天天轻**。
<p>&nbsp;&nbsp;&nbsp;&nbsp;
通过分割，把一件复杂的事情简化成一件件小todo项，积小成大，最终达到完成复杂事情的目的。
</p>

# 项目设计

### 目录说明

#### 项目主要目录

![目录说明](http://i1.piimg.com/24f27a93697325f9.jpg "目录说明")

* adapters 项目适配器目录，链接firebase设置
* components 组件目录，首页代码拆分成一个个组件
* controllers 控制器目录
* helpers 自定义助手目录
* models 模型目录，项目使用的model有user、group、project、todo-item、comment
* routes 项目路由目录
* style 项目样式，暂时没用到
* templates 模板目录
* app.js 项目初始化配置文件
* index.html  引入外部静态库
* router.js 所有路由都定义再此
* config 项目配置，目前只配置了firebase
* public 静态资源存放目录，包括自定义js、CSS、image
* ember-cli-build.js  引入第三方库，比如bootstrap
* dist 项目静态资源编译之后存放目录


### 数据库设计

数据库设计与model是一一对应的，各个model之间的关系如下图：
![数据库设计图](http://i1.piimg.com/5c6d2a1163149875.png '数据库设计图')
如需调整请直接到[processOn](https://www.processon.com/diagraming/5630f4e0e4b01f46a2b3477d)修改。

### APP功能简介
APP功能简介请看[Wiki介绍](https://github.com/ubuntuvim/todos_v2/wiki)。

### 分支说明
1. 2015-11-26，增加了登录功能，功能的实现使用插件[ember-simple-auth](https://github.com/simplabs/ember-simple-auth)。此功能提交到分支HEAD中，之前的版本仍然在master分支。
2. 2015-12-11，合并了HEAD分支到master，并且在此版本中完成了登录、注册、APP简介等功能，其中后台数据处理使用nodejs+MySQL(后台处理代码也放在[github](https://github.com/ubuntuvim/todos_server_v2))。下一版本计划把所有的数据都保存到本地MySQL，不放firebase上了，太慢了！！
3. 2015-02-24，上线第一版。满足最基本的功能。

#项目运行环境配置

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [Ember CLI](http://ember-cli.com/user-guide)版本为1.13。**如果是用高版本的Ember CLI编译项目可能会出现问题！**

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)


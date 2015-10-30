# ddlisting天天列表
主页：[http://www.ddlisting.com](http://www.ddlisting.com)

ddlisting的主旨是：**大事化小，小事化了**。
<p>&nbsp;&nbsp;&nbsp;&nbsp;通过分割，把一件复杂的事情简化成一件件小todo项，积小成大，最终达到完成复杂事情的目的。
</p>
# 项目设计

### 目录说明
#### 项目主要目录
![目录说明](http://i11.tietuku.com/24f27a93697325f9.jpg "目录说明")

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

#### 组件目录
![组件目录](http://i11.tietuku.com/edc1f686a9f0500e.jpg "组件目录")

* left-menu.hbs left-menu.js  左侧菜单
* logo-tag.hbs logo-tag.js  APP logo设置页面
* main-content.hbs main-content.js  APP主要内容区（中间部分）
* refresh-self.hbs refresh-self.js  刷新本页面
* right-item-panel.hbs right-item-panel.js  点击todo项的“编辑”按钮，右侧显示详细设置页面
* search-tool.hbs search-tool.js  顶部查询框
* tip-msg.hbs  tip-msg.js  右上角工具栏


### 数据库设计
数据库设计与model是一一对应的，各个model之间的关系如下图：
![数据库设计图](http://i11.tietuku.com/5c6d2a1163149875.png '数据库设计图')
如需调整请直接到[processOn](https://www.processon.com/diagraming/5630f4e0e4b01f46a2b3477d)修改。

### APP 首页
APP界面与功能说明如下：
![首页界面1](http://i11.tietuku.com/0f6ecd8c09a00e73.jpg)

* 1位置包含了三个功能：点击左边的图标可以关闭左侧的项目列表、点击中间的图标可以刷新本页面、右边是搜索框
* 2位置是项目列表，气泡中的数字是项目中的todo数量，左边的数组是未完成的todo数目、右边的数字是本项目下总的todo项数目
* 3位置是新增todo项目输入框，输入内容后按enter(Mac是return)键保存 
* 4位置是最新未完成的todo项，在3位置新增的todo项会显示最前面
* 5位置是操作每个todo项的按钮菜单，星星图标标记此todo是重要项；中间的图标是编辑，点击这个图标会在页面的右侧展开详细设置页面（如图1-2所示）；右边的图片是删除本todo项。删除的todo可以从回收站恢复。
* 6位置是系统消息提示，点击喇叭图标可以展开查看详细的消息，如图1-3所示
* 7位置是个人中心，点击用户名可以展开如图1-4所示的界面


图1-2 todo项详细设置
![图1-2](http://i11.tietuku.com/192c481d05ad8512.jpg)

* 点击1位置可以展收起来的左侧项目列表
* 2位置 设置todo项
* 3位置关闭设置面板的按钮


图1-3 系统消息
![图1-3](http://i11.tietuku.com/d4e21fa3882817b6.jpg)

* 点击1位置可以关闭展开的消息提示面板
* 2位置显示各个系统消息


图1-4 个人中心
![图1-4](http://i11.tietuku.com/9b2f1313be397864.jpg)

* 点击1位置关闭展开的设置面板
* 2位置可以设置APP主题背景、点击个人中心可以进入个人中心详细信息页面、点击“退出”可以退出登录用户

#项目运行环境配置

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

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


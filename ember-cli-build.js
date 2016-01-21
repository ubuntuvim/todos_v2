/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import("bower_components/bootstrap/dist/js/bootstrap.js");
  app.import("bower_components/bootstrap/dist/css/bootstrap.css");
  //  导入bootstrap checkbox组件
  //  https://github.com/flatlogic/awesome-bootstrap-checkbox
  app.import("bower_components/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css");
  app.import("bower_components/jquery-validation/dist/jquery.validate.js");
  app.import("bower_components/jquery-validation/src/localization/messages_zh.js");


  // app.import("vendor/fonts/font-awesome.css");
  // app.import("vendor/css/jquery.mmenu.all.css");
  // app.import("vendor/css/minimal.css");
  // app.import("vendor/css/login.css");
  // //介绍页面样式
  // app.import("vendor/css/intro/font_lato_default.css");
  // app.import("vendor/css/intro/main.css");
  // app.import("vendor/css/todos.css");

  // app.import("vendor/js/jquery.mmenu.min.js");
  // app.import("vendor/js/jquery.nicescroll.min.js");
  // app.import("vendor/js/minimal.min.js");
  // app.import("vendor/js/todos.js");
  // app.import("");
  // app.import("");
  // app.import("");
  // app.import("");

  //
  // app.import("bower_components/jQuery_mmenu/dist/core/css/jquery.mmenu.all.css");
  // app.import("bower_components/jQuery_mmenu/dist/core/js/jquery.mmenu.min.all.js");


  return app.toTree();
};

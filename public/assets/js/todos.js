$(function(){

  // 设置已经完成的todo项目的样式：给文件加中划线，颜色变浅
  $('#todolist > li > div > label').click(function() {
    $(this).toggleClass('done');
  });

  //  根据顶部左部的按钮显示气泡信息
  $("#navbar").click(function() {
    if ($(this).hasClass('collapsed')) {  //折叠状态
      $('body .navbar .navbar-nav.side-nav > li.navigation .menu > li > a > span').hide();
    } else {
      $('body .navbar .navbar-nav.side-nav > li.navigation .menu > li > a > span').show();
    }
  });
   

  //weather icons
  // var icons = new Skycons({"color": "white"});
  // icons.set("clear-day", Skycons.CLEAR_DAY);
  // icons.play();

  //owl carousel
  // $("#owl-example").owlCarousel({
  //   singleItem: true,
  //   autoPlay: true,
  //   navigation: true,
  //   slideSpeed: 400,
  //   paginationSpeed: 500,
  //   navigationText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>']
  // });

  //load wysiwyg editor
  // $('#quick-message-content').summernote({
  //   toolbar: [
  //     //['style', ['style']], // no style button
  //     ['style', ['bold', 'italic', 'underline', 'clear']],
  //     ['fontsize', ['fontsize']],
  //     ['color', ['color']],
  //     ['para', ['ul', 'ol', 'paragraph']],
  //     ['height', ['height']],
  //     //['insert', ['picture', 'link']], // no insert buttons
  //     //['table', ['table']], // no table button
  //     //['help', ['help']] //no help button
  //   ],
  //   height: 295   //set editable area's height
  // });

  //multiselect input
  // $(".chosen-select").chosen({disable_search_threshold: 10});
  // $("body").click(function(){
  //   $('#content').removeClass('main-with-from-open-right-panel');
  // }

  ///////////// 展开右侧列表项的详细设置框之后，点击右上角的 “X”按钮关闭这个面板
  $("#right-panel-title-close").click(function(){
    $('#content-main').removeClass('main-with-from-open-right-panel');
    $('html').removeClass('mm-right mm-next mm-opened mm-opening');
    $('#mmenu').removeClass('mm-current mm-opened');
  });
  $('#content-main').click(function() {
    return false;
  });

  //  点击todo项设置为完成状态，修改列表前面的选择框为打钩状态
  // $("").click(function() {

  // });
  
  // 点击回收站，从页面底部向上展开一个列表，显示可以恢复的数据
  // $("#trash-list").mmenu({
  //    offCanvas: {
  //       position  : "bottom",
  //       zposition : "front"
  //    }
  // });
  $("#trash-tool").click(function() {
    $("#trash-list").slideToggle();
  });

  $("#close-trash-list").click(function() {
    $("#trash-list").slideToggle();
  });

  // $('#loginButton').on('click', function () {
  //   var $btn = $(this).button('loading')
  //   // business logic...
  //   $btn.button('reset')
  // })

  $('#loginButton').on('click', function () {
    $("#loginPageTip").show();  
  });
  
  /**
   * 点击登录之后在登录页面顶部显示一个进度条，以示正在登录，
   * @param  loginButton 触发按钮的id
   * @return {[type]}           [description]
   */
  // $("#loginButton").click(function() {
  //       // create the notification
  //       var notification = new NotificationFx({
  //         message : '请输入用户名',
  //         layout : 'bar',
  //         effect : 'exploader',
  //         ttl : 9000000,
  //         type : 'notice', // notice, warning or error
  //         onClose : function() {  // 点击进度条右边的关闭按钮会触发这个事件
  //           console.log('close...');
  //         }
  //       }).show();
  //   });

});  // function() {}


/**
 * 点击列表项 的编辑按钮，在右侧显示输入框
 * @return {[type]} [description]
 */
function toggleShowRightPanel() {
  $('html').addClass('mm-right mm-next mm-opened mm-opening');
  $('#mmenu').addClass('mm-current mm-opened');
  $('#content-main').addClass('main-with-from-open-right-panel');
}

function test(v) {
  console.log('selected = ' + v);
}

//  当鼠标移到列表上，显示列表的工具图标
function showToolsIcon(self) {
  //  设置显示todo项前面的钩钩 
  // $($($($(self).children()[0]).children()[0]).children()[0]).css("opacity", '1');
  for (var i = 2; i <= 4; i++) {
    $($($(self).children()[0]).children()[i]).show();
  }
}

//  当鼠标从列表上移开，隐藏列表的工具图标
function hideToolsIcon(self) {
  //  隐藏（通过设置透明）todo项前面的钩钩 
  // $($($($(self).children()[0]).children()[0]).children()[0]).css("opacity", '0');
  for (var i = 2; i <= 4; i++) {
    $($($(self).children()[0]).children()[i]).hide();
  }
}



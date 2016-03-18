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


//  当鼠标移到列表上，显示列表的工具图标
function showToolsIcon(self) {
  //  设置显示todo项前面的钩钩
  $(self).children('div').children('.todo-list-common').each(function() {
      $(this).show();
  });
  $(self).children('div').children("a").children('.todo-list-common').show();
  // 隐藏创建时间
  $(self).children('div').children('.todo-create-date').each(function() {
      $(this).hide();
  });
}

//  当鼠标从列表上移开，隐藏列表的工具图标
function hideToolsIcon(self) {
  //  隐藏（通过设置透明）todo项前面的钩钩
  $(self).children('div').children('.todo-list-common').each(function() {
      $(this).hide();
  });
  $(self).children('div').children("a").children('.todo-list-common').hide();
  // 隐藏创建时间
  $(self).children('div').children('.todo-create-date').each(function() {
      $(this).attr("top","0").show();
  });
}


// 设置被点击的菜单图标为edit，设置时候要先重置所有菜单图标为fa-list，在设置被点击的菜单为fa-edit
function setIcon(self) {
    //  重置所有的菜单图标
    $(".li-selector > a > i").each(function(index) {
        //  第一个是默认的分类不需要设置
        if (0 !== index) {
            $(this).removeClass("fa-edit zoomIn");
        }
    });
    var child0 = $(self).children()[0];
    if ("myTodos" !== self.id) {
        $(child0).addClass("fa-edit");
        $(child0).addClass('animated zoomIn');
    }
    // 重置选中状态
    $(".li-selector").each(function() {
        $(this).removeClass("active");
    });
    //  获取被点击a标签的父元素
    var parent0 = $(self).parent();
    $(parent0).addClass("active");
}

// 鼠标移动到右侧TODO设置面板的关闭按钮上的效果
function addRotate(self) {
    $(self).addClass('animated rotateIn');
}
function removeRotate(self) {
    $(self).removeClass('animated rotateIn');
}
// 鼠标移动到子任务上时在右侧显示删除按钮
function showRemoveIcon(self) {
    $(self).children('div').children("span").show();
}
// 鼠标移开子任务上时隐藏右侧的删除按钮
function hideRemoveIcon(self) {
    $(self).children('div').children("span").hide();
}
// 点击编辑按钮设置当前todo为选中状态：设置背景色
function setLiBg(self) {
    //  清楚原来选中的TODO项的背景色
    $("#todolist").children('li').each(function() {
        $(this).removeClass('todos-list-bg');
    });
    //  再设置当前选中的todo项的背景色
    $(self).parent().parent().parent().addClass('todos-list-bg');
}

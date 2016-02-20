// app/controllers/index.js

import Ember from 'ember';

// import config from '../config/environment';

/**
 * 处理界面的action
 */
export default Ember.Controlle.extend({

    session: Ember.inject.service('session'),
	//  查询，根据title值查询
    queryParams: ['queryValue', 'projCode', 'recordStatus'],
    queryValue: null,
    projCode: 'myTodos',
    //todo项状态recordStatus：1-未完成（新增）；2-完成；3-删除（放到回收站可恢复）；4-完全删除（不可恢复）
    recordStatus: '1',  //默认显示未完成
    userId: null,

	//  获取Store中所有的todo-item数据
	todosForTotla: Ember.computed(function() {
      return this.store.findAll('todo-item');
  	}),

    // 不显示子任务
    noShowSubTodoList: Ember.computed('todosForTotla.@each.isChildOrParent', function() {
        return this.get('todosForTotla').filter(function(td) {
            return td.get('isChildOrParent') !== 1 && td.get('isChildOrParent') !== 2;
        });
    }),

    // 过滤其他用户，只显示当前登录用户的数据
    todosFilterByUserId: Ember.computed('noShowSubTodoList.@each.user', function() {
        var userId = this.getUserIdFromSession();
        return this.get('noShowSubTodoList').filterBy('user', userId);
    }),

    // 根据选中左侧的分类过滤
    classifyList: Ember.computed('todosFilterByUserId.@each.project','todosFilterByUserId', 'projCode', function() {
        var pc = this.get('projCode');
        var todos = this.get('todosFilterByUserId');
        if (pc) {
            return todos.filterBy('project', pc);
        } else {
            return todos;
        }
    }),

    //  根据是否完成过滤 ember-data 2.0后的版本filterBy方法作为插件的方式支持
    //  并且使用在计算属性时候computed方法的参数有些不同了，需要指定过滤的属性
    completedList: Ember.computed('classifyList.@each.recordStatus','recordStatus', function() {

	  var recordStatus = this.get('recordStatus');
	//   console.log('recordStatus = ' + recordStatus);
      var todo = this.get('classifyList');  //  获取所有的todo-item

      //  直接根据模板设置的过滤条件过滤数据
      if ('1' === recordStatus) {  //

      	this.set('showNCAll', true);  //设置点击的按钮为激活状态
      	this.set('showCAll', false);  // 另外两个设置为非激活
      	this.set('showAll', false);  //

        return todo.filterBy('recordStatus', parseInt(recordStatus));
        // return todo.filter(function(td) {
        //     return td.get('recordStatus') === 1 || td.get('recordStatus') === '1';
        // });

      } else if ('2' === recordStatus)  {  //

      	this.set('showNCAll', false);  //设置点击的按钮为激活状态
      	this.set('showCAll', true);  //
      	this.set('showAll', false);  //另外两个设置为非激活

      	return todo.filterBy('recordStatus', parseInt(recordStatus));

      } else if ('3' === recordStatus) {

      	// 删除状态，但是可以恢复
      	return todo.filterBy('recordStatus', parseInt(recordStatus));

      } else if ('4' === recordStatus) {
      	// 删除状态，不可恢复
      	return todo.filterBy('recordStatus', parseInt(recordStatus));

      } else {  //  显示飞删除状态数据

      	this.set('showNCAll', false);  //
      	this.set('showCAll', false);  // 另外两个设置为非激活
      	this.set('showAll', true);  //设置点击的按钮为激活状态

      	return todo.filter(function(td) {
            return td.get('recordStatus') === 1 || td.get('recordStatus') === 2;
        });
      }

    }),

    // 查询，返回的todos查询的数据
    queryFilterTodo: Ember.computed('queryValue', 'completedList', function() {
      var queryValue = this.get('queryValue');
    //   console.log('queryValue = ' + queryValue);
      var todo = this.get('completedList');
      if (queryValue) {

           return todo.filter(function(td) {
        	  //  通过判断包含的方式实现模糊查询效果
      	      return td.get('title').indexOf(queryValue) !== -1;
           });
       } else {
           return todo;
      }

    }),

	// using a custom sort function
	// http://emberjs.com/api/classes/Ember.computed.html#method_sort
	orderByCreateTime: Ember.computed.sort('queryFilterTodo', function(a, b){

	  // 比较创建的时间，新创建的排最后
	  if (a.timestamp > b.timestamp) {
		  return 1;
	  } else if (a.timestamp < b.timestamp) {
	    return -1;
	  }

	  return 0;
	}),

    //  排序设置，形成排序链，todos查询 --> orderByCreateTime(创建时间升序)  --> orderByStarStatusFromList(根据星号标记降序)
    // using standard ascending sort
    orderField: ['star:desc'],
    orderByStarStatusFromList: Ember.computed.sort('orderByCreateTime', 'orderField'),

	// 获取删除状态的todo数据
	delRecordList: Ember.computed('todosForTotla', function() {
		var todo = this.get('todosForTotla');
		return todo.filterBy('recordStatus', 3);
	}),

	//  获取未完成的todo数量，不分类型，只要是登录用户的都显示
	noCompletedTodoCount: Ember.computed('classifyList.@each.recordStatus', function() {
      return this.get('classifyList').filterBy('recordStatus', 1).get('length');
    }),
	//  获取已经完成的todo数量，不分类型，只要是登录用户的都显示
	completedTodoCount: Ember.computed('classifyList.@each.recordStatus', function() {
      return this.get('classifyList').filterBy('recordStatus', 2).get('length');
    }),
    //  获取设置为删除状态3的todo数量，可恢复，不分类型，只要是登录用户的都显示
	recoverableTodoCount: Ember.computed('classifyList.@each.recordStatus', function() {
      return this.get('classifyList').filterBy('recordStatus', 3).get('length');
    }),
    notRecoverableTodoCount: Ember.computed('classifyList.@each.recordStatus', function() {
        return this.get('classifyList').filter(function(td) {
            return td.get('recordStatus') === 1 || td.get('recordStatus') === 2;
        });
    }),
    //  获取todo总数量，不分类型，只要是登录用户的都显示
	todoTotlaCount: Ember.computed('notRecoverableTodoCount', function() {
      return this.get('notRecoverableTodoCount').get('length');
    }),
    loadingMaskFlag: Ember.computed('orderByStarStatusFromList', function() {
        var v = this.get('orderByStarStatusFromList');
        if (v) {
            return true;
        } else {
            return false;
        }
    }),

	actions: {
		//  新建todo
		createNewTodoItem: function() {
			var title = this.get('title');
            var userId = this.getUserIdFromSession();
            var project = this.get('projCode');
            // 如果未选中任何分类默认放在"我的Todo"分类中
            if (Ember.isEmpty(project)) {
                project = "myTodos";
            }

			var todoItem = this.store.createRecord('todo-item', {
				title: title,
			    checked: false,
			    timestamp: new Date().getTime(),
			    star: false,
			    recordStatus: 1,  //todo项状态：1-未完成（新增）；2-完成；3-删除（放到回收站可恢复）；4-完全删除（不可恢复）
			    startDate: new Date(),  //任务开始时间
			    endDate: new Date(),  //任务结束时间
			    isPublish: 1,  //是否公开：1-公开(任何人都可以看到)；0-不公开(自己看)

			    // 这些关系属性暂时还没有，后面完善之后再添加关联关系
			    // ,childTodos: null,  //如果当前todo有子todo则这个属性指向子todo
			    // parentTodo: null,  //如果当前todo是子todo则这个属性指向自己的父todo
			    user: userId,
			    // comments: null,
			    project: project  //所属项目
			});
			todoItem.save();
			//  清空页面值
			this.set('title', "");
		},
		//  完成todo
		completedTodoItem: function(param) {

			// 修改本todo的完成状态
            var _this = this;
		    this.store.findRecord('todo-item', param).then(function(todo) {
				if (todo.get('checked')) {
					todo.set('checked', false);
					todo.set('recordStatus', 1);  //设置为未完成状态
				} else {
					todo.set('checked', true);
					todo.set('recordStatus', 2);  //设置为完成状态
				}
				_this.updateById(param, todo);
				// todo.save();
			});
		},
		//  修改星号状态，todo列表以星号状态排序，有星号的排前面
		changeStarStatus: function(params) {
            var _this = this;
			this.store.findRecord('todo-item', params).then(function(todo) {
				if (todo.get('star')) {
					todo.set('star', false);
				} else {
					todo.set('star', true);
				}
				// todo.save();

				_this.updateById(params, todo);
			});
		},

		//  设置过滤条件为参数值
		showByCondition: function(params) {
			this.set('recordStatus', params);
		},
		//  删除todo，改变状态并不是真的删除.recordStatus->3
		remoteTodoItem: function(params) {

			this.store.findRecord('todo-item', params).then(function(todo) {
				todo.set('recordStatus', 3);  //改变todo的状态为3，删除状态
				todo.save();
			}, function(error) {
				console.log('删除失败！['+error+']');
			});
		},
		recoveryTodoItem: function(params) {
			// 撤销删除
			this.store.findRecord('todo-item', params).then(function(todo) {
				todo.set('recordStatus', 1);  //撤销删除为未完成
				todo.set('checked', false);
				todo.save();
			}, function(error) {
				console.log('撤销删除失败！['+error+']');
			});
		},
        //  这个方法是在left-menu.hbs中触发，
        // 详情请参考：http://emberjs.com/api/classes/Ember.Component.html#method_send
        setProjCoce: function(data) {
            //  修改分类参数
            this.set('projCode', data);
        },
        // 显示TODO的编辑面板
        toggleShowRightPanel: function(params) {
            console.log('index params ', params);
            var obj = Ember.$("#right-panel-id");
            if (obj.hasClass("fadeInRight")) {  //  如果展开状态
                obj.removeClass("fadeInRight");
                obj.show().addClass('animated fadeOutRight');  //
            } else {
                obj.removeClass("fadeOutRight");
                obj.show().addClass('animated fadeInRight');
            }
            // 设置选中的TODO数据设置到表单上
            var todo = this.store.peekRecord('todo-item', params);
            //  设置标题
            Ember.$("#edit-todo-title-div").html(todo.get('title'));
            // this.set('todoTitleValueFromIndex', todo.get('title'));
            Ember.$("#todoId").val(todo.get('id'));
            Ember.$("#projCodeId").val(todo.get('project'));

        }
	},  //end actions
	/**
	 * 更新todo
	 * @param  {[type]} param [todo的id]
	 * @param  {[type]} todo  [model名称]
	 * @return {[type]}       [void]
	 */
	updateById: function(param, todo) {
		todo.save();
		// var _this = this;
  //       Ember.$.ajax({
  //           url: config.apiBaseUrl + '/todo-item/update/'+param,
  //           type: 'POST',
  //           data: JSON.stringify(todo),
  //           contentType: 'application/json;charset=utf-8',
  //           dataType: 'json'
  //       }).then(function(response) {
  //       	// Ember.run(null, resolve, response);
  //       	// console.log('response = ' + response);
  //       	// _this.store.pushPayload(todo);
  //       }, function(xhr, status, error) {
  //       	// Ember.run(null, reject, xhr);
  //       });
	},
    getUserIdFromSession: function() {
        return this.get('session').get('data').authenticated.uid;
    }
});

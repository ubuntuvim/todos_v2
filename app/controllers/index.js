// app/controllers/index.js

import Ember from 'ember';
// import filterByQuery from 'ember-cli-filter-by-query/util/filter';

import config from '../config/environment';

/**
 * 处理界面的action
 */
export default Ember.Controller.extend({
	//  查询，根据title值查询
    queryParams: ['queryValue', { recordStatus: 'recordStatus', refreshModel: true }],
    queryValue: '',
    //todo项状态recordStatus：1-未完成（新增）；2-完成；3-删除（放到回收站可恢复）；4-完全删除（不可恢复）
    recordStatus: 'all',  //默认显示未完成

    //  根据是否完成过滤
    completedList: Ember.computed('recordStatus', 'model', function() {

	  var recordStatus = this.get('recordStatus');
	  // console.log('recordStatus = ' + recordStatus);
      var todo = this.get('model');

      //  直接根据模板设置的过滤条件过滤数据
      if (1 === recordStatus) {  //
      	this.set('recordStatus', 'xxx');
      	this.set('showNCAll', true);  //设置点击的按钮为激活状态
      	this.set('showCAll', false);  // 另外两个设置为非激活
      	this.set('showAll', false);  //
      	// store.filter('post', { unread: true }, function(post) {
      	this.set('recordStatus', recordStatus);
      	console.log('recordStatus >> = ' + this.get('recordStatus'));


        return todo.filterBy('recordStatus', 1);

      } else if (2 === recordStatus)  {  //

      	this.set('showNCAll', false);  //设置点击的按钮为激活状态
      	this.set('showCAll', true);  //
      	this.set('showAll', false);  //另外两个设置为非激活

      	return todo.filterBy('recordStatus', 2);

      } else if (3 === recordStatus) {

      	// 删除状态，但是可以恢复
      	return todo.filterBy('recordStatus', 3);

      } else if (4 === recordStatus) {
      	// 删除状态，不可恢复
      	return todo.filterBy('recordStatus', 4);

      } else if ('all' === recordStatus) {  //  全部数据

      	this.set('showNCAll', false);  //
      	this.set('showCAll', false);  // 另外两个设置为非激活
      	this.set('showAll', true);  //设置点击的按钮为激活状态

      	return todo;
      } else { 
      	todo.filterBy('recordStatus', 1);
      	this.set('showNCAll', true);  //设置点击的按钮为激活状态
      	this.set('showCAll', false);  // 另外两个设置为非激活
      	this.set('showAll', false);  //

      	return todo;
      	// return todo.filterBy('recordStatus', 1);
      }
    }),

    // 查询，返回的todos查询的数据
    queryFilterTodo: Ember.computed('queryValue', 'completedList', 'recordStatus', function() {
      var queryValue = this.get('queryValue');
      // console.log('queryValue = ' + queryValue);
      var todo = this.get('completedList');
      var recordStatus = this.get('recordStatus');
      console.log('recordStatus = ' + recordStatus);
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


    // testTodo: filterByQuery( 'todo-item', ['title'], 'query'),

	//  获取Store中所有的todo-item数据
	todosForTotla: Ember.computed(function() {
      return this.store.findAll('todo-item');
  	}),
	// 获取删除状态的todo数据
	delRecordList: Ember.computed('todosForTotla', function() {
		var todo = this.get('todosForTotla');
		return todo.filterBy('recordStatus', 3);
	}),

	//  获取未完成的todo数量
	noCompletedTodoCount: Ember.computed('todosForTotla.@each.recordStatus', function() {
      return this.get('todosForTotla').filterBy('recordStatus', 1).get('length');
    }),
	//  获取已经完成的todo数量
	completedTodoCount: Ember.computed('todosForTotla.@each.recordStatus', function() {
      return this.get('todosForTotla').filterBy('recordStatus', 2).get('length');
    }),
    //  获取设置为删除状态3的todo数量，可恢复
	recoverableTodoCount: Ember.computed('todosForTotla.@each.recordStatus', function() {
      return this.get('todosForTotla').filterBy('recordStatus', 3).get('length');
    }),
    //  获取todo总数量
	todoTotlaCount: Ember.computed('todosForTotla.@each.recordStatus', function() {
      return this.get('todosForTotla').get('length');
    }),

	actions: {
		//  新建todo
		createNewTodoItem: function() {
			var title = this.get('title');
			var todoItem = this.store.createRecord('todo-item', {
				title: title,
			    checked: false,
			    timestamp: new Date().getTime(),
			    star: false,
			    recordStatus: 1,  //todo项状态：1-未完成（新增）；2-完成；3-删除（放到回收站可恢复）；4-完全删除（不可恢复）
			    startDate: new Date(),  //任务开始时间
			    endDate: new Date(),  //任务结束时间
			    isPublish: 1  //是否公开：1-公开(任何人都可以看到)；0-不公开(自己看)

			    // 这些关系属性暂时还没有，后面完善之后再添加关联关系
			    // ,childTodos: null,  //如果当前todo有子todo则这个属性指向子todo
			    // parentTodo: null,  //如果当前todo是子todo则这个属性指向自己的父todo
			    // user: null,
			    // comments: null,
			    // project: null  //所属项目
			});
			todoItem.save();
			//  清空页面值
			this.set('title', "");
		},
		//  完成todo
		completedTodoItem: function(param) {
            console.log('param >>> ' + param);
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
			console.log('delete.....');
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
		}

	}  //end actions
	/**
	 * 更新todo
	 * @param  {[type]} param [todo的id]
	 * @param  {[type]} todo  [model名称]
	 * @return {[type]}       [void]
	 */
	,updateById: function(param, todo) {
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
	}
});

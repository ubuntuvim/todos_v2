import Ember from 'ember';
// import filterByQuery from 'ember-cli-filter-by-query/util/filter';

/**
 * 处理界面的action
 */
export default Ember.Controller.extend({
	//  查询，根据title值查询
    queryParams: ['queryValue'],
    queryValue: '',

    // 查询，返回的todos是经错查询的数据
    todos: Ember.computed('queryValue', 'model', function() {
      var queryValue = this.get('queryValue');
      var todo = this.get('model');
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
	orderByCreateTime: Ember.computed.sort('todos', function(a, b){
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
    todosSorting: ['star:desc'],
    orderByStarStatusFromList: Ember.computed.sort('orderByCreateTime', 'todosSorting'),


    // testTodo: filterByQuery( 'todo-item', ['title'], 'query'),

	//  获取Store中所有的todo-item数据
	todosForTotla: Ember.computed(function() {
      return this.store.peekAll('todo-item');
  	}),
	//  获取未已经完成的todo数量
	completedTodoCount: Ember.computed('todosForTotla.@each.checked', function() {
      return this.get('todosForTotla').filterBy('checked', true).get('length');
    }),
    //  获取todo总数量
	todoTotlaCount: Ember.computed('todosForTotla.@each.checked', function() {
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
			// 修改本todo的完成状态
			this.store.findRecord('todo-item', param).then(function(todo) {
				if (todo.get('checked')) {
					todo.set('checked', false);		
				} else {
					todo.set('checked', true);
				}
			  	todo.save();
			});

		},
		//  修改星号状态，todo列表以星号状态排序，有星号的排前面
		changeStarStatus: function(params) {
			this.store.findRecord('todo-item', params).then(function(todo) {
				if (todo.get('star')) {
					todo.set('star', false);
				} else {
					todo.set('star', true);
				}
				todo.save();
			});
		}


	}  //end actions 	
});

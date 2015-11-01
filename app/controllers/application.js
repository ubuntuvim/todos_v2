import Ember from 'ember';

/**
 * 处理界面的action
 */
export default Ember.Controller.extend({
	//  获取Store中所有的todo-item数据
	todos: Ember.computed(function() {
      return this.store.peekAll('todo-item');
  	}),

    // filteredPosts: Ember.computed('posts.@each.isPublished', function() {
    //   return this.get('posts').filterBy('isPublished');
    // })
	//  获取未已经完成的todo数量
	noCompletedTodoCount: Ember.computed('todos.@each.checked', function() {
      return this.get('todos').filterBy('checked', false).get('length');
    }),
    //  获取todo总数量
	todoTotlaCount: Ember.computed('todos.@each.checked', function() {
      return this.get('todos').get('length');
    }),

	actions: {
		//  新建todo
		createNewTodoItem: function() {
			var title = this.get('title');
			var todoItem = this.store.createRecord('todo-item', {
				title: title,
			    checked: false,
			    timestamp: new Date().getTime(),
			    star: true,
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

		}
	}  //end actions 	
});

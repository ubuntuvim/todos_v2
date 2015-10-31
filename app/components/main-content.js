import Ember from 'ember';

/**
 * 中间内容区
 */
export default Ember.Component.extend({
	classNames: ['col-md-12'],
	attributeBindings: ['id'],
	id: 'content',
	actions: {
		createNewTodoItem: function() {
			var title = this.get('title');
			var todoItem = this.store.createRecord('todo-item', {
				title: title,
			    checked: true,
			    timestamp: new Date().getTime(),
			    star: true,
			    recordStatus: 1,  //todo项状态：1-未完成（新增）；2-完成；3-删除（放到回收站可恢复）；4-完全删除（不可恢复）
			    startDate: new Date(),  //任务开始时间
			    endDate: new Date(),  //任务结束时间
			    isPublish: 1,  //是否公开：1-公开(任何人都可以看到)；0-不公开(自己看)

			    childTodos: null,  //如果当前todo有子todo则这个属性指向子todo
			    parentTodo: null,  //如果当前todo是子todo则这个属性指向自己的父todo
			    user: null,
			    comments: null,
			    project: null  //所属项目
			});
			todoItem.save();
			//  清空页面值
			this.set('title', "");
		}
	}
});

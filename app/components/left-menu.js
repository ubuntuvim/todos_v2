import Ember from 'ember';

export default Ember.Component.extend({

	classNames: ['nav navbar-nav side-nav'],
	attributeBindings: ['id'],
	tagName: 'ul',
	id: 'sidebar',

	//  获取Store中所有的todo-item数据
	todosForTotla: Ember.computed(function() {
      return this.store.findAll('todo-item');
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

    projects: Ember.computed(function() {
      return this.store.findAll('project');
  }),

  actions: {
	  toEditClassify: function(param) {
		  var cfy = this.store.peekRecord("project", param);
		  Ember.$('#editClassifyModal').modal('toggle');
		  //  设置信息到编辑表单，被设置的表单放在index.hbs（遮盖层的原因）
		  Ember.$("#projName1").val(cfy.get('projName'));
		  Ember.$("#projCode1").val(cfy.get('projCode'));
		  Ember.$("#projId1").val(cfy.get('id'));

		//   Ember.$("#timestamp1").val(cfy.get('timestamp'));
		//   Ember.$("#todoItems1").val(cfy.get('todoItems'));
	  }
  }

});

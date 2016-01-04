import Ember from 'ember';

export default Ember.Component.extend({

	session: Ember.inject.service('session'),
	classNames: ['nav navbar-nav side-nav'],
	attributeBindings: ['id', 'style'],
	tagName: 'ul',
	id: 'sidebar',
	style: 'overflow: hidden; outline: none;',
	projCode: null,

	//  获取Store中所有的todo-item数据
	todosForTotla: Ember.computed(function() {
      return this.store.findAll('todo-item');
  	}),
	projectsForTotla: Ember.computed(function() {
      return this.store.findAll('project');
  	}),

    projects: Ember.computed('projectsForTotla.@each.userId', function() {
	  var userId = this.get('session').get('data').authenticated.uid;
	  // 根据登录用户id过滤
      return this.get('projectsForTotla').filterBy('userId', userId);
  }),

  actions: {
	  toEditClassify: function(param) {
		  var cfy = this.store.peekRecord("project", param);
		  Ember.$('#editClassifyModal').modal('toggle');
		  //  设置信息到编辑表单，被设置的表单放在index.hbs（遮盖层的原因）
		  Ember.$("#projName1").val(cfy.get('projName'));
		  Ember.$("#projCode1").val(cfy.get('projCode'));
		  Ember.$("#projId1").val(cfy.get('id'));
	},
	toAddClassifyModal: function() {
		Ember.$('#addClassifyForm').modal('toggle');
	},
	//  点击左侧分类时更新查询的projCode
	// 但是触发找个效果有点奇葩，参考：http://emberjs.com/api/classes/Ember.Component.html#method_send
	// 首先在left-menu.hbs点击触发事件setProjCoce,执行到这里然后通过模板left-menu.hbs的调用者（index.hbs）传递到controller:index
	//  然后执行controller:index里的setProjCoce方法，并且调用过程传递参数params
	setProjCoce: function(params) {
		this.sendAction("setProjCoce", params);
	}
  }

});

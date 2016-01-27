// 显示某个分类未完成todo数量

import Ember from 'ember';

// 调用left-menu.hbs {{no-completed-todos-count-by-classify projCode=item.projCode store=store}}
export default Ember.Component.extend({
    tagName: 'span',
    classNames: ['badge badge-transparent-black'],  //badge badge-transparent-black badge badge-success mr30
    session: Ember.inject.service('session'),

    todosForTotla: Ember.computed(function() {
      return this.store.findAll('todo-item');
  	}),

    // 三重过滤：1，状态为1；2，登录用户id；3，所属分类
    noCompletedTodoCount4Cmp: Ember.computed('todosForTotla.@each.userId',
                                        'todosForTotla.@each.recordStatus',
                                        'todosForTotla.@each.project',
                                        'todosForTotla.@each.isChildOrParent', function() {
		var userId = this.get('session').get('data').authenticated.uid;
        var projCode = this.get('projCode');  //调用组件时候传递过来

        return this.get('todosForTotla').filter(function(td) {
            return td.get('recordStatus') === 1
                    && td.get('user') === userId
                    && td.get('project') === projCode
                    && td.get('isChildOrParent') != 1
                    && td.get('isChildOrParent') != 2;
        }).get('length');
	})
});

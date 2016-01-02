//  app/routes/index.js

import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// 实现AuthenticatedRouteMixin的类会自动根据权限过滤，如果经过登录页面直接进入这个route会自动跳转到登录页面
export default Ember.Route.extend(AuthenticatedRouteMixin, {
	// this.transitionTo('index', { queryParams: { recordStatus: 1 } });
	// queryParams: {
	// 	recordStatus: {
	// 		replace: true,
	// 		refreshModel: true
	// 	}
	// },

	//  获取firebase数据并返回到页面
	model: function() {
		return this.store.findAll('todo-item');
		// return this.store.findRecord('todoItem', 1);
	}
});

//  app/routes/index.js

import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import LocalStorageStore from 'ember-simple-auth/session-stores/local-storage';

// 实现AuthenticatedRouteMixin的类会自动根据权限过滤，如果经过登录页面直接进入这个route会自动跳转到登录页面
export default Ember.Route.extend(AuthenticatedRouteMixin, {
    session: Ember.inject.service('session'),

	// this.transitionTo('index', { queryParams: { recordStatus: 1 } });
	// queryParams: {
	// 	recordStatus: {
	// 		replace: true,
	// 		refreshModel: true
	// 	}
	// },

	//  获取firebase数据并返回到页面
	// model: function() {
	// 	return this.store.peekAll('todo-item');
	// 	// return this.store.findRecord('todoItem', 1);
	// }

	// afterModel: function() {
	// 	var data = sessionStorage.getItem('LOGIN_USER_EMAIL');
	// 	console.log("afterModel  >> " + data);
	// // 	return { LOGIN_USER_EMAIL: data };
	// }

});

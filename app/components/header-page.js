import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service('session'),
    actions: {
		/**
		 * 执行这个方法销毁登录时候保存到session的数据，并且会自动跳转到config/environment.js里配置的登录页面
		 * @return {[type]} [description]
		 */
	    invalidateSession: function() {
			localStorage.clear();  //销毁登录时候保存到session的数据
	        this.get('session').invalidate();
	    }
	}
});

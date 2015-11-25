//  app/components/tip-msg.js

import Ember from 'ember';

/**
 * 修改包裹组件的HTML标签为span，默认的div标签有自己的样式，破坏布局
 */
export default Ember.Component.extend({
	tagName: 'span',
  	session: Ember.inject.service('session'),

	actions: {
		/**
		 * 执行这个方法销毁登录时候保存到session的数据，并且会自动跳转到config/environment.js里配置的登录页面
		 * @return {[type]} [description]
		 */
	    invalidateSession: function() {
	        this.get('session').invalidate();
	    }
	}
});

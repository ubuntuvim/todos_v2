//  app/components/tip-msg.js

import Ember from 'ember';
import Firebase from 'firebase';

/**
 * 修改包裹组件的HTML标签为span，默认的div标签有自己的样式，破坏布局
 */
export default Ember.Component.extend({
	// <ul class="nav navbar-nav quick-actions">
	tagName: 'ul',
	classNames: ['nav navbar-nav quick-actions'],
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
	},
	userEmail: Ember.computed(function() {
		return localStorage.getItem('LOGIN_USER_EMAIL');
	}),
	//  如果是第三方登录用户可以直接获取头像地址
	profileImageURL: Ember.computed(function() {
		var url = localStorage.getItem('PROFILE_IMAGE_URL');
		if (url) {
			return url;
		} else { //  第三方用户没有设置头像默认显示项目设置的头像
			return "assets/images/profile-photo.jpg";
		}
	})
});

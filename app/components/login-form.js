// app/components/login-form.js

import Ember from 'ember';

//  导入全局配置
import config from '../config/environment';


/**
 * 登录控制，使用ember-simple-auth插件
 */
export default Ember.Component.extend({
    
    session: Ember.inject.service('session'),
	tagName: 'span',
	showOrHide: 'display: none;',

	actions: {

		authenticate: function() {
			var that = this;

			//  显示进度提示
			this.set('showOrHide', 'display: ;');

			var user = this.getProperties('username', 'password');
			// 只处理登录失败的情况，登录成功的情况直接跳转到首页了
            // this.get('session').authenticate('authenticator:oauth2-authenticator', user).catch((msg) => {
            //     this.set('errorMessage', msg);
            // });
			this.get('session').authenticate('authenticator:oauth2-authenticator', user)
				.then(function(response) {  // 登录成功
					that.set('errorMessage', '登录成功。');
					//  登录成功直接跳转到APP首页
                	window.location.href = config.localeBaseUrl;  
				}, function(msg) {  //登录失败
					//  登录失败的跳转回login页面，并把提示信息response返回到界面
	                //  login页面要在config/environment.js里配置
					that.set('errorMessage', msg);
				});
		},
		//  当用户名和密码输入框发生改变就隐藏进度提示
		hideTipOnChange: function() {
			this.set('showOrHide', 'display: none;');
		}
	}
});

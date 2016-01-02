// app/components/login-form.js

import Ember from 'ember';
import Firebase from 'firebase';
// import LocalStorageStore from 'ember-simple-auth/session-stores/local-storage';

//  导入全局配置
import config from '../config/environment';

/**
 * 登录控制，使用ember-simple-auth插件
 */
export default Ember.Component.extend({

    session: Ember.inject.service('session'),
    firebase: Ember.inject.service('firebase'),
	tagName: 'span',
	isShow: false,
    enabled: false,

	actions: {

		authenticate: function() {

			var that = this;
            //  设置提交按钮为不可用
            this.set('enabled', true);

			//  显示进度提示
			this.set('isShow', true);

			this.get('session').authenticate('authenticator:firebase', {
                'email': that.get('email'),
                'password': that.get('password')
            }).then(function() {  // 登录成功

            }, function(msg) {  //登录失败

                that.set('enabled', false);
            	// 根据返回的错误码显示不同的信息
				if ('INVALID_PASSWORD' === msg.code) {
					that.set('errorMessage', "密码错误！");
				} else if ('INVALID_USER' === msg.code) {
					that.set('errorMessage', "登录邮箱未注册，请先注册再登录！");
				} else {
					that.set('errorMessage', "登录邮箱和密码不匹配，请确认后再登录！");
				}

			});


			// this.get('session').authenticate('authenticator:oauth2-authenticator', user)
			// 	.then(function(response) {  // 登录成功
			// 		that.set('errorMessage', '登录成功。');

			// 		//  登录成功直接跳转到APP首页
   //              	window.location.href = config.localeBaseUrl;
			// 	}, function(msg) {  //登录失败
			// 		//  登录失败的跳转回login页面，并把提示信息response返回到界面
	  //               //  login页面要在config/environment.js里配置
			// 		that.set('errorMessage', msg);
			// 	});
		},
		//  当用户名和密码输入框发生改变就隐藏进度提示
		hideTipOnChange: function() {
			this.set('isShow', false);
		},
		//  第三方登录
		githubLogin: function() {  // 使用github登录

			var that = this;

			//  显示进度提示
			this.set('isShow', true);

			this.get('session').authenticate('authenticator:github-oauth2').then(function(data) {  // 登录成功
                console.log('登录成功 ' + data);
                that.set('isShow', false);
				// 跳转到首页，如果不用这个跳转默认使用ember的transitionTo()跳转，页面没有加载效果
                window.location.href = config.localeBaseUrl;
            }, function(msg) {  //登录失败
            	// 根据返回的错误码显示不同的信息
            	console.log('登录失败 msg >> ' + msg);
				// if ('INVALID_PASSWORD' === msg.code) {
				// 	that.set('errorMessage', "密码错误！");
				// } else if ('INVALID_USER' === msg.code) {
				// 	that.set('errorMessage', "登录邮箱错误！");
				// } else {
				// 	that.set('errorMessage', "登录邮箱和密码不匹配，请确认后再登录！");
				// }

			});
		},
		googleLogin: function() {  // 使用google登录

			var that = this;
			//  显示进度提示
			this.set('isShow', true);

			this.get('session').authenticate('authenticator:google-oauth2').then(function(data) {  // 登录成功
                console.log('登录成功 ' + data);
                // that.set('isShow', true);
				// 跳转到首页，如果不用这个跳转默认使用ember的transitionTo()跳转，页面没有加载效果
                window.location.href = config.localeBaseUrl;
            }, function(msg) {  //
                console.log('登录失败 msg >> ' + msg);
                that.set('isShow', false);
			});
		}
	}
});

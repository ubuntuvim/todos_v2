import Ember from 'ember';

import config from '../config/environment';

export default Ember.Component.extend({

    session: Ember.inject.service('session'),
	isShowOrHide: false,

	actions: {

		register: function() {

            // console.log(this.transitionToRoute('introduction'));
			var user = this.getProperties('username', 'password', 'email', 'userPic');
            //  如果没有设置头像，默认设置一个头像
            if (!user.userPic) {
                user.userPic = "";
            }

            this.set('isShowOrHide', true);
			var __this = this;
			Ember.$.ajax({
                url: config.apiBaseUrl + '/user/register',
                type: 'POST',
	            // data: JSON.stringify({
	            //     username: options.username,
	            //     email: options.email,
	            //     userPic: options.userPic,
	            //     password: options.password
	            // }),
	            data: JSON.stringify(user),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json'
            }).then(function(res) {
            	if ('1' === res.msgCode) {  //注册成功
            		var user = { email: res.data.email, password: res.data.password };
                    // 再调用验证登录方法，设置登录信息到session中
	                __this.get('session').authenticate('authenticator:oauth2-authenticator', user)
						.then(function(response) {  // 登录成功
                            __this.get('session').set('session.isAuthenticated', true);
                            __this.get('session').set('isAuthenticated', true);
                            //  现转到介绍页面
                            window.location.href = config.localeBaseUrl + "/introduction";
						}, function(err) {  //登录失败
						});
                    // window.location.href = config.localeBaseUrl + "/introduction";

            	} else {  //注册失败
                    __this.set('isShowOrHide', true);
                    __this.set('errorMessage', res.msg);
            	}

            }, function(xhr, status, error) {  //  注册失败

            });
		},
		//  点击“关闭”隐藏提示进度条
		hideTipOnChange: function() {
			this.set('isShowOrHide', false);
		}
	}
});

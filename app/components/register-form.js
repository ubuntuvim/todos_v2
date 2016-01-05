import Ember from 'ember';
// import Firebase from 'firebase';

import config from '../config/environment';

export default Ember.Component.extend({

    session: Ember.inject.service('session'),
    firebase: Ember.inject.service('firebase'),
	isShowOrHide: false,
    enabled: false,

	actions: {

		register: function() {

            var _this = this;
            //  设置提交按钮为不可用
            this.set('enabled', true);
            var pwd = md5(this.get('password'));  // md5加密

            this.get('firebase').createUser({
                email: _this.get('email'),
                password: pwd
            }, function(error, userData) {
                if (error) {
                    console.log("error = " + error);
                    if ('EMAIL_TAKEN' === error.code) {
                        _this.set('errorMessage', '此邮箱已经注册过了，请换一个邮箱注册。');
                    }

                    _this.set('enabled', false);
                    _this.set('isShowOrHide', true);

                } else {
                    _this.set('errorMessage', '注册成功，正在跳转到首页...');
                    _this.set('isShowOrHide', true);
                    // console.log('注册成功直接登录到首页');
                    if (userData.uid) {
                        _this.get('session').authenticate('authenticator:firebase', {
                            'email': _this.get('email'),
                            'password': _this.get('password')  // 在firebase里加密
                        }).then(function() {  // 登录成功
                            // _this.set('isShowOrHide', true);
                        }, function(msg) {  //登录失败
                            // _this.set('isShowOrHide', true);
            			});
                    }
                }
            });
		},
		//  点击“关闭”隐藏提示进度条
		hideTipOnChange: function() {
			this.set('isShowOrHide', false);
		}
	}  // end actions

});

import Ember from 'ember';  
import Base from 'ember-simple-auth/authenticators/base';

import config from '../config/environment';


/**
 * 自定义授权器，必须重写restore、authenticate、invalidate这三个方法。
 */
export default Base.extend({  
    session: Ember.inject.service('session'),

    // tokenEndpoint: 'http://localhost:3001/sessions/create',
    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.user)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },
    showOrHide: 'display: none;',

    /**
     * 自定义处理登录逻辑，连接数据库判断登录用户是否存在
     * @param  {[type]} options [表单值]
     * @return {[type]}         [必须返回promises对象]
     */
    authenticate: function(options) {

    	// var that = this;

        // 返回到login-form.js里的authenticate方法，你也可以在这个方法了处理登录成功或者失败的情况
        return new Ember.RSVP.Promise((resolve, reject) => {
        
            Ember.$.ajax({
                url: config.apiBaseUrl + '/user/login',
                type: 'POST',
	            data: JSON.stringify({
	                username: options.username,
	                password: options.password
	            }),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json'
            }).then(function(response) {
       
                Ember.run(function() {
                    resolve({
                        user: response.user
                    });
                });
                 
            }, function(xhr, status, error) {
                console.log('app/authenricatores/oauth2-authenticator status = ' + status);
                console.log('app/authenricatores/oauth2-authenticator error = ' + error);
                var response = xhr.responseText;
                Ember.run(function() {
                    reject(response);
                });
                
            });

        });
    },
    invalidate: function() {
        return Ember.RSVP.resolve();
    }
});
// firebase邮箱登录处理类

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import Firebase from 'firebase';
import config from '../config/environment';

export default Base.extend({

    init: function() {
        if (config.firebase) {
            this.set('firebase', new Firebase(config.firebase));
        } else {
            throw new Error("'firebase' not defined in environment");
        }

        this._super();
    },
    firebase: null,
    session: Ember.inject.service('session'),
    store: Ember.inject.service('store'),

    restore: function(data) {

        var _this = this;

        return new Promise(function(resolve, reject) {

            if (data.token) {

                _this.get('firebase').authWithCustomToken(data.token, function(error, success) {
                    Ember.run(function() {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(success);
                        }
                    });
                });

            } else {
                reject(new Error('Unable to restore Firebase session: no token found.'));
            }

        });

    },
    // allUsers: Ember.computed(function() {
    //     return this.get('store').peekAll('user');
    // });
    // userCountByUserId: Ember.computed('allUsers.@each.userId', function() {
    //   return this.get('classifyList').filterBy('recordStatus', 1).get('length');
    // }),

    authenticate: function(options) {

        var _this = this;

        return new Promise(function(resolve, reject) {
            var eml = options.email;
            // var pwd = options.password;
            var pwd = md5(options.password);  //暂时不加密，完成密码修改，新增也加密后使用
            // var hash = md5("value");

            _this.get('firebase').authWithPassword({
                'email': eml,
                'password': pwd
            }, function(error, authData) {
                Ember.run(function() {
                    if (error) {
                        reject(error);
                    } else {
                        //  保存登录用户的Email到session中
                        sessionStorage.setItem('LOGIN_USER_EMAIL', eml);
                        resolve(authData);
                    }
                });

            });
        });
    },
    invalidate: function(data) {

        var _this = this;

        return new Promise(function(resolve, reject) {
            _this.get('firebase').unauth();
            resolve(data);
        });
    }
});

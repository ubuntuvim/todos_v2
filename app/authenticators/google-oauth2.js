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
    restore: function(data) {

        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },
    //  第三方授权登录
    authenticate: function(options) {

        var _this = this;

        return new Promise(function(resolve, reject) {
            _this.get('firebase').authWithOAuthPopup("google", function(error, authData) {
				Ember.run(function() {
                    if (error) {
                        reject(error);
                    } else {
                        //  保存登录用户的Email到session中
                        sessionStorage.setItem('LOGIN_USER_EMAIL', authData.google.email);
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

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
    authenticate: function(options) {

        var _this = this;

        return new Promise(function(resolve, reject) {
            _this.get('session').set('LOGIN_USER_EMAIL', options.email);

            _this.get('firebase').authWithPassword({
                'email': options.email,
                'password': options.password
            }, function(error, authData) {
                Ember.run(function() {
                    if (error) {
                        reject(error);
                    } else {
                        // 设置用户信息到session中
                        _this.get('session').set('LOGIN_USER_ID', authData.uid);
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

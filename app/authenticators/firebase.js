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

            _this.get('firebase').authWithPassword({
                'email': options.email,
                'password': options.password
            }, function(error, authData) {
                Ember.run(function() {
                    if (error) {
                        reject(error);
                    } else {
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
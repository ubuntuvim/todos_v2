//  app/routes/login.js
import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service('session'),
    model: function() {
        //  如果已经登录过的直接转到首页
        if (this.get('session').get('data').authenticated.uid) {
            // window.location.href = config.localeBaseUrl;
            this.transitionTo('index');
        } else {
            this.transitionTo('login');
        }
    }
});

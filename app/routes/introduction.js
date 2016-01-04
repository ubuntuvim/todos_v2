import Ember from 'ember';

export default Ember.Route.extend({

    session: Ember.inject.service('session'),

    model: function() {
        // 直接在页面用表达式{{session.isAuthenticated}}获取不了设置到session的值 
        return { isAuthenticated: this.get('session').get('isAuthenticated') };
    }
});

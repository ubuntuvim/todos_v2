//  app/routes/index.js

import Ember from 'ember';

// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import LocalStorageStore from 'ember-simple-auth/session-stores/local-storage';

// 实现AuthenticatedRouteMixin的类会自动根据权限过滤，如果经过登录页面直接进入这个route会自动跳转到登录页面
export default Ember.Route.extend(/*AuthenticatedRouteMixin, */{

    session: Ember.inject.service('session'),
    model: function() {
        //  页面需要使用登录状态判断显示不用的html
        if (this.get('session').get('data').authenticated.uid) {
            return true;
        } else {
            return false;
        }
    }

});

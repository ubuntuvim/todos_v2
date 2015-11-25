//  app/authenrizers/oauth2-anthenrizer.js

import Ember from 'ember';  
import Base from 'ember-simple-auth/authorizers/base';

/**
 * [自定义授权者]
 * @param  {[type]} jqXHR           [响应参数]
 * @param  {[type]} 请求参数) {                   var accessToken [description]
 * @return {[type]}                 [description]
 */
export default Base.extend({  
    authorize: function(jqXHR, requestOptions) {
        var accessToken = this.get('session.content.secure.token');
        console.log('app/authenrizer/oauth2-authenrizer = ' + requestOptions);
        if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
            //  setRequestHeader方法自定义请求头信息：键为Authorization，值为Ember+accessToken
            // 有关这个方法的介绍请看[API介绍](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader)
            jqXHR.setRequestHeader('Authorization', 'Ember' + accessToken);
        }
    }
});
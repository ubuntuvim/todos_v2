//  连接本地数据，不再使用firebase，太慢了
//import Ember from 'ember';
//import FirebaseAdapter from 'emberfire/adapters/firebase';
//
//const { inject } = Ember;
//
//export default FirebaseAdapter.extend({
//  firebase: inject.service(),
//});


import Ember from 'ember';

import config from '../config/environment';

//  20151213
export default DS.JSONAPIAdapter.extend({
    host: config.apiBaseUrl
});
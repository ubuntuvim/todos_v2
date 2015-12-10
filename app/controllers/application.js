// app/controllers/application.js

import Ember from 'ember';

//  导入全局配置
import config from '../config/environment';

export default Ember.Controller.extend({
	globalTitle: config.globalTitle
});

//  项目入口route
import Ember from 'ember';

export default Ember.Route.extend({
	//  获取firebase数据并返回到页面
	model: function() {
		return this.store.findAll('todo-item');
	}
});

//

import Ember from 'ember';

/**
 * 修改包裹组件的HTML标签为span，默认的div标签有自己的样式，破坏布局
 */
export default Ember.Component.extend({
	// <div class="navbar-header col-md-2">
	tagName: 'div',
	classNames: ['navbar-header col-md-2']
});

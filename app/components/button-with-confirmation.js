// 击按钮会弹出确认框

import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'button',
    click() {
        if (confirm(this.get('text'))) {
          // trigger action on parent component
          this.get('onConfirm')();
        }
    }
});

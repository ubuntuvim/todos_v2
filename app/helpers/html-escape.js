import Ember from 'ember';

//  转换html标签，使得显示的内容包含html标签
export function htmlEscape(params/*, hash*/) {
  return Ember.String.htmlSafe(params[0]);
}

export default Ember.Helper.helper(htmlEscape);

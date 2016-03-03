import Ember from 'ember';

//  过滤子任务，在子任务列表只显示完成或者未完成状态的数据，其他状态不显示
export function filterTodoItem(params/*, hash*/) {
    return params[0] === 1 || params === 2;
}

export default Ember.Helper.helper(filterTodoItem);

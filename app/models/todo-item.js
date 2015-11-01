import DS from 'ember-data';

/**
 * todo项
 */
export default DS.Model.extend({
  title: DS.attr('string'),
  checked: DS.attr('boolean'),  // 是否勾选了todo列表前面的完成按钮
  timestamp: DS.attr('number'),
  star: DS.attr('boolean'),
  recordStatus: DS.attr('number'),  //todo项状态：1-未完成（新增）；2-完成；3-删除（放到回收站可恢复）；4-完全删除（不可恢复）
  startDate: DS.attr('date'),  //任务开始时间
  endDate: DS.attr('date'),  //任务结束时间
  isPublish: DS.attr('number'),  //是否公开：1-公开(任何人都可以看到)；0-不公开(自己看)

  childTodos: DS.hasMany('todo-item', { inverse: 'parentTodo' }),  //如果当前todo有子todo则这个属性指向子todo
  parentTodo: DS.belongsTo('todo-item', { inverse: 'childTodos' }),  //如果当前todo是子todo则这个属性指向自己的父todo
  user: DS.belongsTo('user'),
  comments: DS.hasMany('comment'),
  project: DS.belongsTo('project')  //所属项目
});

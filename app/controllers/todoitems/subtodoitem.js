import Ember from 'ember';

export default Ember.Controller.extend({

    session: Ember.inject.service('session'),
    tagName: 'span',
    editing: true,
    showFlag: true,
    todoTitleValue: '',

    actions: {

        // 保存修改的title值
        updateTitle: function(params) {

            var id = Ember.$("#todoId").val();
            // 设置选中的TODO数据设置到表单上
            // var title = Ember.$("#edit-todo-title-div").html();
            this.store.findRecord('todo-item', id).then(function(td) {
                td.set('title', params);
                td.save();
            });
            //当头部的title字段改变时需要自动触发这2句代码，动态修改中间部分的高度
            var h = $('#right-panel-id').height() - ($("#fixed-top-id").height()) - 100;
            console.log('==============',$("#fixed-top-id").height());
            Ember.$("#middle-content-id").css("height", h);
        },
        setStartDateById: function(params) {
            // 获取id
            var todoId = Ember.$("#todoId").val();
            this.store.findRecord('todo-item', todoId).then(function(td) {
                td.set('startDate', params);
                td.save();
            });
        },
        setEndDateById: function(params) {
            // 获取id
            var todoId = Ember.$("#todoId").val();
            this.store.findRecord('todo-item', todoId).then(function(td) {
                td.set('endDate', params);
                td.save();
            });
        },
        //  保存备注信息
        saveRemarkById: function(params) {
            var id = Ember.$("#todoId").val();
            // 设置选中的TODO数据设置到表单上
            var remark = Ember.$("#remarkId").html();
            this.store.findRecord('todo-item', id).then(function(td) {
                td.set('remark', params);
                td.save();
            });
        },
        saveSubTodo: function() {

            // this.store.unloadAll('todo-item');
            // var _this = this;

			var title = this.get('subTodo');
            var userId = this.getUserIdFromSession();
            var parentId = Ember.$('#todoId').val();
            var project = Ember.$('#projCodeId').val();
            // 如果未选中任何分类默认放在"我的Todo"分类中
            if (Ember.isEmpty(project)) {
                project = "myTodos";
            }
            var currentDateStr = new Date().Format("yyyy-MM-dd hh:mm");
			var todoItem = this.store.createRecord('todo-item', {
				title: title,
			    checked: false,
			    timestamp: new Date().getTime(),
			    star: false,
			    recordStatus: 1,  //todo项状态：1-未完成（新增）；2-完成；3-删除（放到回收站可恢复）；4-完全删除（不可恢复）
			    startDate: currentDateStr,  //任务开始时间
			    endDate: currentDateStr,  //任务结束时间
			    isPublish: 1,  //是否公开：1-公开(任何人都可以看到)；0-不公开(自己看)
			    user: userId,
                isChildOrParent: 1,  //1-子todo；2-父todo；3-本身（没有任何关联）
			    // comments: null,
			    project: project  //所属项目
			});
            // 关系放在多的一方，父的一方并不保存他们的关系数组
            var ptodo = this.store.peekRecord('todo-item', parentId);
            todoItem.set('parentTodo', ptodo);
			todoItem.save();
            //  清空页面值
			this.set('subTodo', "");

            var childArr = ptodo.get('childTodos');
            // console.log("ptodo.get('childTodos') = " + childArr);
            childArr.push(todoItem);  // 使用方法pushObject新增的元素会重复显示在界面上
            ptodo.save();
        },
        updateSubItemById: function() {
            console.log('updateSubItemById...');
        },
        completedSubTodoItem: function() {

        }
    },  //  end actions,
    getUserIdFromSession: function() {
        return this.get('session').get('data').authenticated.uid;
    }
});

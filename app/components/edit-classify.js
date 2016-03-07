// 左侧分来菜单表单处理类

import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service('session'),
    actions: {
        delClassify: function() {
            var _this = this;

            // 获取删除数据的id
            var id = Ember.$("#projId1").val();
            //  首先删除与此项目关联的所有TODO
            this.store.findRecord('project', id).then(function(proj) {
                var projCode = proj.get('projCode');
                var userId = _this.getUserIdFromSession();

                console.log('proj code = ', projCode);
                console.log('userId = ', userId);

                var todos = _this.store.peekAll("todo-item").filter(function(td) {
                    if ((td.get('project') === projCode
                        && td.get('user') === userId)
                        && (td.get('recordStatus') === 1
                            || td.get('recordStatus') === 2)) {
                        //  设置为删除状态
                        td.set('recordStatus', 3);
                        td.save();
                    }
                });
                // 删除分类
                proj.destroyRecord();
            });

            //  关闭modal弹出窗口
            Ember.$('#editClassifyModal').modal('toggle');
        },
        editClassify: function() {

            var projName = Ember.$("#projName1").val();
            //  在index.html引入
            var pinyin = new Pinyin();
            var projCode = pinyin.getFullChars(projName);
            var id = Ember.$("#projId1").val();

			this.store.findRecord('project', id).then(function(proj) {
              proj.set('projName', projName);
              proj.set('projCode', projCode);

              proj.save();
            });
            this.set('projCode', projCode);
			// 隐藏弹出的表单
            Ember.$('#editClassifyModal').modal('toggle');
        }
    },
    getUserIdFromSession: function() {
        return this.get('session').get('data').authenticated.uid;
    }
});

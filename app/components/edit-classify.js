// 左侧分来菜单表单处理类

import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        delClassify: function() {
            // 获取删除数据的id
            var id = Ember.$("#projId1").val();
            this.store.findRecord('project', id).then(function(proj) {
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
			// 隐藏弹出的表单
            Ember.$('#editClassifyModal').modal('toggle');
        }
    }
});

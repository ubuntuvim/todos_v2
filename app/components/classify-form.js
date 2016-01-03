// 左侧分来菜单表单处理类

import Ember from 'ember';

export default Ember.Component.extend({

    classify: null,

    actions: {
        // 新增分类
        addClassify: function() {

            var projName = this.get('projName');
            //  在index.html引入
            var pinyin = new Pinyin();
            // alert(pinyin.getFullChars('你好中国'));
            var projCode = pinyin.getFullChars(projName);

			var proj = this.store.createRecord('project', {
                projCode: projCode,
                projName: projName,
                timestamp: new Date().getTime(),  //项目创建时间
                projStatus: 1, // 项目状态：1-正常；2-删除；3-过期
                // userId:   // 用户id
                todoItems: null  //关联todo
			});
			proj.save();
			// 隐藏弹出的表单
            Ember.$('#addClassifyForm').modal('toggle');
        }
    }
});

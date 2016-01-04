import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		login: function() {
		  var that = this;
	      console.log('username = ' + that.get('username'));
	      Ember.$.ajax({
	          url: 'http://localhost:3001/api/user/login',
	          type: 'POST',
	          data: JSON.stringify({
	              username: that.get('username'),
	              password: that.get('password')
	          }),
	          contentType: 'application/json;charset=utf-8',
	          dataType: 'json',
	          success: function(response) {
	              // console.log('success response = ' + response);
	              // that.set('errorMessage', response.responseText);
	              // 返回的是一个user的json对象
	              that.set('successMsg', JSON.stringify(response.user));
	          },
	          error: function(error) {
	              // alert("An error occurred while processing the response.");
	              console.log(error);
	              that.set('errorMessage', error.responseText);
	          }
	      });

		}
	}
});

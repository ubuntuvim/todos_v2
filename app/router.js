import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('test', function() {
    this.route('subtest');
  });
  this.route('login');
  this.route('introduction');
  this.route('feedback');
  this.route('register');
  // this.route('redirecToIndex');


  // this.route('todo-items', function() {
  //     this.route('todo-item', { path: '/:td_id'});
  // })
  // this.route('/', function() {
  //   this.route('subTodoItem', { path: '/:todoItem_id' });
  // });

  // this.route('/', function() {
  //   this.route('subTodoItem', { path: '/:todoItem_id' });
  // });
  this.route('todoitems', function() {
      this.route('subtodoitem', { path: '/:todoItem_id' });
  });
});

export default Router;

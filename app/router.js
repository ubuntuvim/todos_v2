import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('test');
  this.route('login');
  this.route('introduction');
  this.route('feedback');
  this.route('register');
  this.route('redirecToIndex');


  // this.route('/', function() {
  //   this.route('loading');
  // });
  this.route('todo-items', function() {
      this.route('todo-item', { path: '/:td_id'});
  })
});

export default Router;

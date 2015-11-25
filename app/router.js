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

  this.route('inedex', function() {
    this.route('loading');
  });
});

export default Router;

import Ember from 'ember';

export default Ember.Route.extend({

    session: Ember.inject.service('session'),

    model: function() {
        return { isAuthenticated: this.get('session').get('isAuthenticated') };
    }
});

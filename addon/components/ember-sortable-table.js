import Ember from 'ember';
import EmberTableComponent from 'ember-table/components/ember-table';

export default EmberTableComponent.extend({
  layoutName: 'components/ember-table',

  onColumnSort: function (column, newIndex) {
    console.log('Calling Component.onColumnSort with', column, newIndex);
    this._super(column, newIndex);
  },

  actions: {
    /**
     * Bubble up the sort action to the controller instead of handling here.
     * @param  {[type]} column The Column object, not just an identifier
     */
    sortByColumn: function(column) {
      this.sendAction('sortAction', column);
    }
  }
});

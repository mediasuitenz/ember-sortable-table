import Ember from 'ember';

export default Ember.Mixin.create({
  supportSort: true,
  sorted: false,
  headerCellView: 'sortable-header-cell'
});

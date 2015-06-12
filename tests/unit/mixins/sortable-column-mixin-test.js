import Ember from 'ember';
import SortableColumnMixinMixin from '../../../mixins/sortable-column-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | sortable column mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var SortableColumnMixinObject = Ember.Object.extend(SortableColumnMixinMixin);
  var subject = SortableColumnMixinObject.create();
  assert.ok(subject);
});

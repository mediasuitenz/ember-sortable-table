import Ember from 'ember';

export default Ember.Mixin.create({
  // Allows us to define our own header cell template with the sort arrows.
  headerCellView: 'sortable-header-cell',

  /**
   * Allows the end-user to sort the table contents by the values
   * in this column.
   * @type {Boolean}
   */
  supportRowSort: true,

  /**
   * Just affects the presentation, as far as this object is concerned.
   * The component is the thing that toggles the sortAscending attribute.
   * @type {Boolean}
   */
  sortAscending: false,

  /**
   * Only one Column should be set to `sorted: true` at a time.
   * @type {Boolean}
   */
  sorted: false,

  /**
   * The key on a row object used to sort the rows when this column is
   * selected as the sortColumn.
   * @type {String}
   */
  sortKey: null,

  /**
   * Column is considered misconfigured if we have no sortKey defined.
   * @throws {Error} If you forgot to define a sortKey on the inheriting ColumnDefinition.
   */
  ensureSortKeyExists: Ember.on('init', function() {
    if (!this.get('sortKey')) {
      throw new Error('Must define the `sortKey` on the SortableColumn with header: "' + this.get('headerCellName') + '"');
    }
  })
});

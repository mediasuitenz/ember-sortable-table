import Ember from 'ember';
import EmberTableComponent from 'ember-table/components/ember-table';

export default EmberTableComponent.extend({
  layoutName: 'components/ember-table',

  /**
   * The column instance that has been selected to sort the table by
   * @type {[type]}
   */
  sortColumn: null,

  /** @type {String} Used to define the initial state of the table */
  initialSortKey: null,

  /**
   * Allows the user to define the initial sort directionality when a new column
   * is selected as the sortColumn.
   * @type {Boolean}
   */
  defaultSortAscending: false,

  /**
   * The current sort-directionality. Defaults to `defaultSortAscending`
   * @type {Boolean}
   */
  sortAscending: Ember.computed.oneWay('defaultSortAscending'),

  /** @type {Ember.A} All of the column-definitions that support row sorting. */
  sortableColumns: Ember.computed.filterBy('columns', 'supportRowSort'),

  /**
   * We proxy the "content" attribute that ember-table expects so that
   * we can handle sorting. See the content attribute here.
   * @type {Ember.A}
   */
  rows: null,

  /**
   * Performs the initial sort on the table contents.
   * If the initialSortKey is not provided, then it uses the first sortable
   * column, or in the worst case, just the first column.
   *
   * @throws {Error} If a valid sort column cannot be discerned.
   */
  doInitialSort: Ember.on('init', function(){
    var initialSortKey = this.get('initialSortKey');
    var column;
    if (!initialSortKey) {
      console.debug('No initialSortKey provided. Using the first applicable row instead');
      column = this.get('sortableColumns.0') || this.get('columns.0');
      if (!column) {
        // No columns were defined... whatever
        console.Error('No columns were defined for sortable table. ' +
          'Will omit sorting the table contents.');
        return
      }
    } else {
      // Note: We intentionally don't restrict this find to just sortable columns
      // supportRowSort on the column indicates that the column can be sortable
      // by the end-user, which is different from defining a default sort
      // order by the developer of the table.
      column = this.get('columns').find(function(column) {
        return column.get('sortKey') === initialSortKey;
      });
    }

    if (!column) {
      // prefer throwing error against silently failing
      throw new Error('initialSortKey, "' + initialSortKey + '", doesnt match any columns');
    }

    this.assignColumnAsSorted(column);
  }),

  /**
   * Defines the row attribute to sort the rows by. Feeds into the content attr.
   * Nominally uses the sortKey defined by the Columnd definitions, but
   * we need to munge the key in order to define directionality.
   * @return {String}
   */
  attrToSortRowsBy: Ember.computed(function() {
    var signature = this.get('sortColumn.sortKey') || this.get('initialSortKey');
    if (!this.get('sortAscending')) {
      signature += ':desc';
    }
    return [signature];
  }).property('initialSortKey', 'sortColumn.sortKey', 'sortAscending'),

  /** @type {Array} `content` is the magical keyword that ember-table expects */
  content: Ember.computed.sort('rows', 'attrToSortRowsBy'),

  /**
   * The procedure to properly assign a new sortColumn, replacing the old one.
   * @param  {ColumnDefinition} column The ColumnDefinition object
   */
  assignColumnAsSorted: function(column) {
    this.get('columns').setEach('sorted', false);

    this.set('sortColumn', column);
    column.set('sorted', true);

    this.set('sortAscending', this.get('defaultSortAscending'));
    column.set('sortAscending', this.get('sortAscending'));

  },

  actions: {

    /**
     * If the user sorts a column that is already sorted, we just switch
     * directionality.
     * Note: doesn't bubble up, because we are just modifying this
     *       component's internal data.
     * @param  {ColumnDefinition} column The column-definition object
     */
    sortByColumn: function(column) {

      if (!column.get('supportRowSort')) {
        // long hair, don't care... about sort
        return;
      }

      if (this.get('sortColumn') !== column) {
        this.assignColumnAsSorted(column);

      } else {
          this.toggleProperty('sortAscending');
          column.toggleProperty('sortAscending');
      }
    }
  }
});

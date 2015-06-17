# Ember-sortable-table


## Installation

* `npm install <github url> --save-dev` to install to node_modules
* `ember g ember-sortable-table` to run the default blueprint and install dependencies.


## Important notes that you should read before using

### Binding table content
In ember-table, you bind the table contents to the `content` attribute on the TableComponent. In ember-sortable-table, you have to bind the table contents to `rows` instead for the row sorting to work. Example:


Old:
```
{{ember-table columns=tableColumns content=tableContent}}
```

New:
```
{{ember-sortable-table columns=tableColumns rows=tableContent}}
```

### Defining a sortable table: New Component Attributes

These are the new attributes you can define on the sortable-table component from within your .hbs template.

* `rows` - Use this instead of content
* `initialSortKey` - When the table is loaded, what column do we sort by? (defaults to the first available column)
* `defaultSortAscending` - When a new column is selected as the sorted column (including when the table gets initialized), do we sort up or down? (defaults to ascending)

### Defining a sortable column

Columns are defined as sortable on a per-column basis, so not all columns have to be sortable. To make a column sortable:

* add the `sortable-column-mixin` as a mixin to your `ColumnDefinition`
* Define a `sortKey` on the ColumnDefinition. That tells the table how to sort the rows when that column is selected as the sort column.

```
// app/controllers/mycontroller.js
import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';
import SortableColumnMixin from 'ember-sortable-table/mixins/sortable-column-mixin';


export default Ember.Controller.extend({
  tableColumns: Ember.computed(function() {
    // See the mixin here.
    var dateColumn = ColumnDefinition.createWithMixins(SortableColumnMixin, {
      savedWidth: 150,
      textAlign: 'text-align-left',
      headerCellName: 'Date',
      sortKey: 'date',
      getCellContent: function(row) {
        return row.get('date').toDateString();
      }
    });
```

## TODO

* automated testing
* Get a working demo in the /tests directory... It's not working right now, because `ember-table` is messing with the prototype-extensions in the environment config.
* Can we build some JSDoc?
* If needed, generalize the sortKey to something like getCellContent to accept a function by which the rows get sorted instead of just key-indexing the rows.



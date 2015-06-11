module.exports = {
  description: '',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  normalizeEntityName: function () {
    // prevent errors
  },

   afterInstall: function(options) {
     return this.addAddonToProject({name: 'ember-table', target: '0.5.0'})
   }
};

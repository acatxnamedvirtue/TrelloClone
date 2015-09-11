TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/boardShow'],

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  }
})

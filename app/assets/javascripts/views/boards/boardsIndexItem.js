TrelloClone.Views.BoardsIndexItem = Backbone.CompositeView.extend({
  template: JST['boards/boardsIndexItem'],
  tagName: 'li',
  events: {
    'click .delete' : 'delete'
  },

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  delete: function (e) {
    e.preventDefault();
    this.model.destroy();
  }
});

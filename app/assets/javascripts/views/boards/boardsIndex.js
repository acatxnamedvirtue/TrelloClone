TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/boardsIndex'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'remove', this.delete);
  },

  render: function () {
    var content = this.template({boards: this.collection});
    this.$el.html(content);

    this.collection.each( function(board) {
      var view = new TrelloClone.Views.BoardsIndexItem({model: board});
      this.addSubview(this.$el.find(".boards"), view);
    }.bind(this));

    return this;
  },

  delete: function (model) {
    this.removeModelSubview(this.$el.find('.boards'), model);
  }
})

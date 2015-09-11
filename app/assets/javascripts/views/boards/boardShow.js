TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/boardShow'],
  events: {
    'click .delete-list' : 'deleteList',
    'click .delete-card' : 'deleteCard'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'remove', this.render);
  },

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  deleteCard: function (e) {
    e.preventDefault();
    var listId = $(e.currentTarget).data('list-id');
    var cardId = $(e.currentTarget).data('card-id');
    var card = this.model.lists().get(listId).cards().get(cardId)
    card.destroy();
    this.render();
  },

  deleteList: function (e) {
    e.preventDefault();
    var listId = $(e.currentTarget).data('list-id');
    var list = this.model.lists().get(listId);
    list.destroy();
  }
})

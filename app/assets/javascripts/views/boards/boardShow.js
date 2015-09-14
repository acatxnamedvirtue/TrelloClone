TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/boardShow'],
  events: {
    'click .delete-list' : 'deleteList',
    'click .delete-card' : 'deleteCard',
    'click .delete-board': 'deleteBoard',
    'sortbeforestop .lists' : 'updateOrder',
    'sortbeforestop .cards' : 'updateOrder'
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
  },

  deleteBoard: function (e) {
    this.model.destroy();
    Backbone.history.navigate("", {trigger: true});
  },

  updateOrder: function (e) {
    if (e.currentTarget.className.includes("list")) {
      var lists = this.$('.list');

      for(var i = 0; i < lists.length; i++) {
        if(lists[i].className.includes("placeholder")){ continue }
        var ord = $(lists[i]).data('ord');
        if (i + 1 != ord) {
          var listId = $(lists[i]).data('id');
          this.model.lists().get(listId).save({ord: i + 1})
        }
      }
    } else {
      var listId = $(e.currentTarget).data('list-id');
      var cards = $(e.currentTarget).find('.card');

      for(var i = 0; i < cards.length; i++) {
        if(cards[i].className.includes("placeholder")){ continue }
        var ord = $(cards[i]).data('ord');
        if (i + 1 != ord) {
          var cardId = $(cards[i]).data('card-id');
          this.model.lists().get(listId).cards().get(cardId).save({ord: i + 1})

        }
      }

    }
  }
})

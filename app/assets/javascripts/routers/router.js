TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "boardsIndex",
    "boards/new" : "boardNew",
    "boards/:id" : "boardShow",
    "boards/:id/lists/new" : "listNew",
    "boards/:boardId/lists/:listId/cards/new" : "cardNew"
  },

  initialize: function(options) {
    this.collection = options.collection;
    this.$rootEl = options.$rootEl;
  },

  boardsIndex: function () {
    var view = new TrelloClone.Views.BoardsIndex({ collection: this.collection });
    this._swapView(view);
  },

  boardNew: function () {
    var board = new TrelloClone.Models.Board();
    var view = new TrelloClone.Views.BoardNew({
      model: board,
      collection: this.collection
    });

    this._swapView(view);
  },

  boardShow: function (id) {
    var board = this.collection.getOrFetch(id);
    var view = new TrelloClone.Views.BoardShow({
      model: board,
      collection: this.collection
    });

    this._swapView(view)
  },

  listNew: function (id) {
    var board = this.collection.getOrFetch(id);
    var list = new TrelloClone.Models.List();
    var view = new TrelloClone.Views.ListNew({ model: list, board: board });

    this._swapView(view);
  },

  cardNew: function(boardId, listId) {
    var board = this.collection.getOrFetch(boardId);
    var list = board.lists().get(listId);
    var card = new TrelloClone.Models.Card();
    var view = new TrelloClone.Views.CardNew({ model: card, list: list });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})

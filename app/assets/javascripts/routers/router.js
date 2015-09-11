TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "boardsIndex",
    "boards/new" : "boardNew",
    "boards/:id" : "boardShow",
    "boards/:id/lists/new" : "listNew",
  },

  initialize: function(options) {
    this.collection = options.collection;
    this.$rootEl = options.$rootEl;
  },

  boardsIndex: function () {
    var view = new TrelloClone.Views.BoardsIndex({ collection: this.collection });
    this._swapView(view);
  },

  listNew: function (id) {
    var board = this.collection.getOrFetch(id);
    var lists = board.lists();
    var list = new TrelloClone.Models.Board();
    var view = new TrelloClone.Views.ListNew({
      model: list,
      board: board,
      collection: lists
    });

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

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})

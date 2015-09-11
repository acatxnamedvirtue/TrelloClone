TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "api/boards/",

  lists: function () {
    this._lists = this._lists || new TrelloClone.Collections.Lists();
    return this._lists;
  },

  parse: function(response) {
    if(response.lists) {
      this.lists().set(response.lists);
      delete response.lists;
      this.lists().each(function (list) {
        if(list.get('cards').length > 0) {
          list._cards = list._cards || new TrelloClone.Collections.Cards();
          list._cards.set(list.get('cards'));
        }
      })
    }

    return response;
  },

  toJSON: function () {
    return {board: _.clone(this.attributes)};
  }
})

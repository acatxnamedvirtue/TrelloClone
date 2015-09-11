TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,
  url: "api/lists/",

  cards: function() {
    this._cards = this._cards || new TrelloClone.Collections.Cards();
    return this._cards();
  },

  getOrFetch: function(id) {
    var model = this.get(id);
    var lists = this;

    if (model) {
      model.fetch();
    } else {
      model = new TrelloClone.Models.List({ id: id });
      lists.add(model);
      model.fetch({
        error: function() { lists.remove(model); }
      });
    }

    return model;
  }
});

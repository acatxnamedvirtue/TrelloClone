TrelloClone.Collections.Cards = Backbone.Collection.extend({
  model: TrelloClone.Models.Card,

  getOrFetch: function(id) {
    var model = this.get(id);
    var cards = this;

    if (model) {
      model.fetch();
    } else {
      model = new TrelloClone.Models.Card({ id: id });
      cards.add(model);
      model.fetch({
        error: function() { cards.remove(model); }
      });
    }

    return model
  }
})

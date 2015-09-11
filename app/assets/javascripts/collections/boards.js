TrelloClone.Collections.Boards = Backbone.Collection.extend({
  model: TrelloClone.Models.Board,
  url: 'api/boards/',

  getOrFetch: function(id) {
    var model = this.get(id);
    var boards = this;

    if (model) {
      model.fetch();
    } else {
      model = new TrelloClone.Models.Board({ id: id });
      boards.add(model);
      model.fetch({
        error: function() { boards.remove(model); }
      });
    }

    return model
  }
})

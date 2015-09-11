TrelloClone.Models.Card = Backbone.Model.extend({
  urlRoot: "api/cards",

  toJSON: function () {
    return {list: _.clone(this.attributes)};
  }
})

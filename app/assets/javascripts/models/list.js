TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",
  cards: function () {
    this._cards = this._cards ||
      new TrelloClone.Collections.Cards();
    return this._cards;
  },

  toJSON: function () {
    return {list: _.clone(this.attributes)};
  }
})

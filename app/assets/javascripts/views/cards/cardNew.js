TrelloClone.Views.CardNew = Backbone.CompositeView.extend({
  template: JST['cards/cardNew'],
  tagName: 'form',
  events: {
    'submit' : 'submit'
  },

  initialize: function (options) {
    this.list = options.list;
  },

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.target).serializeJSON();
    attrs.card.list_id = this.list.id;
    this.model.save(attrs.card, {
      success: function (card) {
        Backbone.history.navigate("#/boards/" + this.list.get('board_id'), {trigger: true});
      }.bind(this),
      error: function (model, response) {
        $('.errors').empty();
        response.responseJSON.forEach(function (error) {
          var $li = $('<li></li>');
          $li.text(el);
          $('.errors').append($li);
        }.bind(this));
      }.bind(this)
    });
  }
});

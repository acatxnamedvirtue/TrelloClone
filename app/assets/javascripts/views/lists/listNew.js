TrelloClone.Views.BoardNew = Backbone.CompositeView.extend({
  template: JST['lists/listNew'],
  tagName: 'form',
  events: {
    'submit' : 'submit'
  },

  initialize: function (options) {
    this.board = options.board;
  },

  render: function () {
    var content = this.template({ list: this.model, board: this.board });
    this.$el.html(content);
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.target).serializeJSON();

    this.model.save(attrs.list, {
      success: function (list) {
        this.collection.add(list);
        Backbone.history.navigate("#/boards/" + board.id + "/lists/" + list.id,
          {trigger: true});
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

TrelloClone.Views.BoardNew = Backbone.CompositeView.extend({
  template: JST['boards/boardNew'],
  events: {
    'submit' : 'submit'
  },

  tagName: 'form',

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.target).serializeJSON();

    this.model.save(attrs.board, {
      success: function (board) {
        this.collection.add(board);
        Backbone.history.navigate("#/boards/" + board.id, {trigger: true});
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

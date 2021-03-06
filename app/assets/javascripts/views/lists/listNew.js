TrelloClone.Views.ListNew = Backbone.CompositeView.extend({
  template: JST['lists/listNew'],
  tagName: 'form',
  events: {
    'submit' : 'submit'
  },

  initialize: function (options) {
    this.board = options.board;
  },

  render: function () {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.target).serializeJSON();
    attrs.list.board_id = this.board.id;
    this.model.save(attrs.list, {
      success: function (list) {
        Backbone.history.navigate("#/boards/" + list.get('board_id'), {trigger: true});
      }.bind(this),
      error: function (model, response) {
        $('.errors').empty();
        debugger
        response.responseJSON.forEach(function (error) {
          var $li = $('<li></li>');
          $li.text(el);
          $('.errors').append($li);
        }.bind(this));
      }.bind(this)
    });
  }
});

var mdlSnackbar = function(options) {
  var self = this;
};

Template.mdlSnackbar.onRendered(function(){
  var snackbarContainer = document.querySelector('#snackbar');
});

_.extend(mdlSnackbar.prototype, {
  show: function(message, actionText, timeout, options) {
    var snackbarContainer = document.querySelector('#snackbar'),
    //TODO refactor component to include a handler
        handler = function(e) {

        },
        timeout = timeout || 2000;
    this.options = _.extend({
      message: message,
      timeout: timeout,
      actionHandler: handler,
      actionText: actionText
    }, options);
    snackbarContainer.MaterialSnackbar.showSnackbar(this.options);
  }
});

Rvn.mdlSnackbar = new mdlSnackbar();

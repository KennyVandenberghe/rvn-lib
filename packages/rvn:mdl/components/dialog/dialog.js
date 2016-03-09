var mdlDialog = function() {
  var self = this;
  this.tpl = new ReactiveVar();
  this.tpl.set(false);
  this.dialog = new ReactiveVar();
  this.dialog.set(false);
}

Template.mdlDialog.onRendered(function(){
   var dialog = document.querySelector('dialog');
   if (dialog && ! dialog.showModal) {
     dialogPolyfill.registerDialog(dialog);
   }
});

_.extend(mdlDialog.prototype, {
  isOpen: function() {
    return !this.tpl.get() === false;
  },
  renderTemplate: function() {
    return this.tpl.get();
  },
  open: function(tpl, options) {
    var self = this;
    if (! self.isOpen()) {
      Meteor.defer(function() {
        self.dialog.set(document.querySelector('dialog'));
        self.dialog.get().showModal();
      });
    }
    this.tpl.set(tpl);
  },
  close: function() {
    this.tpl.set(false);
    this.dialog.get().close();
  }
});

Rvn.mdlDialog = new mdlDialog();

Template.mdlDialog.helpers({
  isOpen: function() {
    return Rvn.mdlDialog.isOpen();
  },
  renderTemplate: function() {
    return Rvn.mdlDialog.renderTemplate();
  }
});

Template.mdlDialog.events({
  'click .close': function(e, tpl){
     Rvn.mdlDialog.close();
  }
});

Rvn.mdlList = function(options) {
  this.options = _.extend({
    items: []
  }, options);
  this.items = new ReactiveVar(this.options.items);
  this.activeItem = new ReactiveVar();
};

_.extend(Rvn.mdlList.prototype, {
  setItems: function(items) {
    this.items.set(items);
  },
  getItems: function() {
    return this.items.get();
  },
  getActiveItem: function() {
    return this.activeItem.get();
  },
  setActiveItem: function(name) {
    this.activeItem.set(name);
  }
});

Template.mdlList.onCreated(function(){
  if (this.data && this.data.mdlList) {
    this.mdlList = this.data.mdlList;
  } else {
    this.mdlList = new Rvn.mdlList(this.data);
  }
});

Template.mdlList.helpers({
  getItems: function() {
    return this.mdlList.getItems();
  },
  renderActive: function() {
    var tpl = Template.instance();
    return tpl.mdlList.getActiveItem() === this.title ? '-active' : '';
  },
  getActiveItem: function() {
    return this.mdlList.getActiveItem();
  }
});

Rvn.mdlTabbar = function(options) {
  this.options = _.extend({
    items: []
  }, options);
  this.items = new ReactiveVar(this.options.items);
  this.activeItem = new ReactiveVar(false);
};

_.extend(Rvn.mdlTabbar.prototype, {
  setItems: function(items) {
    this.items.set(items);
  },
  getItems: function() {
    return this.items.get();
  },
  setActiveItem: function(item) {
    this.activeItem.set(item);
  },
  getActiveItem: function() {
    return this.activeItem.get();
  },
  getCurrentItem: function() {
    var c = _.indexOf(_.pluck(this.getItems(), 'slug'), this.getActiveItem());

    return c;
  },
  getNextItem: function() {
    var currentItem = this.getCurrentItem(),
        nextItem = _.findWhere(this.getItems(), {key: currentItem + 1});

    return nextItem;
  },
  getPreviousItem: function() {
    var currentItem = this.getCurrentItem(),
        previousItem = _.findWhere(this.getItems(), {key: currentItem - 1});

    return previousItem;
  },
  setNextItem: function() {
    this.setActiveItem(this.getNextItem().slug);
  },
  setPreviousItem: function() {
    this.setActiveItem(this.getPreviousItem().slug);
  }
});

Template.mdlTabbar.onCreated(function(){
   if (this.data && this.data.mdlTabbar) {
     this.mdlTabbar = this.data.mdlTabbar;
   } else {
     this.mdlTabbar = new Rvn.Tabbar(this.data);
   }
   this.mdlTabbar.setNextItem();
});

Template.mdlTabbar.helpers({
  getItems: function(){
    return this.mdlTabbar.getItems();
  },
  renderActive: function() {
    var tpl = Template.instance();
    return tpl.mdlTabbar.getActiveItem() === this.slug ? '-active' : '';
  }
});

Template.mdlTabbar.events({
  'click .mdl-layout__tab': function(e, tpl) {
    tpl.mdlTabbar.setActiveItem(this.slug);
  },
  'click .tab-bar-right-button': function(e, tpl) {
    tpl.mdlTabbar.setNextItem();
  },
  'click .tab-bar-left-button': function(e, tpl) {
    tpl.mdlTabbar.setPreviousItem();
  }
});

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
    //Router.go(item);
  },
  getActiveItem: function() {
    return this.activeItem.get();
  },
  getCurrentIndex: function() {
    var c = _.indexOf(_.pluck(this.getItems(), 'slug'), this.getActiveItem());

    return c;
  },
  getNextItem: function() {
    var currentIndex = this.getCurrentIndex(),
        nextItem = this.getItems()[currentIndex + 1];

    if (!! nextItem) {
      return nextItem;
    } else {
      return this.getItems()[0];
    }
  },
  getPreviousItem: function() {
    var currentIndex = this.getCurrentIndex(),
        previousItem = this.getItems()[currentIndex - 1];

    if (!! previousItem) {
      return previousItem;
    } else {
      return this.getItems()[(this.getItems().length - 1)];
    }
  },
  setNextItem: function() {
    var nextItem = this.getNextItem();
    if (!! nextItem && !! nextItem.slug) {
      this.setActiveItem(nextItem.slug);
    }
  },
  setPreviousItem: function() {
    this.setActiveItem(this.getPreviousItem().slug);
  },
  hasChevrons: function() {
    return this.chevrons.get();
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
  },
  hasChevrons: function() {
    return this.mdlTabbar.hasChevrons();
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

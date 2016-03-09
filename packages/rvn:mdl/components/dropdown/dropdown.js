Rvn.mdlDropdown = function(options) {
  this.options = _.extend({
    activeItem: 'Please select an option',
    items: []
  }, options);
  this.items = new ReactiveVar(this.options.items);
  this.visible = new ReactiveVar(false);
  this.activeItem = new ReactiveVar(this.options.activeItem);
};

_.extend(Rvn.mdlDropdown.prototype, {
  setItems: function(items) {
    this.items.set(items);
  },
  getItems: function() {
    return this.items.get();
  },
  isVisible: function() {
    return !! this.visible.get();
  },
  show: function() {
    this.visible.set(true);
  },
  hide: function() {
    this.visible.set(false);
  },
  toggleDropdown: function() {
    this.visible.set(!this.visible.get());
  },
  getActiveItem: function() {
    return this.activeItem.get();
  },
  setActiveItem: function(name) {
    this.activeItem.set(name);
  }
});

Template.mdlDropdown.onCreated(function(){
  if (this.data && this.data.mdlDropdown) {
    this.mdlDropdown = this.data.mdlDropdown;
  } else {
    this.mdlDropdown = new Rvn.mdlDropdown(this.data);
  }
  Session.setDefault('dropdownOpen', false);
});

Template.mdlDropdown.onRendered(function(){
  var self = this,
      componentHandler = window.componentHandler,
      cc = this.find('.dropdown-wrapper');
  if (cc) {
    cc._uihooks = {
      insertElement: function(node, next) {
        //componentHandler.upgradeElement(node);
        $(node).insertBefore(next).velocity('slideDown', {
          easing: [ 200, 20 ],
          duration: 1000,
          queue: false,
        });
      },
      removeElement: function(node) {
        $(node).velocity('slideUp', {
          duration: 300,
          queue: false,
          complete: function() {
            $(node).remove();
          }
        });
      }
    };
  }
});

Template.mdlDropdown.helpers({
  showDropdown: function() {
    return this.mdlDropdown.isVisible();
  },
  getItems: function() {
    return this.mdlDropdown.getItems();
  },
  renderActive: function() {
    var tpl = Template.instance();
    return tpl.mdlDropdown.getActiveItem() === this.title ? '-active' : '';
  },
  getActiveItem: function() {
    return this.mdlDropdown.getActiveItem();
  }
});

Template.mdlDropdown.events({
  'click .dropdown-toggle': function(e, tpl){
    tpl.mdlDropdown.toggleDropdown();
  },
  'click .record': function(e, tpl) {
    tpl.mdlDropdown.setActiveItem(this.title);
  }
});

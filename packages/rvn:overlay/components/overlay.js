var OverlayClass = function() {
  this.tpl = new ReactiveVar();
  this.tpl.set(false);

  this.data = new ReactiveVar();
  this.data.set(false);

  this.direction = new ReactiveVar();
  this.direction.set('bottom');

  this.uncloseable = new ReactiveVar();
  this.uncloseable.set(false);
}

_.extend(OverlayClass.prototype, {
  isOpen: function() {
    return !this.tpl.get() === false;
  },
  setUncloseable: function(uncloseable) {
    this.uncloseable.set(uncloseable);
  },
  isUncloseable: function() {
    return this.uncloseable.get();
  },
  renderTemplate: function() {
    return this.tpl.get();
  },
  setData: function(data) {
    this.data.set(data);
  },
  getData: function() {
    return this.data.get();
  },
  open: function(tpl, data, direction, uncloseable) {
    if (!! data) {
      this.setData(data);
    }
    this.tpl.set(tpl);
    direction = direction || 'bottom';
    this.setDirection(direction);
    this.setUncloseable(uncloseable);
  },
  close: function() {
    this.tpl.set(false);
  },
  setDirection: function(direction) {
    return this.direction.set(direction);
  },
  getDirection: function() {
    return this.direction.get();
  },
  transitionShow: function() {
    var d = this.getDirection();
    if (d === 'bottom') {
      return { translateY: [0, '100%'] };
    }
    if (d === 'top') {
      return { translateY: [0, '-100%'] };
    }
    if (d === 'left') {
      return { translateX: [0, '-100%'] };
    }
    return { translateX: [0, '100%'] };
  },
  transitionHide: function() {
    var d = this.getDirection();
    if (d === 'bottom') {
      return { translateY: '100%' };
    }
    if (d === 'top') {
      return { translateY: '-100%' };
    }
    if (d === 'left') {
      return { translateX: '-100%' };
    }
    return { translateX: '100%' };
  }
});

Rvn.overlay = new OverlayClass();

Template.overlay.onRendered(function(){
  var self = this,
      componentHandler = window.componentHandler,
      cc = this.find('.overlay-wrapper');
  if (cc) {
    cc._uihooks = {
      insertElement: function(node, next) {
        //componentHandler.upgradeElement(node);
        $(node).insertBefore(next).velocity(Rvn.overlay.transitionShow(), {
          easing: [ 200, 20 ],
          duration: 400,
          queue: false,
        });
      },
      removeElement: function(node) {
        $(node).velocity(Rvn.overlay.transitionHide(), {
          duration: 200,
          queue: false,
          complete: function() {
            $(node).remove();
          }
        });
      }
    };
  }
});

Template.overlay.helpers({
  isOpen: function() {
    return Rvn.overlay.isOpen();
  },
  isUncloseable: function() {
    return Rvn.overlay.isUncloseable();
  },
  renderTemplate: function() {
    return Rvn.overlay.renderTemplate();
  },
  getData: function() {
    return Rvn.overlay.getData();
  },
  getDirection: function() {
    return Rvn.overlay.getDirection();
  }
});

Template.overlay.events({
  'click .close': function(e, tpl){
     Rvn.overlay.close();
  }
});

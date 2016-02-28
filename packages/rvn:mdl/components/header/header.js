Rvn.mdlHeader = function(options) {
  this.options = _.extend({
    openIcon: {},
    closeIcon: {}
  }, options);
  this.openIcon = new ReactiveVar(this.options.openIcon);
  this.closeIcon = new ReactiveVar(this.options.closeIcon);
  this.open = new ReactiveVar(false);
};

_.extend(Rvn.mdlHeader.prototype, {
  setOpenIcon: function(icon) {
    this.openIcon.set(icon);
  },
  getOpenIcon: function() {
    return this.openIcon.get();
  },
  setCloseIcon: function(icon) {
    this.closeIcon.set(icon);
  },
  getCloseIcon: function() {
    return this.closeIcon.get();
  },
  isOpen: function() {
    return !! this.open.get();
  },
  open: function() {
    this.open.set(true);
  },
  close: function() {
    this.open.set(false);
  },
  toggleHeaderAction: function() {
    this.open.set(!this.open.get());
  }
});

Template.mdlHeader.onCreated(function(){
  if (this.data && this.data.mdlHeader) {
    this.mdlHeader = this.data.mdlHeader;
  } else {
    this.mdlHeader = new Rvn.mdlHeader(this.data);
  }
});

Template.mdlHeader.helpers({
  isOpen: function() {
    console.log('open');
    var tpl = Template.instance();
    return tpl.mdlHeader.isOpen();
  },
  getOpenIcon: function() {
    return this.mdlHeader.getOpenIcon();
  },
  getCloseIcon: function() {
    return this.mdlHeader.getCloseIcon();
  }
});

Template.mdlHeader.events({
  'click .action-in-overlay': function(e, tpl){
    tpl.mdlHeader.toggleHeaderAction();
    var header = tpl.find('.header-action-container'),
        button = tpl.find('.button-container'),
        state = tpl.mdlHeader.isOpen();
    if (! headerTop) {
      if ($('.header-action').offset().top > 0) {
        headerTop = $('.header-action-container').offset().top - $('.header-action').offset().top;
      } else {
        headerTop = $('.header-action-container').offset().top;
      }
    }

    $(header).addClass('-stretched');

    if (!! state) {
      $(header).velocity({
        top: '0',
        right: '0',
        backgroundColor: '#cccccc',
        backgroundColorAlpha: '1'
      }, {
        duration: 100
      }).velocity({
        width: '100vw',
        height: '100vh'
      }, {
        duration: 500
      });

      $(button).velocity({
        bottom: '20px',
        left: '50%',
        translateX: '-50%'
      }, {
        duration: 500
      });
    } else {
      $(header).velocity({
        width: '56px',
        height: '56px',
        backgroundColorAlpha: '0'
      }, {
        duration: 500
      }).velocity({
        top: headerTop,
        bottom: '-28px',
        right: '20px'
      }, {
        duration: 100
      });

      $(button).velocity({
        bottom: 'auto',
        left: 'auto',
        translateX: '0'
      }, {
        duration: 500
      });
    }
  }
});

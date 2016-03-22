Rvn.mdlCarousel = function(options) {
  this.items = new ReactiveVar(0);
  this.activeItem = new ReactiveVar(1);
  this.waiting = new ReactiveVar(5000);
  this.duration = new ReactiveVar(1000);
};

_.extend(Rvn.mdlCarousel.prototype, {
  addItem: function() {
    var items = this.items.get();
    this.items.set(items + 1);
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
  setWaitTime: function(time) {
    this.waiting.set(time);
  },
  getWaitTime: function() {

  },
  nextItem: function(tpl) {
    var i = this.getActiveItem(),
        items = this.getItems(),
        self = this;
    i = (i === items) ? 1 : ++i;
    self.activeItem.set(i);
    tpl.$('.carousel-wrapper').velocity({
      translateX: ['-' + (100 / items) + '%', 0]
    }, {
      duration: self.duration.get(),
      complete: function() {
        $(tpl.$('.carousel-item')[0])
          .insertAfter(tpl.$('.carousel-item')[items - 1]);
        tpl.$('.carousel-wrapper').css('transform', 'translateX(0)');
      }
    });
  },
  prevItem: function(tpl) {
    var i = this.getActiveItem(),
        items = this.getItems(),
        self = this;
    i = (i === 1) ? items : --i;
    self.activeItem.set(i);
    $(tpl.$('.carousel-item')[items - 1])
      .insertBefore(tpl.$('.carousel-item')[0]);
    tpl.$('.carousel-wrapper').css('transform', 'translateX(-' + (100 / items) + '%)');
    tpl.$('.carousel-wrapper').velocity({
      translateX: [0, '-' + (100 / items) + '%']
    }, {
      duration: self.duration.get()
    });
  }
});

Template.mdlCarousel.onCreated(function() {
  if (this.data && this.data.carousel) {
    this.carousel = this.data.carousel;
  } else {
    this.carousel = new Rvn.mdlCarousel(this.data);
  }
});

Template.mdlCarousel.onRendered(function() {
  var self = this;
  Meteor.setInterval(function() {
    self.carousel.nextItem(self);
  }, self.carousel.waiting.get());
});

Template.mdlCarouselItem.onCreated(function() {
  this.data.carousel.addItem();
});


Template.mdlCarousel.helpers({
  getContainerWidth: function() {
    return Template.instance().carousel.getItems() * 100 + '%';
  },
  getContext: function() {
    return {
      carousel: Template.instance().carousel
    };
  },
  getItems: function() {
    var items = Template.instance().carousel.getItems(),
        itemArray = [],
        self = this;
    for (i = 1; i <= items; i++) {
      var item = {};
      _.extend(item, {item: i});
      if (i === Template.instance().carousel.getActiveItem()) {
        _.extend(item, {active: '-active'});
      }
      itemArray.push(item);
    };
    return itemArray;
  },
  getActiveItem: function() {
    return Template.instance().carousel.getActiveItem();
  }
});

Template.mdlCarouselItem.helpers({
  getItemWidth: function() {
    return 100 / Template.instance().data.carousel.getItems() + '%';
  }
});

Template.mdlCarousel.events({
  'click .carousel-previous': function(e, tpl) {
    var currentItem = tpl.carousel.getActiveItem();
    tpl.carousel.prevItem(tpl);
    if (currentItem === 1) {
      tpl.carousel.setActiveItem(tpl.carousel.getItems());
    } else {
      tpl.carousel.setActiveItem(currentItem - 1);
    }
  },
  'click .carousel-next': function(e, tpl) {
    var currentItem = tpl.carousel.getActiveItem();
    tpl.carousel.nextItem(tpl);
    if (currentItem === tpl.carousel.getItems()) {
      tpl.carousel.setActiveItem(1);
    } else {
      tpl.carousel.setActiveItem(currentItem + 1);
    }
  }
});

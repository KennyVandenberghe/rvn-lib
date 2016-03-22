Responsive = {};

Session.setDefault('responsive-device', 'phone');

measureVPWidth = function(){
  var wrapper = $('#viewportContainer');
  if(wrapper && wrapper.width){
    var w = wrapper.width();
    var ff = 'phone';
    if(w > 600){
      if(w < 1024){
        ff = 'tablet';
      } else {
        ff = 'desktop';
      }
    }
    Session.set('responsive-formfactor', ff);
    Session.set('responsive-viewport-width', w);
  }
};

measureDeviceWidth = function() {
  var w = Responsive.measureDeviceWidth();
  var ff = 'phone';

  // if(w < 1024){
  //   //phone
  // } else {
  //   //can be phone, tablet or desktop
  //   //check height, for orientation
  //   var h = Responsive.measureDeviceHeight();
  //   if(h < w){
  //     //landscape

  //   } else {
  //     //portrait
      
  //   }
  // }


  if(w > 768){
    if(w <= 1024){
      ff = 'tablet';
    } else {
      ff = 'desktop';
    }
  }
  Session.set('responsive-device', ff);
  Session.set('responsive-formfactor', ff);
  Session.set('responsive-device-width', w);
};

Meteor.startup(function(){
  $(window).bind('resize orientationchange', _.throttle(function(){
    measureDeviceWidth();
  }, 300));
  measureDeviceWidth();
});

iterativeMeasuring = function(delay){
  if(!delay)
    delay = 100;

  Meteor.setTimeout(function(){
    var wrapper = $('#viewportContainer');
    if(wrapper && wrapper.width && wrapper.width() !== null){
      measureVPWidth();
    } else {
      iterativeMeasuring(3*delay);
    }
  },delay);
};

Responsive.measureVPWidth = function(){
  measureVPWidth();
};

Responsive.getViewportWidth = function(){
  return Session.get('responsive-viewport-width');
};

Responsive.getDeviceWidth = function(){
  return Session.get('responsive-device-width');
};

Responsive.pixelRatio = function() {
  window.devicePixelRatio = window.devicePixelRatio || (window.screen.availWidth / document.documentElement.clientWidth);
  return window.devicePixelRatio;
};

Responsive.measureDeviceWidth = function() {
  if(Responsive.isWindowsMobile())
    return document.documentElement.clientWidth;
  if(Responsive.isAndroidStock()){
    return (window.screen.availWidth / pixelRatio());
  }
  if(Responsive.isIos()){
    return window.innerWidth;
    // if(window.innerWidth < window.innerHeight)
    //   return window.screen.availWidth;
    // else {
    //   return window.screen.availHeight;
    // }
  }

  return $(window).width();
};

Responsive.formFactor = function() {
  return Session.get('responsive-formfactor');
};

Responsive.deviceWidth = function() {
  return Session.get('responsive-device-width');
};

Responsive.notDesktop = function() {
  return !Session.equals('responsive-formfactor', 'desktop');
};

Responsive.desktop = function() {
  return Session.equals('responsive-formfactor', 'desktop');
};

Responsive.notPhone = function() {
  return !Session.equals('responsive-formfactor', 'phone');
};

Responsive.phone = function() {
  return Session.equals('responsive-formfactor', 'phone');
};

Responsive.isPhone = Responsive.phone;

Responsive.smallScreen = function() {
  return ! Session.equals('responsive-device', 'desktop');
};

Responsive.largeScreen = function() {
  return Session.equals('responsive-device', 'desktop');
};

Responsive.isRetina = function() {
  return (window.devicePixelRatio > 1);
};

Responsive.isTouch = function() {
  //uuh? fals eon windows mobile?
  return Modernizr.touch;
  //return $('html').hasClass('touch');
};

Responsive.isIos = function() {
  var i = 0,
    iOS = false,
    iDevice = ['iPad', 'iPhone', 'iPod'];

  for ( ; i < iDevice.length ; i++ ) {
    if( navigator.platform === iDevice[i] ){ iOS = true; break; }
  }
  return iOS;
};

Responsive.isStandalone = function(){
  return (Responsive.isIos() && window.navigator.standalone);
};

Responsive.device = function(){
  return navigator.platform;
};

Responsive.isAndroidStock = function() {
  var ua = navigator.userAgent.toLowerCase();
  return ((ua.indexOf("android") > -1) && (ua.indexOf("crmo") !== -1));
};

Responsive.isWindowsMobile = function() {
  return (Responsive.phone() && navigator.platform == "Win32");
};

UI.registerHelper("Responsive", function () {
  return Responsive;
});

//TODO: remove
Handlebars.registerHelper("isPhone", function () {
  return Responsive.phone();
});

Handlebars.registerHelper("notPhone", function () {
  return Responsive.notPhone();
});

Handlebars.registerHelper("isTablet", function () {
  return Session.get('responsive-formfactor') === 'tablet';
});

Handlebars.registerHelper("isDesktop", function () {
  return Session.get('responsive-formfactor') === 'desktop';
});

Handlebars.registerHelper("notDesktop", function () {
  return Responsive.notDesktop();
});

Handlebars.registerHelper("isTouch", function () {
  return Modernizr.touch;
});

Handlebars.registerHelper("isIOS", function () {
  return Responsive.isIos();
});

Handlebars.registerHelper("isStandalone", function () {
  return Responsive.isStandalone();
});

Handlebars.registerHelper("showInstall", function () {
  return Responsive.isIos() && ! Responsive.isStandalone();
});

Handlebars.registerHelper("device", function () {
  return Responsive.device();
});

Handlebars.registerHelper("responsiveFormFactor", function () {
  return Session.get('responsive-formfactor');
});
(function($){
  $.fn.tileGrid = function() {
    return this
      .attr('unselectable', 'on')
      .css('user-select', 'none')
      .on('selectstart', false);
  };
})(jQuery);
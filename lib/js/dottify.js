$(function($) {
    $.fn.dottify = function(options) {
      var settings = $.extend({
        max: 30,
        dots: "..."
      }, options);

      return this.each(function() {
        var $this = $(this);
        var short = settings.max < 30,
          long = settings.max > 30;
        var str = $this.text(),
          max = settings.max,
          dots = settings.dots;

        if (str.length > max) {
          if (short) {
            newStrS = str.substring(0, max - dots.length) + dots;
            $this.text(newStrS);
            return this;
          } else if (long) {
            newStr = str.substring(0, max - dots.length) + dots;
            $this.text(newStr);
            return this;
          }
        }
      });
    };
  });
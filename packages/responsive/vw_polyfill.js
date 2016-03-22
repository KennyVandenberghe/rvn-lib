/**
* Polyfill for the vw, vh, vm units
* Requires StyleFix from -prefix-free http://leaverou.github.com/prefixfree/
* @author Lea Verou
*/

(function() {

   if(!window.StyleFix) {
     return;
   }

   // Feature test
   var dummy = document.createElement('_').style,
     units = ['vw', 'vh'].filter(function(unit) {
       dummy.width = '';
       dummy.width = '10' + unit;
       return !dummy.width;
     });

   if(!units.length) {
     return;
   }

   window.StyleFix.register(function (css) {
     var w = innerWidth, h = innerHeight, m = Math.min(w,h);
     // For help with this monster regex: see debuggex.com, then input (-?[a-z]+(-[a-z]+)*\s*:\s*)\b([0-9]*\.?[0-9]+)(vw|vh|vm)\b(\s*;.\s*(-?[a-z]+(-[a-z]+)*\s*:\s*)\b([0-9]*\.?[0-9]+)(px)\b)?
     return css.replace(RegExp('(-?[a-z]+(-[a-z]+)*\\s*:\\s*)\\b([0-9]*\\.?[0-9]+)(' + units.join('|') + ')\\b(\\s*;.\\s*(-?[a-z]+(-[a-z]+)*\\s*:\\s*)\\b([0-9]*\\.?[0-9]+)(px)\\b)?', 'gi'), function(match, property, sub_property, num, unit, prev_result, property_2, sub_property_2, num_2, unit_2) {
       switch (unit) {
         case 'vw':
           var value = (num * w / 100) + 'px';
           break;
         case 'vh':
           var value = (num * h / 100) + 'px';
           break;
         case 'vm':
           var value = (num * m / 100) + 'px';
           break;
       }
       return property + num + unit + ';' + property + value;
     });
   });
})();
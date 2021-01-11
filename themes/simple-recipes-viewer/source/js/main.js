document.addEventListener( 'DOMContentLoaded', function() {

  'use strict';

  /*

      Disable rollover on touch devices

  */

  var isTouch = false;

  if ( ( 'ontouchstart' in window ) || ( navigator.MaxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 ) ) {
    document.body.classList.add( 'touch' );
    isTouch = true;
  }

  /*

      Main setup

  */

  window.sidebar.enable();

  if ( window.nav.isEnabled() ) {
    window.quantity.setup();
    if ( location.hash ) {
      location = location.hash;
      setTimeout(function(){
        window.nav.setup();
      }, 1000 );
    } else window.nav.setup();
  }

  if ( !isTouch ) {
    window.tooltips.setup();
    document.onkeydown = window.getKey;
  }

});
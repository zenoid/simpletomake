document.addEventListener( 'DOMContentLoaded', function() {

  'use strict';

  /*

      Keyboard actions

  */

  function recipeKeyNav( e )
  {
    e = e || window.event;
    var k = e.keyCode;

    // All Pages
    switch ( k ) {
      case 8:
        if ( window.sidebar.isOpen() ) {
          window.sidebar.close();
        } else {
          window.sidebar.open();
        }
        break;
      case 37:
      case 38:
        e.preventDefault();
        if ( window.sidebar.isOpen() ) {
          window.sidebar.goUp();
        } else {
          window.nav.prev();
        }
        break;
      case 39:
      case 40:
        e.preventDefault();
        if ( window.sidebar.isOpen() ) {
          window.sidebar.goDown();
        } else {
          window.nav.next();
        }
        break;
    }
    if ( !window.nav.isEnabled() ) return;

    // Only Recipe Pages
    switch ( k ) {
      case 32:
      case  9:
        e.preventDefault();
        window.nav.cycle();
        break;
      case 49:
        window.nav.go( 1 );
        break;
      case 50:
        window.nav.go( 2 );
        break;
      case 51:
        window.nav.go( 3 );
        break;
      case 52:
        window.nav.go( 4 );
        break;
      case 53:
        window.nav.go( 5 );
        break;
      case 189:
        window.quantity.remove();
        break;
      case 187:
        window.quantity.add();
        break;
    }
  }

  /* ----------------------------- */

  window.getKey = recipeKeyNav;

});
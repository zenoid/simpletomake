document.addEventListener( 'DOMContentLoaded', function() {

  'use strict';

  /*

      Keyboard actions

  */

  function recipeKeyNav( e )
  {
    e = e || window.event;
    var k = e.key;

    // All Pages
    switch ( k ) {
      case 'Tab':
        if ( window.sidebar.isOpen() ) {
          window.sidebar.close();
        } else {
          window.sidebar.open();
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        if ( window.sidebar.isOpen() ) {
          window.sidebar.goUp();
        } else {
          window.nav.prev();
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
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
      case ' ':
        e.preventDefault();
        window.nav.cycle();
        break;
      case '1':
        window.nav.go( 1 );
        break;
      case '2':
        window.nav.go( 2 );
        break;
      case '3':
        window.nav.go( 3 );
        break;
      case '4':
        window.nav.go( 4 );
        break;
      case '5':
        window.nav.go( 5 );
        break;
      case '-':
        window.quantity.remove();
        break;
      case '+':
        window.quantity.add();
        break;
    }
  }

  /* ----------------------------- */

  window.getKey = recipeKeyNav;

});
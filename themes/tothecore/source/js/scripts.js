document.addEventListener( 'DOMContentLoaded', function() {

  'use strict';

  /*

      Disable rollover on touch devices

  */

  if ( ( 'ontouchstart' in window ) || ( navigator.MaxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 ) ) {
    document.body.classList.add( 'touch' );
  }

  /*

      Recipe navigation

  */

  function enableRecipeNav()
  {
    var aItems = document.querySelectorAll( 'nav a' ),
      liItems = document.querySelectorAll( 'nav li' );
    for ( var i = 0; i < aItems.length; i++ ){
      aItems[ i ].addEventListener( 'click', function( e ){
        e.preventDefault();
        window.location.replace( '#' + e.target.text );
        window.history.replaceState( null, null, '' );
        for ( var j = 0; j < liItems.length; j++ ){
          liItems[ j ].classList.remove( 'selected' );
        }
        this.parentNode.classList.add( 'selected' );
      });
    }
  }

  if ( document.querySelector( 'nav' ) ) enableRecipeNav();

  /*

      Recipe sections colors

  */

  var header,
    footer,
    screens,
    scroller,
    wh,
    yPos = [];

  function checkScroll()
  {
    // var scr = scroller.scrollTop,
    //   i = 0,
    //   headerStyle = '';
    // while ( scr > yPos[ i ]-48 ) {
    //   i++;
    // }
    // if ( screens[ i-1 ].dataset.color ) {
    //   headerStyle = '--color-nav: #' + screens[ i-1 ].dataset.color + ';';
    // }
    // if ( screens[ i-1 ].dataset.lightmenu ) {
    //   headerStyle += '--color-navlabels: #FFF;';
    // }
    // header.style = headerStyle;
  };

  function calcHeights()
  {
    // wh = window.innerHeight;
    // for ( var s = 0; s < screens.length; s++ ) {
    //   yPos[ s ] = screens[ s ].offsetTop;
    // }
    // yPos[ 0 ] = 0;
    // checkScroll();
  }

  if ( document.querySelector( 'section' ) ) {
    window.onresize = calcHeights;
    window.onscroll = checkScroll;
    calcHeights();
  }

});
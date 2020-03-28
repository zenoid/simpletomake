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

  var article = document.querySelector( 'article' ),
    sections = document.querySelectorAll( 'section' ),
    aItems = document.querySelectorAll( 'nav a' ),
    winh = window.innerHeight,
    scrolling;

  function enableRecipeNav()
  {
    for ( var i = 0; i < aItems.length; i++ ){
      aItems[ i ].addEventListener( 'click', function( e ){
        e.preventDefault();
        setRecipeNav( +this.parentNode.dataset.num );
        clearInterval( scrolling );
        scrolling = setTimeout( function(){ clearInterval( scrolling ); scrolling = null; }, 1000 );
        document.getElementById( this.text ).scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState( null, null, '#' + this.text );
      });
    }
  }

  function setRecipeNav( num )
  {
    var liItems = document.querySelectorAll( 'nav li' );
    for ( var i = 0; i < liItems.length; i++ ){
      liItems[ i ].classList.remove( 'selected' );
    }
    liItems[ num-1 ].classList.add( 'selected' );
  }

  function getSection()
  {
    var i = 0;
    while ( ( i < 5 ) && ( document.documentElement.scrollTop > sections[ i ].offsetTop - winh/2 ) ) {
      i++;
    }
    return i;
  }

  function checkScroll()
  {
    var s = getSection(),
      hash = location.hash;
    article.className = 'section' + s;
    if ( !scrolling && hash != '#' + aItems[ s-1 ].text ) {
      window.history.replaceState( null, null, '#' + aItems[ s-1 ].text );
      setRecipeNav( s );
    }
  };

  function calcHeight()
  {
    winh = window.innerHeight;
    checkScroll();
  }

  if ( sections ) {
    window.onresize = calcHeight;
    window.onscroll = checkScroll;
    enableRecipeNav();
    if ( location.hash ) {
      var s = getSection();
      article.className = 'section' + s;
      setRecipeNav( s );
    }
  }

});
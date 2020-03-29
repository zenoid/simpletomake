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
    navItems = document.querySelectorAll( 'nav a' ),
    footer = document.querySelector( 'footer' ),
    nextBtn = document.querySelector( '.article-nav .btn-main' ),
    winh = window.innerHeight,
    scrolling;

  function enableRecipeNav()
  {
    for ( var i = 0; i < navItems.length; i++ ){
      navItems[ i ].addEventListener( 'click', function( e ){
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

  function getSection( diff = 0 )
  {
    var i = 0;
    while ( ( i < 5 ) && ( document.documentElement.scrollTop > sections[ i ].offsetTop - winh/2 ) ) {
      i++;
    }
    return { num: i+diff, label: ( i+diff <= 5)? navItems[ i-1+diff ].text : '' };
  }

  function checkScroll()
  {
    var s = getSection(),
      hash = location.hash;
    article.className = 'section' + s.num;
    if ( document.documentElement.scrollTop + winh - 100 < footer.offsetTop ) {
      if ( !scrolling && hash != '#' + s.label ) {
        window.history.replaceState( null, null, '#' + s.label );
        setRecipeNav( s.num );
      }
      nextBtn.classList.remove( 'hidden' );
    } else {
      if ( !scrolling && hash != '' ) {
        window.history.replaceState( null, null, ' ' );
      }
      nextBtn.classList.add( 'hidden' );
    }
  };

  function calcHeight()
  {
    winh = window.innerHeight;
    checkScroll();
  }

  function enableContinue()
  {
    nextBtn.addEventListener( 'click', function(){
      var s = getSection( +1 ),
        el, hash;
      if ( s.label ) {
        setRecipeNav( s.num );
        el = document.getElementById( s.label );
        hash = '#' + s.label;
      } else {
        el = footer;
        hash = ' ';
      }
      clearInterval( scrolling );
      scrolling = setTimeout( function(){ clearInterval( scrolling ); scrolling = null; }, 1000 );
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState( null, null, hash );
    });
  }

  if ( sections ) {
    window.onresize = calcHeight;
    window.onscroll = checkScroll;
    enableRecipeNav();
    enableContinue();
    if ( location.hash ) {
      var s = getSection();
      article.className = 'section' + s.num;
      setRecipeNav( s.num );
    }
  }

});
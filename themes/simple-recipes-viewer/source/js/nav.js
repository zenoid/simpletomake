document.addEventListener( 'DOMContentLoaded', function() {

  'use strict';

  /*

      Recipe navigation

  */

  var sectionsNum = document.querySelectorAll( 'section' ).length,
    article = document.querySelector( 'article' ),
    sections = document.querySelectorAll( 'section' ),
    navLinks = document.querySelectorAll( '.navdots li' ),
    navItems = Array.from( sections ).map( s => s.id ),
    prevBtn = document.getElementById( 'btn-prev' ),
    nextBtn = document.getElementById( 'btn-next' ),
    scroller,
    winHeight,
    scrolling;

  function scrollToSection( el, hash )
  {
    clearInterval( scrolling );
    scrolling = setTimeout( function(){ clearInterval( scrolling ); scrolling = null; }, 1000 );
    el = el || document.querySelector( '.recipeheader' );
    el.scrollIntoView({
      behavior: 'smooth'
    });
    window.history.replaceState( null, null, hash !== '#'? hash : ' ' );
  }

  function navAction( num )
  {
    setRecipeNav( num );
    scrollToSection( document.getElementById( navItems[ num-1 ] ), '#' + navItems[ num-1 ] );
  }

  function setRecipeNav( num )
  {
    if ( num > 1 ) {
      prevBtn.disabled = false;
    } else {
      prevBtn.disabled = true;
    }
    Array.from( navLinks ).forEach( li => {
      li.classList.remove( 'selected' );
    });
    if ( num > 0 ) {
      navLinks[ num - 1 ].classList.add( 'selected' );
    }
  }

  function nextBtnAction()
  {
    var s = getSection( +1 ),
      el, hash;
    if ( s.num <= sectionsNum ) {
      setRecipeNav( s.num );
      el = document.getElementById( s.label );
      hash = '#' + s.label;
      scrollToSection( el, hash );
    }
  }

  function prevBtnAction()
  {
    var s = getSection( -1 ),
      el, hash;
    if ( s.num > 0 ) {
      setRecipeNav( s.num );
      el = document.getElementById( s.label );
      hash = '#' + s.label;
      scrollToSection( el, hash );
    }
  }

  function cycleNav()
  {
    if ( getSection().num > sectionsNum-1 ) {
      navAction( 1 );
    } else {
      nextBtnAction();
    }
  }

  function enableArrowNav()
  {
    nextBtn.addEventListener( 'click', nextBtnAction );
    prevBtn.addEventListener( 'click', prevBtnAction );
  }

  function getSection( diff = 0 )
  {
    var i = 1;
    while ( ( i < sectionsNum ) && ( scroller.scrollTop > sections[ i ].offsetTop - winHeight/2 ) ) {
      i++;
    }
    return { num: i+diff, label: ( i+diff > 0 && i+diff <= sectionsNum )? navItems[ i-1+diff ] : '' };
  }

  function checkScroll()
  {
    var s = getSection(),
      hash = location.hash;
    if ( s.num <= sectionsNum ) {
      article.className = 'section' + s.num;
      if ( !scrolling && hash != '#' + s.label ) {
        var h = '#' + s.label;
        window.history.replaceState( null, null, h !== '#'? h : ' ' );
        setRecipeNav( s.num );
      }
      nextBtn.disabled = ( s.num >= sectionsNum )
    } else {
      if ( !scrolling && hash != '' ) {
        window.history.replaceState( null, null, ' ' );
      }
      nextBtn.disabled = true;
    }
  }

  function setupMainEl()
  {
    if ( scroller ) {
      scroller.onscroll = null;
    }
    window.onscroll = null;
    if ( document.querySelector( 'nav' ).offsetWidth <= 64 ) {
      scroller = document.querySelector( '.main' );
      winHeight = scroller.offsetHeight;
      scroller.onscroll = checkScroll;
    } else {
      scroller = document.documentElement;
      winHeight = window.innerHeight;
      window.onscroll = checkScroll;
    }
    checkScroll();
  }

  function setup()
  {
    setupMainEl();
    window.onresize = setupMainEl;
    enableArrowNav();
    nextBtn.disabled = false;
    if ( location.hash ) {
      var s = getSection();
      article.className = 'section' + s.num;
      setRecipeNav( s.num );
    } else {
      setRecipeNav( 1 );
    }
  }

  /* ----------------------------- */

  window.nav = {
    setup: setup,
    prev: prevBtnAction,
    next: nextBtnAction,
    cycle: cycleNav,
    go: navAction,
    isEnabled: function(){
      return sectionsNum > 0;
    }
  };

});
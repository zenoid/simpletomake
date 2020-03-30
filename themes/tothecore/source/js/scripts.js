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

  /*

      Recipe calculation

  */

  var weightRatio,
    qtyLabels,
    qtyValue,
    qtyRemoveBtn,
    qtyAddBtn;

  function setupQty()
  {
    weightRatio = recipeWeight / recipeVolume;
    qtyLabels = document.querySelectorAll( '[data-qty]' );
    qtyValue = document.getElementById( 'qtyValue' );
    qtyRemoveBtn = document.getElementById( 'qtyRemove' );
    qtyAddBtn = document.getElementById( 'qtyAdd' );
    calcQty();
    qtyRemoveBtn.addEventListener( 'click', function(){
      recipeVolume = Math.max( 100, recipeVolume-100 );
      calcQty();
    });
    qtyAddBtn.addEventListener( 'click', function(){
      recipeVolume = Math.min( 10000, recipeVolume+100 );
      calcQty();
    });
  }

  function calcQty()
  {
    var i, qty, f;
    recipeWeight = recipeVolume * weightRatio;
    qtyValue.textContent = recipeVolume + ' ml';
    for ( i in ingredients ) {
      qty = Math.round( recipeWeight * ingredients[ i ].ratio / 100 );
      if ( String( qty ).length > 2 ) {
        f = Math.pow( 10, String( qty ).length - 2 );
        qty = Math.round( qty / f ) * f;
      }
      ingredients[ i ].qty = qty;
    }
    for ( i = 0; i < qtyLabels.length; i++ ) {
      if ( ingredients[ qtyLabels[ i ].dataset.qty ] ) {
        qtyLabels[ i ].textContent = ingredients[ qtyLabels[ i ].dataset.qty ].qty;
      }
      if ( qtyLabels[ i ].dataset.qty === 'volume' ) {
        qtyLabels[ i ].textContent = recipeVolume;
      }
    }
  }

  if ( ingredients ) {
    setupQty();
  }

  /*

      Recipe: exclude ingredients

  */

  function enableIngrExclude()
  {
    var btns = document.querySelectorAll( '.card-header .btn' );
    for ( var i = 0; i < btns.length; i++ ) {
      btns[ i ].addEventListener( 'click', function(){
        var c = this.parentNode.parentNode;
        if ( c.classList.contains( 'card-disabled' ) ) {
          c.classList.remove( 'card-disabled' );
        } else {
          c.classList.add( 'card-disabled' );
          // ingredients.glic.ratio = 0;
          calcQty();
        }
      });
    }
  }

  if ( document.querySelectorAll( '.card-header .btn' ).length > 0 ) {
    enableIngrExclude();
  }

});
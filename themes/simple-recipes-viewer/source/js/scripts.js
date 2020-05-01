document.addEventListener( 'DOMContentLoaded', function() {

  'use strict';

  /*

      Disable rollover on touch devices

  */

  if ( ( 'ontouchstart' in window ) || ( navigator.MaxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 ) ) {
    document.body.classList.add( 'touch' );
  }

  /*

      Recipe calculation

  */

  var weightRatio,
    unitVolume,
    ingrMin = 100,
    ingrMax = 10000,
    ingrStep = 100,
    ingrPrec = 2,
    qtyLabels,
    qtyValue,
    qtyRemoveBtn,
    qtyAddBtn,
    hasUnits = false;

  function removeQty()
  {
    if ( hasUnits ) {
      recipeUnits = Math.max( ingrMin, recipeUnits - ingrStep );
    } else {
      recipeVolume = Math.max( ingrMin, recipeVolume - ingrStep );
    }
    calcQty();
  }

  function addQty()
  {
    if ( hasUnits ) {
      recipeUnits = Math.min( ingrMax, recipeUnits + ingrStep );
    } else {
      recipeVolume = Math.min( ingrMax, recipeVolume + ingrStep );
    }
    calcQty();
  }

  function setupQty()
  {
    hasUnits = ( typeof recipeUnits !== 'undefined' );
    weightRatio = recipeWeight / recipeVolume;
    if ( hasUnits ) {
      unitVolume = recipeVolume / recipeUnits;
      ingrMin  = 1;
      ingrMax  = 100;
      ingrStep = 1;
    }
    if ( typeof recipeRange !== 'undefined' ) {
      ingrMin  = recipeRange[ 0 ];
      ingrMax  = recipeRange[ 1 ];
      ingrStep = recipeRange[ 2 ];
    }
    if ( typeof recipePrecision !== 'undefined' ) {
      ingrPrec = recipePrecision;
    }
    qtyLabels = document.querySelectorAll( '[data-qty]' );
    qtyValue = document.getElementById( 'qtyValue' );
    qtyRemoveBtn = document.getElementById( 'qtyRemove' );
    qtyAddBtn = document.getElementById( 'qtyAdd' );
    qtyRemoveBtn.addEventListener( 'click', removeQty );
    qtyAddBtn.addEventListener( 'click', addQty );
    calcQty();
  }

  function round( qty, prec )
  {
    var f,
      q = Math.round( qty );
    if ( String( q ).length > prec ) {
      f = Math.pow( 10, String( q ).length - prec );
      q = Math.round( q / f ) * f;
    }
    return q;
  }

  function calcQty()
  {
    var i, qty, f;
    if ( hasUnits ) {
      recipeVolume = unitVolume * recipeUnits;
      recipeWeight = recipeVolume * weightRatio;
      qtyValue.textContent = recipeUnits;
    } else {
      recipeWeight = recipeVolume * weightRatio;
      qtyValue.textContent = recipeVolume;
    }
    for ( i in ingredients ) {
      qty = round( recipeWeight * ingredients[ i ].ratio / 100, ingrPrec );
      ingredients[ i ].qty = qty;
    }
    for ( i = 0; i < qtyLabels.length; i++ ) {
      if ( ingredients[ qtyLabels[ i ].dataset.qty ] ) {
        qty = ingredients[ qtyLabels[ i ].dataset.qty ].qty;
        if ( qtyLabels[ i ].dataset.prec ) {
          qty = round( qty, qtyLabels[ i ].dataset.prec );
        }
        qtyLabels[ i ].textContent = qty;
      }
      if ( qtyLabels[ i ].dataset.qty === 'volume' ) {
        qtyLabels[ i ].textContent = recipeVolume;
      }
      if ( qtyLabels[ i ].dataset.qty === 'units' ) {
        qtyLabels[ i ].textContent = recipeUnits;
      }
    }
  }

  /*

      Recipe navigation

  */

  var sectionsNum = 5,
    article = document.querySelector( 'article' ),
    sections = document.querySelectorAll( 'section' ),
    navItems = document.querySelectorAll( 'nav a' ),
    footer = document.querySelector( 'footer' ),
    prevBtn = document.getElementById( 'btn-prev' ),
    nextBtn = document.getElementById( 'btn-next' ),
    winh = window.innerHeight,
    scrolling;

  function scrollToSection( el, hash )
  {
    clearInterval( scrolling );
    scrolling = setTimeout( function(){ clearInterval( scrolling ); scrolling = null; }, 1000 );
    el.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState( null, null, hash );
  }

  function navAction( num )
  {
    setRecipeNav( num );
    scrollToSection( document.getElementById( navItems[ num-1 ].text ), '#' + navItems[ num-1 ].text );
  }

  function enableRecipeNav()
  {
    for ( var i = 0; i < navItems.length; i++ ){
      navItems[ i ].addEventListener( 'click', function( e ){
        e.preventDefault();
        navAction( +this.parentNode.dataset.num );
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
    if ( num > 1 ) {
      prevBtn.classList.remove( 'hidden' );
    } else {
      prevBtn.classList.add( 'hidden' );
    }
  }

  function nextBtnAction()
  {
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
    scrollToSection( el, hash );
  }

  function prevBtnAction()
  {
    var s = getSection( -1 ),
      el, hash;
    if ( s.label ) {
      setRecipeNav( s.num );
      el = document.getElementById( s.label );
      hash = '#' + s.label;
      scrollToSection( el, hash );
    }
  }

  function enableArrowNav()
  {
    nextBtn.addEventListener( 'click', nextBtnAction );
    prevBtn.addEventListener( 'click', prevBtnAction );
  }

  function getSection( diff = 0 )
  {
    var i = 0;
    while ( ( i < sectionsNum ) && ( document.documentElement.scrollTop > sections[ i ].offsetTop - winh/2 ) ) {
      i++;
    }
    if ( document.documentElement.scrollTop + winh - 100 > footer.offsetTop ) {
      i = sectionsNum + 1;
    }
    return { num: i+diff, label: ( i+diff > 0 && i+diff <= sectionsNum )? navItems[ i-1+diff ].text : '' };
  }

  function checkScroll()
  {
    var s = getSection(),
      hash = location.hash;
    if ( s.num <= sectionsNum ) {
      article.className = 'section' + s.num;
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

  function setupNav()
  {
    window.onresize = calcHeight;
    window.onscroll = checkScroll;
    enableRecipeNav();
    setRecipeNav( 1 );
    enableArrowNav();
    nextBtn.classList.remove( 'hidden' );
    if ( location.hash ) {
      var s = getSection();
      article.className = 'section' + s.num;
      setRecipeNav( s.num );
    }
  }

  /*

      Keyboard actions

  */

  function recipeKeyNav( e )
  {
    e = e || window.event;
    var k = e.keyCode;
    switch ( k ) {
      case 37:
        e.preventDefault();
        prevBtnAction();
        break;
      case 39:
        e.preventDefault();
        nextBtnAction();
        break;
      case 32:
      case  9:
        e.preventDefault();
        if ( getSection().num > sectionsNum ) {
          navAction( 1 );
        } else {
          nextBtnAction();
        }
        break;
      case 49:
        navAction( 1 );
        break;
      case 50:
        navAction( 2 );
        break;
      case 51:
        navAction( 3 );
        break;
      case 52:
        navAction( 4 );
        break;
      case 53:
        navAction( 5 );
        break;
      case 189:
        removeQty();
        break;
      case 187:
        addQty();
        break;
      case 220:
        document.location = '/'
        break;
    }
  }

  /*

      Main setup

  */

  if ( sections.length ) {
    setupQty();
    setupNav();
    document.onkeydown = recipeKeyNav;
  }

});
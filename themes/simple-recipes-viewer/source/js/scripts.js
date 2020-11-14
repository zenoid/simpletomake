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

  var recipeBaseValue,
    baseMin = 100,
    baseMax = 5000,
    baseStep = 50,
    ingrPrec = 2,
    qtyLabels,
    qtyPlurals,
    qtyValue,
    qtyRemoveBtn,
    qtyAddBtn;

  function removeQty()
  {
    recipeBaseValue = Math.max( baseMin, recipeBaseValue - baseStep );
    calcQty();
  }

  function addQty()
  {
    recipeBaseValue = Math.min( baseMax, recipeBaseValue + baseStep );
    calcQty();
  }

  function round( qty, prec, ceil = false )
  {
    var f,
      q = ceil? Math.ceil( qty ) : Math.round( qty );
    if ( String( q ).length > prec ) {
      f = Math.pow( 10, String( q ).length - prec );
      q = ceil? Math.ceil( q / f ) * f : Math.round( q / f ) * f;
    }
    return q;
  }

  function calcQty()
  {
    var i, qty, mult, qtyId, volType, contSize, plurId, plurOptions, ceil,
      recipeWeight = recipeBaseValue * recipeBaseRatio;
    qtyValue.textContent = recipeBaseValue;
    for ( i in ingredients ) {
      ingredients[ i ].qty = recipeWeight * ingredients[ i ].ratio / 100;
    }
    for ( i = 0; i < qtyLabels.length; i++ ) {
      qtyId = qtyLabels[ i ].dataset.qty.split( '.' )[ 0 ];
      ceil = false;
      if ( qtyLabels[ i ].dataset.mult ) {
        mult = +qtyLabels[ i ].dataset.mult;
      } else {
        mult = 1;
      }
      if ( ingredients[ qtyId ] ) {
        qty = ingredients[ qtyId ].qty;
      }
      if ( qtyId === 'volume' ) {
        ceil = true;
        volType = qtyLabels[ i ].dataset.qty.split( '.' )[ 1 ];
        if ( volType === 'base' ) {
          qty = recipeBaseValue;
        } else {
          if ( ingredients[ volType ].units === 'ml' ) {
            qty = ingredients[ volType ].qty;
          } else {
            qty = ingredients[ volType ].qty / ingredients[ volType ].spec;
          }
        }
      }
      if ( qtyId === 'containers' ) {
        ceil = true;
        contSize = +qtyLabels[ i ].dataset.qty.split( '.' )[ 1 ];
        qty = recipeBaseValue / contSize;
      }
      qty = round( qty * mult, qtyLabels[ i ].dataset.prec || ingrPrec, ceil );
      qtyLabels[ i ].textContent = qty;
    }
    for ( i = 0; i < qtyPlurals.length; i++ ) {
      plurId = qtyPlurals[ i ].dataset.plural.split( '.' )[ 0 ],
      plurOptions = qtyPlurals[ i ].dataset.plural.split( '.' )[ 1 ].split( '-' );
      qty = round( ingredients[ plurId ].qty );
      qtyPlurals[ i ].textContent = plurOptions[ qty > 1? 1 : 0 ]
    }
  }

  function setupQty()
  {
    recipeBaseValue = recipeBase.qty;

    if ( typeof recipeRange !== 'undefined' ) {
      baseMin  = recipeRange[ 0 ];
      baseMax  = recipeRange[ 1 ];
      baseStep = recipeRange[ 2 ];
    }
    if ( typeof recipePrecision !== 'undefined' ) {
      ingrPrec = recipePrecision;
    }

    qtyLabels = document.querySelectorAll( '[data-qty]' );
    qtyPlurals = document.querySelectorAll( '[data-plural]' );
    qtyValue = document.getElementById( 'qtyValue' );
    qtyRemoveBtn = document.getElementById( 'qtyRemove' );
    qtyAddBtn = document.getElementById( 'qtyAdd' );
    qtyRemoveBtn.addEventListener( 'click', removeQty );
    qtyAddBtn.addEventListener( 'click', addQty );

    calcQty();
  }

  /*

      Recipe navigation

  */

  var sectionsNum = 5,
    article = document.querySelector( 'article' ),
    sections = document.querySelectorAll( 'section' ),
    navItems = Array.from( sections ).map( s => s.id ),
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
    scrollToSection( document.getElementById( navItems[ num-1 ] ), '#' + navItems[ num-1 ] );
  }

  function setRecipeNav( num )
  {
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
    return { num: i+diff, label: ( i+diff > 0 && i+diff <= sectionsNum )? navItems[ i-1+diff ] : '' };
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
      case 8:
        document.location = '/'
        break;
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
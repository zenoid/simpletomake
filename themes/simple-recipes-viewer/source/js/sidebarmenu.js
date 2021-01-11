document.addEventListener( 'DOMContentLoaded', function() {

  'use strict';

  /*

      Sidebar menu

  */

  var sidebar = document.querySelector( '.sidebar' ),
    sidebarItems = sidebar.querySelectorAll( 'li .btn' ),
    sidebarSelected = 0;

  function enable()
  {
    Array.from( document.querySelectorAll( '.btn-mainnavopen' ) ).forEach( btn => {
      btn.addEventListener( 'click', function( e ){
        e.preventDefault();
        e.stopPropagation();
        open();
      });
    });
    Array.from( document.querySelectorAll( '.btn-mainnavclose' ) ).forEach( btn => {
      btn.addEventListener( 'click', function( e ){
        e.preventDefault();
        e.stopPropagation();
        close();
      });
    });
    sidebar.addEventListener( 'click', function( e ){
      e.stopPropagation();
    });
  }

  function setFocus()
  {
    sidebarSelected = 0;
    Array.from( sidebar.querySelectorAll( 'li' ) ).forEach(( li, i ) => {
      if ( li.classList.contains( 'selected' ) ) {
        sidebarSelected = i;
      }
    });
    setSidebarItem();
  }

  function open()
  {
    setFocus();
    window.addEventListener( 'click', close )
    sidebar.classList.add( 'open' );
  }

  function close()
  {
    window.removeEventListener( 'click', close )
    sidebar.classList.remove( 'open' );
  }

  function setSidebarItem()
  {
    sidebarItems[ sidebarSelected ].focus();
  }

  function goUp()
  {
    if ( sidebarSelected > 0 ) {
      sidebarSelected--;
      setSidebarItem();
    }
  }

  function goDown()
  {
    if ( sidebarSelected < sidebarItems.length-1 ) {
      sidebarSelected++;
      setSidebarItem();
    }
  }

  /* ----------------------------- */

  window.sidebar = {
    enable: enable,
    open: open,
    close: close,
    goUp: goUp,
    goDown: goDown,
    isOpen: function(){
      return sidebar.classList.contains( 'open' );
    }
  };

});
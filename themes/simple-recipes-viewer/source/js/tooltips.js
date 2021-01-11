document.addEventListener( 'DOMContentLoaded', function() {

  'use strict';

  /*

      Tooltips

  */

  function onTooltipEnter() {
    let tooltip = document.createElement( 'div' );
    tooltip.classList.add( 'tooltip' );
    tooltip.innerHTML = this.dataset.tooltip;
    document.body.appendChild( tooltip );
    let elemRect = this.getBoundingClientRect(),
      tooltipRect = tooltip.getBoundingClientRect(),
      top = elemRect.top + ( elemRect.height - tooltipRect.height ) / 2,
      left = elemRect.left - tooltipRect.width + 4;
    if ( left < 0 ) {
      left = elemRect.right - 4;
    }
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  function onTooltipLeave() {
    Array.from( document.querySelectorAll( '.tooltip' ) ).forEach( t => {
      document.body.removeChild( t );
    })
  }

  function setup() {
    Array.from( document.querySelectorAll( '[data-tooltip]' ) ).forEach( t => {
      t.addEventListener( 'mouseenter', onTooltipEnter );
      t.addEventListener( 'mouseleave', onTooltipLeave );
    })
  }

  /* ----------------------------- */

  window.tooltips = {
    setup: setup
  };

});
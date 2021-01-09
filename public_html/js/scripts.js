document.addEventListener("DOMContentLoaded",function(){"use strict";var e=!1;("ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0)&&(document.body.classList.add("touch"),e=!0);var t=document.querySelector(".sidebar");function n(){window.addEventListener("click",o),t.classList.add("open")}function o(){window.removeEventListener("click",o),t.classList.remove("open")}var a,i,r,l,c,s,d=100,u=5e3,m=50,f=2;function p(){a=Math.max(d,a-m),v()}function h(){a=Math.min(u,a+m),v()}function y(e,t,n=!1){var o,a=n?Math.ceil(e):Math.round(e);return String(a).length>t&&(o=Math.pow(10,String(a).length-t),a=n?Math.ceil(a/o)*o:Math.round(a/o)*o),a}function v(){var e,t,n,o,m,p,h,v,g,b=a*recipeBaseRatio;for(e in s.textContent=a,Array.from(i).forEach(e=>{e.disabled=a===u}),Array.from(r).forEach(e=>{e.disabled=a===d}),ingredients)ingredients[e].qty=b*ingredients[e].ratio/100;for(e=0;e<l.length;e++)o=l[e].dataset.qty.split(".")[0],g=!1,n=l[e].dataset.mult?+l[e].dataset.mult:1,ingredients[o]&&(t=ingredients[o].qty),"volume"===o&&(g=!0,t="base"===(m=l[e].dataset.qty.split(".")[1])?a:"ml"===ingredients[m].units?ingredients[m].qty:ingredients[m].qty/ingredients[m].spec),"containers"===o&&(g=!0,p=+l[e].dataset.qty.split(".")[1],t=a/p),t=y(t*n,l[e].dataset.prec||f,g),l[e].textContent=t;for(e=0;e<c.length;e++)h=c[e].dataset.plural.split(".")[0],v=c[e].dataset.plural.split(".")[1].split("-"),t=y(ingredients[h].qty),c[e].textContent=v[t>1?1:0]}var g,b,E,w=5,q=document.querySelector("article"),L=document.querySelectorAll("section"),k=document.querySelectorAll(".navdots li"),A=Array.from(L).map(e=>e.id),S=document.getElementById("btn-prev"),M=document.getElementById("btn-next");function B(e,t){clearInterval(E),E=setTimeout(function(){clearInterval(E),E=null},1e3),e.scrollIntoView({behavior:"smooth"}),window.history.replaceState(null,null,"#principi"!==t?t:" ")}function x(e){C(e),B(document.getElementById(A[e-1]),"#"+A[e-1])}function C(e){S.disabled=!(e>1),Array.from(k).forEach(e=>{e.classList.remove("selected")}),k[e-1].classList.add("selected")}function I(){var e=R(1);e.label&&(C(e.num),B(document.getElementById(e.label),"#"+e.label))}function P(){var e=R(-1);e.label&&(C(e.num),B(document.getElementById(e.label),"#"+e.label))}function R(e=0){for(var t=0;t<w&&g.scrollTop>L[t].offsetTop-b/2;)t++;return{num:t+e,label:t+e>0&&t+e<=w?A[t-1+e]:""}}function T(){var e=R(),t=location.hash;if(e.num<=w){if(q.className="section"+e.num,!E&&t!="#"+e.label){var n="#"+e.label;window.history.replaceState(null,null,"#principi"!==n?n:" "),C(e.num)}M.disabled=e.num>=w}else E||""==t||window.history.replaceState(null,null," "),M.disabled=!0}function D(){g&&(g.onscroll=null),window.onscroll=null,document.querySelector("nav").offsetWidth<=64?(g=document.querySelector(".main"),b=g.offsetHeight,g.onscroll=T):(g=document.documentElement,b=window.innerHeight,window.onscroll=T),T()}function H(){if(D(),window.onresize=D,M.addEventListener("click",I),S.addEventListener("click",P),M.disabled=!1,location.hash){var e=R();q.className="section"+e.num,C(e.num)}else C(1)}function N(){let e=document.createElement("div");e.classList.add("tooltip"),e.innerHTML=this.dataset.tooltip,document.body.appendChild(e);let t=this.getBoundingClientRect(),n=e.getBoundingClientRect(),o=t.top+(t.height-n.height)/2,a=t.left-n.width+4;a<0&&(a=t.right-4),e.style.top=o+"px",e.style.left=a+"px"}function V(){Array.from(document.querySelectorAll(".tooltip")).forEach(e=>{document.body.removeChild(e)})}var z=!1;Array.from(document.querySelectorAll(".btn-mainnavopen")).forEach(e=>{e.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n()})}),Array.from(document.querySelectorAll(".btn-mainnavclose")).forEach(e=>{e.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),o()})}),t.addEventListener("click",function(e){e.stopPropagation()}),L.length&&(z=!0,a=recipeBase.qty,"undefined"!=typeof recipeRange&&(d=recipeRange[0],u=recipeRange[1],m=recipeRange[2]),"undefined"!=typeof recipePrecision&&(f=recipePrecision),l=document.querySelectorAll("[data-qty]"),c=document.querySelectorAll("[data-plural]"),s=document.getElementById("qtyValue"),i=document.querySelectorAll(".btn-icon-plus"),r=document.querySelectorAll(".btn-icon-minus"),Array.from(i).forEach(e=>{e.addEventListener("click",h)}),Array.from(r).forEach(e=>{e.addEventListener("click",p)}),v(),location.hash?(location=location.hash,setTimeout(function(){H()},1e3)):H()),e||(Array.from(document.querySelectorAll("[data-tooltip]")).forEach(e=>{e.addEventListener("mouseenter",N),e.addEventListener("mouseleave",V)}),document.onkeydown=function(e){var a=(e=e||window.event).keyCode;switch(a){case 8:t.classList.contains("open")?o():n()}if(z)switch(a){case 37:case 38:e.preventDefault(),P();break;case 39:case 40:e.preventDefault(),I();break;case 32:case 9:e.preventDefault(),R().num>w-1?x(1):I();break;case 49:x(1);break;case 50:x(2);break;case 51:x(3);break;case 52:x(4);break;case 53:x(5);break;case 189:p();break;case 187:h()}})});
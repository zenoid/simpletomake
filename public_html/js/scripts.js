document.addEventListener("DOMContentLoaded",function(){"use strict";("ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0)&&document.body.classList.add("touch");var e,t,n,a,i,o,l=100,r=5e3,c=50,s=2;function d(){e=Math.max(l,e-c),f()}function u(){e=Math.min(r,e+c),f()}function m(e,t,n=!1){var a,i=n?Math.ceil(e):Math.round(e);return String(i).length>t&&(a=Math.pow(10,String(i).length-t),i=n?Math.ceil(i/a)*a:Math.round(i/a)*a),i}function f(){var i,o,l,r,c,d,u,f,y,p=e*recipeBaseRatio;for(i in a.textContent=e,ingredients)ingredients[i].qty=p*ingredients[i].ratio/100;for(i=0;i<t.length;i++)r=t[i].dataset.qty.split(".")[0],y=!1,l=t[i].dataset.mult?+t[i].dataset.mult:1,ingredients[r]&&(o=ingredients[r].qty),"volume"===r&&(y=!0,o="base"===(c=t[i].dataset.qty.split(".")[1])?e:"ml"===ingredients[c].units?ingredients[c].qty:ingredients[c].qty/ingredients[c].spec),"containers"===r&&(y=!0,d=+t[i].dataset.qty.split(".")[1],o=e/d),o=m(o*l,t[i].dataset.prec||s,y),t[i].textContent=o;for(i=0;i<n.length;i++)u=n[i].dataset.plural.split(".")[0],f=n[i].dataset.plural.split(".")[1].split("-"),o=m(ingredients[u].qty),n[i].textContent=f[o>1?1:0]}var y,p=5,g=document.querySelector(".main"),h=document.querySelector("article"),v=document.querySelectorAll("section"),b=Array.from(v).map(e=>e.id),q=document.querySelector("footer"),k=document.getElementById("btn-prev"),w=document.getElementById("btn-next"),E=g.offsetHeight;function L(e,t){clearInterval(y),y=setTimeout(function(){clearInterval(y),y=null},1e3),e.scrollIntoView({behavior:"smooth"}),window.history.replaceState(null,null,t)}function I(e){S(e),L(document.getElementById(b[e-1]),"#"+b[e-1])}function S(e){e>1?k.classList.remove("hidden"):k.classList.add("hidden")}function B(){var e,t,n=x(1);n.label?(S(n.num),e=document.getElementById(n.label),t="#"+n.label):(e=q,t=" "),L(e,t)}function M(){var e=x(-1);e.label&&(S(e.num),L(document.getElementById(e.label),"#"+e.label))}function x(e=0){for(var t=0;t<p&&g.scrollTop>v[t].offsetTop-E/2;)t++;return g.scrollTop+E-100>q.offsetTop&&(t=p+1),{num:t+e,label:t+e>0&&t+e<=p?b[t-1+e]:""}}function T(){var e=x(),t=location.hash;e.num<=p?(h.className="section"+e.num,y||t=="#"+e.label||(window.history.replaceState(null,null,"#"+e.label),S(e.num)),w.classList.remove("hidden")):(y||""==t||window.history.replaceState(null,null," "),w.classList.add("hidden"))}function R(){E=g.offsetHeight,T()}v.length&&(e=recipeBase.qty,"undefined"!=typeof recipeRange&&(l=recipeRange[0],r=recipeRange[1],c=recipeRange[2]),"undefined"!=typeof recipePrecision&&(s=recipePrecision),t=document.querySelectorAll("[data-qty]"),n=document.querySelectorAll("[data-plural]"),a=document.getElementById("qtyValue"),i=document.getElementById("qtyRemove"),o=document.getElementById("qtyAdd"),i.addEventListener("click",d),o.addEventListener("click",u),f(),function(){if(g.onresize=R,g.onscroll=T,S(1),w.addEventListener("click",B),k.addEventListener("click",M),w.classList.remove("hidden"),location.hash){var e=x();h.className="section"+e.num,S(e.num)}}(),document.onkeydown=function(e){switch((e=e||window.event).keyCode){case 8:document.location="/";break;case 37:e.preventDefault(),M();break;case 39:e.preventDefault(),B();break;case 32:case 9:e.preventDefault(),x().num>p?I(1):B();break;case 49:I(1);break;case 50:I(2);break;case 51:I(3);break;case 52:I(4);break;case 53:I(5);break;case 189:d();break;case 187:u()}})});
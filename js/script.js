/* EXECUTIVE personal gym LP
   リビール / 料金タブ切替 / スマホ固定CTA */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* スクロールリビール */
  var rv = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if(!reduce && 'IntersectionObserver' in window && rv.length){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting) return;
        var el=e.target, sibs=Array.prototype.slice.call(el.parentNode.children).filter(function(c){return c.classList.contains('reveal');});
        el.style.transitionDelay=(Math.max(0,sibs.indexOf(el))%5*90)+'ms';
        el.classList.add('in'); io.unobserve(el);
      });
    },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
    rv.forEach(function(el){io.observe(el);});
  }else{ rv.forEach(function(el){el.classList.add('in');}); }

  /* 料金タブ */
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(t){
    t.addEventListener('click', function(){
      var id = t.getAttribute('data-tab');
      tabs.forEach(function(x){x.classList.toggle('is-on', x===t);});
      document.querySelectorAll('.panel').forEach(function(pn){
        pn.classList.toggle('is-on', pn.getAttribute('data-panel')===id);
      });
    });
  });

  /* 固定CTA：ヒーローを過ぎたら出す。最後のCTA上では隠す */
  var sticky=document.getElementById('stickyCta'), last=document.getElementById('cta-last');
  if(sticky){
    var onScroll=function(){
      var passed=window.scrollY>window.innerHeight*0.8, near=false;
      if(last){var r=last.getBoundingClientRect();near=r.top<window.innerHeight&&r.bottom>0;}
      sticky.classList.toggle('show',passed&&!near);
    };
    window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }

  /* ハンバーガーメニュー（スマホ） */
  var navToggle=document.getElementById('navToggle'), nav=document.getElementById('nav');
  if(navToggle&&nav){
    navToggle.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false');});
    });
  }
})();

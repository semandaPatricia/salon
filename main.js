
// Counter

function ttPagePreloader() {
  
  let $overlay = $(".overlay");
  let $counterElement = $(".counter");
  let $progressElement = $(".progress-bar");
  
  let $count = 0;
  let $counter = setInterval(function() {
    if ($count < 101) {
      $counterElement.text($count + '%');
      $progressElement.css('width', $count + '%');
      $count ++; 
    } else {
      clearInterval($counter);
    }

    // If ready
    if ($count > 100) {
      $counterElement.addClass("ready");

      // Animations
      let tl_transitIn = gsap.timeline({ defaults: { duration: 1.2, ease: Expo.easeInOut }});
        tl_transitIn.to($counterElement, { autoAlpha: 0 });
        tl_transitIn.to($overlay, { scaleY: 0, transformOrigin: "center top" });
    }

  }, 20); // Speed

}
ttPagePreloader();


//HOME page

const menu = document.querySelector('menu')
const sectionBtns = document.querySelectorAll('.section-btn button')
const socialBtns = document.querySelectorAll('.social-btn button')
const menuBtn = document.querySelector('#menu-btn')
const menuTL = gsap.timeline({paused:true})
.to(menuBtn, {
  opacity:0.2, background:'rgba(255,255,255,0)', ease:'power3'
}, 0)
.fromTo(menu, {
  x:-10, y:10, opacity:1
}, {
  duration:0.7, x:0, y:0, ease:'power3'
}, 0)
.fromTo('.menu-bg, .menu-contents', {
  clipPath:'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
}, {
  clipPath:'polygon(0% 0%, 100% 0%, 100% 150%, 0% 100%)', stagger:0.03, ease:'power1.inOut'
}, 0)
.fromTo(sectionBtns, {
  opacity:0
},{
  duration:0.4, opacity:1, ease:'power1.inOut', stagger:0.03
}, 0.2)
.fromTo(socialBtns, {
  opacity:0
},{
  duration:0.3, opacity:1
}, 0.4)


menuBtn.onpointerenter = ()=> {
  menuTL.play()
  if (menuTL.progress()==0)
    gsap.fromTo(sectionBtns, {
      x:-99, y:99, rotate:0.1, scale:0.75
    }, {
      duration:0.8, x:0, y:0, rotate:0, scale:1, stagger:0.05, ease:'expo'
    })
}

menu.onpointerleave = ()=> menuTL.reverse()

sectionBtns.forEach((btn)=>{
  const btnTxt = btn.querySelector('.btn-txt')  
  btn.onpointerenter = ()=> {
    if (!gsap.isTweening(btnTxt))
      gsap.timeline()
      .to(btn, {duration:1, color:'#fff', ease:'power4.inOut', overwrite:'auto', 'border-bottom':'solid 2px #fff'}, 0)
      .set(btnTxt, {transformOrigin:'99% 50%', yPercent:0, skewY:0}, 0)
      .to(btnTxt, {yPercent:-100, skewY:50, ease:'expo.in'}, 0)
      .set(btnTxt, {transformOrigin:'0% 50%', yPercent:200, skewY:50}, 0.5)
      .to(btnTxt, {yPercent:0, skewY:0, ease:'expo'}, 0.5)
      .timeScale(1.67)
  }
  btn.onpointerleave = ()=> gsap.to(btn, {color:'#000', ease:'sine', overwrite:'auto', 'border-bottom':'solid 2px transparent'})
})


socialBtns.forEach((btn)=>{  
  btn.onpointerenter = ()=> gsap.to('.social-btn button svg', {
    scale:(i,t)=>(t==btn.querySelector('svg')) ? 1.3 : 1,
    opacity:(i,t)=>(t==btn.querySelector('svg')) ? 1 : 0.3,
    ease:'power3'
  })  
  btn.onpointerleave = ()=> gsap.to('.social-btn button svg', {scale:1, opacity:1, ease:'power1.inOut'})
})
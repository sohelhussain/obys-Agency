const locoScrolling = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};
locoScrolling();

const loderEffect = () => {
  let tl = gsap.timeline();
  tl.from(".hed>h1, .hed>h2 , .wait h3", {
    y: 130,
    duration: 0.7,
    delay: 0.2,
    stagger: 0.2,
  });
  tl.to(".hed, .wait", {
    opacity: 0,
    delay: 2.5,
    stagger: -0.2,
  });
  tl.to("#loder", {
    y: "-100%",
    display: "none",
    ease: "power4.out",
    duration: 1,
  });
  tl.from(".hero-text>h1", {
    y: 250,
    opacity: 0,
    stagger: {
      amount: 0.5,
    },
  });

  const hedTime = document.querySelector(".timer>h4");
  let time = 0;
  let timer = setInterval(() => {
    if (time < 100) {
      time++;
      hedTime.innerHTML = time;
    } else {
      clearInterval(timer);
    }
  }, 40);
};
loderEffect();

const containerSecondEffects = () => {
  const videoBox = document.querySelector(".video-box");
  const video = document.querySelector("video");
  const img = document.querySelector("img");
  const cursor = document.querySelector(".video-cursor");
  videoBox.addEventListener("mousemove", (detes) => {
    gsap.to(".video-cursor", {
      left: detes.x - 500,
      top: detes.y - 180,
    });
  });
  let flag = true;
  videoBox.addEventListener("click", (detes) => {
    if (flag) {
      gsap.to("img", {
        zIndex: 0,
      });
      gsap.to("video", {
        zIndex: 1,
      });
      gsap.to(".video-cursor", {
        scale: 0.7,
      });
      cursor.innerHTML = '<i class="ri-pause-line"></i>';
      video.play();
      flag = false;
    } else {
      gsap.to("img", {
        zIndex: 1,
      });
      gsap.to("video", {
        zIndex: 0,
      });
      gsap.to(".video-cursor", {
        scale: 1,
      });
      cursor.innerHTML = '<i class="ri-play-fill"></i>';
      video.pause();
      flag = true;
    }
  });
  videoBox.addEventListener("mouseenter", () => {
    gsap.to(".mousefollower", {
      opacity: 0,
      scale: 0,
    });
  });
  videoBox.addEventListener("mouseleave", () => {
    gsap.to(".mousefollower", {
      opacity: 1,
      scale: 1,
    });

    gsap.to(".video-cursor", {
      top: "-15%",
      left: "70%",
    });
  });
};
containerSecondEffects();

const sherryEffect = () => {
  Shery.mouseFollower();
  Shery.makeMagnet("nav a");
  Shery.imageEffect(".img-con-fr", {
    style: 6,
    // debug: true,
    gooey: true,
    config: {
      noiseDetail: { value: 6.11, range: [0, 100] },
      distortionAmount: { value: 2.9, range: [0, 10] },
      scale: { value: 59.54, range: [0, 100] },
      speed: { value: 0.58, range: [0, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.8333333134651184 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.27, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.84, range: [0, 10] },
      metaball: { value: 0.44, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.38, range: [0, 2] },
      noise_scale: { value: 8.4, range: [0, 100] },
    },
  });
};
sherryEffect();

const textUpper = () => {
  const rowH1 = document.querySelectorAll(`.row-one h1`);
  const rowPerent = document.querySelectorAll(`.pe-con-tex`);
  rowPerent.forEach((Perent) => {
    Perent.addEventListener("mouseenter", () => {
      gsap.to(".row-one h1", {
        y: -45,
      });
    });
    Perent.addEventListener("mouseleave", () => {
      gsap.to(".row-one h1", {
        y: 0,
      });
    });
  });
};
textUpper();

const hedMove = () => {
  gsap.to(".hed-mar-left", {
    x: -1000,
    duration: 10,
    repeat: -1,
  });
  gsap.from(".hed-mar-right", {
    x: -1000,
    duration: 10,
    repeat: -1,
  });
};
hedMove();

const btn = () => {
  const thridFour = document.querySelector(`.round`);
  thridFour.addEventListener(`mouseenter`, () => {
    gsap.to(".round", {
      scale: 0.9,
    });
  });
  thridFour.addEventListener(`mouseleave`, () => {
    gsap.to(".round", {
      scale: 1,
    });
  });
};
btn();

const textUpperMove = () => {
  const hed = document.querySelectorAll(".fo-hed .hedText");

  hed.forEach(function (elem) {
    var elemText = elem.textContent;
    var splited = elemText.split("");
    var clutter = "";
    splited.forEach(function (e) {
      clutter += `<span>${e}</span>`;
    });
    elem.innerHTML = clutter;
  });

  const foHed = document.querySelector(".fo-hed");

  foHed.addEventListener("mouseenter",function(){
    gsap.to(".fo-hed h1 span",{
        opacity:0,
        stagger:0.1,
        duration:0.5
    })
    gsap.to(".fo-hed h2 span",{
        opacity:1,
        delay:0.4,
        duration:0.5,
        stagger:0.1
    })
    gsap.to(".hed-cover svg",{
      x:40,
      delay:1
    })
  })

  foHed.addEventListener("mouseleave",function(){
    gsap.to(".fo-hed h2 span",{
        opacity:0,
        stagger:0.05,
        duration:0.3
    })
    gsap.to(".fo-hed h1 span",{
        opacity:1,
        delay:0.4,
        duration:0.3,
        stagger:0.05
    })
    gsap.to(".hed-cover svg",{
      x:0,
    })
  })

};
textUpperMove();

const navMenu = () => {
  gsap.to("nav .nav-menu .nav-menu-left .nav-hed h1",{
    y:"0%",
    stagger:{
      amount:2
    }
  })
};
navMenu();
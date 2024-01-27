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
Shery.mouseFollower();

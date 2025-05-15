import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    // Mobile-specific animation adjustments
    const scaleFactor = isMobile ? 0.5 : 1;
    const duration = isMobile ? 1.5 : 2;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration,
      delay: -1,
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: isMobile ? 1 : 1.1,
      rotate: 0,
      duration,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: isMobile ? 1 : 1.1,
      rotate: 0,
      duration,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: isMobile ? 0.5 : 0.7,
      x: "-50%",
      bottom: isMobile ? "-50%" : "-70%",
      rotate: 0,
      duration,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: isMobile ? 0.6 : 0.8,
      rotate: 0,
      duration,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });

    if (!isMobile) {
      const main = document.querySelector(".main");
      main?.addEventListener("mousemove", function (e) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
        gsap.to(".main .text", {
          x: `${xMove * 0.2}%`,
        });
        gsap.to(".sky", {
          x: `${xMove * 0.2}%`,
        });
        gsap.to(".bg", {
          x: `${xMove * 0.2}%`,
        });
      });
    }
  }, [showContent, isMobile]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-4 md:py-10 px-4 md:px-10">
              <div className="logo flex gap-3 md:gap-7">
                <div className="lines flex flex-col gap-1 md:gap-[5px]">
                  <div className="line w-10 md:w-15 h-1 md:h-2 bg-white"></div>
                  <div className="line w-5 md:w-8 h-1 md:h-2 bg-white"></div>
                  <div className="line w-3 md:w-5 h-1 md:h-2 bg-white"></div>
                </div>
                <h3 className="text-2xl md:text-4xl -mt-1 md:-mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-1 md:gap-3 absolute top-0 left-[10%] md:left-[40%] scale-[1.4] rotate-[-10deg]">
                <h1 className="text-4xl md:text-[12rem] leading-none md:-ml-40">grand</h1>
                <h1 className="text-4xl md:text-[12rem] leading-none md:ml-20">theft</h1>
                <h1 className="text-4xl md:text-[12rem] leading-none md:-ml-40">auto</h1>
              </div>
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2 scale-[3] rotate-[-20deg]"
                src="./girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-4 md:py-15 px-4 md:px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-2 md:gap-4 items-center">
                <i className="text-xl md:text-4xl ri-arrow-down-line"></i>
                <h3 className="text-sm md:text-lg font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[30px] md:h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex flex-col md:flex-row text-white w-full h-[80%] px-4 md:px-0">
              <div className="limg relative w-full md:w-1/4 h-1/2 md:h-full">
                <img
                  className="absolute scale-[1.1] md:scale-[1.3] top-1/2 left-1/2 translate-x-[0%] md:translate-x-[10%] -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-full md:w-[30%] py-10 md:py-30 translate-x-0 md:translate-x-[80%]">
                <h1 className="text-2xl md:text-4xl">Still Running,</h1>
                <h1 className="text-2xl md:text-4xl">Not Hunting</h1>
                <p className="mt-4 md:mt-10 text-xs font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-2 md:mt-3 text-xs font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <p className="mt-4 md:mt-10 text-xs font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <button className="bg-yellow-500 px-3 py-3 md:px-5 md:py-5 text-black mt-6 md:mt-10 text-xl md:text-3xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
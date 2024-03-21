
"use client";
import "keen-slider/keen-slider.min.css";
import React from "react";
import { useState, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { useKeenSlider } from "keen-slider/react";
import { useSlider } from "./context/SliderContext";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import CustomVideoPlayer from "../utils/CustomVideoPlayer";
export default function KeenSlider({ projectData }) {
  const WheelControls = (slider) => {
    let touchTimeout
    let position
    let wheelActive
  
    function dispatch(e, name) {
      position.x -= e.deltaX
      position.y -= e.deltaY
      slider.container.dispatchEvent(
        new CustomEvent(name, {
          detail: {
            x: position.x,
            y: position.y,
          },
        })
      )
    }
  
    function wheelStart(e) {
      position = {
        x: e.pageX,
        y: e.pageY,
      }
      dispatch(e, "ksDragStart")
    }
  
    function wheel(e) {
      console.log("Wheel event triggered!", position); // Add this
      dispatch(e, "ksDrag");
   }
   
  
    function wheelEnd(e) {
      dispatch(e, "ksDragEnd")
    }
  
    function eventWheel(e) {
     
      e.preventDefault()
      if (!wheelActive) {
        wheelStart(e)
        wheelActive = true
      }
      wheel(e)
      clearTimeout(touchTimeout)
      touchTimeout = setTimeout(() => {
        wheelActive = false
        wheelEnd(e)
      }, 50)
    }
  
    slider.on("created", () => {
      console.log("Event listener added!"); // Add this
      slider.container.addEventListener("wheel", eventWheel, { passive: false });
   });
   
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        instanceRef.current?.next();
      } else if (event.key === "ArrowLeft") {
        instanceRef.current?.prev();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function cubicEaseInOut(time) {
    return 1 - Math.pow(1 - time, 5);
  }
  
  // const [currentSlide, setCurrentSlide] = useState(0)
  const { currentSlide, setCurrentSlide } = useSlider();

  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    // drag: false,
    
    defaultAnimation: {
      duration: 1000,
      easing: cubicEaseInOut,
    },
    slideChanged(slider) {
      // setCurrentSlide(slider.track.details.rel);
      slider.slides.forEach((slide) => {
        slide.classList.remove("leaving-slide");
      });

      // Then, determine the index of the slide that's leaving.
      let previousSlideIndex;
      if (slider.track.details.rel === 0) {
        previousSlideIndex = slider.slides.length - 1;
      } else {
        previousSlideIndex = slider.track.details.rel - 1;
      }

      // Add 'leaving-slide' class to the slide that's leaving
      slider.slides[previousSlideIndex].classList.add("leaving-slide");

      const slideCountDiv = document.getElementById("slideCountDiv");
      if (slideCountDiv) {
        slideCountDiv.innerHTML = `${slider.track.details.rel + 1} / ${
          slider.slides.length
        }`;
      }
    },
    slides: {
      perView: 1,
      spacing: 0,
    },
    vertical: true,
    created() {
      setLoaded(true);
    },
  },
  [WheelControls] // <-- Integrate the WheelControls here
);
  useEffect(() => {
    if (loaded && instanceRef.current) {
      const slideCountDiv = document.getElementById("slideCountDiv");
      if (slideCountDiv) {
        slideCountDiv.innerHTML = `1 - ${instanceRef.current.slides.length}`;
      }
    }
  }, [loaded, instanceRef]);
  useEffect(() => {
    if (instanceRef.current) {
      console.log;
      instanceRef.current.moveToIdx(currentSlide, false, { duration: 0 });
    }
  }, [currentSlide, instanceRef]);

//   // Assuming the provided asset reference can be transformed into a URL like this
// // Initialize with images
// // Initialize with images if they exist, otherwise initialize empty
// const mergedItems = projectData[0].imagesGallery?.length > 0 
//   ? projectData[0].imagesGallery.map(image => ({ type: 'image', data: image }))
//   : [];

// // Insert videos at their specific positions
// projectData[0].videosGallery?.forEach(video => {
//   const videoItem = { type: 'video', data: video };
//   mergedItems.splice(video.videoShowPosition - 1, 0, videoItem);
// });

const mergedItems = [];
projectData[0].galleries.forEach(gallery => {
    gallery.medias.forEach(media => {
      const mediaType = media._type;
      mergedItems.push({ type: mediaType, data: media });
    });
  });

  return (
    <div   ref={sliderRef}  className="keen-slider  h-screen">
      {mergedItems.map((item, index) => {
        if (item.type === 'image') {
          return (
            <div
              key={item.data._key}
              className={`flex items-center justify-center relative keen-slider__slide number-slide${index}`}
            >
              <div
                onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
                className=" -z-10  absolute cursor-pointer w-full h-full"
              ></div>
              <div className="heightSlider flex ">
                <Image
                  src={urlForImage(item.data.asset._ref)}
                  alt={`Slide ${index}`}
                  className="w-auto object-cover h-full "
                  width={1200}
                  height={1000}
                  priority
                />
              </div>
            </div>
          );
        } else {  // item.type === 'video'
          return (
            <div
              key={item.data._key}
              className={`flex items-center justify-center relative keen-slider__slide number-slide${index}`}
            >
              <div
                onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
                className="absolute cursor-pointer w-full h-full"
              ></div>
              <div className="flex relative items-end h-screen w-full justify-center videoHeight  ">
                <CustomVideoPlayer src={item.data.urlVideo} />
              </div>
            </div>
          );
        }
      })}
    </div>
);

}

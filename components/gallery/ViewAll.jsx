"use client";
import React from "react";
import { useEffect } from "react";
import { urlForImage } from "@/sanity/lib/image";
import FadingImage from "../utils/FadeInImage";
import { useSlider } from "./context/SliderContext";
import { SliderProvider } from "./context/SliderContext";
export default function ViewAll({ projectData, isVisible, setIsVisible }) {
  // Assuming the provided asset reference can be transformed into a URL like this
  const { setCurrentSlide } = useSlider();

  const handleVideoClick = (index) => {
    setCurrentSlide(index);
    setIsVisible(false);
        console.log(isVisible)
  };
  
  const handleImageClick = (index) => {
    if (!projectData[0]?.videosGallery) {
      // If project videos are not available, set the slide directly to the provided index
      setCurrentSlide(index);
      setIsVisible(false);
   
    } else {
      // If project videos are available, calculate the new slide index based on the length of videosGallery and the provided index
      const newSlideIndex = projectData[0].videosGallery.length + index;
      setCurrentSlide(newSlideIndex);
      setIsVisible(false);
    
    }
  };
  const handleItemClick = (index, type) => {
    const videoCountBeforeThisItem = mediasList.slice(0, index).filter(item => item.type === 'video').length;
    
    if (type === 'video') {
      setCurrentSlide(index - videoCountBeforeThisItem);
    } else {
      setCurrentSlide(index);
    }
    
    setIsVisible(false);
};

  

const mediasList = [];

projectData[0].galleries.forEach(gallery => {
  gallery.medias.forEach(media => {
    const mediaType = media._type;
    mediasList.push({ type: mediaType, data: media });
  })
});

const elementsPerLine = mediasList.length > 8 ? 6 : 4;
const gridTemplateColumns = `repeat(${elementsPerLine}, 1fr)`;


return (
  <div className={`fixed ${isVisible ? "transition-opacity-active" : "transition-opacity"} top-0 h-screen left-0 px-10 items-end justify-end   transition-opacity -z-20 pb-10 almostWhite md:flex hidden`}>
    <div
      className="gap-10 flex z-40"
      style={{ display: "grid", gridTemplateColumns }}
    >
      {mediasList.map((item, index) => {
        if (item.type === 'video') {
          return (
            <div key={item.data._key} className={`cursor-pointer flex items-end number-slide${index}`} onClick={() => handleItemClick(index, 'video')}>
              <video playsInline loop autoPlay muted src={item.data.urlLoop} />
            </div>
          );
        } else { // item.type === 'image'
          return (
            <div
              key={item.data._key}
              className={`flex items-end number-slide${index}`}
              onClick={() => handleItemClick(index, 'image')}
            >
              <div className="flex items-end ">
                <FadingImage
                  src={urlForImage(item.data.asset._ref)}
                  alt={`Slide ${index}`}
                  className="w-auto object-cover h-full flex items-end cursor-pointer"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  </div>
);


}

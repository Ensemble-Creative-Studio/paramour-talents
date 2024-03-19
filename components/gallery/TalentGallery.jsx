"use client";
import React from "react";
import { useEffect } from "react";
import { urlForImage } from "@/sanity/lib/image";
import FadingImage from "../utils/FadeInImage";
import { useSlider } from "./context/SliderContext";
import { SliderProvider } from "./context/SliderContext";

export default function TalentGallery({ talentData, isVisible, setIsVisible }) {
  // Assuming the provided asset reference can be transformed into a URL like this
  const { setCurrentSlide } = useSlider();

  const handleVideoClick = (index) => {
    setCurrentSlide(index);
    setIsVisible(false);
        console.log(isVisible)
  };
  
  const handleImageClick = (index) => {
    if (!talentData[0]?.videosGallery) {
      // If project videos are not available, set the slide directly to the provided index
      setCurrentSlide(index);
      setIsVisible(false);
   
    } else {
      // If project videos are available, calculate the new slide index based on the length of videosGallery and the provided index
      const newSlideIndex = talentData[0].videosGallery.length + index;
      setCurrentSlide(newSlideIndex);
      setIsVisible(false);
    
    }
  };
  const handleItemClick = (index, type) => {
    console.log(index);
    const videoCountBeforeThisItem = mergedItems.slice(0, index).filter(item => item.type === 'video').length;
    
    if (type === 'video') {
      setCurrentSlide(index - videoCountBeforeThisItem);
    } else {
      setCurrentSlide(index);
    }
    
    setIsVisible(false);
};

  const getTotalElements = () => {
    const videosLength = talentData[0].videosGallery?.length || 0;
    const imagesLength = talentData[0].imagesGallery?.length || 0;
    return videosLength + imagesLength;
  };
  
  const elementsPerLine = getTotalElements() > 8 ? 6 : 4;

  const gridTemplateColumns = `repeat(${elementsPerLine}, 1fr)`;
// Initialize with images
// Initialize an empty array
const mergedItems = [];

// Add all images first
talentData[0].imagesGallery?.forEach(image => {
  mergedItems.push({ type: 'image', data: image });
});

// Add videos based on their position
talentData[0].videosGallery?.forEach(video => {
  if (video.videoShowPosition && video.videoShowPosition - 1 < mergedItems.length) {
    mergedItems.splice(video.videoShowPosition - 1, 0, { type: 'video', data: video });
  } else {
    mergedItems.push({ type: 'video', data: video });
  }
});



return (
  <div className={`absolute ${isVisible ? "transition-opacity-active" : "transition-opacity hidden"} top-32 md:top-80 left-0 items-end justify-end pb-6 almostWhite flex z-20 overflow-hidden`}>
    <div
      className="gap-6 flex z-40 overflow-y-auto"
      style={{ display: "grid", gridTemplateColumns }}
    >
      {mergedItems.map((item, index) => {
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
              className={`flex items-end number-slide-${index}`}
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

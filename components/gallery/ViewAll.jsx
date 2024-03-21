"use client";
import React, { useEffect, useState } from "react";
import { urlForImage } from "@/sanity/lib/image";
import FadingImage from "../utils/FadeInImage";
import { useSlider } from "./context/SliderContext";

export default function ViewAll({ projectData, isVisible, setIsVisible }) {
  const [screenWidth, setScreenWidth] = useState(null);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => { setScreenWidth(window.innerWidth); };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); };
  }, []); 

  const { setCurrentSlide } = useSlider();
  const handleItemClick = (index) => {
    setCurrentSlide(index);
    setIsVisible(false);
  };

  let mediasList = [];
  let idCounter = 0;

  projectData[0].galleries.forEach(gallery => {
    let galleryObject = {
      gallery: gallery.title,
      medias: []
    };
    gallery.medias.forEach(media => {
      const mediaType = media._type;
      galleryObject.medias.push({ 
        id: idCounter++,
        type: mediaType, 
        data: media 
      });
    });
    mediasList.push(galleryObject);
  });

  const elementsPerLine = screenWidth > 1280 ? 6 : idCounter > 8 ? 6 : 4;
  const gridTemplateColumns = `repeat(${elementsPerLine}, 1fr)`;

  return (
    <div className={`fixed ${isVisible ? "transition-opacity-active" : "transition-opacity"} top-0 h-screen left-0 px-10 items-end justify-end   transition-opacity -z-20 pb-10 almostWhite md:flex hidden w-full`}>
        {mediasList.map((gallery, galleryIndex) => {
          return (
            <section key={galleryIndex} id={gallery.gallery} className="flex flex-col gap-3 w-full">
              <h2 className="itemFooter grey">
                {gallery.gallery}
              </h2>
              <div
                className="gap-6 grid z-40 overflow-y-auto"
                style={{ gridTemplateColumns }}
              >
                {gallery.medias.map(item => {
                  const index = item.id;
                  return (
                    <div 
                      className={`cursor-pointer flex items-end number-slide-${index}`} 
                      onClick={() => handleItemClick(index)}
                    >
                    {item.type === 'video' ? (
                        <video playsInline loop autoPlay key={item.data._key} muted src={item.data.urlLoop} />
                      ) : (
                          <div key={item.data._key} className="flex items-end ">
                            <FadingImage
                              src={urlForImage(item.data.asset._ref)}
                              alt={`Slide ${index}`}
                              className="w-auto object-cover h-full flex items-end"
                              width={300}
                              height={300}
                            />
                          </div>
                      )
                    }
                    </div>
                  )
                })
              }
              </div>
            </section>
          );
        })}
    </div>
  );
}

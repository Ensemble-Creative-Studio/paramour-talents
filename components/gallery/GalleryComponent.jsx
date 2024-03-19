'use client'
import React, { useState, useEffect } from "react";
import GalleryMobile from "@/components/gallery/GalleryMobile";
import KeenSlider from "./KeenSlider";

function GalleryComponent({ projectData }) {
    const [screenWidth, setScreenWidth] = useState(null); // Initialize with null
  
    useEffect(() => {
      // Set the initial width when the component mounts
      setScreenWidth(window.innerWidth);
  
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []); 
  
    // This ensures we skip rendering until we have a valid screen width
    if (screenWidth === null) return null;
  
    return <KeenSlider projectData={projectData} />;

    // if (screenWidth < 768) {
    //   return <GalleryMobile projectData={projectData} />;
    // } else {
    //   return <KeenSlider projectData={projectData} />;
    // }
  }
  
  export default GalleryComponent;
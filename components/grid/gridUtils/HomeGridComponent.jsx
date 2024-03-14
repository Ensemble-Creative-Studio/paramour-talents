'use client'
import React, { useState, useEffect } from "react";
import FeaturedGridHome from "../FeaturedProjectsHome";
import FeaturedGridHomeDesktop from "../FeaturedClientHomeDesktop";

function HomeGridComponent({ heroData }) {
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
  
    if (screenWidth < 768) {
      return <FeaturedGridHome heroData={heroData} />;
    } else {
      return <FeaturedGridHomeDesktop heroData={heroData} />;
    }
  }
  
  export default HomeGridComponent;
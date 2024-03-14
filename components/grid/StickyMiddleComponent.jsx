'use client'
import React, { useRef, useEffect, useState } from 'react';
import { useStickyMiddle } from './gridUtils/sticky';

const StickyMiddleComponent = ({ project, author }) => {
  const [ref, style] = useStickyMiddle();
  const componentRef = useRef(null);
  const [isMiddle, setIsMiddle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (componentRef.current) {
        const { top, height } = componentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Calculate the distance from the top of the element to the middle of the viewport
        const distanceToMiddle = Math.abs(top - windowHeight / 2);
        const isElementInMiddle = distanceToMiddle > (-height / 2 - 10) && distanceToMiddle < (height / 2 + 4);
        setIsMiddle(isElementInMiddle);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [componentRef]);


  return (
    <div className="z-40 sticky pointer-events-none text-white mix-blend-difference" ref={ref} style={style}>
      <div
        ref={componentRef}
        style={{ opacity: isMiddle ? '1' : '0', transition: 'opacity 0.3s ease 0.05s' }}
      >
        <h2 className="projectTitle uppercase text-center">{project}</h2>
        <h4 className="projectTag text-center uppercase pt-4">{author}</h4>
      </div>
    </div>
  );
};

export default StickyMiddleComponent;

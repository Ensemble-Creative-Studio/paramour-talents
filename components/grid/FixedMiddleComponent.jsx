// import React, { useRef, useEffect, useState } from 'react';
// import { useStickyMiddle } from './gridUtils/sticky';

const FixedMiddleComponent = ({ project, authors }) => {
  
  return (
    <div className="projectTitleHover z-40 left-0 top-0 opacity-0 fixed h-screen w-screen flex justify-center items-center pointer-events-none mix-blend-difference" >
      <div>
        <h2 className="bigName text-white uppercase text-center">{project}</h2>
        <h4 className="romie text-2xl text-white text-center uppercase pt-4 md:pt-3">{authors}</h4>
      </div>
    </div>
  );
};

export default FixedMiddleComponent;

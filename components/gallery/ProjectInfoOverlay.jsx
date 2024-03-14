// ProjectInfoOverlay.js
import React from "react";

function ProjectInfoOverlay({ title, authors }) {

  return (
    <div className="infoOverlay animation-fadeout opacity-100 fixed top-0 left-0 z-30 h-screen w-screen almostWhite flex justify-center items-center">
      <div className="z-10  sticky pointer-events-none " >
          <h2 className="bigName uppercase text-center">
              {title}
          </h2>
          <h4 className="romie text-2xl grey text-center uppercase pt-4 md:pt-3">{authors}</h4>
      </div>
    </div>
  );
}

export default ProjectInfoOverlay;

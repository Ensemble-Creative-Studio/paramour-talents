'use client'

import React, { useState } from 'react';
import DelayLink from '../utils/DelayLink';
import FadingImage from '../utils/FadeInImage';
import FixedMiddleComponent from './FixedMiddleComponent';
import { CurrentTagContext } from '../utils/CurrentTagContext';
import { useContext,useEffect } from 'react';

export default function WorksGridDesktop({ filteredProject }) {
  const [useFirstSet, setUseFirstSet] = useState(true); // starts with first set

  useEffect(() => {
    // toggle the set for the next render
    setUseFirstSet(prev => !prev);
  }, []); // T
  const { currentTag } = useContext(CurrentTagContext);

  // Check if ALL is selected
  const isAllSelected = currentTag === null;

  // Filter projects based on the currentTag
  const projectsToDisplay = isAllSelected
    ? filteredProject.filter(project => !project.tagsSUB || project.tagsSUB.length === 0)
    : filteredProject;

  return (
    <>
      {projectsToDisplay.map((project, index) => (
        <div className="gridProjects h-screen" key={index}>
          <ProjectRow project={project} showOnlyFirstImage={project.showOnlyFirstImage} useFirstSet={useFirstSet} />
        </div>
      ))}
    </>
  );
}


const ProjectRow = ({ project, showOnlyFirstImage,useFirstSet }) => {

  let tags;

  if (project.tags && project.tags.length > 0) {
    tags = project.tags.map((tag) => tag.title).join(", ");
  } else if (project.tagsSUB && project.tagsSUB.length > 0) {
    tags = project.tagsSUB.map((tag) => tag.title).join(", ");
  } else {
    tags = "No tags available";
  }
  
  const [firstSpan, setFirstSpan] = useState(() => randomSpan(isWideOrVideo(project), showOnlyFirstImage));
  const [firstStart, setFirstStart] = useState(() => randomStartColumn(0, firstSpan, showOnlyFirstImage));
  
  
  const [firstPosition, setFirstPosition] = useState(() => decideItemPosition(0));

  const [secondStart, setSecondStart] = useState(() => randomStartColumn(1));
  const [secondSpan, setSecondSpan] = useState(() => getSecondSpan(firstStart, firstSpan, isWideOrVideo(project)));
  const [secondPosition, setSecondPosition] = useState(() => decideItemPosition(1, firstPosition));

  if (showOnlyFirstImage) {
    const useFirstSet = Math.random() < 0.5;

    return (
      <Project 
        project={project} 
        index={0}
        startColumn={useFirstSet ? firstStart : secondStart}
        span={useFirstSet ? firstSpan : secondSpan}
        position={useFirstSet ? firstPosition : secondPosition}
        tags={tags}
      />
    );
  }
  return (
    <>
      <Project 
        project={project} 
        index={0}
        startColumn={firstStart}
        span={firstSpan}
        position={firstPosition}
        tags={tags}
      />
      <Project 
        project={project} 
        index={1}
        startColumn={secondStart}
        span={secondSpan}
        position={secondPosition}
        tags={tags}
      />
    </>
  );
}

function decideItemPosition(index, prevPosition) {
  let positions = ['start', 'center', 'end'];

  if (prevPosition === 'start') {
    positions = ['end'];
  } else if (prevPosition === 'end') {
    positions = ['start'];
  } else if (prevPosition === 'center') {
    positions = ['center', 'center'];
  }

  return positions[Math.floor(Math.random() * positions.length)];
}

function decidePadding(index, position) {
  const paddingValues = ['8vh', '16vh'];

  if (position === 'start') {
    return { paddingTop: paddingValues[Math.floor(Math.random() * paddingValues.length)] };
  } else if (position === 'end') {
    return { paddingBottom: paddingValues[Math.floor(Math.random() * paddingValues.length)] };
  }
  return {};
}

const Project = ({ project, index, tags, startColumn, span, position }) => {
  const paddingStyle = decidePadding(index, position);

  const alignItems = {
    start: "flex-start",
    center: "center",
    end: "flex-end"
  }[position];

  const style = {
    gridColumnStart: startColumn,
    gridColumnEnd: `span ${span}`,
    alignItems: alignItems,
    ...paddingStyle
  };

  return (
    <div className="flex" style={style}>
      <DelayLink
        className="flex projectHover"
        href={`/talents/${project.slug.current}`}
      >
        <ProjectMedia project={project} index={index} /> 
        {/* Notice the index prop here */}
        <FixedMiddleComponent client={project.client} tags={tags} />
      </DelayLink>
    </div>
  );
};

const ProjectMedia = ({ project, index }) => {
  if (index === 0) {
    if (hasVideos(project)) {
      return (
        <div className='relative h-auto'>
          <video key={project.videosGallery[0].urlLoop} autoPlay playsInline loop muted className="w-full h-full">
            <source src={project.videosGallery[0].urlLoop} type="video/mp4" />
          </video>
        </div>
      );
    } else {
      return (
        <div className='relative h-auto'>
          <FadingImage src={project.firstImage?.url} alt="Your Image" width={1000} height={1000} />
        </div>
      );
    }
  } else if (index === 1) {
    if (!project.firstImage && project.videosGallery[1]) {
      return (
        <div className='relative h-auto'>
          <video key={project.videosGallery[1].urlLoop} autoPlay playsInline loop muted className="w-full h-full">
            <source src={project.videosGallery[1].urlLoop} type="video/mp4" />
          </video>
        </div>
      );
    } else {
      return (
        <FadingImage src={project.secondImage?.url} alt="Your Image" width={1000} height={1000} />
      );
    }
  } else {
    return (
      <FadingImage src={project.secondImage?.url} alt="Your Image" width={1000} height={1000} />
    );
  }
};

// const ProjectMedia = ({ project, index }) => {
//   if (index === 0) {
//     console.log(project)
    
//     if ( hasVideos(project)) { // Check if there's no firstImage and there are videos.
//       return (
//         <div className='relative h-auto'>
//           <video key={project.videosGallery[0].urlLoop} autoPlay playsInline loop muted className="w-full h-full">
//             <source src={project.videosGallery[0].urlLoop} type="video/mp4" />
//           </video>
//           <p>{project.videosGallery[0].urlLoop}</p>
//           {/* {project.videosGallery[1] && (
//             <video autoPlay playsInline loop muted className="w-full h-full">
//               <source src={project.videosGallery[1].urlLoop} type="video/mp4" />
//             </video>
//           )} */}
//         </div>
//       );
//     }  else { // If there are no videos, just display the first image.
//       return (
//         <div className='relative h-auto'>
//           <FadingImage src={project.firstImage?.url} alt="Your Image" width={1000} height={1000} />
//         </div>
//       );
//     }
//   } else { // If index is not 0
//     return hasVideos(project) ? (
//       <FadingImage src={project.firstImage?.url} alt="Your Image" width={1000} height={1000} />
//     ) : (
//       <FadingImage src={project.secondImage?.url} alt="Your Image" width={1000} height={1000} />
//     );
//   }
// };


const isWideOrVideo = (project) => {
  return hasVideos(project) || isWideImage(project);
};

const hasVideos = project => project.videosGallery && project.videosGallery.length > 0;

const isWideImage = project => {
  if (!project.firstImage) return null;
  return project.firstImage.metadata.dimensions.aspectRatio >= 1;
};

const randomValue = (max) => {
  return Math.floor(Math.random() * max) + 1;
}

const randomSpan = (isWideOrVideoBool, showOnlyFirstImage ) => {
  if (showOnlyFirstImage) {
    
    if (isWideOrVideoBool) {
      return [ 6, 7,8,9][Math.floor(Math.random() * 4)]; // Span can be 4, 5, 6, or 7
    }
    return 3; // Only 4 if isWideOrVideoBool is false
  }

  else{
    const spans = isWideOrVideoBool ? [4, 5] : [3, 4];
    return spans[Math.floor(Math.random() * spans.length)];
  }

}


const randomStartColumn = (index, firstSpan , showOnlyFirstImage ) => {
  if (showOnlyFirstImage) {
        // Calculate start column based on the span to ensure it doesn't exceed the 12th column
        const startColumn = 13 - firstSpan ; 
        return startColumn;
  }
  if (index === 0 && !showOnlyFirstImage) {

    return randomValue(2);
  } else {
    return 7 + randomValue(2);
  }
}






const getSecondSpan = (firstStart, firstSpan, isWideOrVideoBool) => {
  let secondSpan = randomSpan(isWideOrVideoBool);
  
  // Ensure that the sum of the first and second spans is at least 7
  while (firstSpan + secondSpan < 7) {
    secondSpan = randomSpan(isWideOrVideoBool);
  }

  return secondSpan;
}

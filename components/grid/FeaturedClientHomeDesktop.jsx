'use client'
import { useState, useEffect } from "react";
import React from "react";
import DelayLink from "../utils/DelayLink";
import FadingImage from "../utils/FadeInImage";
import FixedMiddleComponent from "./FixedMiddleComponent";

export default function FeaturedGridHomeDesktop({ heroData }) {
  const projects = heroData[0].projects;
  const chunkedProjects = chunkArray(projects, 2);

  return (
    <div>
      {chunkedProjects.map((projectChunk, index) => (
        <ProjectRow key={index} projects={projectChunk} />
      ))}
    </div>
  );
}

const ProjectRow = ({ projects }) => {
  const [firstStart, setFirstStart] = useState(() => randomStartColumn(0));
  const [firstSpan, setFirstSpan] = useState(() => randomSpan(isWideOrVideo(projects[0])));
  const [firstPosition, setFirstPosition] = useState(() => decideItemPosition(0));
  const [secondStart, setSecondStart] = useState(() => randomStartColumn(1));
  const [secondSpan, setSecondSpan] = useState(() => getSecondSpan(firstStart, firstSpan, isWideOrVideo(projects[1] || {})));
  const [secondPosition, setSecondPosition] = useState(() => decideItemPosition(1, firstPosition));

  return (
    <div className="gridProjects justify-between h-screen">
      {projects.map((project, projectIndex) => {
        const authors = project.author.map((author) => author.name).join(", ");

        return (
          <Project 
            key={project._id} 
            project={project} 
            index={projectIndex} 
            startColumn={projectIndex === 0 ? firstStart : secondStart}
            span={projectIndex === 0 ? firstSpan : secondSpan}
            position={projectIndex === 0 ? firstPosition : secondPosition}
            authors={authors}
          />
        )
      })}
    </div>
  );
};


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
  return {};  // returning default empty object for 'center' or any other value
}


const Project = ({ project, index, authors, startColumn, span, position }) => {
  // Removed this line: const position = decideItemPosition(index);
  const paddingStyle = decidePadding(index, position);

  const alignItems = {
    start: "flex-start",
    center: "center",
    end: "flex-end"
  }[position];

  const style = {
    gridColumnStart: startColumn,
    gridColumnEnd: `span ${span}`,
    alignItems: alignItems,  // Here's the change
    ...paddingStyle
  };
  
  return (
    <div className="flex" style={style}>
      <DelayLink
        className="flex projectHover"
        href={`/projects/${project.slug.current}`}
      >
        <ProjectMedia project={project} />
        <FixedMiddleComponent project={project.title} authors={authors} />
      </DelayLink>
    </div>
  );
};


const ProjectMedia = ({ project }) => (
  <div className='relative h-auto'>
    {hasVideos(project) ? (
      <video autoPlay playsInline loop muted className="w-full h-full">
        <source src={project.videosGallery[0].urlLoop} type="video/mp4" />
      </video>
    ) : (
      <FadingImage src={project.firstImage.url} alt="Your Image" width={1000} height={1000} />
    )}
  </div>
);

const chunkArray = (arr, chunkSize) => {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

const isWideOrVideo = (project) => {
  return hasVideos(project) || isWideImage(project);
};

const hasVideos = project => project.videosGallery && project.videosGallery.length > 0;

const isWideImage = project => project.firstImage?.metadata.dimensions.aspectRatio >= 1;



const randomValue = (max) => {
  return Math.floor(Math.random() * max) + 1;
}

const randomSpan = (isWideOrVideoBool) => {
  const spans = isWideOrVideoBool ? [4, 5] : [3, 4];
  return spans[Math.floor(Math.random() * spans.length)];
}
const randomStartColumn = (index, firstSpan = 0) => {
  if(index === 0) {
    return randomValue(2);
  } else {
    return 7 + randomValue(2); // The second item will always start from column 8 or 9
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

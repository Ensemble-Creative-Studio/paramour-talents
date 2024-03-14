import React from "react";
import Link from "next/link";
import FadingImage from "../utils/FadeInImage";
import StickyMiddleComponent from "./StickyMiddleComponent";
import RandomJustifyImagePair from "./gridUtils/RandomJustifyImagePair";
import DelayLink from "../utils/DelayLink";
import { CurrentTagContext } from '../utils/CurrentTagContext';
import { useContext } from 'react';
export default function WorksGrid({ filteredProject }) {
  const { currentTag } = useContext(CurrentTagContext);

  // Check if ALL is selected
  const isAllSelected = currentTag === null;

  // Filter projects based on the currentTag
  const projectsToDisplay = isAllSelected
    ? filteredProject.filter(project => !project.tagsSUB || project.tagsSUB.length === 0)
    : filteredProject;
  return (
    <div>
      {projectsToDisplay.map((project, index) => {
        const isWide = project.firstImage?.metadata.dimensions.aspectRatio >= 1;

        let tags;

        if (project.tags && project.tags.length > 0) {
          tags = project.tags.map((tag) => tag.title).join(", ");
        } else if (project.tagsSUB && project.tagsSUB.length > 0) {
          tags = project.tagsSUB.map((tag) => tag.title).join(", ");
        } else {
          tags = "No tags available";
        }
                const hasUrlLoop =
          project.videosGallery && project.videosGallery[0]?.urlLoop; // Check if videosGallery exists and is not empty
        return (
          <div className="pt-12 px-6" key={index}>
            <StickyMiddleComponent client={project.client} tags={tags} />
            {isWide ? (
              <DelayLink href={`/talents/${project.slug.current}`}>
                <div className="relative  w-full h-auto pt-16 pb-48">
                  <FadingImage
                    src={project.firstImage.url}
                    alt="Your Image"
                    width={1000}
                    height={1000}
                  />
                </div>
              </DelayLink>
            ) : (
              <DelayLink  href={`/talents/${project.slug.current}`}>
                <RandomJustifyImagePair
                showOnlyFirstImage={project.showOnlyFirstImage}
                  firstImage={project.firstImage?.url}
                  secondImage={project.secondImage?.url}
                  alt={project.client}
                  urlLoop={hasUrlLoop}
                />
             
              </DelayLink>
            )}
          </div>
        );
      })}
    </div>
  );
}

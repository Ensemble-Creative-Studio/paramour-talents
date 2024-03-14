import React from "react";
import DelayLink from "../utils/DelayLink";
import StickyMiddleComponent from "./StickyMiddleComponent";
import FadingImage from "../utils/FadeInImage";
import FixedMiddleComponent from "./FixedMiddleComponent";

export default function FeaturedGridHome({ heroData }) {
  const projects = heroData[0].projects;

  return (
    <div>
      {projects.map((project, index) => {
        // const isWide = project.firstImage.metadata.dimensions.aspectRatio >= 1;
        const authors = project.author.map((author) => author.name).join(", ");

        return (
          <div key={index}>
            {/* <StickyMiddleComponent project={project.title} author={authors}  /> */}
            <DelayLink
              className="flex justify-center projectHover"
              href={`/projects/${project.slug.current}`}
            >
              <FixedMiddleComponent project={project.title} authors={authors} />
              <div
                className={`relative h-auto w-full`}
              >
                <FadingImage
                  src={project.firstImage.url}
                  alt={project.title}
                  width={1000}
                  height={1000}
                  className={'w-full'}
                  style={{ objectFit: 'cover', width: '100vw', height: '80vh' }}
                />
              </div>
            </DelayLink>
          </div>
        );
      })}
    </div>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import StickyMiddleComponent from './StickyMiddleComponent';
import HeaderLink from "../utils/HeaderLink";
import FadingImage from "../utils/FadeInImage";
export default function FeaturedGridHome({ heroData }) {
  const projects = heroData[0].projects;

  return (
    <div>
      <div className="romie font-light uppercase text-center text-h1-mobile py-28">
        Featured <br /> Projects
      </div>
      {projects.map((project, index) => {
        const isWide = project.firstImage.metadata.dimensions.aspectRatio >= 1;
        const tags = project.tags.map((tag) => tag.title).join(", ");

        return (
          <div className="pt-12" key={index}>
            <StickyMiddleComponent client={project.client} tags={tags} />
            <Link
              className="flex justify-center pt-16 pb-48"
              href={`/works/${project.slug.current}`}
            >
              <div
                className={`relative px-6  h-auto ${
                  isWide ? "w-full" : "w-4/5"
                }`}
              >
                            <FadingImage src={project.firstImage.url} alt="Your Image" width={1000} height={1000} />

                {/* <Image
                  src={project.firstImage.url}
                  alt={project.client}
                  className="w-full object-cover h-full"
                  width={1000}
                  height={1000}
                /> */}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

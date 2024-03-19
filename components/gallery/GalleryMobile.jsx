import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import FadingImage from "../utils/FadeInImage";
import CustomVideoPlayer from "../utils/CustomVideoPlayer";
export default function GalleryMobile({ projectData }) {
  console.log(projectData[0].videosGallery)
    return (
        <div className="flex -z-10 gap-40 flex-col pt-56">
           {projectData[0].videosGallery?.map((video, index) => (
        <div
          key={video._key}
          className={`relative keen-slider__slide number-slide${index}`}
        >
          <div className="flex relative items-end w-full justify-center">
            <div
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              className=" absolute cursor-pointer w-full h-full"
            ></div>
                <CustomVideoPlayer src={video?.urlVideo} />

          </div>
        </div>
      ))}
          {projectData[0].imagesGallery.map((image) => (
            <div key={image._key} className="mb-4">
              <FadingImage
                src={urlForImage(image.asset._ref)}
                alt="Image"
                className="w-full object-cover h-full"
                width={1000}
                height={1000}
                
              />
            </div>
          ))}
        </div>
      );
    }
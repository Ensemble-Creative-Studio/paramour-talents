import logo from "../public/Logo.svg";
import { urlForImage } from "@/sanity/lib/image";

import Image from "next/image";
export default function Hero({ heroData }) {
  return (
    <div className="fixed top-0 w-full -z-10" id="hero">
      <div className="flex justify-center items-center absolute left-0 top-0 h-screen w-screen">
        <div className="w-full h-auto flex justify-center items-center md:h-3/5">
          <Image
            className=" object-contain h-full md:w-full"
            priority
            src={logo}
            width={210}
            height={180}
            alt="Logo param"
          />
        </div>
      </div>

      {heroData[0].imageOrUrl && heroData[0].imageOrUrl.url ? (
        // If there is a URL, render the video tag
        <video
          playsInline
          loop
          autoPlay
          muted
          className="h-screen w-screen object-cover"
        >
          <source src={heroData[0].imageOrUrl.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // If there is no URL, render the image tag
        <div className="w-screen h-screen ">
          <Image
            src={urlForImage(heroData[0].imageOrUrl.image.asset._ref)}
            alt="Image"
            className="w-full object-cover h-full md:object-top hidden md:block"
            width={1200}
            height={1000}
            priority
          />
          <Image
            src={urlForImage(heroData[0].imageOrUrl.imageMobile?.asset._ref)}
            alt="Image"
            className="w-full object-cover h-full md:object-top md:hidden block"
            width={1200}
            height={1000}
            priority
          />
        </div>
      )}
      {/* Additional content can be added here */}
    </div>
  );
}

"use client";
import { useState } from "react"; // Import the useState hook
import ViewAll from "./gallery/ViewAll";
import { useRouter } from "next/navigation"; // Step 1: Import useRouter from "next/router"
import { PortableText } from "@portabletext/react";
import HeaderLink from "./utils/HeaderLink.js";
import TalentGallery from "./gallery/TalentGallery.jsx";
export default function TalentHeader({ talentName, tags, infos, pageData }) {
  // Step 1: Add state variable to keep track of visibility
  const [isViewAllVisible, setIsViewAllVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter(); // Step 2: Access the router object from useRouter()

  // Step 2: Event handler to toggle visibility
  const handleInfosClick = () => {
    setIsVisible(!isVisible);
    setIsViewAllVisible(false);
  };

  // Step 3: Event handler for "Close" link to go back in history
  const handleCloseClick = () => {
    router.back(); // Use router.back() to go back in history
  };

  // Event handler to toggle "View All" component's visibility
  const handleViewAllClick = () => {
    setIsViewAllVisible((prevState) => !prevState);
  };

  const instagram = pageData[0].instagram;
  const InstagramLink = () => {
    if (instagram) {
      return (<HeaderLink href={instagram}>INSTAGRAM</HeaderLink>)
    }
  }
  return (
    <div className="relative">
      <header className={`fixed px-12 md:px-10 left-0 flex flex-col w-full top-10 md:top-0 z-20 items-center ${isViewAllVisible ? "h-screen almostWhite" : ""}`}>
        {/* Step 4: Use anchor tag and attach the handleCloseClick event handler */}
        <div className="flex flex-row w-full h-28 justify-between items-center">
          <a
            className="itemFooter grey uppercase cursor-pointer leading-none md:flex-1"
            onClick={handleCloseClick}
          >
            Back
          </a>
          <div className="hidden md:flex items-center gap-8 everest md:justify-center">
            <HeaderLink href="#portfolio">PORTFOLIO</HeaderLink>
            <HeaderLink href="#videos">VIDEOS</HeaderLink>
            <HeaderLink href="#bio">BIO</HeaderLink>
            <InstagramLink></InstagramLink>
          </div>
          <div className="flex gap-3 md:flex-1 md:justify-end md:items-center">
            <div
              className={`slideCount -z-20 relative menuFooter hidden md:${!isViewAllVisible ? 'block' : 'hidden'}`}
              id="slideCountDiv"
            >
              1/12
            </div>
            <div
              className="itemFooter grey cursor-pointer hidden md:block"
              onClick={handleViewAllClick}
            >
              {`${!isVisible ? "VIEW ALL" : ""}`}
            </div>
            <span
              className="uppercase menuFooter grey leading-none cursor-pointer "
              onClick={handleInfosClick} // Step 2: Attach the event handler to the "Infos" element
            >
              {`${!isVisible ? "Infos" : "Close"}`}
            </span>
          </div>
        </div>
        {/* Step 3: Use conditional rendering to apply classes */}
        <div
          className={`${
            isVisible ? "transition-opacity-active " : "transition-opacity"
          } ${
            isVisible ? "opacity-1 visible" : "opacity-0"
          } invisible -z-10 transition-all fixed top-0 left-0 h-screen w-screen almostWhite px-6 flex items-center justify-center`}
        >
          <h3 className="credits-serif text-center">
            <PortableText value={infos} />{" "}
          </h3>
          <div className="md:hidden block fixed h-24 bottom-0 w-full text-center">
            <h4 className="menuFooter grey">{talentName}</h4>
            <div className="flex items-center gap-8 everest justify-center">
              <HeaderLink href="#portfolio">PORTFOLIO</HeaderLink>
              <HeaderLink href="#videos">VIDEOS</HeaderLink>
              <HeaderLink href="#bio">BIO</HeaderLink>
              <InstagramLink></InstagramLink>
            </div>
          </div>
        </div>
        <h2 className="hidden md:block romie text-7xl uppercase -m-8 text-center">{talentName}</h2>
      </header>
      <TalentGallery
        talentData={pageData}
        isVisible={isViewAllVisible}
        setIsVisible={setIsViewAllVisible}
      />
    </div>
  );
}

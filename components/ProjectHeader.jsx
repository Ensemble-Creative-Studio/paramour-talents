"use client";
import { useState } from "react"; // Import the useState hook
import ViewAll from "./gallery/ViewAll";
import { useRouter } from "next/navigation"; // Step 1: Import useRouter from "next/router"
import { PortableText } from "@portabletext/react";
export default function MiniHeader({ title, authors, infos, pageData }) {
  // Step 1: Add state variable to keep track of visibility
  const [isSlideCountVisible, setIsSlideCountVisible] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter(); // Step 2: Access the router object from useRouter()

  // Step 2: Event handler to toggle visibility
  const handleInfosClick = () => {
    setIsVisible(!isVisible);
  };

  // Step 3: Event handler for "Close" link to go back in history
  const handleCloseClick = () => {
    router.back(); // Use router.back() to go back in history
  };
  const [isViewAllVisible, setIsViewAllVisible] = useState(false);

  // Event handler to toggle "View All" component's visibility
  const handleViewAllClick = () => {
    setIsViewAllVisible((prevState) => !prevState);

    // If "View All" is going to be visible, hide the slide count.
    // Otherwise, show the slide count.
    setIsSlideCountVisible((prevState) => !prevState);
  };

  return (
    <header className="fixed h-28 px-6 left-0 flex justify-between w-full top-10 md:top-0 z-20 items-center">
      {/* Step 4: Use anchor tag and attach the handleCloseClick event handler */}
      <a
        className="itemFooter grey uppercase cursor-pointer leading-none md:flex-1"
        onClick={handleCloseClick}
      >
        Close
      </a>
      <div className="hidden md:flex items-center gap-3 flex2 md:justify-center">
        <h4 className="menuFooter grey">{authors}</h4>
        <h3 className="itemFooter grey">{title}</h3>
      </div>
      <div className="flex gap-3 md:flex-1 md:justify-end md:items-center">
        <div
          className="slideCount -z-20 relative menuFooter hidden md:block"
          id="slideCountDiv"
        >1/12</div>
        <div
          className="itemFooter grey cursor-pointer hidden md:block"
          onClick={handleViewAllClick}
        >
          VIEW ALL
        </div>
        <span
          className="uppercase menuFooter grey leading-none cursor-pointer "
          onClick={handleInfosClick} // Step 2: Attach the event handler to the "Infos" element
        >
          Infos
        </span>
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
          <h4 className="menuFooter grey">{authors}</h4>
          <h3 className="itemFooter grey">{title}</h3>
        </div>
      </div>
      <ViewAll
        projectData={pageData}
        isVisible={isViewAllVisible}
        setIsVisible={setIsViewAllVisible}
      />
    </header>
  );
}

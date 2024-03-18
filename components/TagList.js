"use client";
import { useContext, useState, useEffect } from "react"; // Don't forget to import useState and useEffect
import { CurrentTagContext } from "./utils/CurrentTagContext";
import { TagContext } from "./utils/useTags";
import { useLenis } from "@studio-freight/react-lenis";
export default function TagList() {
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);
  const { tagData } = useContext(TagContext);
  const lenis = useLenis(({ scroll }) => {
    // called every scroll, keep it empty if you don't want to do anything on every scroll
});
  const [windowWidth, setWindowWidth] = useState(0); // Initialize with 0

  useEffect(() => {
    // Update the window width state after the component is mounted
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleTagClick = (tag) => {
    
    // Use lenis to scroll by 100vh if it's available
    if (lenis && lenis.scrollTo) {
        lenis.scrollTo(window.innerHeight, { duration: 1.2 });
    }
};

  const wrapSpansWithDivs = (elements) => {
    const wrappedElements = [];
    for (let i = 0; i < elements.length; i += 2) {
      wrappedElements.push(
        <div key={i} className="flex justify-center">
          {elements[i]}
          {elements[i + 1]}
        </div>
      );
    }
    return wrappedElements;
  };
  const filteredTagData = tagData.filter(tag => tag.count > 0);

  const tagElements = [
    <span
      className={currentTag === null ? "cursor-pointer selected" : "cursor-pointer notselected"}
      onClick={() => {
        setCurrentTag(null); // Retain this for setting the current tag
        handleTagClick(); // Invoke scroll when tag is clicked
      }}
      key="ALL"
    >
      {" "}
      ALL,
    </span>,
    ...filteredTagData.map((tag, index) => (
      <span
        className={`cursor-pointer uppercase ${tag === currentTag ? "selected" : "notselected"}`}
        key={tag._id}
        onClick={() => {
          setCurrentTag(tag); // Retain this for setting the current tag
          handleTagClick(); // Invoke scroll when tag is clicked
        }}
      >
        {tag.title}
        {index === filteredTagData.length - 1 ? "." : ","}
      </span>
    )),
  ];

  const wrappedTagElements = windowWidth >= 768 ? wrapSpansWithDivs(tagElements) : tagElements;

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="flex flex-col text-center flex-wrap">
        {wrappedTagElements}
      </div>
    </div>
  );
}

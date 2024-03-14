import { useEffect, useRef, useState } from "react";

export const useStickyMiddle = () => {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      setStyle({ position: 'sticky', top: `calc(50vh - ${height/2 }px)`, 'margin-top': `-${height}px` });
    }
  }, [ref]);

  return [ref, style];
};

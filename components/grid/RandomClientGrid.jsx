'use client';import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function RandomClientGrid({ image, talent }) {
  const [isBigWindow, setIsBigWindow] = useState(false);
  const [startColumn, setStartColumn] = useState(2);
  const [startRow, setStartRow] = useState(4);

  useEffect(() => {
    setIsBigWindow(window.innerWidth > 768);
    setStartColumn(getRandomStartColumn());
    setStartRow(getRandomStartRow());

    const handleWindowResize = () => {
      setIsBigWindow(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getRandomStartColumn() {
    const columns = [2, 4, 6, 8];
    const shuffledColumns = shuffleArray(columns);
    return shuffledColumns[0];
  }

  function getRandomStartRow() {
    const rows = [4, 5, 6, 7, 8];
    const shuffledRows = shuffleArray(rows);
    return shuffledRows[0];
  }

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  return (
    <>
      {isBigWindow ? (
        <div className="gridClient z-20 pointer-events-none opacity-0">
          <div
            className="position"
            style={{
              gridColumn: `${startColumn} / span 2`,
              gridRow: `${startRow} / span 2`,
            }}
          >
            <Image
              src={image}
              alt={talent}
              className="w-full object-cover h-auto"
              width={1000}
              height={1000}
            />
          </div>
          {/* Your grid content */}
          {/* You can use the 'image' prop here if needed */}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

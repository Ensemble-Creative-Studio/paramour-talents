'use client';
import "../../bo.css";

import { useLenis } from '@studio-freight/react-lenis';
import { useEffect } from 'react'; // Import useEffect

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  const lenis = useLenis(({ scroll }) => {
    lenis.destroy();
  });

  // Call lenis.destroy() when the component unmounts



  return (
    <div>
      {/* <div className='py-4' href="/">
        <a  href='/'className="p-2 ml-2 border  my-4 mix-blend-difference text-white">Go to website</a>
      </div> */}
      <NextStudio config={config} />
    </div>
  );}

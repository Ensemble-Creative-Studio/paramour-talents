"use client";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Fathom from "./fathom";
import Script from "next/script";

export default function RootLayout({ children, params }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });
  useEffect(() => {
    if (lenis && lenis.scrollTo) {
      lenis.scrollTo({ top: 0, behavior: "smooth" });
      // assuming lenis.scrollTo accepts an object with a similar structure to window.scrollTo
    }
  }, [params.slug, lenis]); // This effect will run every time params.slug changes, or lenis is defined

  return (
    <ReactLenis root options={{ lerp: 0.08, wheelMultiplier: 0.5 }}>
      <html lang="en">
        <head>
        <Script src="https://cdn.usefathom.com/script.js" data-site="TGPHYDIK" defer />

          <title>Paramour&Talent</title>
          <meta
            name="description"
            content="Paramour is a paris based production agency dedicated to the fashion and lifestyle industries"
          />

          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(f, a, t, h, o, m){
                  a[h]=a[h]||function(){
                      (a[h].q=a[h].q||[]).push(arguments)
                  };
                  o=f.createElement('script'),
                  m=f.getElementsByTagName('script')[0];
                  o.async=1; o.src=t; o.id='fathom-script';
                  m.parentNode.insertBefore(o,m)
                })(document, window, 'https://cdn.usefathom.com/tracker.js', 'fathom');
                fathom('set', 'siteId', 'TGPHYDIK');
              `,
            }}
          /> */}
        </head>
        <AnimatePresence initial={true}>
          <body key={params.slug} >
            {children}
          </body>
          
        </AnimatePresence>

      </html>
    </ReactLenis>
  );
}

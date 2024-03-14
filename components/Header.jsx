import Link from "next/link";
import { Suspense } from "react";
import HeaderLink from "./utils/HeaderLink";
export default function Header({}) {
  return (
    <header className="fixed  left-0 flex justify-center w-full top-10 z-20 pointer-events-none">
      <div className="flex gap-8 pointer-events-auto everest">
      <Suspense fallback={false}>

        <HeaderLink href="/">HOME</HeaderLink>
        <HeaderLink href="/talents">TALENTS</HeaderLink>
        <HeaderLink href="https://www.paramour.fr/">PRODUCTION</HeaderLink>
        <HeaderLink href="/infos">INFOS</HeaderLink>
        </Suspense>
      </div>
    </header>
  );
}

import Link from "next/link";
import Image from "next/image";
import urlBuilder from "@sanity/image-url";
import ContactSentence from "./ContactSentence";
import logo from "../public/Logo.svg";
import { getCurrentYear } from "./utils/getYear";
export default function Footer({ footerData, pageLegalData }) {
  const currentYear = getCurrentYear();
  return (
    <footer className="z-10 pt-24 pb-10 md:h-screen md:flex md:flex-col md:justify-between md:px-10">
      <div className=" flex justify-center pb-20 md:h-full md:pb-0 md:items-center md:w-full">
        <Image
          className=" object-contain  mix-blend-difference contrast-50 md:h-full md:w-3/12	 "
          priority
          src={logo}
          width={180}
          height={180}
          alt="Logo param"
        />
      </div>
      <div className="flex flex-col gap-10 md:flex-row justify-start md:gap-10">
        <div className=" text-center md:text-left md:flex-1">
          <h3 className="pb-4 md:pb-8 menuFooter">ADDRESS</h3>
          <ContactSentence footerData={footerData[0].adressText} />
        </div>
        <div className=" text-center md:text-left md:flex-1">
          <h3 className="pb-4 md:pb-8 menuFooter">CONTACT</h3>
          <ContactSentence footerData={footerData[0].contactText} />
        </div>
        <div className=" text-center md:text-left md:flex-1">
          <h3 className="pb-4 md:pb-8 menuFooter">SOCIALS</h3>
          <ContactSentence footerData={footerData[0].SocialText} />
        </div>
        <div className=" text-center md:text-left md:flex-1">
          <h3 className="pb-4 md:pb-8 uppercase itemFooterSmaller grey">
            ©paramour {currentYear}
          </h3>
          {pageLegalData.map((page, index) => (
            <div key={index}>
              <Link className="itemFooterSmaller" href={page.slug.current}>
                {page.titre}
              </Link>
            </div>
          ))}
          <Link className="itemFooterSmaller " href="https://ensemble.ooo">
            Site by ensemble.ooo
          </Link>
        </div>
      </div>
    </footer>
  );
}

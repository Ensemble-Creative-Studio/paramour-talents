import "../globals.css";
import Hero from "@/components/Hero";
import MedieumSentence from "@/components/MediumSentence";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TalentList from "@/components/TalentList";
import Layout from "@/components/transition/PageTransition";
import {
  getInfos,
  getFooter,
  getPageLegal,
  getFeaturedTalents,
} from "../../sanity/sanity-util";
export default async function Infos() {
  const heroData = await getInfos();
  ``;
  const footerData = await getFooter();
  const talentData = await getFeaturedTalents();

  const pageLegalData = await getPageLegal();
  return (
    <Layout>
      <div className="">
        <Header />
        <main>
          <Hero heroData={heroData} />
          <div className="z-10 padding-top-screen relative almostWhite px-6 md:px-10">
            <div className="pt-32 pb-16 md:pt-48 md:pb-24">
              <h3 className="credits-sans">ABOUT</h3>
              <MedieumSentence heroData={heroData[0].aboutText} />
            </div>
            <div className="pt-32 pb-16 md:pt-48">
              <h3 className="credits-sans">SERVICES</h3>
              <MedieumSentence heroData={heroData[0].serviceText} />
            </div>
            <div className="romie font-light uppercase text-center text-h1-mobile  credits-serif pt-48 md:pt-56 pb-1 ">
              Our talents
            </div>
            <TalentList talentData={talentData} fontSize='credits-sans' />

            <Footer footerData={footerData} pageLegalData={pageLegalData} />
          </div>
        </main>
      </div>
    </Layout>
  );
}

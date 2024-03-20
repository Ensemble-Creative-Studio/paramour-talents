import "./globals.css";
import Image from "next/image";
import Hero from "@/components/Hero";
import BigSentence from "@/components/BigSentence";
import Header from "@/components/Header";
import FeaturedGridHome from "@/components/grid/FeaturedProjectsHome";
import HomeGridComponent from "@/components/grid/gridUtils/HomeGridComponent";
import Footer from "@/components/Footer";
import Layout from "@/components/transition/PageTransition";
import {
  getHero,
  getFeaturedTalents,
  getFooter,
  getPageLegal,
} from "../sanity/sanity-util";
import TalentList from "@/components/TalentList";
export default async function Home() {
  const heroData = await getHero();
  const talentData = await getFeaturedTalents();
  const footerData = await getFooter();
  const pageLegalData = await getPageLegal();

  return (
    <Layout>
      <div className="">
        <Header />
        
        <main className="">
          <Hero heroData={heroData} />

          <div className="padding-top-screen relative almostWhite home">
            {/* <BigSentence heroData={heroData} /> */}
            {/* <HomeGridComponent heroData={heroData} /> */}
            <FeaturedGridHome heroData={heroData} />

            <div className="romie font-light uppercase text-center text-h1-mobile credits-serif pt-48 md:pt-56 pb-1 ">
              Our talents
            </div>
            <TalentList talentData={talentData[0].talents} fontSize='credits-sans' />

            <Footer footerData={footerData} pageLegalData={pageLegalData} />
          </div>
        </main>
      </div>
    </Layout>
  );
}

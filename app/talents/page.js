import React from "react";
import "../globals.css";
import Header from "@/components/Header";
import TagList from "@/components/TagList";
import ProjectList from "@/components/ProjectList";
import { TagProvider } from "@/components/utils/useTags";
import { ProjectProvider } from "@/components/utils/useProjects";
import { CurrentTagProvider } from "@/components/utils/CurrentTagContext";
import {
  getTag,
  getTalents,
  getFooter,
  getPageLegal,
} from "../../sanity/sanity-util";
import Footer from "@/components/Footer";
import Layout from "@/components/transition/PageTransition";
import TalentList from "@/components/TalentList.jsx";
export default async function Work() {
  const tagData = await getTag();
  const talentData = await getTalents();
  const footerData = await getFooter();

  const pageLegalData = await getPageLegal();

  return (
    <Layout>
      <CurrentTagProvider>
        <ProjectProvider initialData={talentData}>
          <TagProvider initialData={tagData}>
            <div>
              <Header />
              <main className="almostWhite  works">
                {/* <TagList /> */}
                <div className="md:px-10">
                  {/* <ProjectList /> */}
                  <div className="romie font-light uppercase text-center text-h1-mobile credits-serif pt-48 md:pt-56 pb-1 ">
                    Our talents
                  </div>
                  <TalentList talentData={talentData} fontSize='credits-sans' />
                  <Footer footerData={footerData} pageLegalData={pageLegalData} />
                </div>
              </main>
            </div>
          </TagProvider>
        </ProjectProvider>
      </CurrentTagProvider>
    </Layout>
  );
}

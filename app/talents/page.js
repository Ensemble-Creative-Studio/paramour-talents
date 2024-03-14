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
export default async function Work() {
  const tagData = await getTag();
  const projectsData = await getTalents();
  const footerData = await getFooter();

  const pageLegalData = await getPageLegal();

  return (
    <Layout>
      <CurrentTagProvider>
        <ProjectProvider initialData={projectsData}>
          <TagProvider initialData={tagData}>
            <div>
              <Header />
              <main className="almostWhite  works">
                <TagList />
                <div className="md:px-10">
                <ProjectList />
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

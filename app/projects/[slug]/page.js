import "../../globals.css";

import MiniHeader from "@/components/MiniHeader";
import GalleryComponent from "@/components/gallery/GalleryComponent";
import ProjectInfoOverlay from "@/components/gallery/ProjectInfoOverlay";
import { getProjectBySlug } from "../../../sanity/sanity-util";
import LayoutNoFade from "@/components/transition/PageTransitionNoFade";
import Layout from "@/components/transition/PageTransition";
import { SliderProvider } from "@/components/gallery/context/SliderContext";
export default async function Page({ params }) {
  const projectData = await getProjectBySlug(params.slug);
  const project = projectData[0]
  const title = project.title;
  const authors = project.author.map((author) => author.name).join(", ");
  const infos = project.informationsBlock;

  return (
    <LayoutNoFade>
      <SliderProvider>
      <div className="px-6">
        <ProjectInfoOverlay title={title} authors={authors} />
        <MiniHeader title={title} authors={authors} infos={infos} pageData={projectData} />
        <GalleryComponent projectData={projectData} />
      </div>
      </SliderProvider>
    </LayoutNoFade>
  );
}

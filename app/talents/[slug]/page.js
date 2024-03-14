import "../../globals.css";

import MiniHeader from "@/components/MiniHeader";
import GalleryComponent from "@/components/gallery/GalleryComponent";
import ProjectInfoOverlay from "@/components/gallery/ProjectInfoOverlay";
import { getTalentBySlug } from "../../../sanity/sanity-util";
import LayoutNoFade from "@/components/transition/PageTransitionNoFade";
import Layout from "@/components/transition/PageTransition";
import { SliderProvider } from "@/components/gallery/context/SliderContext";
export default async function Page({ params }) {
  const talentData = await getTalentBySlug(params.slug);
  const talent = talentData[0]
  const name = talent.name;
  const expertises = talent.tags.map((tag) => tag.title).join(", ");
  const infos = talent.informationsBlock;


  return (
    <LayoutNoFade>
      <SliderProvider>
      <div className="px-6">
        <ProjectInfoOverlay title={name} authors={expertises} />
        <MiniHeader title={name} authors={expertises} infos={infos} pageData={talentData} />
        <GalleryComponent projectData={talentData} />
      </div>
      </SliderProvider>
    </LayoutNoFade>
  );
}

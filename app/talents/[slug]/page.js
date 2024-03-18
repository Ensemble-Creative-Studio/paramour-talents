import "../../globals.css";

import GalleryComponent from "@/components/gallery/GalleryComponent";
import ProjectInfoOverlay from "@/components/gallery/ProjectInfoOverlay";
import { getTalentBySlug } from "../../../sanity/sanity-util";
import LayoutNoFade from "@/components/transition/PageTransitionNoFade";
import Layout from "@/components/transition/PageTransition";
import { SliderProvider } from "@/components/gallery/context/SliderContext";
import TalentHeader from "@/components/TalentHeader.jsx";
export default async function Page({ params }) {
  const talentData = await getTalentBySlug(params.slug);
  const talent = talentData[0]
  const name = talent.name;
  const tags = talent.tags.map((tag) => tag.title).join(", ");
  const infos = talent.informationsBlock;


  return (
    <LayoutNoFade>
      <SliderProvider>
      <div className="px-6">
        <ProjectInfoOverlay title={name} authors={tags} />
        <TalentHeader talentName={name} tags={tags} infos={infos} pageData={talentData} />
        <GalleryComponent projectData={talentData} />
      </div>
      </SliderProvider>
    </LayoutNoFade>
  );
}

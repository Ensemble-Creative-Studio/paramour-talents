import Link from "next/link";
import RandomClientGrid from "./grid/RandomClientGrid";

export default function TalentList({ talentData, fontSize }) {
  return (
    <div className="px-6 pb-24">
      {talentData.map((talent, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex justify-center">
            <Link className="hover" href={`/talents/${talent.slug.current}`}>
              <h2 className={`everest uppercase portable-h1 text-center pb-1 ${fontSize}`}>
                {index === talentData.length - 1
               ? `${talent.name}`
               : `${talent.name}`}
              </h2>
            </Link>
            <RandomClientGrid image={talent.firstImage?.url} />
          </div>
        </div>
      ))}
    </div>
  );
}

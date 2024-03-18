import { client } from "../sanity/lib/client";
import { groq } from "next-sanity";

export async function getHero() {
  return client.fetch(groq`
    *[_type == 'homePage' && imageOrUrl != null]{
      _type,

  imageOrUrl,
  bigSentence,
  
  "projects": projects[]->{
    ...,
slug,
    client,
    author[]->,
   
    "firstImage": imagesGallery[0].asset->{
        url,
      
        metadata
    }
  },

    
    }
  `);
}
export async function getInfos() {
  return client.fetch(groq`*[_type == 'infos']`);
}
export async function getFooter() {
  return client.fetch(groq`*[_type == 'footer']`);
}
export async function getPageLegal() {
  return client.fetch(groq`*[_type == 'pageFooter']`);
}
export async function getFeaturedTalents() {
  const data = await client.fetch(groq`
    *[_type == 'featuredTalents']{
      "talents": talents[]->{
        slug,
        talent,
        name,
        tags[]->,
        "firstImage": imagesGallery[0].asset->{
          url,
        }
      },
    }
  `);

  // Sort the 'clients' array of each featuredClients document
  data.forEach(featuredTalents => {
    featuredTalents.talents.sort((a, b) => a.name.localeCompare(b.name));
  });

  return data;
}
export async function getTag() {
  return client.fetch(groq`*[_type == 'tag']|order(orderRank){
    ...,
    _id,
    "count": count(*[_type == "talents" && references(^._id)])
  }`);
}
export async function getTalents() {
  return client.fetch(
    groq`*[_type == 'talents']{
      ..., 
      tags[]->,
      "firstImage": imagesGallery[0].asset->{
        url,
      
        metadata
    },
    "secondImage": imagesGallery[1].asset->{
        url,
      
        metadata
    },
    "videosLoop": videosGallery[]->{
      urlLoop,
      
      
    },
    }|order(orderRank)`
  );
}
export async function getTalentBySlug(slug) {

  return client.fetch(groq`
    *[_type == 'talents' && slug.current == $slug]{
      ...,
      tags[]->,
    
    }`, 
    { slug }  // Passing the slug as a parameter to the query
  );
}
export async function getProjectBySlug(slug) {

  return client.fetch(groq`
    *[_type == 'projects' && slug.current == $slug]{
      ...,
      "author": author[]->,
    
    }`, 
    { slug }  // Passing the slug as a parameter to the query
  );
}


// export async function getPresentation(lang) {
//   return client.fetch(groq`*[_type == 'presentation']`);
// }
// export async function getProjects(lang) {
//   return client.fetch(groq`*[_type == 'projets']|order(orderRank)`);
// }

// export async function getFooter(lang) {
//   return client.fetch(groq`*[_type == 'footer']`);
// }
// export async function getPage(lang) {
//   return client.fetch(groq`*[_type == 'pageFooter']`);
// }

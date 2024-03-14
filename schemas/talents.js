import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export default {
  type: "document",
  name: "talents",
  title: "Talents",
  orderings: [orderRankOrdering],
  fields: [
    { name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the talent",
      required: true,
    },
    { name: "tags",
      type: "array",
      title: "Expertises",
      description:'Select an expertise for the talent',
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
      // validation: (Rule) => Rule.required(),
    },
    // { name: "tagsSUB",
    //   type: "array",
    //   title: "Sub categories",
    //   description: "Select ONLY one sub category if it is a child project",
    //   of: [
    //     {
    //       type: "reference",
    //       to: [{ type: "tag" }],
    //     },
    //   ],
    //   validation: (Rule) => Rule.max(1).error('You can only select one tag.'),
    // },
    { name: "slug",
      title: "Slug",
      type: "slug",
      description: "Click on generate to auto-fill",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    { name: "informationsBlock",
      title: "Description",
      type: "blockContent",
      description: "Enter a text about the talent",
    },
    {
      name: "imagesGallery",
      title: "Images gallery",
      type: "array",
      description:
        "Image size should be < 5Mo, the first or the 2 first image will be used as the project thumbnail",
      of: [{ type: "image" }],
      // validation: (Rule) => Rule.required(),
    },
    {
      name: "showOnlyFirstImage",
      type: "boolean",
      title: "Show only the first image",
      description:
        "Check this box to display only the first image in a bigger format on the work page.",
    },
    {
      name: "videosGallery",
      title: "Videos gallery",
      type: "array",
      description: "Video links for looping and full videos.",
      of: [
        {
          type: "object",
          title: "VideoItem",
          fields: [
            {
              name: "urlLoop",
              type: "url",
              title: "URL for Looping Video",
            },
            {
              name: "urlVideo",
              type: "url",
              title: "URL for Full Video",
            },
            {
              name: "videoShowPosition",
              type: "number",
              title: "Show Video After Image Number",
              description:
                "Select after which image the video should be shown. Ensure it's less than or equal to the total number of images in the gallery.",
              validation: (Rule) =>
                Rule.required()
                  .integer()
                  .positive()
                  .warning(
                    "Ensure this is less than or equal to the total number of images in the gallery."
                  ),
            },
          ],
        },
      ],
    },
    orderRankField({ type: "talents", name: "name" }),
  ],
  // preview: {
  //   select: {
  //     talent: "talent",
  //     tagsSUB: "tagsSUB.0.title", // Get the first item from the array of references
  //   },
  //   prepare: ({ talent, tagsSUB }) => {
  //     console.log("Talent:", talent);
  //     console.log("TagsSUB:", tagsSUB);
      
  //     const subCategory = tagsSUB; // Since tagsSUB now directly holds the title
  //     console.log("SubCategory:", subCategory);
      
  //     const displayName = subCategory ? `${talent} - ${subCategory}` : talent;
  //     console.log("DisplayName:", displayName);
      
  //     return {
  //       title: displayName,
  //     };
  //   },
  // },
};
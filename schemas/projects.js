import { orderRankField, orderRankOrdering, } from "@sanity/orderable-document-list";

export default {
    name: "projects",
    title: "Projects",
    type: "document",
    orderings: [orderRankOrdering],
    fields: [
      { name: "title",
        title: "Project title",
        type: "string",
        description: "Enter the name of the title",
        required: true,
      },
      { name: "slug",
        title: "Slug",
        type: "slug",
        description: "Click on generate to auto-fill",
        options: {
          source: "title",
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      { name: 'author',
        title: 'Author',
        type: 'array',
        description: 'Select the talent(s) behind this project',
        of: [{ type: 'reference', to: { type: 'talents' } }], // Replace 'talents' with the actual name of the document type representing projects.
      },
      { name: "informationsBlock",
        title: "Description",
        type: "blockContent",
        description: "Enter a text about the project",
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
      orderRankField({ type: "projects", name: "title" }),
    ],
  };
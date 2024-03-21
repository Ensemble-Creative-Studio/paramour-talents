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
      { name: "galleries",
        title: "Galleries",
        description: "Create multiple galleries",
        type: "array",
        of: [
          { name: 'gallery',
            title: 'Gallery',
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Gallery title',
                type: 'string',
              },
              {
                name: 'medias',
                title: 'Medias',
                description: 'Drag and drop directly in this field to import multiple images. Image size should be < 5Mo.',
                type: 'array',
                of: [
                  {
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                  },
                  {
                    name: 'video',
                    title: 'Video',
                    type: 'object',
                    fields: [
                      {
                        name: 'title',
                        title: 'Title',
                        type: 'string',
                      },
                      {
                        name: 'urlLoop',
                        title: 'URL for looping video',
                        type: 'url',
                      },
                      {
                        name: 'urlVideo',
                        title: 'URL for full video',
                        type: 'url',
                      },
                    ],
                  }
                ],
              },
            ],
            preview: {
              select: {
                medias: 'medias',
                title: 'title',
              },
              prepare(selection) {
                const { medias, title } = selection;
                const itemCount = medias?.length || 0;
                return {
                  title: title,
                  subtitle: `${itemCount} items`,
                };
              },
            },                    
          },
        ],
      },
      orderRankField({ type: "projects", name: "title" }),
    ],
  };
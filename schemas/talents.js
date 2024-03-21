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
    {
      name: "showOnlyFirstImage",
      type: "boolean",
      title: "Show only the first image",
      description:
        "Check this box to display only the first image in a bigger format on the work page.",
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
    { name: 'instagram',
    title: 'Instagram',
    type: 'url',
    description: 'Enter the talent\'s instagram page url',
    validation: Rule => Rule
        .uri({
            scheme: ['https'],
            allowRelative: false
        })
        .regex(/^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/)
        .error('Please enter a valid Instagram URL')
    },
    { name: "informationsBlock",
      title: "Description",
      type: "blockContent",
      description: "Enter a text about the talent",
    },
    orderRankField({ type: "talents", name: "name" }),
  ],
};
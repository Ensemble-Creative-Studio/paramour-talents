export default {
  type: 'document',
  name: 'homePage',
  i18n: true,
  title: 'HomePage',
  fields: [
    {
      name: 'imageOrUrl',
      type: 'object',
      title: 'Hero Image or Video',
      description: 'Always add an image, if you also want a video add a player.vimeo url in the field bellow, the image will be used as a poster in that case. ',
      fields: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          description: 'Upload an image',
          options: {
            metadata: [
              'blurhash',   // Default: included
              'lqip',       // Default: included
              'palette',    // Default: included
              'exif',       // Default: not included
              'location',   // Default: not included
            ],
            validation: Rule => Rule.required()
          }
   
        },
        {
          name: 'imageMobile',
          type: 'image',
          title: 'Image',
          description: 'Upload an image for mobile',
          options: {
            metadata: [
              'blurhash',   // Default: included
              'lqip',       // Default: included
              'palette',    // Default: included
              'exif',       // Default: not included
              'location',   // Default: not included
            ],
            validation: Rule => Rule.required()
          }
   
        },
        {
          name: 'url',
          type: 'url',
          title: 'URL',
          description: 'Enter a URL for the video',
   
        },
  
      ],
    },
    {
      name: "bigSentence",
      type: "blockContent",
      title: "Presentation Text",
      description:'Text in bold will use the TWK Everett font',
      rows: 5,
    },
    {
      name: 'projects',
      title: 'Select projects',
      type: 'array',
      description: 'Select projects to feature on the homepage, IT MUST BE AN EVEN NUMBER',
      of: [{ type: 'reference', to: { type: 'projects' } }], // Replace 'talents' with the actual name of the document type representing projects.
    },
  ],
  
};

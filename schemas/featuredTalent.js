export default {
  name: 'featuredTalents',
  title: 'Featured Talents',
  type: 'document',
  i18n: true,
  fields: [
    {
      name: 'talents',
      title: 'Select Talents',
      type: 'array',
      description: 'Select talents to feature on the homepage and infos pages',
      of: [{ type: 'reference', to: { type: 'talents' } }], // Replace 'talents' with the actual name of the document type representing projects.
    },
  ],
};

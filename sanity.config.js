
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { dashboardTool } from "@sanity/dashboard";
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'

import { schemaTypes } from "./schemas"
import { apiVersion, dataset, projectId } from './sanity/env'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schema } from './sanity/schema'
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["header"])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,

  plugins: [
    deskTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([

              S.listItem()
              .title("HomePage")
              .id("homePage")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
              ),
             
              S.listItem()
              .title("Infos")
              .id("infos")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("infos")
                  .documentId("infos")
              ),
             
              S.divider(),
              orderableDocumentListDeskItem({type: 'projects',  title: 'Projects', S, context}),
              orderableDocumentListDeskItem({type: 'talents',  title: 'Talents', S, context}),
             
              // S.divider(),
              // orderableDocumentListDeskItem({type: 'tag',  title: 'Categories', S, context}),
              S.listItem()
              .title("Featured Talents")
              .id("featuredTalents")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("featuredTalents")
                  .documentId("featuredTalents")
              ),
              S.divider(),
            // Regular document types
            S.listItem()
            .title("Footer")
            .id("footer")
            .child(
              // Instead of rendering a list of documents, we render a single
              // document, specifying the `documentId` manually to ensure
              // that we're editing the single instance of the document
              S.document()
                .schemaType("footer")
                .documentId("footer")
            ),
            S.documentTypeListItem("pageFooter").title("Page légales"),


          ]),
    }),
visionTool(),
    dashboardTool({
      widgets: [
 
      ]
    }),
    vercelDeployTool(),

  ],

  schema: {
    types: schemaTypes,

    // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})

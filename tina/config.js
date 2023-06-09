import { defineConfig, defineSchema } from "tinacms";

const schema = defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
        },
      ],
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return `/`;
          }
          return undefined;
        },
      },
    },
    {
      label: "Episodes",
      name: "episode",
      path: "content/episode",
      fields: [
        {
          type: "string",
          label: "title",
          name: "title",
        },
        {
          type: "datetime",
          label: "date",
          name: "date",
        },
        {
          type: "string",
          label: "short description",
          name: "short_description",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "rich-text",
          label: "description",
          name: "description",
          isBody: true,
        },
        {
          type: "string",
          label: "duration",
          name: "duration",
        },
        {
          type: "string",
          label: "file url",
          name: "file_url",
        },
        {
          type: "boolean",
          label: "published",
          name: "is_published",
        },
      ],
      ui: {
        router: ({ document }) => {
          return `/epidsodes/${document._sys.filename}`;
        },
      },
    },
  ],
});

export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema,
});

export default config;

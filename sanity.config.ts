import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";
import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: "9cd32eji",
  dataset: "production",
  title: "Vossagravel studio",
  apiVersion: "2024-02-20",
  basePath: "/admin",
  plugins: [structureTool(), markdownSchema()],
  schema: { types: schemas },
});

export default config;

import { defineConfig } from "astro/config";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const ownerName = process.env.GITHUB_REPOSITORY_OWNER;
const isUserSite = repositoryName === `${ownerName}.github.io`;

export default defineConfig({
  site: ownerName ? `https://${ownerName}.github.io` : "http://localhost:4321",
  base: repositoryName && !isUserSite ? `/${repositoryName}/` : "/",
});

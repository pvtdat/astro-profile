export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["Astro", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "REST API", "PostgreSQL", "Redis"],
  },
  {
    title: "DevOps",
    items: ["Docker", "GitHub Actions", "Linux", "Nginx"],
  },
];

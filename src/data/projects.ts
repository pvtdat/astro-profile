export interface Project {
  name: string;
  role: string;
  description: string[];
  technologies: string[];
  repository?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    name: "E-commerce Platform",
    role: "Frontend Engineer",
    description: [
      "Frontend cho nền tảng thương mại điện tử gồm Storefront và Backoffice, phục vụ quản lý sản phẩm, đơn hàng và trải nghiệm mua sắm của khách hàng.",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "React Hook Form",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "Shadcn UI",
      "Tailwind CSS",
      "Ant Design",
      "Docker",
      "GitLab",
      "Jenkins",
      "K6",
    ],
  },
];

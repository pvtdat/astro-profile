export interface Project {
  name: string;
  description: string;
  technologies: string[];
  repository?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    name: "E-commerce Platform",
    description:
      "Hệ thống thương mại điện tử hỗ trợ quản lý sản phẩm, đơn hàng, khách hàng và nhiều cửa hàng.",
    technologies: ["TypeScript", "Medusa", "PostgreSQL", "Redis"],
    repository: "https://github.com/username/ecommerce-platform",
  },
  {
    name: "AI Medical Imaging",
    description:
      "Pipeline hỗ trợ phân đoạn và phân loại tổn thương trên ảnh y tế.",
    technologies: ["Python", "nnU-Net", "XGBoost"],
    repository: "https://github.com/username/medical-imaging-ai",
  },
  {
    name: "Personal Portfolio",
    description:
      "Website profile tĩnh, tối ưu hiệu năng và triển khai miễn phí bằng GitHub Pages.",
    technologies: ["Astro", "TypeScript", "CSS"],
    demo: "https://username.github.io",
  },
];

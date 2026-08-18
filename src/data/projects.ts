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
  {
    name: "E-commerce Zalo Mini App",
    role: "Frontend Engineer",
    description: [
      "Phát triển ứng dụng thương mại điện tử (Mini App) trên nền tảng Zalo, tối ưu hóa trải nghiệm mua sắm nhanh chóng trên thiết bị di động.",
      "Tích hợp hệ sinh thái Zalo Mini App (ZMP SDK, ZMP UI) để xử lý xác thực người dùng, thanh toán, sổ địa chỉ và thông báo.",
      "Xây dựng các tính năng mua sắm: danh mục sản phẩm, tìm kiếm, giỏ hàng, combo khuyến mãi, áp dụng voucher, tích điểm thành viên (loyalty) và quản lý đơn hàng.",
    ],
    technologies: [
      "TypeScript",
      "React.js",
      "Zalo Mini App (ZMP SDK)",
      "ZMP UI",
      "Zustand",
      "Tailwind CSS",
      "Sass / PostCSS",
      "Vite",
      "React Spring",
      "Embla Carousel",
      "RESTful API",
    ],
  },
];

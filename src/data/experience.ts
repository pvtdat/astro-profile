export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export const experiences: ExperienceItem[] = [
  {
    company: "DXP Software",
    role: "Software Developer",
    period: "2024 – Hiện tại",
    description:
      "Phát triển và vận hành các ứng dụng web phục vụ hoạt động kinh doanh.",
    achievements: [
      "Xây dựng các module frontend và backend bằng TypeScript.",
      "Tự động hóa quy trình kiểm thử và triển khai.",
      "Cải thiện khả năng bảo trì thông qua kiến trúc component và module hóa.",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2022 – 2024",
    description:
      "Thiết kế và triển khai website giới thiệu, landing page và hệ thống quản trị nội dung.",
    achievements: [
      "Phát triển website responsive cho thiết bị di động.",
      "Tối ưu SEO kỹ thuật và tốc độ tải trang.",
    ],
  },
];

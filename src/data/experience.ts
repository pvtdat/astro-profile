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
    role: "Junior Software Engineer",
    period: "Jun 2025 - Hiện tại",
    description:
      "Phát triển và bảo trì các hệ thống Web, Backoffice và nền tảng quản trị phục vụ hoạt động doanh nghiệp.",
    achievements: [
      "Thiết kế và phát triển các module Frontend/Backend bằng **TypeScript**.",
      "Phát triển và tối ưu các module Backoffice phục vụ vận hành doanh nghiệp.",
      "Thiết kế **RESTful API** và tích hợp **GraphQL** cho các hệ thống web.",
      "Thực hiện kiểm thử hiệu năng với **K6** nhằm đánh giá khả năng chịu tải của hệ thống.",
      "Phân tích dữ liệu bằng **PySpark** và xây dựng báo cáo trực quan.",
      "Nghiên cứu và triển khai các mô hình **Object Detection** bằng **YOLO11** và **OpenCV** cho bài toán y tế.",
    ],
  },
];

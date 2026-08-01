export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  position: string;
  greeting: string;
  summary: string;
  about: string[];
  location: string;
  email: string;
  avatar: string;
  cvPath?: string;
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "Nguyễn Văn A",
  position: "Full-stack Developer",
  greeting: "Xin chào, tôi là",
  summary:
    "Tôi xây dựng các sản phẩm web có hiệu năng tốt, dễ bảo trì và tập trung vào trải nghiệm người dùng.",
  about: [
    "Tôi có kinh nghiệm phát triển ứng dụng frontend và backend bằng TypeScript.",
    "Tôi quan tâm đến kiến trúc hệ thống, tối ưu hiệu năng và tự động hóa quy trình triển khai.",
  ],
  location: "Thành phố Hồ Chí Minh, Việt Nam",
  email: "hello@example.com",
  avatar: "avatar-placeholder.svg",
  cvPath: "cv.pdf",
  socials: [
    {
      label: "GitHub",
      url: "https://github.com/username",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/username",
    },
  ],
};

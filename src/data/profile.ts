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
  name: "Dat Pham",
  position: "Software Engineer",
  greeting: "Xin chào, tôi là",
  summary:
    "Specialized in Web Development, Backoffice Systems & Computer Vision.",
  about: [
    "Software Engineer với gần 2 năm kinh nghiệm phát triển ứng dụng Web trong lĩnh vực E-commerce, F&B và Healthcare. Tôi đã tham gia xây dựng các hệ thống Backoffice và nền tảng quản trị doanh nghiệp, đồng thời nghiên cứu và phát triển các giải pháp Computer Vision cho y tế. Tôi yêu thích việc xây dựng những sản phẩm có khả năng mở rộng, dễ bảo trì và mang lại giá trị thực tế.",
  ],
  location: "Ho Chi Minh City, Vietnam",
  email: "phamvantiendat.work@gmail.com",
  avatar: "avatar-placeholder.jpg",
  cvPath: "cv.pdf",
  socials: [
    {
      label: "GitHub",
      url: "https://github.com/pvtdat",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/datphamvantien",
    },
  ],
};

export interface TimelineLogo {
  src: string;
  alt: string;
}

export interface WorkExperienceItem {
  kind: "work";
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  logo: TimelineLogo;
}

export interface EducationItem {
  kind: "education";
  school: string;
  degree: string;
  gpa: string;
  period: string;
  description: string;
  achievements: string[];
  logo: TimelineLogo;
}

export type ExperienceItem = WorkExperienceItem | EducationItem;

export const experiences: ExperienceItem[] = [
  {
    kind: "work",
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
    logo: {
      src: "/experience/dxp-software.png",
      alt: "DXP Software",
    },
  },
  {
    kind: "work",
    company: "MindX Technology School",
    role: "Robotics Instructor — VEX GO & VEX IQ",
    period: "2023 - Hiện tại",
    description:
      "Giảng dạy chuyên môn Robotics cho học sinh, tập trung vào các nền tảng VEX GO và VEX IQ theo định hướng STEM.",
    achievements: [
      "Hướng dẫn học viên lắp ráp và xây dựng robot bằng **VEX GO** và **VEX IQ**.",
      "Giảng dạy các kiến thức nền tảng về **Robotics**, cơ khí, cấu trúc robot và nguyên lý hoạt động của động cơ.",
      "Hướng dẫn lập trình robot, điều khiển chuyển động và xử lý dữ liệu từ các loại **sensor**.",
      "Xây dựng các bài tập và thử thách Robotics nhằm phát triển tư duy logic, khả năng giải quyết vấn đề và sáng tạo kỹ thuật.",
      "Hỗ trợ học viên thiết kế, thử nghiệm và tối ưu robot để hoàn thành các nhiệm vụ thực tế.",
      "Phát triển kỹ năng **STEM**, làm việc nhóm và tư duy kỹ thuật thông qua các dự án Robotics.",
    ],
    logo: {
      src: "/experience/mindx-technology-school.png",
      alt: "MindX Technology School",
    },
  },
  {
    kind: "education",
    school: "Ton Duc Thang University",
    degree: "Bachelor of Software Engineering",
    gpa: "8.42",
    period: "2021 - 2025",
    description:
      "Tốt nghiệp ngành Kỹ thuật Phần mềm tại Đại học Tôn Đức Thắng, được đào tạo toàn diện về phát triển Web và ứng dụng, từ Frontend, Backend đến cơ sở dữ liệu, đồng thời tiếp cận các lĩnh vực Data Science như Machine Learning, Data Mining, Big Data và Digital Image Processing.",
    achievements: [
      "Phát triển các ứng dụng **Web và Software Application** theo mô hình **Frontend - Backend**, từ thiết kế giao diện đến xây dựng API và xử lý nghiệp vụ phía server.",
      "Học và thực hành các công nghệ, nguyên lý phát triển **Frontend**, **Backend**, quản lý dữ liệu và tích hợp giữa các thành phần của hệ thống.",
      "Nắm vững kiến thức về **Software Engineering**, bao gồm phân tích yêu cầu, thiết kế hệ thống, kiến trúc phần mềm, kiểm thử và quy trình phát triển phần mềm.",
      "Thiết kế và làm việc với **Database**, mô hình dữ liệu, truy vấn và các hệ quản trị cơ sở dữ liệu phục vụ ứng dụng.",
      "Nghiên cứu và thực hành các phương pháp **Machine Learning** cho bài toán phân loại, hồi quy, dự đoán và khai phá thông tin từ dữ liệu.",
      "Tiếp cận các kỹ thuật **Data Mining** như tiền xử lý dữ liệu, phân tích đặc trưng, phân cụm, phân loại và phát hiện các mẫu tiềm ẩn trong dữ liệu.",
      "Nghiên cứu và xây dựng **Recommendation Systems**, đồng thời tích hợp mô hình khuyến nghị với **Web Application** thông qua API để cung cấp nội dung và sản phẩm cá nhân hóa theo dữ liệu người dùng.",
      "Làm việc với các khái niệm và công nghệ **Big Data**, xử lý tập dữ liệu lớn và các mô hình tính toán phân tán.",
      "Nghiên cứu **Digital Image Processing**, bao gồm xử lý ảnh, biến đổi ảnh, trích xuất đặc trưng và ứng dụng các phương pháp thị giác máy tính.",
      "Thực hiện các đồ án kết hợp giữa **Software Development** và **Data Science**, từ xây dựng hệ thống đến xử lý, phân tích và khai thác dữ liệu.",
    ],
    logo: {
      src: "/experience/ton-duc-thang-university-square.png",
      alt: "Ton Duc Thang University",
    },
  },
];

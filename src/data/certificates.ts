export interface Certificate {
  title: string;
  issuer: string;
  issuedAt: string;
  image: string;
  credentialUrl?: string;
  skills: string[];
  summary?: string;
}

// Thay nội dung và ảnh mẫu bên dưới bằng chứng chỉ thật của bạn.
export const certificates: Certificate[] = [
  {
    title: "Aptis ESOL Certificate",
    issuer: "British Council",
    issuedAt: "2024",
    image: "certificates/aptis.png",
    skills: ["Aptis ESOL General - CEFR B2"],
  },
  {
    title: "Machine Learning: Introduction with Regression",
    issuer: "Codeacademy",
    issuedAt: "2026",
    image: "certificates/regression.png",
    summary:
      "Hoàn thành khóa học nhập môn Machine Learning với trọng tâm là Linear Regression và Multiple Linear Regression. Thực hành xây dựng mô hình, dự đoán giá trị từ dữ liệu và đánh giá độ chính xác của mô hình.",
    skills: [
      "Machine Learning",
      "Linear Regression",
      "Multiple Linear Regression",
      "Regression",
      "Model Evaluation",
    ],
  },
];

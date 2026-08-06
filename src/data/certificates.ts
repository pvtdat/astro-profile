export interface Certificate {
  title: string;
  issuer: string;
  issuedAt: string;
  image: string;
  credentialUrl?: string;
  skills: string[];
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
    skills: ["Linear Regression", "Multiple Linear Regression"],
  },
];

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
  {
    title: "Machine Learning: K-Nearest Neighbors",
    issuer: "Codecademy",
    issuedAt: "2026",
    image: "certificates/k-nearest-neighbors.png",
    summary:
      "Hoàn thành khóa học Machine Learning về thuật toán K-Nearest Neighbors (KNN), tập trung vào bài toán phân loại dữ liệu dựa trên khoảng cách và độ tương đồng giữa các điểm dữ liệu. Thực hành chuẩn hóa dữ liệu, lựa chọn số lượng hàng xóm K, xây dựng mô hình KNN, chia dữ liệu thành Training, Validation và Test Set, đồng thời đánh giá khả năng dự đoán của mô hình thông qua bài toán phân loại thực tế.",
    skills: [
      "Machine Learning",
      "K-Nearest Neighbors",
      "Classification",
      "Supervised Learning",
      "Distance Metrics",
      "Data Normalization",
      "Model Evaluation",
    ],
  },
  {
    title: "Machine Learning: Random Forests & Decision Trees",
    issuer: "Codecademy",
    issuedAt: "2026",
    image: "certificates/random-forests-decision-trees.png",
    summary:
      "Hoàn thành khóa học Machine Learning về Decision Trees và Random Forests, tập trung vào cách xây dựng cây quyết định để giải quyết bài toán phân loại và kết hợp nhiều cây thành mô hình Random Forest. Thực hành lựa chọn đặc trưng và điều kiện phân chia dữ liệu, xây dựng và đánh giá mô hình, đồng thời sử dụng phương pháp ensemble để giảm overfitting và cải thiện khả năng dự đoán trên dữ liệu mới.",
    skills: [
      "Machine Learning",
      "Decision Trees",
      "Random Forests",
      "Classification",
      "Supervised Learning",
      "Ensemble Learning",
      "Model Evaluation",
    ],
  },
];

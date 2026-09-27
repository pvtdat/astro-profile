insert into public.certifications (
  title,
  issuer,
  category,
  issue_date,
  image_url,
  description,
  display_order,
  published
)
select source.title,
       source.issuer,
       source.category,
       source.issue_date::date,
       source.image_url,
       source.description,
       source.display_order,
       true
from (values
  (
    'Aptis ESOL Certificate',
    'British Council',
    'English',
    '2024-01-01',
    'certificates/aptis.png',
    'Aptis ESOL General - CEFR B2.',
    1
  ),
  (
    'Machine Learning: Introduction with Regression',
    'Codecademy',
    'Machine Learning',
    '2026-01-01',
    'certificates/regression.png',
    'Hoàn thành khóa học nhập môn Machine Learning với trọng tâm là Linear Regression và Multiple Linear Regression. Thực hành xây dựng mô hình, dự đoán giá trị từ dữ liệu và đánh giá độ chính xác của mô hình.',
    2
  ),
  (
    'Machine Learning: K-Nearest Neighbors',
    'Codecademy',
    'Machine Learning',
    '2026-01-01',
    'certificates/k-nearest-neighbors.png',
    'Hoàn thành khóa học Machine Learning về thuật toán K-Nearest Neighbors (KNN), tập trung vào bài toán phân loại dữ liệu dựa trên khoảng cách và độ tương đồng giữa các điểm dữ liệu. Thực hành chuẩn hóa dữ liệu, lựa chọn số lượng hàng xóm K, xây dựng mô hình KNN, chia dữ liệu thành Training, Validation và Test Set, đồng thời đánh giá khả năng dự đoán của mô hình thông qua bài toán phân loại thực tế.',
    3
  ),
  (
    'Machine Learning: Random Forests & Decision Trees',
    'Codecademy',
    'Machine Learning',
    '2026-01-01',
    'certificates/random-forests-decision-trees.png',
    'Hoàn thành khóa học Machine Learning về Decision Trees và Random Forests, tập trung vào cách xây dựng cây quyết định để giải quyết bài toán phân loại và kết hợp nhiều cây thành mô hình Random Forest. Thực hành lựa chọn đặc trưng và điều kiện phân chia dữ liệu, xây dựng và đánh giá mô hình, đồng thời sử dụng phương pháp ensemble để giảm overfitting và cải thiện khả năng dự đoán trên dữ liệu mới.',
    4
  ),
  (
    'Machine Learning: Clustering with K-Means',
    'Codecademy',
    'Machine Learning',
    '2026-01-01',
    'certificates/k-means-clustering.png',
    'Hoàn thành khóa học Machine Learning về Clustering với trọng tâm là thuật toán K-Means và K-Means++. Thực hành khám phá các nhóm tiềm ẩn trong dữ liệu không nhãn, xây dựng và đánh giá mô hình phân cụm, đồng thời áp dụng K-Means vào bài toán nhận diện chữ viết tay.',
    5
  )
) as source(title, issuer, category, issue_date, image_url, description, display_order)
where not exists (
  select 1
  from public.certifications existing
  where existing.title = source.title
    and existing.issuer = source.issuer
);
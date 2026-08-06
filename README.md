# Astro Profile

Profile/portfolio page được xây dựng bằng Astro và có thể deploy miễn phí lên GitHub Pages.

## Chạy local

```bash
npm install
npm run dev
```

Mở địa chỉ được Astro hiển thị, mặc định thường là

```text
http://localhost:4321
```

## Build production

```bash
npm run build
npm run preview
```

## Nội dung cần chỉnh sửa

- `src/data/profile.ts`: thông tin cá nhân, email, avatar, CV và mạng xã hội.
- `src/data/skills.ts`: kỹ năng.
- `src/data/experience.ts`: kinh nghiệm làm việc.
- `src/data/projects.ts`: các dự án.
- `public/avatar-placeholder.svg`: thay bằng avatar của bạn.
- `public/cv.pdf`: thêm CV nếu muốn hiển thị nút xem CV.

## Deploy GitHub Pages

1. Tạo repository trên GitHub.
2. Push toàn bộ source code lên nhánh `main`.
3. Vào `Settings > Pages`.
4. Chọn `Source: GitHub Actions`.
5. Workflow `.github/workflows/deploy.yml` sẽ tự động build và deploy.

`astro.config.mjs` tự xác định tên repository từ biến môi trường GitHub Actions, nên hỗ trợ cả:

- `username.github.io`
- Repository dạng `profile`, `portfolio`, v.v.

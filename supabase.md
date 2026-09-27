# Admin CMS — Next.js + Supabase

## 1. Mục tiêu

Xây dựng một **Admin CMS riêng bằng Next.js** để quản lý dữ liệu cho portfolio Astro hiện tại.

Admin CMS sử dụng:

- **Next.js** — Admin frontend
- **TypeScript**
- **Supabase** — PostgreSQL + Auth + Storage
- **Supabase Auth** — đăng nhập admin
- **Supabase Row Level Security (RLS)** — phân quyền database
- **Tailwind CSS** — UI
- **React Hook Form + Zod** — form validation
- **Vercel** — deployment đề xuất cho Admin CMS

Public portfolio hiện tại vẫn sử dụng **Astro** và không được refactor logic hiện tại ngoài phần cần thiết để đọc certification từ Supabase.

---

# 2. Kiến trúc tổng thể

```text
                    ┌─────────────────────┐
                    │   Public Portfolio  │
                    │       Astro         │
                    │                     │
                    │ yourdomain.com      │
                    └──────────┬──────────┘
                               │
                               │ Read published data
                               ▼
                    ┌─────────────────────┐
                    │      Supabase       │
                    │                     │
                    │ PostgreSQL          │
                    │ Auth                │
                    │ Storage             │
                    │ RLS                 │
                    └──────────┬──────────┘
                               ▲
                               │ CRUD
                               │
                    ┌─────────────────────┐
                    │     Admin CMS       │
                    │      Next.js        │
                    │                     │
                    │ admin.yourdomain.com│
                    └─────────────────────┘
```

## Nguyên tắc

- Portfolio public và Admin CMS là **2 ứng dụng độc lập**.
- Cùng sử dụng một Supabase project.
- Admin CMS không nằm trong public Astro application.
- Admin CMS có URL trực tiếp riêng.
- Không sử dụng secret URL để thay thế authentication.
- Security phải dựa trên Supabase Auth + RLS.
- Không expose Supabase Service Role Key ở client.
- Admin CMS chỉ cho phép authenticated admin truy cập các trang quản trị.

---

# 3. Repository structure

Sử dụng monorepo:

```text
portfolio/
│
├── apps/
│   │
│   ├── web/
│   │   └── # Existing Astro portfolio
│   │
│   └── admin/
│       ├── app/
│       ├── components/
│       ├── lib/
│       ├── types/
│       ├── middleware.ts
│       ├── public/
│       ├── package.json
│       └── ...
│
├── packages/
│   ├── types/
│   │
│   └── database/
│       └── # Shared Supabase types
│
├── supabase/
│   ├── migrations/
│   └── seed.sql
│
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

Nếu repository hiện tại chưa phải monorepo, có thể migrate dần.

Không được làm ảnh hưởng đến application Astro hiện tại.

---

# 4. Admin application

Admin CMS sử dụng:

```text
Next.js
TypeScript
App Router
Tailwind CSS
Supabase
```

Recommended structure:

```text
apps/admin/

├── app/
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   │
│   │   └── certifications/
│   │       ├── page.tsx
│   │       ├── new/
│   │       │   └── page.tsx
│   │       │
│   │       └── [id]/
│   │           └── page.tsx
│   │
│   ├── api/
│   │   └── ...
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── auth/
│   ├── dashboard/
│   └── certifications/
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   │
│   ├── validations/
│   │   └── certification.ts
│   │
│   └── auth/
│       └── ...
│
├── types/
│   └── certification.ts
│
├── middleware.ts
│
├── .env.local
└── package.json
```

---

# 5. Direct URL

Admin CMS phải có URL riêng.

Development:

```text
http://localhost:3001
```

Production:

```text
https://admin.yourdomain.com
```

Public portfolio:

```text
https://yourdomain.com
```

Ví dụ:

```text
Portfolio
https://datpham.dev

Admin CMS
https://admin.datpham.dev
```

Không nên dùng:

```text
https://datpham.dev/admin
```

nếu mục tiêu là tách Admin CMS thành application độc lập.

---

# 6. Direct URL routing

Admin CMS cần hỗ trợ các route:

```text
/
└── redirect → /login

/login
└── Admin login

/dashboard
└── Dashboard

/certifications
└── Certification management

/certifications/new
└── Create certification

/certifications/[id]
└── Edit certification
```

Expected behavior:

```text
Unauthenticated
      │
      ▼
Any protected route
      │
      ▼
Redirect /login
```

Authenticated:

```text
/login
   │
   ▼
/dashboard
```

Authenticated admin:

```text
/certifications
/certifications/new
/certifications/:id
```

---

# 7. Authentication

Sử dụng:

```text
Supabase Auth
```

Không tự implement password authentication.

Không lưu password trong PostgreSQL table riêng.

## Login

Admin login bằng:

```text
Email
Password
```

UI:

```text
┌──────────────────────────────┐
│          Admin CMS            │
│                              │
│ Email                        │
│ [________________________]   │
│                              │
│ Password                     │
│ [________________________]   │
│                              │
│ [        Sign in        ]    │
│                              │
│ Invalid email or password    │
└──────────────────────────────┘
```

Sau khi login thành công:

```text
/login
   ↓
/dashboard
```

---

# 8. Authentication middleware

Tất cả protected routes phải được kiểm tra authentication.

Protected:

```text
/dashboard
/certifications
/certifications/new
/certifications/*
```

Nếu chưa login:

```text
redirect("/login")
```

Nếu đã login:

```text
allow request
```

Không chỉ kiểm tra authentication ở UI.

Server-side route protection là bắt buộc.

---

# 9. Admin authorization

Authentication và authorization phải được tách biệt.

```text
Authentication
= User đã đăng nhập chưa?

Authorization
= User này có quyền quản trị không?
```

Chỉ authenticated admin mới được CRUD certification.

Có thể bắt đầu với một admin duy nhất.

Recommended database structure:

```text
profiles
```

Ví dụ:

```sql
profiles
---------
id
email
role
created_at
```

Role:

```text
admin
```

Có thể mở rộng sau:

```text
admin
editor
viewer
```

---

# 10. Supabase database

Tạo bảng:

```text
certifications
```

Schema:

```sql
create table certifications (
    id uuid primary key default gen_random_uuid(),

    title text not null,

    issuer text not null,

    category text,

    issue_date date,

    credential_id text,

    credential_url text,

    description text,

    image_url text,

    featured boolean default false,

    display_order integer default 0,

    published boolean default true,

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);
```

---

# 11. Certification fields

| Field          | Type      | Required | Description                 |
| -------------- | --------- | -------: | --------------------------- |
| id             | UUID      |      Yes | Unique ID                   |
| title          | text      |      Yes | Certification name          |
| issuer         | text      |      Yes | Certification provider      |
| category       | text      |       No | Category                    |
| issue_date     | date      |       No | Date issued                 |
| credential_id  | text      |       No | Credential ID               |
| credential_url | text      |       No | Verification URL            |
| description    | text      |       No | Description                 |
| image_url      | text      |       No | Certificate image           |
| featured       | boolean   |       No | Featured certification      |
| display_order  | integer   |       No | Sorting order               |
| published      | boolean   |       No | Visible on public portfolio |
| created_at     | timestamp |     Auto | Creation time               |
| updated_at     | timestamp |     Auto | Last update                 |

---

# 12. Certification CRUD

Admin CMS phải hỗ trợ đầy đủ:

```text
Create
Read
Update
Delete
```

---

## 12.1 Certification list

Route:

```text
/certifications
```

UI:

```text
Certifications

[ + Add Certification ]

Search: [________________]

┌─────────────────────────────────────────────────────────┐
│ Title          │ Issuer       │ Date       │ Published │
├─────────────────────────────────────────────────────────┤
│ AWS Developer  │ AWS          │ 2026-01-01 │ Yes       │
│ Python         │ Codecademy   │ 2025-10-10 │ Yes       │
└─────────────────────────────────────────────────────────┘
```

Features:

- Search
- Pagination
- Sort
- Published filter
- Featured filter
- Edit
- Delete
- Create

---

# 13. Create certification

Route:

```text
/certifications/new
```

Form:

```text
Certification

Title
[____________________________]

Issuer
[____________________________]

Category
[____________________________]

Issue Date
[____________________________]

Credential ID
[____________________________]

Credential URL
[____________________________]

Description
[____________________________]

Image
[ Upload Image ]

Display Order
[____________________________]

Featured
[ ]

Published
[ ]

[ Cancel ]       [ Save ]
```

Validation:

```text
title
required

issuer
required

credential_url
valid URL if provided

issue_date
valid date

display_order
integer
```

Sử dụng:

```text
Zod
React Hook Form
```

---

# 14. Edit certification

Route:

```text
/certifications/[id]
```

Load certification bằng ID.

Form được pre-populated:

```text
Existing data
     ↓
Edit form
     ↓
Validate
     ↓
Update Supabase
     ↓
Success
     ↓
/certifications
```

Không được tạo certification mới khi đang edit.

---

# 15. Delete certification

Delete phải có confirmation.

Ví dụ:

```text
Delete certification?

Are you sure you want to delete:

"AWS Certified Developer"

This action cannot be undone.

[Cancel] [Delete]
```

Không delete ngay khi click icon.

Flow:

```text
Delete button
      ↓
Confirmation dialog
      ↓
Confirm
      ↓
DELETE
      ↓
Refresh list
```

---

# 16. Image management

Certificate image nên sử dụng:

```text
Supabase Storage
```

Không lưu binary image trong PostgreSQL.

Bucket:

```text
certifications
```

Structure:

```text
certifications/
    certification-id/
        certificate.webp
```

Database chỉ lưu:

```text
image_url
```

hoặc storage path.

---

# 17. Image upload

Flow:

```text
Admin
 │
 │ Upload image
 ▼
Next.js
 │
 ▼
Supabase Storage
 │
 ▼
Storage path
 │
 ▼
certifications.image_url
```

Validate:

```text
Allowed:
jpg
jpeg
png
webp

Maximum size:
5 MB
```

Có thể bổ sung image optimization sau.

---

# 18. Supabase RLS

RLS phải được bật.

```sql
alter table certifications enable row level security;
```

Public portfolio:

```text
SELECT published certifications
```

Admin:

```text
SELECT
INSERT
UPDATE
DELETE
```

Public user không được:

```text
INSERT
UPDATE
DELETE
```

---

# 19. Public certification policy

Portfolio Astro chỉ cần đọc certification đã publish.

Logic:

```sql
published = true
```

Ví dụ policy:

```text
Public
    │
    └── SELECT
          │
          └── published = true
```

Admin:

```text
Authenticated admin
    │
    ├── SELECT
    ├── INSERT
    ├── UPDATE
    └── DELETE
```

Không dùng frontend condition để giả lập security.

---

# 20. Environment variables

Admin CMS:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

hoặc publishable key tương ứng với cấu hình Supabase hiện tại.

Không commit:

```text
.env.local
```

vào Git.

---

# 21. Service Role Key

Nếu cần Supabase Service Role Key:

```env
SUPABASE_SERVICE_ROLE_KEY=
```

Chỉ sử dụng ở server-side.

Tuyệt đối không:

```text
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
```

Không import service role key vào:

```text
Client Component
Browser
Public API
```

Service role key bypass RLS nên phải được bảo vệ.

---

# 22. Supabase client architecture

Tạo:

```text
lib/supabase/client.ts
```

cho browser/client usage.

Tạo:

```text
lib/supabase/server.ts
```

cho server-side usage.

Tạo:

```text
lib/supabase/middleware.ts
```

cho session handling nếu cần.

Không tạo một Supabase client duy nhất rồi sử dụng tùy tiện ở mọi context.

---

# 23. UI architecture

Dashboard layout:

```text
┌─────────────────────────────────────────────────────────┐
│ Admin CMS                              User ▼           │
├───────────────┬─────────────────────────────────────────┤
│               │                                         │
│ Dashboard     │                                         │
│               │                                         │
│ Certifications│              Main Content               │
│               │                                         │
│ Settings      │                                         │
│               │                                         │
│               │                                         │
│ Logout        │                                         │
└───────────────┴─────────────────────────────────────────┘
```

Sidebar:

```text
Dashboard

Content
  Certifications

System
  Settings

Logout
```

---

# 24. Dashboard

Dashboard ban đầu chỉ cần đơn giản.

Hiển thị:

```text
Total Certifications
Published
Draft
Featured
```

Ví dụ:

```text
┌─────────────┐
│ 12          │
│ Certifications
└─────────────┘

┌─────────────┐
│ 10          │
│ Published   │
└─────────────┘

┌─────────────┐
│ 2           │
│ Drafts      │
└─────────────┘
```

Không cần xây analytics phức tạp ở version đầu tiên.

---

# 25. Loading / Error / Empty states

Tất cả data fetching phải xử lý:

```text
Loading
Error
Empty
Success
```

Ví dụ empty state:

```text
No certifications yet.

Create your first certification.

[ + Add Certification ]
```

Error:

```text
Failed to load certifications.

[ Try Again ]
```

Không để UI trắng khi API/database lỗi.

---

# 26. Toast / feedback

Các mutation cần feedback.

Create:

```text
Certification created successfully.
```

Update:

```text
Certification updated successfully.
```

Delete:

```text
Certification deleted successfully.
```

Error:

```text
Failed to update certification.
```

---

# 27. Public portfolio integration

Sau khi Admin CMS hoạt động, Astro portfolio sẽ đọc certification từ Supabase thay vì hard-code/local data.

Flow:

```text
Admin CMS
    │
    │ CRUD
    ▼
Supabase
    │
    │ published = true
    ▼
Astro Portfolio
```

Không thay đổi UI certification hiện tại nếu không cần thiết.

Mục tiêu migration:

```text
Before:

Local data
    ↓
Astro
    ↓
Certification UI


After:

Supabase
    ↓
Astro
    ↓
Certification UI
```

---

# 28. Migration requirement

Trước khi xoá data local:

```text
1. Identify current certification structure
2. Create Supabase table
3. Create migration/seed data
4. Verify database data
5. Update Astro data fetching
6. Compare old vs new rendering
7. Test
8. Only then remove obsolete local data
```

Không được làm mất certification data hiện tại.

---

# 29. Direct deployment

Recommended deployment:

```text
GitHub
   │
   ├───────────────┐
   │               │
   ▼               ▼
Astro              Next.js
Vercel             Vercel
   │               │
   ▼               ▼
yourdomain.com     admin.yourdomain.com
```

Supabase:

```text
Supabase Project
       │
       ├── Database
       ├── Auth
       └── Storage
```

---

# 30. Custom domain

Production:

```text
yourdomain.com
```

Admin:

```text
admin.yourdomain.com
```

DNS:

```text
admin.yourdomain.com
        │
        ▼
      Vercel
        │
        ▼
 Next.js Admin CMS
```

Admin URL không phải là security mechanism.

Security phải đến từ:

```text
Supabase Auth
+
Authorization
+
RLS
```

---

# 31. Login redirect behavior

### Case 1 — chưa authenticated

```text
https://admin.yourdomain.com/certifications
```

redirect:

```text
https://admin.yourdomain.com/login
```

### Case 2 — authenticated

```text
https://admin.yourdomain.com/login
```

redirect:

```text
https://admin.yourdomain.com/dashboard
```

### Case 3 — logout

```text
/dashboard
      ↓
signOut()
      ↓
/login
```

---

# 32. Security requirements

Mandatory:

- Supabase Auth
- RLS
- Server-side authentication check
- Server-side authorization
- Secure cookies/session handling
- Environment variables
- No service role key in browser
- No password stored manually
- Validate all form input
- Validate uploaded files
- Confirmation before destructive actions

Không dựa vào:

```text
hidden admin URL
frontend-only role check
obfuscated route
localStorage admin flag
```

để bảo vệ CMS.

---

# 33. Type safety

Không sử dụng:

```typescript
any;
```

cho database models nếu có thể tránh.

Generate Supabase types:

```text
Database
Certification
Profile
```

Shared types có thể đặt tại:

```text
packages/types/
```

hoặc:

```text
packages/database/
```

---

# 34. Error handling

Database error:

```text
try
  mutation
catch
  show user-friendly error
  log technical error server-side
```

Không expose:

```text
database credentials
SQL details
service role information
internal stack trace
```

cho end user.

---

# 35. Testing requirements

Phải test trước khi merge.

## Authentication

Test:

```text
[ ] Login success
[ ] Wrong password
[ ] Invalid email
[ ] Logout
[ ] Protected route without login
[ ] Direct access to /certifications without login
[ ] Session persistence
```

## Certification CRUD

```text
[ ] Create
[ ] Read
[ ] Update
[ ] Delete
[ ] Cancel delete
[ ] Validation
[ ] Invalid URL
[ ] Empty required fields
[ ] Search
[ ] Filter
[ ] Published status
[ ] Featured status
```

## Security

```text
[ ] Public user cannot INSERT
[ ] Public user cannot UPDATE
[ ] Public user cannot DELETE
[ ] Admin can CRUD
[ ] Service role key is not exposed
[ ] Protected pages redirect correctly
```

## Storage

```text
[ ] Upload valid image
[ ] Reject unsupported file type
[ ] Reject oversized file
[ ] Image URL saved correctly
```

---

# 36. Regression test

Quan trọng nhất:

**Refactor CMS không được làm thay đổi behavior hiện tại của portfolio.**

Before:

```text
Local certification data
```

After:

```text
Supabase certification data
```

UI output phải tương đương.

Test:

```text
Certification count
Certification title
Issuer
Issue date
Credential URL
Image
Ordering
Published state
```

---

# 37. Definition of Done

Feature chỉ được coi là hoàn thành khi:

```text
[ ] Next.js Admin CMS chạy local
[ ] Supabase project configured
[ ] Certification table created
[ ] RLS enabled
[ ] Admin authentication working
[ ] Protected routes working
[ ] Dashboard working
[ ] Certification list working
[ ] Create working
[ ] Edit working
[ ] Delete working
[ ] Validation working
[ ] Image upload working
[ ] Logout working
[ ] Error states working
[ ] Loading states working
[ ] Empty states working
[ ] Tests passing
[ ] Production build passing
[ ] Environment variables documented
[ ] Admin deployed
[ ] Direct admin URL working
[ ] Astro portfolio still working
[ ] Public certifications only show published records
```

---

# 38. Implementation order

Codex nên triển khai theo thứ tự:

### Phase 1 — Project setup

```text
1. Create Next.js admin app
2. Configure TypeScript
3. Configure Tailwind
4. Configure Supabase
5. Configure environment variables
```

### Phase 2 — Database

```text
1. Create certifications table
2. Create profiles table if needed
3. Create migrations
4. Configure RLS
5. Seed existing certification data
```

### Phase 3 — Authentication

```text
1. Supabase Auth
2. Login page
3. Session handling
4. Middleware
5. Protected routes
6. Logout
```

### Phase 4 — CMS

```text
1. Dashboard
2. Certification list
3. Create
4. Edit
5. Delete
6. Search
7. Filter
8. Sorting
```

### Phase 5 — Storage

```text
1. Create bucket
2. Upload image
3. Store image path
4. Display preview
5. Handle replacement
```

### Phase 6 — Portfolio integration

```text
1. Replace local certification source
2. Query Supabase
3. Filter published
4. Preserve current UI
5. Regression test
```

### Phase 7 — Deployment

```text
1. Deploy Admin
2. Configure environment variables
3. Configure custom domain
4. Configure Supabase production settings
5. Test direct URL
6. Test authentication
7. Test CRUD
8. Test public portfolio
```

---

# 39. Expected final architecture

```text
                    GitHub Repository
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
       apps/web                    apps/admin
         Astro                       Next.js
              │                         │
              │                         │
              │                         ▼
              │                    Supabase Auth
              │                         │
              │                         ▼
              └─────────────────► Supabase
                                    │
                         ┌──────────┼──────────┐
                         │          │          │
                         ▼          ▼          ▼
                      Database     Auth      Storage
                         │
                         ▼
                  certifications
```

Production:

```text
https://yourdomain.com
        │
        └── Astro Portfolio


https://admin.yourdomain.com
        │
        └── Next.js Admin CMS


Supabase
        │
        ├── PostgreSQL
        ├── Auth
        ├── RLS
        └── Storage
```

---

# 40. Important implementation constraint

Không over-engineer version đầu tiên.

V1 chỉ cần:

```text
Authentication
+
Dashboard
+
Certification CRUD
+
Image Storage
+
RLS
```

Không cần triển khai ngay:

```text
Blog CMS
Project CMS
Analytics
Realtime
Notifications
Role hierarchy
Audit log
AI
Vector search
```

Các module trên có thể sử dụng cùng architecture sau khi Certification CMS ổn định.

Mục tiêu của V1 là tạo một **production-like Admin CMS nhỏ nhưng có authentication, authorization, database, storage và CRUD hoàn chỉnh**, đồng thời giữ nguyên behavior của Astro portfolio hiện tại.

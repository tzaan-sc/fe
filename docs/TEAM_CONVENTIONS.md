# QUY ƯỚC LÀM VIỆC NHÓM (TEAM CONVENTIONS)
**Dự án:** RAG Dataset Builder Studio  
**Áp dụng:** Frontend & Backend & Database  

---

## 1. Quy Ước Đặt Tên Dữ Liệu (Naming Conventions)
- **JSON API (Frontend $\leftrightarrow$ Backend):** Sử dụng `camelCase` cho tất cả các field.
  - ✅ Hợp lệ: `documentId`, `chunkSize`, `pageStart`, `hasTable`
  - ❌ Tránh dùng: `document_id`, `chunk_size`, `PageStart`
- **Database Tables & Columns (Backend / PostgreSQL / SQLite):**
  - Bảng: Số nhiều, `snake_case` (vd: `documents`, `chunks`, `parent_chunks`).
  - Cột: `snake_case` (vd: `document_id`, `created_at`).
  - *Lưu ý:* Backend ORM / Serializer tự động map `snake_case` $\rightarrow$ `camelCase` khi trả response về cho Frontend.

---

## 2. Quy Chuẩn Git & Nhánh (Branching Workflow)
- **Nhánh chính:**
  - `main`: Nhánh ổn định, dùng để demo hoặc nộp bài / deploy.
  - `dev`: Nhánh tích hợp chung của cả nhóm.
- **Quy tắc đặt tên nhánh tính năng:**
  - `feat/fe-<tên-tính-năng>`: Nhánh làm giao diện (vd: `feat/fe-chunking-studio`, `feat/fe-dashboard`).
  - `feat/be-<tên-tính-năng>`: Nhánh làm backend (vd: `feat/be-mineru-parser`, `feat/be-chunk-api`).
  - `fix/<tên-lỗi>`: Sửa lỗi (vd: `fix/fe-math-render`).

---

## 3. Quy Ước Commit Message (Conventional Commits)
Cú pháp: `<loại>: <mô tả ngắn bằng tiếng Việt hoặc tiếng Anh>`
- `feat:` Thêm tính năng mới (vd: `feat: hoàn thiện giao diện chunking visualizer`)
- `fix:` Sửa lỗi (vd: `fix: sửa lỗi tràn text trong card chunk`)
- `docs:` Cập nhật tài liệu (vd: `docs: bổ sung endpoint retrieval trong API Contract`)
- `style:` Thay đổi CSS, giao diện mà không đổi logic code
- `refactor:` Tối ưu, viết lại code mà không đổi tính năng
- `chore:` Cài đặt thư viện, cập nhật cấu hình dự án

---

## 4. Biến Môi Trường (Environment Variables)
Frontend sẽ sử dụng file `.env.example`:
```env
# Địa chỉ server Backend
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Chế độ chạy: true = dùng MOCK_DATA.json (khi BE chưa chạy), false = gọi API thật
VITE_USE_MOCK=true

# Thời gian timeout khi gọi API (ms)
VITE_API_TIMEOUT=10000
```

---

## 5. Quy Chuẩn Mã Lỗi HTTP (Status Codes)
- `200 OK`: Thành công (GET, PUT).
- `201 Created`: Tạo mới thành công (POST upload document, generate chunks).
- `400 Bad Request`: Dữ liệu gửi lên sai định dạng (thiếu file, sai tham số chunk).
- `404 Not Found`: Không tìm thấy tài liệu hoặc chunk tương ứng.
- `500 Internal Server Error`: Lỗi phía server xử lý (MinerU bị crash, lỗi DB).

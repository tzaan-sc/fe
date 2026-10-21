# KẾ HOẠCH BÓC TÁCH COMPONENT REACT (UI COMPONENTS PLAN)
**Dự án:** RAG Dataset Builder & AI Knowledge Assistant  

---

## 1. Cấu Trúc Thư Mục Source Code

```text
src/
├── components/
│   ├── layout/
│   │   ├── Topbar.tsx            # Header với nút chuyển đổi phân hệ (User / Tech)
│   │   └── Sidebar.tsx           # Thanh điều hướng thích ứng theo phân hệ
│   ├── user/                     # Phân hệ Người Dùng Cuối
│   │   ├── UserChatView.tsx      # Khung chat với bong bóng hội thoại và trích dẫn
│   │   ├── UserTopicsView.tsx    # Danh mục chuyên đề AI cốt lõi và câu hỏi mẫu
│   │   └── UserQuizView.tsx      # Trắc nghiệm tự kiểm tra kiến thức môn AI
│   └── views/                    # Phân hệ Kỹ Thuật Viên
│       ├── DashboardView.tsx     # Thống kê KPI và biểu đồ token histogram
│       ├── DocumentsView.tsx     # Quản lý tài liệu và đối soát Markdown MinerU
│       ├── ChunkingStudioView.tsx# Trực quan hóa Chunking tối giản và dễ nhìn
│       └── ExportView.tsx        # Kiểm định chất lượng và xuất file JSONL
├── types/index.ts
├── data/mockData.json
└── App.tsx
```

---

## 2. Triết Lý Thiết Kế Trực Quan Hóa Tối Giản (Minimalist Visualizer Philosophy)
- **Bố cục trực quan căn giữa:** Thay vì chia 3 cột cố định khiến phần hiển thị văn bản bị hẹp, giao diện sử dụng thanh điều khiển phía trên và khung đọc văn bản căn giữa với chiều rộng tối ưu (~900px).
- **Phân tách Chunk tinh tế:** Sử dụng viền chỉ thị màu mỏng bên trái (Accent Left Border) kết hợp nền dịu mắt và nhãn thông số nhỏ gọn (`Chunk #12 • Trang 45-46 • 138 tk`).
- **Ngăn kéo Metadata theo ngữ cảnh (On-demand Slide Drawer):** Nhấp vào chunk thì thông số mới trượt ra từ bên phải, khi đóng lại sẽ trả về 100% không gian đọc thoáng đãng.

---

## 3. Hệ Thống Bảng Màu Học Thuật (Academic Slate & Knowledge Library Palette)
- **Nền tổng thể (Background Page):** `#f8fafc` (Slate-50) — dịu mát, không gây mỏi mắt khi đọc sách và tài liệu kỹ thuật dài.
- **Bề mặt thẻ (Surface / Cards):** `#ffffff` (Pure White) với viền mảnh `#e2e8f0` (Slate-200) và đổ bóng nhẹ.
- **Màu thương hiệu & Điều hướng (Academic Indigo):** `#4f46e5` / `#3730a3` — tạo cảm giác học thuật, chuẩn mực, tin cậy.
- **Màu trích dẫn đối soát (Knowledge Emerald):** `#059669` / `#ecfdf5` — làm nổi bật nguồn trích dẫn từ giáo trình (Perplexity style), kết quả kiểm định chính xác.
- **Màu chú thích & Cảnh báo (Scholarly Amber):** `#d97706` / `#fffbeb` — đánh dấu khối token cảnh báo và bảng biểu.
- **Độ tương phản chữ (Typography Contrast):** Tiêu đề `#0f172a` (Slate-900), nội dung `#334155` (Slate-700), chú thích `#64748b` (Slate-500) — tương phản cao tuyệt đối, sắc nét.


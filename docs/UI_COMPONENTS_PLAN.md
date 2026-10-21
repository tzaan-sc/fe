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

# 🧩 KẾ HOẠCH BÓC TÁCH COMPONENT REACT (UI COMPONENTS PLAN)
**Dự án:** RAG Dataset Builder & AI Knowledge Assistant  

---

## 1. Cấu Trúc Thư Mục Source Code

```text
src/
├── components/
│   ├── layout/
│   │   ├── Topbar.tsx            # Header với nút Dual-Persona Switcher (User ⟷ Tech)
│   │   └── Sidebar.tsx           # Thanh điều hướng thích ứng theo Persona
│   ├── user/                     # Phân hệ Người Dùng Cuối
│   │   ├── UserChatView.tsx      # Khung chat với bong bóng hội thoại & citations
│   │   ├── UserTopicsView.tsx    # Danh mục chuyên đề AI cốt lõi & câu hỏi mẫu
│   │   └── UserQuizView.tsx      # Trắc nghiệm tự kiểm tra kiến thức môn AI
│   └── views/                    # Phân hệ Kỹ Thuật Viên
│       ├── DashboardView.tsx     # Thống kê KPI & Biểu đồ token histogram
│       ├── DocumentsView.tsx     # Quản lý tài liệu & đối soát Markdown MinerU
│       ├── ChunkingStudioView.tsx# Trực quan hóa Chunking TỐI GIẢN & DỄ NHÌN
│       └── ExportView.tsx        # Kiểm định chất lượng & Xuất file JSONL
├── types/index.ts
├── data/mockData.json
└── App.tsx
```

---

## 2. Triết Lý Thiết Kế Trực Quan Hóa Tối Giản (Minimalist Visualizer Philosophy)
- **Loại bỏ bố cục 3 cột cứng nhắc:** Trước đây 3 cột khiến khung đọc văn bản bị bóp nghẹt. Đã chuyển sang **khung đọc căn giữa rộng rãi** với thanh điều khiển ngang phía trên.
- **Phân tách Chunk tinh tế:** Thay vì dùng viền khung đứt nét nặng nề, sử dụng **viền màu chỉ thị mỏng bên trái (Accent Left Border)** kết hợp nền dịu mắt và nhãn thông số nhỏ gọn (`Chunk #12 • Trang 45-46 • 138 tk`).
- **Ngăn kéo Metadata khi cần (On-demand Slide Drawer):** Nhấp vào chunk thì thông số mới trượt ra từ bên phải, khi đóng lại sẽ trả về 100% không gian đọc thoáng đãng.

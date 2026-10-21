# 🧩 KẾ HOẠCH BÓC TÁCH COMPONENT REACT (UI COMPONENTS PLAN)
**Dự án:** RAG Dataset Builder & AI Knowledge Assistant  

---

## 1. Cấu Trúc Thư Mục Source Code

```text
src/
├── components/
│   ├── layout/
│   │   ├── Topbar.tsx            # Header với nút Mode Switcher (User Portal ⟷ Tech Studio)
│   │   ├── UserSidebar.tsx       # Sidebar cho Người dùng cuối (Chat, Topics, Quiz)
│   │   └── TechSidebar.tsx       # Sidebar cho Kỹ thuật viên (Dashboard, Documents, Chunking, Export)
│   ├── user/                     # Component dành riêng cho Người Dùng Cuối
│   │   ├── ChatInterface.tsx     # Khung chat với bong bóng hội thoại & citations
│   │   ├── CitationDrawer.tsx    # Modal/Drawer xem chi tiết trang sách & trích dẫn
│   │   ├── TopicsExplorer.tsx    # Danh mục các chủ đề AI cốt lõi
│   │   └── QuizInterface.tsx     # Trắc nghiệm tự kiểm tra kiến thức môn AI
│   └── views/                    # Màn hình Kỹ thuật viên
│       ├── DashboardView.tsx
│       ├── DocumentsView.tsx
│       ├── ChunkingStudioView.tsx
│       └── ExportView.tsx
├── types/index.ts
├── data/mockData.json
└── App.tsx
```

---

## 2. Chiến Lược Hai Chế Độ Người Dùng (Dual-Persona Mode Switcher)
- Ở trên cùng có một nút chuyển đổi nổi bật:
  - 👤 **Người Dùng Thử (AI Knowledge Hub):** Mặc định cho sinh viên, giảng viên muốn trải nghiệm hỏi đáp với kho sách.
  - 🛠️ **Kỹ Thuật Viên (Dataset Studio):** Dành cho admin muốn theo dõi bóc tách MinerU, chia chunking, kiểm định và xuất dataset.

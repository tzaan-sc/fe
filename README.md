# RAG Dataset Builder — Frontend Studio

Giao diện Web trực quan hóa quy trình quản lý, trích xuất (MinerU) và cắt phân đoạn dữ liệu (Chunking Pipeline) cho hệ thống RAG (Retrieval-Augmented Generation).

---

## 📚 Bộ Tài Liệu Chuẩn Bị Hoàn Chỉnh (Project Specifications)

Trước khi bắt tay vào code, toàn bộ kế hoạch và quy chuẩn đã được đặc tả chi tiết tại các tài liệu sau:

| STT | Tên Tài Liệu | Nội Dung Chính | Đối Tượng Sử Dụng |
| :---: | :--- | :--- | :--- |
| 1 | 📑 **[PAGES_SPEC.md](file:///d:/GITHUB/fe/PAGES_SPEC.md)** | Đặc tả ý tưởng, chức năng, luồng tương tác của 5 màn hình chính. | Frontend / Designer |
| 2 | 🤝 **[API_CONTRACT.md](file:///d:/GITHUB/fe/API_Contract.md)** | Thỏa thuận danh sách endpoint, request/response giữa FE & BE. | Backend / Database / FE |
| 3 | 📐 **[DATA_MODELS.md](file:///d:/GITHUB/fe/DATA_MODELS.md)** | Định nghĩa kiểu dữ liệu TypeScript & Schema thực thể (Document, Chunk). | Backend (DB Schema) & FE |
| 4 | 📦 **[MOCK_DATA.json](file:///d:/GITHUB/fe/MOCK_DATA.json)** | Dữ liệu giả lập chuẩn chỉnh để FE code độc lập không cần chờ BE. | Frontend / Test |
| 5 | 🧩 **[UI_COMPONENTS_PLAN.md](file:///d:/GITHUB/fe/UI_COMPONENTS_PLAN.md)** | Kế hoạch bóc tách Component React & kiến trúc thư mục `src/`. | Frontend Developer |
| 6 | ⚖️ **[TEAM_CONVENTIONS.md](file:///d:/GITHUB/fe/TEAM_CONVENTIONS.md)** | Quy ước Git branching, commit messages, naming & biến môi trường. | Toàn bộ thành viên |

---

## 🖥️ 5 Màn Hình Cốt Lõi Trong Hệ Thống

1. **Dashboard (`/dashboard`)**: Tổng quan kho tài liệu, chỉ số trang, biểu đồ phân phối chunk size (Histogram) & thể loại.
2. **Kho Tài Liệu (`/documents`)**: Cây thư mục tài liệu, đối soát song song PDF gốc và Markdown MinerU (hỗ trợ công thức toán KaTeX).
3. **Chunking Studio (`/chunking`)**: Tùy chỉnh tham số chia chunk và trực quan hóa từng khối dữ liệu kèm metadata inspector.
4. **Kiểm Định & Xuất Dữ Liệu (`/export`)**: Rà soát lỗi chất lượng và xuất các file `chunks.jsonl`, `parents.jsonl`, `chunk_stats.json`.
5. **RAG Playground (`/playground`)**: Thử nghiệm truy xuất thông tin (Semantic Search) và hiển thị top chunks tương đồng kèm similarity score.

---

## 🛠️ Công Nghệ Lựa Chọn (Tech Stack)
- **Cốt lõi:** React (Vite) + TypeScript
- **Styling & Icons:** Tailwind CSS + Lucide React
- **Biểu đồ:** Recharts
- **Render Văn bản Khoa học:** `react-markdown` + `rehype-katex` + `remark-math` (hỗ trợ công thức toán học)

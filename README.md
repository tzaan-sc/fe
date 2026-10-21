# RAG Dataset Builder — Frontend Studio

Giao diện Web trực quan hóa quy trình quản lý, trích xuất và cắt phân đoạn dữ liệu (Chunking Pipeline) cho hệ thống RAG (Retrieval-Augmented Generation).

---

## 📌 Tài Liệu Dự Án

- 📑 **[PAGES_SPEC.md](file:///d:/GITHUB/fe/PAGES_SPEC.md)**: Đặc tả chi tiết ý tưởng, chức năng và layout của 5 màn hình chính.
- 🤝 **[API_CONTRACT.md](file:///d:/GITHUB/fe/API_CONTRACT.md)**: Hợp đồng quy chuẩn API kết nối giữa Frontend và Backend/Database.

---

## 🚀 Các Màn Hình Chính

1. **Dashboard (`/dashboard`)**: Tổng quan kho tài liệu, chỉ số trang, biểu đồ phân phối chunk.
2. **Kho Tài Liệu (`/documents`)**: Quản lý tài liệu theo cây thư mục, so sánh song song PDF gốc và Markdown MinerU.
3. **Chunking Studio (`/chunking`)**: Tùy chỉnh tham số chia chunk và trực quan hóa từng khối dữ liệu kèm metadata.
4. **Kiểm Định & Xuất Dữ Liệu (`/export`)**: Báo cáo chất lượng và xuất các file `chunks.jsonl`, `parents.jsonl`.
5. **RAG Playground (`/playground`)**: Thử nghiệm truy xuất thông tin (Semantic Search) và hiển thị top chunks tương đồng.

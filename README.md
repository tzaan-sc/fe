# RAG Dataset Builder & AI Knowledge Assistant

Nền tảng kép kết hợp giữa **Cổng Tra Cứu Tri Thức AI (Dành cho Người Dùng Cuối)** và **Xưởng Xử Lý Dữ Liệu RAG (Dành cho Kỹ Thuật Viên)**.

---

## 1. Hai Phân Hệ Chính Của Ứng Dụng

### 1.1. Phân Hệ Người Dùng Cuối (User Portal)
- **Trợ Lý Chat RAG:** Hỏi đáp tự nhiên về môn Trí tuệ Nhân tạo dựa trên kho sách và giáo trình đã chuẩn hóa.
- **Trích Dẫn Nguồn Minh Bạch (Citations):** Click vào từng luận điểm để xem đoạn trích nguyên văn, số trang và tên sách gốc.
- **Khám Phá Chủ Đề (Topic Explorer):** Khám phá các chuyên đề cốt lõi (A* Search, CSP, Minimax, Machine Learning).
- **Tự Ôn Tập Trắc Nghiệm (Self-Check Quiz):** Kiểm tra độ hiểu bài với các câu hỏi tự động trích xuất từ dataset.

### 1.2. Phân Hệ Kỹ Thuật Viên (Technician Studio)
- **Dashboard:** Thống kê tổng số tài liệu, trang, biểu đồ phân phối token.
- **Kho Tài Liệu:** Đối soát tài liệu gốc và kết quả bóc tách Markdown MinerU.
- **Chunking Studio:** Cấu hình tham số và trực quan hóa phân đoạn chunks tối giản, dễ nhìn.
- **Kiểm Định & Xuất Dữ Liệu:** Rà soát chất lượng và tải về `chunks.jsonl`, `parents.jsonl`.

---

## 2. Bộ Tài Liệu Quy Chuẩn (Trong thư mục `docs/`)
- **[docs/PAGES_SPEC.md](file:///d:/GITHUB/fe/docs/PAGES_SPEC.md):** Đặc tả chi tiết giao diện cả 2 phân hệ.
- **[docs/API_Contract.md](file:///d:/GITHUB/fe/docs/API_Contract.md):** Hợp đồng kết nối API cho cả Chat RAG lẫn Pipeline.
- **[docs/DATA_MODELS.md](file:///d:/GITHUB/fe/docs/DATA_MODELS.md):** Định nghĩa TypeScript Interfaces và Schema.
- **[docs/UI_COMPONENTS_PLAN.md](file:///d:/GITHUB/fe/docs/UI_COMPONENTS_PLAN.md):** Kiến trúc bóc tách component.
- **[docs/TEAM_CONVENTIONS.md](file:///d:/GITHUB/fe/docs/TEAM_CONVENTIONS.md):** Quy ước Git, commit và biến môi trường.

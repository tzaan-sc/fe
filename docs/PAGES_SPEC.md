# 📑 ĐẶC TẢ GIAO DIỆN & DANH SÁCH MÀN HÌNH (UI/UX SPECIFICATION)
**Dự án:** RAG Dataset Builder & AI Knowledge Assistant  
**Đối tượng sử dụng:**
1. 👤 **Người dùng cuối (End-User / Học viên / Giảng viên):** Tra cứu tri thức AI, hỏi đáp với sách giáo trình qua Chatbot RAG, xem trích dẫn nguồn (Citations) và ôn tập trắc nghiệm.
2. 🛠️ **Kỹ thuật viên (Data Engineer / Admin):** Quản lý bóc tách tài liệu MinerU, trực quan hóa phân đoạn chunks tối giản, kiểm định chất lượng và xuất JSONL.

---

## 🗺️ Sơ Đồ Cấu Trúc Toàn Hệ Thống

```text
/ (App Layout với Thanh Chuyển Đổi Chế Độ: [👤 Người Dùng Thử] ⟷ [🛠️ Kỹ Thuật Viên])

══════════════════════════════════════════════════════════════════════
PHÂN HỆ 1: GIAO DIỆN NGƯỜI DÙNG CUỐI (END-USER KNOWLEDGE PORTAL)
══════════════════════════════════════════════════════════════════════
├── 💬 /user/chat           (Trợ lý AI hỏi đáp tri thức môn AI kèm trích dẫn nguồn)
├── 📚 /user/topics         (Khám phá chủ đề cốt lõi: Tìm kiếm, CSP, Minimax, ML)
├── 📝 /user/quiz           (Ôn tập kiến thức - Câu hỏi trắc nghiệm sinh từ Chunks)
└── 📖 /user/citations      (Xem chi tiết trích dẫn nguồn: Tên sách, Trang, Đoạn trích)

══════════════════════════════════════════════════════════════════════
PHÂN HỆ 2: GIAO DIỆN KỸ THUẬT VIÊN (TECHNICIAN STUDIO)
══════════════════════════════════════════════════════════════════════
├── 📊 /admin/dashboard     (Tổng quan thống kê kho dữ liệu & phân phối token)
├── 📁 /admin/documents     (Quản lý tài liệu gốc & đối soát Markdown MinerU)
├── ✂️ /admin/chunking      (Trực quan hóa phân đoạn TỐI GIẢN & DỄ ĐỌC)
└── 📦 /admin/export        (Kiểm định chất lượng & Xuất file chunks.jsonl)
```

---

## 👤 CHI TIẾT GIAO DIỆN NGƯỜI DÙNG CUỐI (END-USER EXPERIENCE)

### 1. Màn hình Trợ Lý Hỏi Đáp Tri Thức AI (`/user/chat`)
- **Khung đàm thoại tối giản & tinh tế:** Định dạng Markdown, hỗ trợ công thức toán học LaTeX, bảng so sánh.
- **Thẻ Trích dẫn nguồn (Citations):** Gắn nhãn số trang và tài liệu cụ thể (`[Nguồn 1: Sách AI Agents in Depth - Trang 45]`). Click để mở cửa sổ chi tiết đoạn trích.
- **Bộ lọc phạm vi:** Toàn bộ sách, chỉ giáo trình tiếng Việt, hoặc bài giảng quốc tế.

### 2. Màn hình Khám Phá Chuyên Đề Môn AI (`/user/topics`)
- Thẻ 4 chuyên đề AI cốt lõi (Chiến lược tìm kiếm, CSP, Minimax, Machine Learning) kèm các câu hỏi mẫu để gửi ngay sang bot.

### 3. Màn hình Tự Ôn Tập Trắc Nghiệm (`/user/quiz`)
- Bài tập trắc nghiệm sinh từ Chunks, phản hồi Đúng/Sai ngay lập tức kèm giải thích chi tiết và trích dẫn số trang sách.

---

## 🛠️ CHI TIẾT GIAO DIỆN KỸ THUẬT VIÊN (TECHNICIAN STUDIO)

### 1. Màn hình Dashboard Tổng Quan (`/admin/dashboard`)
- Thẻ KPI nhanh (Tài liệu, Trang, Chunks, Công thức toán, Bảng biểu).
- Biểu đồ phân bổ thể loại và phân phối token histogram.

### 2. Màn hình Quản Lý Tài Liệu (`/admin/documents`)
- Danh sách tài liệu kèm chế độ xem Markdown đã trích xuất từ MinerU.

### 3. Màn hình Trực Quan Hóa Phân Đoạn Tối Giản (`/admin/chunking`)
> **Thiết kế tối giản, loại bỏ hoàn toàn các khung cột rối mắt, tập trung 100% vào trải nghiệm đọc nội dung dễ nhìn:**
- **Thanh công cụ thu gọn trên cùng (Minimalist Toolbar):**
  - Chọn tài liệu, chọn nhanh 3 chiến lược (`Gom Ngữ Nghĩa`, `Theo Tiêu Đề`, `Cửa Sổ Cố Định`), cỡ chunk và nút bấm áp dụng.
  - Tùy chọn nâng cao (Overlap, bảo toàn Math/Table) được ẩn gọn trong nút *"Tùy chỉnh"*, chỉ mở ra khi cần.
- **Vùng đọc văn bản căn giữa (Centered Reading Canvas):**
  - Chiều rộng tối ưu (~900px), khoảng cách dòng thoáng (`line-height: 1.75`), cỡ chữ dễ đọc (`14.5px`).
  - Các Chunk được phân biệt bằng **dải viền màu nhẹ nhàng bên trái (Left Accent)** thay vì đóng khung nặng nề.
  - Header của mỗi chunk tinh gọn: `Chunk #12 • Trang 45–46 • 138 tokens • [Math] [Bảng]`.
- **Ngăn kéo Metadata trượt mượt mà (Slide-in Drawer):**
  - Khi nhấp vào bất kỳ chunk nào, thông số chi tiết (cây mục lục, số token, đoạn trích, nút sao chép JSON) sẽ trượt từ cạnh phải ra mà không chiếm diện tích cố định của trang.

### 4. Màn hình Kiểm Định & Xuất Dữ Liệu (`/admin/export`)
- Báo cáo chất lượng và 3 nút tải xuống trực tiếp: `chunks.jsonl`, `parents.jsonl`, `chunk_stats.json`.

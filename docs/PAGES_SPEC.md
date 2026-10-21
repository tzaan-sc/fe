# 📑 ĐẶC TẢ GIAO DIỆN & DANH SÁCH MÀN HÌNH (UI/UX SPECIFICATION)
**Dự án:** RAG Dataset Builder Studio  
**Mục tiêu:** Hệ thống trực quan hóa quy trình quản lý, bóc tách tài liệu (MinerU) và cắt phân đoạn (Chunking) dữ liệu phục vụ RAG cho môn Trí tuệ Nhân tạo.

---

## 🗺️ Sơ Đồ Cấu Trúc Các Trang (Sitemap)

```text
/ (Root Layout: Sidebar + Topbar)
├── 📊 /dashboard          (Tổng quan thống kê kho dữ liệu & phân phối chunk)
├── 📁 /documents          (Quản lý tài liệu gốc & đối soát Markdown MinerU)
├── ✂️ /chunking            (Studio cấu hình tham số & trực quan hóa Chunk)
├── 📦 /export             (Kiểm định chất lượng & Xuất file chunks.jsonl)
└── 🔍 /playground         (Tìm kiếm thử nghiệm Semantic Search & Test RAG)
```

---

## 🖥️ Chi Tiết Từng Trang Cần Xây Dựng

### 1. Trang Dashboard Tổng Quan (`/dashboard`)
> **Mục đích:** Cung cấp cái nhìn toàn cảnh về quy mô và chất lượng kho tri thức.

* **Thẻ chỉ số nhanh (KPI Cards):**
  - Tổng số tài liệu (Sách, Giáo trình, Slide, Bài báo,...).
  - Tổng số trang đã xử lý.
  - Tổng số Chunks đã tạo ra.
  - Tỷ lệ dữ liệu đặc thù: Số công thức toán học (MathJax), số bảng biểu (Tables), số hình ảnh trích xuất.
* **Biểu đồ thống kê:**
  - **Biểu đồ tròn / thanh:** Phân loại tài liệu theo nguồn gốc (`BK` - Sách, `TX` - Giáo trình, `PP` - Bài báo, `SL` - Slide, `UM` - ĐH Quốc tế: MIT, Berkeley, Cornell,...).
  - **Biểu đồ phân phối Chunk Size (Histogram):** Thể hiện số lượng token của các chunk (nhìn vào biết ngay dữ liệu có bị cắt quá ngắn hay quá dài không).
* **Bảng tiến độ gần đây (Recent Pipeline Jobs):** Danh sách các tài liệu mới được đưa vào xử lý cùng trạng thái (`Completed`, `Processing`, `Failed`).

---

### 2. Trang Quản Lý Tài Liệu (`/documents`)
> **Mục đích:** Duyệt kho tài liệu gốc và đối chiếu kết quả bóc tách của MinerU.

* **Cột trái - Danh mục tài liệu:**
  - Cây thư mục phân loại: `01_sach`, `02_giao-trinh`, `03_bai-bao`, `09_tai-lieu-dai-hoc-quoc-te`...
  - Thanh tìm kiếm và bộ lọc theo ngôn ngữ (`EN` / `VI`), năm, trường đại học.
  - Nút upload tài liệu mới (kèm modal chọn thể loại và ngôn ngữ để đặt tên chuẩn convention).
* **Cột phải - Chế độ xem song song (Dual-view Inspector):**
  - **Tab 1: File PDF gốc:** Hiển thị trình xem tài liệu gốc.
  - **Tab 2: Markdown đã xử lý:** Hiển thị nội dung đã parse bởi MinerU (công thức toán, bảng và hình ảnh).
  - **Tab 3: Metadata JSON:** Xem thông tin cấu trúc JSON bóc tách từ MinerU (`structured_content.json`).

---

### 3. Trang Chunking Studio & Trực Quan Hóa (`/chunking`)
> **Mục đích:** Trực quan hóa cách thuật toán cắt nhỏ tài liệu — màn hình quan trọng nhất của dự án.

* **Bảng điều khiển tham số (Control Panel bên trái):**
  - **Chọn tài liệu:** Dropdown chọn văn bản cần chia chunk.
  - **Chiến lược chunking (Strategy):**
    - `Heading Hierarchy` (Cắt theo cấu trúc tiêu đề Mục/Chương).
    - `Semantic Block Grouping` (Gom nhóm theo ngữ nghĩa đoạn văn).
    - `Parent-Child Chunking` (Tạo chunk cha bao quát + chunk con chi tiết).
  - **Tham số số học:**
    - Max Chunk Size: Slider (vd: 512, 1024 tokens).
    - Chunk Overlap: Slider (vd: 50, 100 tokens).
  - Nút hành động: `⚡ Chạy Chunking` & `👁️ Xem trước (Preview)`.
* **Khung hiển thị kết quả (Visualizer bên phải):**
  - Văn bản được hiển thị liền mạch nhưng từng chunk được tô màu viền/nền riêng biệt (`Chunk #1`, `Chunk #2`,...).
  - Click vào từng Chunk sẽ mở **Inspector Drawer** hiển thị metadata chi tiết:
    - `page_start` & `page_end`
    - `section_path` (vd: `Chương 3 > 3.2 Gradient Descent`)
    - `has_table` (true/false)
    - `has_equation` (true/false)
    - `token_count`

---

### 4. Trang Kiểm Định & Xuất Dữ Liệu (`/export`)
> **Mục đích:** Rà soát lỗi và tải về các file dataset chuẩn hóa.

* **Bộ kiểm tra chất lượng (Quality Validation Report):**
  - Danh sách cảnh báo: Chunk bị rỗng, chunk dưới 50 tokens, ảnh mất liên kết,...
* **Bảng danh sách toàn bộ Chunks:**
  - Hỗ trợ phân trang, tìm kiếm theo từ khóa trong nội dung chunk.
* **Khu vực tải xuống (Export Hub):**
  - Nút tải `chunks.jsonl` (Dataset chính cho RAG).
  - Nút tải `parents.jsonl` (Danh sách chunk cha).
  - Nút tải `chunk_stats.json` (Báo cáo thông số kỹ thuật).

---

### 5. Trang Thử Nghiệm Tìm Kiếm & RAG (`/playground`)
> **Mục đích:** Thử nghiệm xem với dữ liệu đã chunk, hệ thống tìm kiếm (Retrieval) hoạt động như thế nào.

* **Ô nhập câu hỏi thử nghiệm:** (Ví dụ: *"Thuật toán A* khác Dijkstra ở điểm nào?"*).
* **Kết quả trả về:**
  - **Top K Chunks liên quan nhất:** Hiển thị thẻ card cho từng chunk tìm được kèm theo:
    - Điểm tương đồng (*Similarity Score* ví dụ: 0.89).
    - Nguồn tài liệu & số trang gốc.
    - Đoạn trích dẫn highlight từ khóa.
  - **Khung phản hồi tóm tắt (Optional):** Câu trả lời tổng hợp dựa trên các chunk trên.

---

## 🎨 Quy Chuẩn Giao Diện (Design System & Theme)
- **Phong cách:** Modern Dark/Light Mode, sắc thái tối giản (Slate / Neutral), điểm nhấn màu Cyan/Indigo công nghệ.
- **Biểu tượng:** `lucide-react`.
- **Thư viện UI đề xuất:** TailwindCSS + Headless UI/Radix UI.
- **Biểu đồ:** `recharts`.
- **Render tài liệu:** `react-markdown`, `remark-gfm`, `rehype-katex` (render công thức toán).

# 📑 ĐẶC TẢ GIAO DIỆN & DANH SÁCH MÀN HÌNH (UI/UX SPECIFICATION)
**Dự án:** RAG Dataset Builder & AI Knowledge Assistant  
**Đối tượng sử dụng:**
1. 👤 **Người dùng cuối (End-User / Học viên / Giảng viên):** Tra cứu tri thức AI, hỏi đáp với sách giáo trình qua Chatbot RAG, xem trích dẫn nguồn (Citations) và ôn tập trắc nghiệm.
2. 🛠️ **Kỹ thuật viên (Data Engineer / Admin):** Quản lý bóc tách tài liệu MinerU, cấu hình thuật toán chia chunk, kiểm định chất lượng và xuất JSONL.

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
├── ✂️ /admin/chunking      (Studio cấu hình tham số & trực quan hóa Chunk)
└── 📦 /admin/export        (Kiểm định chất lượng & Xuất file chunks.jsonl)
```

---

## 👤 CHI TIẾT GIAO DIỆN NGƯỜI DÙNG CUỐI (END-USER EXPERIENCE)

### 1. Màn hình Trợ Lý Hỏi Đáp Tri Thức AI (`/user/chat`)
> **Mục đích:** Người dùng nhập bất kỳ câu hỏi nào về môn AI, hệ thống tìm kiếm trong kho giáo trình/sách và trả lời chính xác, minh bạch nguồn gốc.

* **Thanh lọc phạm vi tri thức (Knowledge Filter):**
  - Tùy chọn nguồn: `Tất cả tài liệu`, `Chỉ Giáo trình tiếng Việt`, `Chỉ Bài giảng MIT/Berkeley`, `Chỉ Bài báo khoa học`.
* **Khung đàm thoại thông minh (Interactive Chat Flow):**
  - **Câu hỏi gợi ý nhanh:** Các chip câu hỏi phổ biến (*"Giải thích thuật toán A* và tính admissible", "So sánh BFS và DFS", "Alpha-Beta Pruning hoạt động ra sao"*).
  - **Khung chat phản hồi:**
    - Định dạng Markdown chuẩn, hiển thị công thức toán học LaTeX ($f(n) = g(n) + h(n)$), bảng so sánh, code mẫu.
    - **Thẻ Trích dẫn nguồn (Footnote Citations):** Mỗi luận điểm đều có gắn nhãn nguồn, ví dụ `[Nguồn 1: Sách AI Agents in Depth - Trang 45]`.
    - **Nút mở Citation Drawer:** Click vào nhãn nguồn để mở popup xem ngay đoạn trích nguyên văn và số trang sách gốc.
  - **Nút tiện ích:** Sao chép câu trả lời, chia sẻ, đặt câu hỏi tiếp nối.

---

### 2. Màn hình Khám Phá Chủ Đề Môn AI (`/user/topics`)
> **Mục đích:** Hướng dẫn người dùng học tập theo lộ trình cấu trúc môn Trí tuệ Nhân tạo.

* **Các danh mục chủ đề chính:**
  - 🔍 **Thuật toán Tìm kiếm (Search Strategies):** Uninformed Search (BFS, DFS, UCS) & Informed Search (Greedy Best-First, A*, IDA*).
  - 🧩 **Bài toán Thỏa mãn Ràng buộc (CSP):** Backtracking Search, Arc Consistency (AC-3), Forward Checking.
  - ♟️ **Lý thuyết Trò chơi (Game Playing):** Minimax Algorithm, Cắt tỉa Alpha-Beta, Đánh giá hàm trạng thái tĩnh.
  - 🧠 **Học máy & Mạng Nơ-ron (Machine Learning):** Gradient Descent, Decision Tree, Transformer & Attention Mechanism.
* **Mỗi thẻ chủ đề gồm:**
  - Tóm tắt khái niệm cốt lõi.
  - Số lượng chunks liên quan trong kho dữ liệu.
  - Nút *"Hỏi AI về chủ đề này"* $\rightarrow$ đưa ngay vào khung chat với câu hỏi mẫu.

---

### 3. Màn hình Tự Ôn Tập & Kiểm Tra Kiến Thức (`/user/quiz`)
> **Mục đích:** Giúp sinh viên tự đánh giá độ hiểu bài thông qua các câu hỏi trắc nghiệm được trích xuất trực tiếp từ các chunk dữ liệu.

* **Cơ chế hoạt động:**
  - Chọn chủ đề ôn tập (vd: Tìm kiếm Heuristic).
  - Hệ thống hiển thị câu hỏi trắc nghiệm (4 đáp án A, B, C, D).
  - Khi người dùng chọn đáp án:
    - Báo Đúng/Sai ngay lập tức.
    - **Giải thích chi tiết kèm trích dẫn nguyên văn chunk sách:** Giúp người dùng biết vì sao đáp án đó đúng dựa trên giáo trình gốc.
  - Thống kê điểm số và số câu đúng.

---

## 🛠️ CHI TIẾT GIAO DIỆN KỸ THUẬT VIÊN (TECHNICIAN STUDIO)
*(Giữ nguyên 4 màn hình quản trị dữ liệu đã hoàn thành)*:
1. **Dashboard (`/admin/dashboard`):** Thống kê số lượng, thể loại, phân bổ token histogram.
2. **Kho Tài Liệu (`/admin/documents`):** Đối soát PDF gốc và Markdown MinerU.
3. **Chunking Studio (`/admin/chunking`):** Thử nghiệm tham số chia chunk và visualizer.
4. **Kiểm Định & Xuất (`/admin/export`):** Tải về `chunks.jsonl`, `parents.jsonl`, `chunk_stats.json`.

# 📑 QUY CHUẨN KẾT NỐI API (API CONTRACT)
**Dự án:** RAG Dataset Builder & AI Knowledge Assistant  
**Hệ thống:** Frontend $\leftrightarrow$ Backend / Database  

---

## 1. Quy Chuẩn Chung
- **Base URL:** `http://localhost:8000/api/v1`
- **Format dữ liệu:** `application/json`
- **Cấu trúc Response thống nhất:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Thành công",
  "data": null,
  "errors": null
}
```

---

## 2. Phân Hệ Người Dùng Cuối (End-User APIs)

### A. Trợ Lý Hỏi Đáp Chatbot RAG (`/chat`)
* `POST /chat/completions`: Gửi câu hỏi và nhận câu trả lời tổng hợp kèm trích dẫn nguồn.
  - **Request Body:**
  ```json
  {
    "message": "Thuật toán A* là gì và điều kiện tối ưu?",
    "knowledgeScope": "ALL", // "ALL" | "VI_TEXTBOOKS" | "INTL_UNIVERSITIES" | "PAPERS"
    "conversationHistory": []
  }
  ```
  - **Response 200:**
  ```json
  {
    "answer": "Thuật toán A* là giải thuật tìm kiếm heuristic...",
    "citations": [
      {
        "id": "cite_1",
        "documentTitle": "EN_BK_001_AI Agents in Depth.pdf",
        "pageNumber": 45,
        "chunkId": "chk_1001",
        "snippet": "The most widely known form of best-first search is called A* search..."
      }
    ]
  }
  ```

### B. Khám Phá Chủ Đề Môn AI (`/topics`)
* `GET /topics`: Lấy danh sách các chủ đề AI cốt lõi kèm số lượng chunks và câu hỏi gợi ý.

### C. Ôn Tập Trắc Nghiệm (`/quiz`)
* `GET /quiz/questions?topic=SEARCH`: Lấy danh sách câu hỏi trắc nghiệm tự động sinh từ các chunk dữ liệu.
* `POST /quiz/submit`: Nộp đáp án và nhận giải thích chi tiết kèm trích dẫn chunk tương ứng.

---

## 3. Phân Hệ Kỹ Thuật Viên (Technician & Admin APIs)

### A. Dashboard & Thống Kê
* `GET /analytics/overview`: Lấy chỉ số KPI kho tài liệu.
* `GET /analytics/distribution`: Biểu đồ phân bổ thể loại tài liệu.
* `GET /analytics/chunk-size-histogram`: Phân phối độ dài token của các chunk.

### B. Quản Lý Tài Liệu
* `GET /documents`: Danh sách tài liệu có phân trang và bộ lọc.
* `POST /documents/upload`: Tải lên tài liệu PDF mới.
* `GET /documents/:id/preview`: Lấy file PDF và Markdown bóc tách từ MinerU.

### C. Chunking Studio
* `POST /chunking/preview`: Chạy thử nghiệm chia chunk với tham số động.
* `POST /chunking/apply`: Lưu các chunk chính thức vào cơ sở dữ liệu.

### D. Kiểm Định & Xuất Dữ Liệu
* `GET /chunks`: Danh sách chunks có tìm kiếm.
* `GET /export/chunks-jsonl`: Tải tệp `chunks.jsonl`.
* `GET /export/parents-jsonl`: Tải tệp `parents.jsonl`.
* `GET /export/stats-json`: Tải tệp `chunk_stats.json`.

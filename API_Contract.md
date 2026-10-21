# 📑 QUY CHUẨN KẾT NỐI API (API CONTRACT)
**Dự án:** RAG Dataset Builder Studio  
**Phụ trách:** Frontend $\leftrightarrow$ Backend / Database  

---

## 1. Quy Chuẩn Chung
- **Base URL:** `http://localhost:8000/api/v1`
- **Format dữ liệu:** `application/json`
- **Chuẩn đặt tên field:** `camelCase` (ví dụ: `chunkSize`, `totalItems`, `createdAt`)
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

## 2. Danh Sách Endpoint Cho Từng Trang

### A. Màn hình Dashboard (`/dashboard`)
* `GET /analytics/overview`: Lấy các thẻ KPI (tổng tài liệu, tổng trang, tổng chunks, số công thức toán, số bảng).
* `GET /analytics/distribution`: Dữ liệu biểu đồ phân bổ thể loại tài liệu (Sách, Slide, Giáo trình, ĐH Quốc tế).
* `GET /analytics/chunk-size-histogram`: Dữ liệu phân phối độ dài token của các chunk.

### B. Màn hình Quản lý Tài liệu (`/documents`)
* `GET /documents`: Lấy danh sách tài liệu (hỗ trợ phân trang và filter theo `category`, `language`).
* `POST /documents/upload`: Tải lên file PDF gốc mới (`multipart/form-data`).
* `GET /documents/:id/preview`: Lấy đường dẫn file PDF và nội dung Markdown đã bóc tách từ MinerU.
* `GET /documents/:id/structured`: Lấy dữ liệu JSON cấu trúc chi tiết (`structured_content.json`).

### C. Màn hình Chunking Studio (`/chunking`)
* `POST /chunking/preview`: Chạy thử nghiệm chia chunk với các tham số tạm thời (không lưu database).
  - **Body:** `{ documentId: string, strategy: "heading" | "semantic" | "parent-child", chunkSize: number, overlap: number }`
  - **Response:** Danh sách các chunks kèm vị trí ký tự và metadata để FE highlight.
* `POST /chunking/apply`: Áp dụng chiến lược và lưu các chunk chính thức vào cơ sở dữ liệu.

### D. Màn hình Xuất Dữ Liệu (`/export`)
* `GET /chunks`: Lấy danh sách toàn bộ chunks có phân trang, tìm kiếm.
* `GET /chunks/validation-report`: Lấy báo cáo các chunk bất thường (quá ngắn, thiếu metadata).
* `GET /export/chunks-jsonl`: Tải về file `chunks.jsonl`.
* `GET /export/parents-jsonl`: Tải về file `parents.jsonl`.
* `GET /export/stats-json`: Tải về file `chunk_stats.json`.

### E. Màn hình Playground (`/playground`)
* `POST /retrieval/query`: Truy vấn thử nghiệm tìm kiếm ngữ nghĩa.
  - **Body:** `{ query: "Thuật toán A* hoạt động như thế nào?", topK: 5 }`
  - **Response:** Trả về Top 5 chunks có độ tương đồng cao nhất kèm metadata và similarity score.

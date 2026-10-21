# 🧩 KẾ HOẠCH BÓC TÁCH COMPONENT REACT (UI COMPONENTS PLAN)
**Dự án:** RAG Dataset Builder Studio  
**Mục tiêu:** Thiết kế cấu trúc Component modular, tái sử dụng cao, dễ bảo trì và phân công công việc.

---

## 1. Cấu Trúc Thư Mục Source Code Dự Kiến (`src/`)

```text
src/
├── assets/                  # Icons, logo, hình ảnh tĩnh
├── components/              # Các UI Component
│   ├── common/              # Component dùng chung (Button, Card, Modal,...)
│   ├── layout/              # Sidebar, Header, PageContainer
│   ├── analytics/           # Biểu đồ Recharts, StatCard
│   ├── documents/           # TreeView, DualViewer (PDF + Markdown), DocumentTable
│   ├── chunking/            # ChunkVisualizer, ChunkCard, MetadataDrawer, ParameterForm
│   └── playground/          # QueryBox, SearchResultCard, SimilarityBadge
├── constants/               # Giá trị cố định (Danh mục tài liệu, màu sắc tag)
├── hooks/                   # Custom hooks (useDocuments, useChunking, useTheme)
├── services/                # Tầng gọi API & Mock Service (apiClient, documentService)
├── types/                   # Định nghĩa TypeScript (Document, Chunk, Analytics,...)
├── App.tsx                  # Khai báo React Router & Theme Provider
└── main.tsx                 # Điểm khởi chạy React
```

---

## 2. Danh Sách Các Component Cần Xây Dựng

### A. Tầng Layout (Layout Components)
| Tên Component | Chức năng | Props chính |
| :--- | :--- | :--- |
| `Sidebar` | Thanh điều hướng bên trái (Dashboard, Documents, Chunking, Export, Playground) | `collapsed: boolean` |
| `Topbar` | Thanh tiêu đề trên cùng, hiển thị breadcrumbs, nút chuyển Dark/Light mode, trạng thái kết nối BE | `title: string` |
| `PageContainer` | Bọc nội dung từng trang với khoảng đệm (padding) và tiêu đề thống nhất | `title, description, actions` |

---

### B. Tầng Giao Diện Dùng Chung (Common UI)
| Tên Component | Chức năng | Props chính |
| :--- | :--- | :--- |
| `StatCard` | Thẻ hiển thị chỉ số (Tổng tài liệu, Chunks, Số bảng biểu) kèm icon và % tăng giảm | `title, value, icon, trend` |
| `Badge` | Nhãn trạng thái (`COMPLETED`, `PENDING`, ngôn ngữ `EN/VI`, thể loại `BK/TX`) | `variant, color, text` |
| `DataTable` | Bảng dữ liệu có phân trang, sắp xếp và ô tìm kiếm | `columns, data, onRowClick` |
| `Tabs` | Thanh chuyển đổi giữa các góc nhìn (vd: PDF / Markdown / JSON) | `activeTab, onChange, items` |
| `SliderInput` | Thanh trượt chỉnh giá trị số kèm ô nhập trực tiếp (Max tokens, Overlap) | `min, max, step, value, onChange` |

---

### C. Tầng Chuyên Biệt Nghiệp Vụ (Domain Specific Components)
| Tên Component | Màn hình sử dụng | Mô tả chi tiết |
| :--- | :--- | :--- |
| `DualViewer` | `/documents` | Hiển thị chia đôi màn hình: Cột trái xem file PDF, cột phải render Markdown bằng `react-markdown` + `rehype-katex` để hiển thị công thức toán học. |
| `ChunkVisualizer` | `/chunking` | Render toàn bộ văn bản nhưng phân tách các chunk bằng các dải màu nền khác nhau. Hỗ trợ rê chuột vào xem nhanh ranh giới chunk. |
| `ChunkCard` | `/chunking`, `/export` | Thẻ hiển thị nội dung 1 chunk, số token, các tag huy hiệu (`Math`, `Table`, `Page 45-46`), nút Copy và nút xem chi tiết. |
| `MetadataDrawer` | `/chunking` | Bảng trượt từ bên phải màn hình ra khi click vào chunk, hiển thị đầy đủ JSON metadata (`sectionPath`, `imageRefs`,...). |
| `HistogramChart` | `/dashboard` | Sử dụng thư viện `recharts` để vẽ biểu đồ cột phân phối độ dài token của các chunk. |
| `CategoryPieChart` | `/dashboard` | Biểu đồ tròn thể hiện tỷ lệ tài liệu theo nguồn gốc. |
| `SearchResultCard` | `/playground` | Thẻ kết quả tìm kiếm ngữ nghĩa, hiển thị điểm tương đồng (%) dạng thanh tiến trình (Progress bar), đoạn văn trích dẫn highlight từ khóa. |

---

## 3. Chiến Lược Mock Data (Không Cần Chờ Backend)
Trong thư mục `src/services/`:
- Tạo file `mockAdapter.ts`: Đọc dữ liệu từ [MOCK_DATA.json](file:///d:/GITHUB/fe/MOCK_DATA.json).
- Nếu `VITE_USE_MOCK=true`: Các hàm như `getDocuments()`, `previewChunking()`, `testQuery()` sẽ trả về dữ liệu mẫu có độ trễ giả lập 300ms (giả lập mạng).
- Khi Backend xong: Chỉ cần đổi `VITE_USE_MOCK=false` trong `.env` là kết nối ngay với Backend thật mà **không cần sửa một dòng code giao diện nào**.

# Image Generator với AI

Ứng dụng web tạo ảnh sử dụng Google Gemini AI và Cloudflare Workers. Người dùng có thể nhập mô tả và nhận được ảnh được tạo bởi AI.

## 🌟 Tính năng

- Giao diện người dùng thân thiện với Tailwind CSS
- Tạo ảnh từ mô tả văn bản
- Xử lý bất đồng bộ và hiển thị trạng thái loading
- Hỗ trợ hiển thị nhiều ảnh kết quả
- Xử lý lỗi và thông báo người dùng
- Tích hợp với Cloudflare Workers để xử lý backend

## 🛠️ Công nghệ sử dụng

- Frontend: HTML, JavaScript, Tailwind CSS
- Backend: Cloudflare Workers
- AI: Google Gemini API
- Công cụ phát triển: Wrangler CLI

## 🚀 Cài đặt và Triển khai

### Yêu cầu hệ thống

- Node.js (phiên bản 14 trở lên)
- Tài khoản Cloudflare
- API key từ Google AI Studio (Gemini)

### Các bước cài đặt

1. Cài đặt Wrangler CLI:

```bash
npm install -g wrangler
```

2. Đăng nhập vào Cloudflare:

```bash
wrangler login
```

3. Tạo biến môi trường cho API key:

```bash
wrangler secret put GEMINI_API_KEY
```

4. Triển khai Worker:

```bash
wrangler deploy
```

5. Cập nhật URL của Worker trong file `image-generator.html`

## 📝 Cấu trúc dự án

```
.
├── image-generator.html    # Frontend
├── worker.js              # Cloudflare Worker
└── wrangler.toml          # Cấu hình Worker
```

## 🔧 Cấu hình

### Cloudflare Worker

File `wrangler.toml` chứa các cấu hình cơ bản:

- Tên Worker
- File chính
- Ngày tương thích
- Dependencies

### Frontend

File `image-generator.html` chứa:

- Giao diện người dùng
- Xử lý sự kiện
- Giao tiếp với API

## 🔒 Bảo mật

- API key được lưu trữ an toàn trong Cloudflare Workers
- CORS được cấu hình để bảo vệ API
- Xác thực đầu vào cho prompt

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 Giấy phép

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm thông tin.

## 👥 Tác giả

- Giang CSE - [GitHub](https://github.com/giangcse)

## 🙏 Lời cảm ơn

- Google AI Studio cho Gemini API
- Cloudflare cho Workers platform
- Tailwind CSS cho framework CSS

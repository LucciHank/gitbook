<h1 align="center">Tài Liệu Cá Nhân</h1>

<p align="center">
  <a href="#docs">Tài liệu</a> - <a href="#community">Cộng đồng</a> - <a href="#developer">Tài liệu phát triển</a> - <a href="#changelog">Cập nhật</a> - <a href="#bugs">Báo lỗi</a> 
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Open_Source-❤️-FDA599?"/></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-F4E28D"/></a>
</p>

<p align="center">Chào mừng đến với trang tài liệu cá nhân của tôi.</p>

<p align="center">Kho lưu trữ này chứa mã nguồn mở được sử dụng để hiển thị nội dung tài liệu cá nhân.</p>

<p align="center">
  <img alt="Trang tài liệu cá nhân" src="./assets/published-site.png">
</p>

## Mục lục

- [Bắt đầu](#bắt-đầu)
- [Đóng góp](#đóng-góp)
- [Giấy phép](#giấy-phép)
- [Lời cảm ơn](#lời-cảm-ơn)

## Bắt đầu

Để chạy phiên bản cục bộ của dự án này, vui lòng làm theo các bước đơn giản sau.

### Yêu cầu

- Node.js (Phiên bản: >=20.6)
  - Sử dụng nvm để quản lý Node dễ dàng
- Bun (Phiên bản: >=1.2.1)
  - Chúng tôi sử dụng tệp khóa dựa trên văn bản không được hỗ trợ dưới 1.2.1

### Thiết lập

1. Clone kho lưu trữ

```
git clone https://github.com/username/personal-docs.git
```

2. Đảm bảo bạn đang sử dụng phiên bản `node` của dự án. Chạy `nvm use` sẽ thay đổi phiên bản cục bộ của bạn thành phiên bản chính xác.

3. Cài đặt các phụ thuộc của dự án thông qua Bun.

```
bun install
```

4. Khởi động máy chủ phát triển cục bộ của bạn.

```
bun dev:v2
```

5. Mở trang tài liệu trong trình duyệt web của bạn, thêm tiền tố `http://localhost:3000/`.

ví dụ:

- http://localhost:3000/url/docs
- http://localhost:3000/url/tutorials

Bất kỳ trang tài liệu nào cũng có thể được truy cập thông qua phiên bản phát triển cục bộ của bạn, và bất kỳ cập nhật nào bạn thực hiện đối với cơ sở mã sẽ được phản ánh trong trình duyệt của bạn.

### Các lệnh phát triển khác

- `bun format`: định dạng mã
- `bun lint`: kiểm tra mã

## Đóng góp

Công cụ hiển thị tài liệu được xây dựng trên [Next.js](https://nextjs.org/). Đọc hướng dẫn đóng góp của chúng tôi để tìm hiểu thêm về quy trình thêm Pull Request đầu tiên của bạn.

## Giấy phép

Phân phối theo Giấy phép MIT.

## Lời cảm ơn

Dự án này không thể thực hiện được nếu không có các dự án sau:

- [Next.js](https://nextjs.org/)
- [Bun](https://bun.sh/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.npmjs.com/package/framer-motion)

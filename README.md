# Playwright Android Demo

Project automation testing sử dụng Playwright TypeScript để kiểm thử ứng dụng web (Sauce Demo) trên môi trường Android Chrome.

## 📂 Cấu trúc Project (Page Object Model)

```text
playwright-android-demo/
├── pages/                       # Page Objects (Logic tương tác UI)
│   ├── LoginPage.ts             # Xử lý đăng nhập
│   ├── InventoryPage.ts         # Trang sản phẩm, sort, menu
│   ├── CartPage.ts              # Giỏ hàng (xóa item, checkout)
│   └── CheckoutPage.ts          # Thông tin thanh toán & hoàn tất
├── tests/                       # Test Scripts
│   ├── login.spec.ts            # Đăng nhập (Valid/Locked user)
│   ├── add-to-cart.spec.ts      # Thêm sản phẩm vào giỏ
│   ├── remove-from-cart.spec.ts # Xóa sản phẩm khỏi giỏ
│   ├── sort-products.spec.ts    # Sắp xếp sản phẩm (Price low to high)
│   ├── checkout.spec.ts         # Luồng thanh toán thành công
│   ├── logout.spec.ts           # Đăng xuất tài khoản
│   └── android-webview.spec.ts  # Test tích hợp WebView trên Android
├── utils/                       # Tiện ích bổ trợ
│   └── config.ts                # Cấu hình tài khoản & môi trường
├── test-results/                # Kết quả test (Screenshot, Video)
├── playwright.config.ts         # Cấu hình Playwright (Android/Chrome)
├── package.json                 # Scripts & Dependencies
└── .env                         # Biến môi trường (Username/Password)
```

## Hướng dẫn chạy Test

### 1. Chuẩn bị

- Đã cài đặt [Node.js](https://nodejs.org/).
- Đã cài đặt [Android Studio & ADB](https://developer.android.com/studio).
- Khởi chạy Emulator (AVD) hoặc kết nối thiết bị Android thật qua USB (đã bật Debugging).

### 2. Cài đặt thư viện

```bash
npm install
```

### 3. Chạy các kịch bản Test

Chạy toàn bộ test trên thiết bị Android:

```bash
npm run test:android
```

Chạy test cụ thể:

```bash
npx playwright test tests/login.spec.ts --project=android
```

## Báo cáo kết quả

Sau khi chạy xong, kết quả test (screenshot/video) sẽ được tự động phân loại trong thư mục `test-results/`:

- `test-results/pass/`: Các case thành công.
- `test-results/fail/`: Các case thất bại (kèm screenshot lỗi).

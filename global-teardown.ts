import fs from 'fs';
import path from 'path';
import { FullConfig } from '@playwright/test';

/**
 * Global Teardown - Chạy sau tất cả test
 * Di chuyển thư mục artifact từ test-results/* vào test-results/pass/ hoặc test-results/fail/
 */
async function globalTeardown(config: FullConfig) {
  const baseDir = 'test-results';
  const passDir = path.join(baseDir, 'pass');
  const failDir = path.join(baseDir, 'fail');

  // Tạo thư mục pass & fail
  [passDir, failDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Đọc tất cả entry trong test-results
  if (!fs.existsSync(baseDir)) {
    console.log('✨ Không có test-results để sắp xếp');
    return;
  }

  const entries = fs.readdirSync(baseDir);

  entries.forEach((entry) => {
    const entryPath = path.join(baseDir, entry);
    const stat = fs.statSync(entryPath);

    // Bỏ qua file và folder pass/fail
    if (!stat.isDirectory() || entry === 'pass' || entry === 'fail') {
      return;
    }

    // Xác định status dựa trên tên folder
    // Playwright đặt tên folder: "add-to-cart-Cart-Functiona-115c8-uct-ShouldIncreaseCartBadge-chromium"
    // Nếu chứa "-failed-" → fail, ngược lại → pass
    const isFailed = entry.toLowerCase().includes('-failed-');
    const destDir = isFailed ? failDir : passDir;

    // Di chuyển toàn bộ folder
    const newPath = path.join(destDir, entry);
    fs.renameSync(entryPath, newPath);

    console.log(`📂 ${isFailed ? '❌' : '✅'} ${entry} → ${isFailed ? 'fail' : 'pass'}/`);
  });

  // Xóa file .last-run.json ở gốc
  const lastRunFile = path.join(baseDir, '.last-run.json');
  if (fs.existsSync(lastRunFile)) {
    fs.unlinkSync(lastRunFile);
  }

  console.log('\n✨ Phân loại artifact hoàn tất!');
  console.log(`📁 test-results/pass/   - Test passed`);
  console.log(`📁 test-results/fail/   - Test failed\n`);
}

export default globalTeardown;

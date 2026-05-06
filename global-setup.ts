import fs from 'fs';
import path from 'path';

async function globalSetup() {
  const resultsDir = path.join(__dirname, 'allure-results');
  if (fs.existsSync(resultsDir)) {
    // Xóa toàn bộ nội dung trong thư mục allure-results nhưng giữ lại thư mục
    fs.rmSync(resultsDir, { recursive: true, force: true });
    console.log('--- Đã xóa kết quả Allure cũ (allure-results) ---');
  }
}

export default globalSetup;

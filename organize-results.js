/**
 * Script phân loại video & screenshot sau khi test chạy
 * Chạy: node scripts/organize-results.js
 */
const fs = require('fs');
const path = require('path');

const baseDir = 'test-results';
const passDir = path.join(baseDir, 'pass');
const failDir = path.join(baseDir, 'fail');

// Tạo thư mục đích nếu chưa tồn tại
[passDir, failDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Đọc tất cả thư mục trong test-results
const entries = fs.readdirSync(baseDir);

entries.forEach((entry) => {
  const entryPath = path.join(baseDir, entry);
  const stat = fs.statSync(entryPath);

  if (!stat.isDirectory()) return; // Bỏ qua file

  // Kiểm tra xem folder này là folder chứa kết quả test (có video.webm hoặc screenshot)
  const hasVideo = fs.existsSync(path.join(entryPath, 'video.webm'));
  const screenshotFile = fs
    .readdirSync(entryPath)
    .find((f) => f.match(/\.png$/));

  // Xác định pass/fail dựa trên tên folder (ví dụ: "add-to-cart-Cart-Functionality-123abc--testAddToCart-chromium")
  // Hoặc tìm file test-finished.json hoặc metadata
  const testResultFile = path.join(entryPath, 'test-finished.json');
  let isPass = true;

  if (fs.existsSync(testResultFile)) {
    try {
      const data = JSON.parse(
        fs.readFileSync(testResultFile, 'utf-8')
      );
      isPass = data.status === 'passed';
    } catch (e) {
      console.warn(`⚠️  Không đọc được ${testResultFile}`);
    }
  } else {
    // Fallback: kiểm tra tên folder (nếu chứa "FAILED" hoặc "-failed-")
    isPass = !entry.toLowerCase().includes('failed');
  }

  const destDir = isPass ? passDir : failDir;
  const testName = entry
    .replace(/-chromium$|-android$|-mobile-emulation$/, '') // Bỏ project name
    .substring(0, 80); // Giới hạn độ dài
  const destTestDir = path.join(destDir, testName);

  // Tạo thư mục đích
  if (!fs.existsSync(destTestDir)) {
    fs.mkdirSync(destTestDir, { recursive: true });
  }

  // Copy video
  if (hasVideo) {
    const srcVideo = path.join(entryPath, 'video.webm');
    const destVideo = path.join(destTestDir, 'video.webm');
    fs.copyFileSync(srcVideo, destVideo);
    console.log(
      `✅ Video (${isPass ? 'PASS' : 'FAIL'}) → ${destVideo}`
    );
  }

  // Copy screenshot
  if (screenshotFile) {
    const srcScreenshot = path.join(entryPath, screenshotFile);
    const destScreenshot = path.join(destTestDir, screenshotFile);
    fs.copyFileSync(srcScreenshot, destScreenshot);
    console.log(
      `📸 Screenshot (${isPass ? 'PASS' : 'FAIL'}) → ${destScreenshot}`
    );
  }

  // Copy toàn bộ folder sang nơi khác (tùy chọn: có thể xóa sau)
  // console.log(`📂 Folder ${isPass ? 'PASS' : 'FAIL'} → ${destTestDir}`);
});

console.log('\n✨ Phân loại hoàn tất!');
console.log(`📁 ${passDir}/  - Test pass`);
console.log(`📁 ${failDir}/  - Test fail\n`);

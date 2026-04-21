import {
  Reporter,
  TestCase,
  TestResult,
  Suite,
  FullConfig,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Custom Reporter: Phân loại video & screenshot vào thư mục pass/ hoặc fail/
 */
export default class OrganizeResultsReporter implements Reporter {
  private baseResultsDir = 'test-results';
  private passDir = path.join(this.baseResultsDir, 'pass');
  private failDir = path.join(this.baseResultsDir, 'fail');

  onBegin?(config: FullConfig): void {
    // Tạo thư mục pass/ và fail/ trước khi test chạy
    if (!fs.existsSync(this.passDir)) {
      fs.mkdirSync(this.passDir, { recursive: true });
    }
    if (!fs.existsSync(this.failDir)) {
      fs.mkdirSync(this.failDir, { recursive: true });
    }
  }

  onTestEnd?(test: TestCase, result: TestResult): void {
    // Sau mỗi test, di chuyển toàn bộ thư mục kết quả
    const testResultDir = result.outputDir;
    if (!testResultDir || !fs.existsSync(testResultDir)) {
      return;
    }

    // Xác định folder đích (pass hoặc fail)
    const destDir = result.status === 'passed' ? this.passDir : this.failDir;
    const testName = test.title.replace(/[^a-zA-Z0-9-_]/g, '-'); // Sanitize tên test
    const destTestDir = path.join(destDir, testName);

    // Đảm bảo thư mục đích không tồn tại (tránh conflict)
    if (fs.existsSync(destTestDir)) {
      fs.rmSync(destTestDir, { recursive: true, force: true });
    }

    // Di chuyển toàn bộ thư mục
    fs.renameSync(testResultDir, destTestDir);
    console.log(`[Reporter] Moved ${testResultDir} → ${destTestDir}`);
  }

  onEnd?(): void {
    console.log(
      `\n✅ Kết quả được phân loại:\n   📁 ${this.passDir}/\n   📁 ${this.failDir}/`
    );
  }
}

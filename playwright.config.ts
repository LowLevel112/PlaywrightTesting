import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    trace: 'off',
    screenshot: 'on',
    video: 'on',
  },
  globalTeardown: require.resolve('./global-teardown.ts'),
  projects: [
    // 1. Desktop Chromium
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // 2. Mobile emulation (iPhone 12)
    {
      name: 'mobile-emulation',
      use: { ...devices['iPhone 12'] },
    },
    // 3. Android (qua ADB) – yêu cầu emulator/device kết nối
    {
      name: 'android',
      use: {
        ...devices['Pixel 5'],
      },
      webServer: undefined, // Không sử dụng webServer cho Android
    },
  ],
});
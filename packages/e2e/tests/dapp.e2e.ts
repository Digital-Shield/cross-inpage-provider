import * as fs from 'fs';
import * as path from 'path';

import { connectButtonData } from '@digitalshieldfe/inpage-providers-hub';

const injectedCode = fs.readFileSync(
  path.resolve(
    'node_modules/@digitalshieldfe/cross-inpage-provider-injected/dist/injected/injectedNative.js',
  ),
  'utf-8',
);

import { expect, test } from '@playwright/test';

test('dapp-test', async ({ page }) => {
  console.log(connectButtonData.sitesConfig[0]);

  // await page.goto('https://dapp-example.digitalshieldtest.com');
  // https://app.uniswap.org/
  await page.goto('https://app.uniswap.org/');

  // eval injectedCode
  await page.evaluate(injectedCode);

  // 验证 $digitalshield 全局变量存在
  const hasDigitalShield = await page.evaluate(() => {
    // @ts-ignore
    return window.$digitalshield !== undefined;
  });
  expect(hasDigitalShield).toBe(true);

  // 截个图（可选）
  await page.screenshot({ path: 'test-results/screenshots/dapp-test.png' });

  // 设置浏览器在测试完成后保持打开状态
  // await page.pause();
});


// npx playwright test --headed tests/dapp.e2e.ts
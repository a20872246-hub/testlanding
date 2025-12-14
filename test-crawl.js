const { chromium } = require('playwright');

(async () => {
  console.log('브라우저 시작...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  console.log('페이지 이동...');
  await page.goto('https://www.koreadognews.co.kr', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // title 속성이 있는 a 태그 수집
  const items = await page.evaluate(() => {
    const result = [];
    const links = document.querySelectorAll('a[title]');
    links.forEach(el => {
      const title = el.getAttribute('title');
      const href = el.getAttribute('href');
      if (title && title.length > 10 && title.length < 200) {
        result.push({ title, href });
      }
    });
    return result;
  });

  console.log(`\n${items.length}개 발견:\n`);
  items.slice(0, 10).forEach((item, i) => {
    console.log(`${i + 1}. ${item.title}`);
  });

  await browser.close();
})();

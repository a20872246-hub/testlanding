const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
  try {
    console.log('크롤링 시작...');
    const { data } = await axios.get('https://www.koreadognews.co.kr', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(data);
    const titles = [];

    $('a[title]').each((_, el) => {
      const title = $(el).attr('title');
      const href = $(el).attr('href');
      if (title && title.length > 10 && title.length < 200 && href) {
        titles.push({ title, href });
      }
    });

    console.log('첫 5개 뉴스:');
    titles.slice(0, 5).forEach((item, i) => {
      console.log(`${i + 1}. ${item.title}`);
    });
    console.log(`\n총 ${titles.length}개 발견`);
  } catch (err) {
    console.error('에러:', err.message);
  }
})();

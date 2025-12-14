import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';

interface NewsArticle {
  title: string;
  link: string;
  source: string;
  date: string;
  thumbnail?: string;
  description?: string;
}

const NEWS_FILE_PATH = path.join(process.cwd(), 'public', 'dog-news.json');

// RSS 파서를 사용한 한국애견신문 크롤링
async function crawlKoreaDogNewsRSS(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];

  try {
    console.log('RSS 피드 크롤링 시작...');

    const parser = new Parser({
      customFields: {
        item: [
          ['media:content', 'media'],
          ['content:encoded', 'contentEncoded'],
        ]
      }
    });

    const feed = await parser.parseURL('https://www.koreadognews.co.kr/rss/');

    console.log(`RSS 피드에서 ${feed.items.length}개의 뉴스 발견`);

    feed.items.forEach((item) => {
      // 썸네일 이미지 추출 (content:encoded에서)
      let thumbnail: string | undefined;

      if (item.contentEncoded) {
        const imgMatch = item.contentEncoded.match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) {
          thumbnail = imgMatch[1];
        }
      }

      // description에서 HTML 태그 제거
      let cleanDescription = item.content || item.contentSnippet || '';
      cleanDescription = cleanDescription
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#\d+;/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 200);

      if (cleanDescription.length === 200) {
        cleanDescription += '...';
      }

      articles.push({
        title: item.title || '',
        link: item.link || '',
        source: '한국애견신문',
        date: item.pubDate || item.isoDate || new Date().toISOString(),
        thumbnail,
        description: cleanDescription,
      });
    });

    console.log(`총 ${articles.length}개의 뉴스 기사 수집 완료`);
    return articles.slice(0, 50);

  } catch (error) {
    console.error('RSS 크롤링 에러:', error);
    return [];
  }
}

// 크롤링 실패 시 기본 뉴스 데이터
function getDefaultNews(): NewsArticle[] {
  const now = new Date();
  return [
    {
      title: '강아지 짖음 문제, 이제 해결하세요 - 전문가의 실전 팁',
      link: '#',
      source: 'Dog Training Center',
      date: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
      description: '짖음 문제로 힘들어하시나요? 15년 경력 전문가가 알려주는 효과적인 교정 방법을 확인하세요.',
    },
    {
      title: '반려견 분리불안 완벽 해결 가이드',
      link: '#',
      source: 'Pet News',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
      description: '출근할 때마다 불안해하는 강아지, 단계별 훈련으로 해결할 수 있습니다.',
    },
    {
      title: '산책 중 공격성 보이는 강아지, 어떻게 교정할까?',
      link: '#',
      source: '반려동물 전문지',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(),
      description: '다른 강아지를 보면 공격적으로 변하는 문제, 전문가의 솔루션을 확인하세요.',
    },
    {
      title: '강아지 배변 훈련 성공률 98% 비법 공개',
      link: '#',
      source: 'Dog Training Center',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 8).toISOString(),
      description: '배변 훈련이 안 되어 고민이신가요? 단 7일 만에 성공하는 훈련법을 소개합니다.',
    },
    {
      title: '반려견 사회화 훈련, 언제 시작해야 할까?',
      link: '#',
      source: 'Pet Health Magazine',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 12).toISOString(),
      description: '사회화 훈련의 적절한 시기와 방법에 대해 전문가가 설명합니다.',
    },
    {
      title: '강아지가 가구를 물어뜯는 이유와 해결책',
      link: '#',
      source: '애견 뉴스',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 18).toISOString(),
      description: '파괴적인 행동의 원인을 파악하고 올바른 대처법을 알아보세요.',
    },
    {
      title: '노령견 행동 변화, 정상인가요? 전문가 조언',
      link: '#',
      source: 'Senior Dog Care',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
      description: '나이가 들면서 보이는 행동 변화, 어떻게 대응해야 할까요?',
    },
    {
      title: '강아지 입질 교정, 절대 놓치면 안 되는 골든타임',
      link: '#',
      source: 'Dog Training Center',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 36).toISOString(),
      description: '강아지 입질은 조기 교정이 핵심! 효과적인 훈련 방법을 알려드립니다.',
    },
    {
      title: '반려견과 함께하는 여름 휴가, 꼭 알아야 할 것들',
      link: '#',
      source: 'Pet Travel Guide',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 48).toISOString(),
      description: '강아지와 함께 안전하고 즐거운 여행을 위한 준비 사항을 확인하세요.',
    },
  ];
}

// 뉴스 데이터를 JSON 파일에 저장 (UTF-8)
function saveNewsToFile(articles: NewsArticle[]) {
  const newsData = {
    articles,
    lastUpdated: new Date().toISOString(),
    totalCount: articles.length,
  };

  const dir = path.dirname(NEWS_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // UTF-8 인코딩으로 저장
  fs.writeFileSync(NEWS_FILE_PATH, JSON.stringify(newsData, null, 2), { encoding: 'utf-8' });
  console.log(`뉴스 데이터 저장 완료: ${NEWS_FILE_PATH}`);
}

// 저장된 뉴스 데이터 읽기
function loadNewsFromFile(): { articles: NewsArticle[]; lastUpdated: string } | null {
  try {
    if (fs.existsSync(NEWS_FILE_PATH)) {
      const data = fs.readFileSync(NEWS_FILE_PATH, { encoding: 'utf-8' });
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('뉴스 파일 읽기 에러:', error);
  }
  return null;
}

// GET: 저장된 뉴스 반환 (최신 9개)
export async function GET() {
  try {
    const newsData = loadNewsFromFile();

    if (!newsData) {
      return NextResponse.json({
        articles: [],
        lastUpdated: null,
        message: '뉴스 데이터가 없습니다. POST /api/news를 호출하여 업데이트하세요.'
      });
    }

    // 최신 9개만 반환
    const displayArticles = newsData.articles.slice(0, 9);

    return NextResponse.json({
      articles: displayArticles,
      lastUpdated: newsData.lastUpdated,
      totalCount: newsData.articles.length,
    });
  } catch (error) {
    console.error('GET news error:', error);
    return NextResponse.json(
      { error: '뉴스를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST: RSS로 실제 뉴스 크롤링 및 업데이트
export async function POST() {
  try {
    console.log('=== 뉴스 크롤링 시작 (RSS) ===');
    const startTime = Date.now();

    let articles = await crawlKoreaDogNewsRSS();

    // 크롤링 결과가 없거나 5개 미만이면 기본 뉴스 사용
    if (articles.length < 5) {
      console.log(`애견 뉴스가 ${articles.length}개로 부족하여 기본 뉴스를 사용합니다.`);
      articles = getDefaultNews();
    }

    saveNewsToFile(articles);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`=== 크롤링 완료: ${articles.length}개 (${elapsed}초) ===`);

    return NextResponse.json({
      success: true,
      message: `${articles.length}개의 뉴스 기사가 업데이트되었습니다.`,
      totalCount: articles.length,
      lastUpdated: new Date().toISOString(),
      elapsedTime: `${elapsed}초`,
    });
  } catch (error) {
    console.error('POST news error:', error);
    // 에러가 발생해도 기본 뉴스 저장
    const defaultArticles = getDefaultNews();
    saveNewsToFile(defaultArticles);

    return NextResponse.json({
      success: true,
      message: `기본 뉴스 ${defaultArticles.length}개가 설정되었습니다.`,
      totalCount: defaultArticles.length,
      lastUpdated: new Date().toISOString(),
    });
  }
}

'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw, Newspaper } from 'lucide-react';

interface NewsArticle {
  title: string;
  link: string;
  source: string;
  date: string;
  thumbnail?: string;
  description?: string;
}

export default function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = async (forceUpdate = false) => {
    try {
      setLoading(true);

      // 뉴스 데이터 가져오기
      let response = await fetch('/api/news');
      let data = await response.json();

      // 뉴스가 없거나 강제 업데이트인 경우 크롤링 트리거
      if ((!data.articles || data.articles.length === 0) || forceUpdate) {
        console.log('뉴스 크롤링 트리거...');
        await fetch('/api/news', { method: 'POST' });
        // 다시 데이터 가져오기
        response = await fetch('/api/news');
        data = await response.json();
      }

      setArticles(data.articles || []);
      setLastUpdated(data.lastUpdated);
    } catch (error) {
      console.error('뉴스를 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // 1분마다 자동 갱신 (60 * 1000 = 60000ms)
    const interval = setInterval(() => {
      fetchNews();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      // ISO 형식인 경우
      if (dateString.includes('T')) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (hours < 1) return '방금 전';
        if (hours < 24) return `${hours}시간 전`;
        if (days < 7) return `${days}일 전`;
        return date.toLocaleDateString('ko-KR');
      }
      // 네이버 형식 (예: "20시간 전", "2일 전")
      return dateString;
    } catch {
      return dateString;
    }
  };

  if (loading && articles.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-purple-500 animate-spin mx-auto" />
            <p className="mt-4 text-gray-400">뉴스를 불러오는 중...</p>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-4">
            <Newspaper className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-medium">최신 반려견 뉴스</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            실시간 반려견 소식
          </h2>
          <p className="text-gray-400 text-lg">
            반려견과 관련된 최신 뉴스를 확인하세요
          </p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              마지막 업데이트: {new Date(lastUpdated).toLocaleString('ko-KR')}
            </p>
          )}
        </div>

        {/* 뉴스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
            >
              {/* 썸네일 */}
              {article.thumbnail ? (
                <div className="relative h-48 overflow-hidden bg-gray-700">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-purple-900/30 to-gray-800 flex items-center justify-center">
                  <Newspaper className="w-16 h-16 text-purple-400/30" />
                </div>
              )}

              {/* 내용 */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span className="text-purple-400">{article.source}</span>
                  <span>•</span>
                  <span>{formatDate(article.date)}</span>
                </div>

                <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {article.title}
                </h3>

                {article.description && (
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                    {article.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                  <span>기사 읽기</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 새로고침 버튼 */}
        <div className="text-center mt-10">
          <button
            onClick={() => fetchNews(true)}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white rounded-full font-medium transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? '업데이트 중...' : '뉴스 새로고침'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

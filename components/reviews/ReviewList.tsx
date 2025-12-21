'use client';

import { useState, useEffect } from 'react';
import { Star, ThumbsUp, User, Calendar, Loader2, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getReviewsByProduct, getProductAverageRating, incrementHelpfulCount, Review } from '@/lib/services/reviews';

interface ReviewListProps {
  productSlug: string;
  onWriteReview?: () => void;
}

export default function ReviewList({ productSlug, onWriteReview }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState({ average: 0, count: 0 });
  const [sortBy, setSortBy] = useState<'latest' | 'rating' | 'helpful'>('latest');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [helpedReviews, setHelpedReviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchReviews();
  }, [productSlug]);

  const fetchReviews = async () => {
    try {
      const [reviewsData, ratingData] = await Promise.all([
        getReviewsByProduct(productSlug),
        getProductAverageRating(productSlug),
      ]);
      setReviews(reviewsData);
      setAverageRating(ratingData);
    } catch (error) {
      console.error('리뷰 로딩 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHelpful = async (reviewId: string) => {
    if (helpedReviews.has(reviewId)) return;

    try {
      await incrementHelpfulCount(reviewId);
      setHelpedReviews(new Set([...helpedReviews, reviewId]));
      setReviews(reviews.map(r =>
        r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      ));
    } catch (error) {
      console.error('도움됨 처리 오류:', error);
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'latest') {
      return b.createdAt.seconds - a.createdAt.seconds;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      return b.helpfulCount - a.helpfulCount;
    }
  });

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(r => {
      distribution[r.rating - 1]++;
    });
    return distribution.reverse();
  };

  const formatDate = (timestamp: { seconds: number }) => {
    return new Date(timestamp.seconds * 1000).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="space-y-8">
      {/* 평점 요약 */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* 평균 평점 */}
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold text-white mb-2">
              {averageRating.average > 0 ? averageRating.average.toFixed(1) : '-'}
            </div>
            <div className="flex justify-center md:justify-start mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating.average)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-400">{averageRating.count}개의 리뷰</p>
          </div>

          {/* 평점 분포 */}
          <div className="flex-1 space-y-2">
            {ratingDistribution.map((count, index) => {
              const stars = 5 - index;
              const percentage = averageRating.count > 0 ? (count / averageRating.count) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-gray-400 w-8">{stars}점</span>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-500 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>

          {/* 리뷰 작성 버튼 */}
          {onWriteReview && (
            <div className="md:border-l md:border-gray-700 md:pl-8">
              <Button
                onClick={onWriteReview}
                className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                리뷰 작성하기
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 정렬 옵션 */}
      {reviews.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-gray-400">총 {reviews.length}개의 리뷰</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">정렬:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="latest">최신순</option>
              <option value="rating">평점순</option>
              <option value="helpful">도움순</option>
            </select>
          </div>
        </div>
      )}

      {/* 리뷰 목록 */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/30 rounded-2xl border border-gray-700">
          <p className="text-gray-400 mb-4">아직 작성된 리뷰가 없습니다.</p>
          {onWriteReview && (
            <Button
              onClick={onWriteReview}
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
            >
              첫 번째 리뷰 작성하기
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="bg-gray-800/30 border border-gray-700 rounded-2xl p-6">
              {/* 리뷰 헤더 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{review.userName}</span>
                      {review.isVerifiedPurchase && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          구매 인증
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {formatDate(review.createdAt)}
                      {review.dogName && (
                        <span className="text-purple-400">
                          · {review.dogName} ({review.dogBreed})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 리뷰 내용 */}
              <h4 className="text-white font-medium mb-2">{review.title}</h4>
              <p className="text-gray-300 whitespace-pre-wrap">{review.content}</p>

              {/* 이미지 */}
              {review.images && review.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {review.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className="relative group"
                    >
                      <img
                        src={image}
                        alt={`리뷰 이미지 ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-700 group-hover:border-purple-500 transition-colors"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* 도움됨 버튼 */}
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <button
                  onClick={() => handleHelpful(review.id)}
                  disabled={helpedReviews.has(review.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    helpedReviews.has(review.id)
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  도움이 됐어요 {review.helpfulCount > 0 && `(${review.helpfulCount})`}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 이미지 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="리뷰 이미지"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

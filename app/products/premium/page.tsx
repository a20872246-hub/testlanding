'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check, Clock, Users, Phone, MessageCircle, ArrowLeft, Crown, Home, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createConsultation } from '@/lib/services/consultations';
import ReviewList from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';

const productData = {
  name: '프리미엄 홈 케어',
  price: '1,490,000',
  originalPrice: '1,990,000',
  duration: '12주 과정',
  description: '가정 방문 훈련으로 실제 환경에서 완벽한 교정을 진행합니다. 강아지가 가장 편안한 환경에서 훈련받아 더욱 효과적인 결과를 얻을 수 있습니다.',
  features: [
    { text: '가정 방문 훈련 (주 2회)', detail: '집으로 직접 방문하여 실제 환경에서 훈련' },
    { text: '전문가 행동 분석 리포트', detail: '가정 환경까지 고려한 종합 행동 분석' },
    { text: '보호자 교육 무제한', detail: '가족 모두가 일관된 훈련이 가능하도록 교육' },
    { text: '24시간 긴급 상담', detail: '언제든 긴급 상황 시 즉시 상담 가능' },
    { text: '수료 후 6개월 관리', detail: '장기간 사후 관리로 완벽한 교정 유지' },
    { text: '무료 재훈련 무제한', detail: '필요 시 무제한 재훈련 제공' },
    { text: '영양 상담 포함', detail: '행동에 영향을 주는 영양 상태까지 관리' },
  ],
  suitable: [
    '집에서 특히 문제 행동을 보이는 강아지',
    '외출이 어려운 보호자',
    '여러 마리를 함께 키우는 가정',
    '최고 수준의 서비스를 원하는 보호자',
    '완벽한 교정과 장기 관리가 필요한 경우',
  ],
  schedule: [
    { week: '1-3주차', content: '가정 환경 분석 및 맞춤 훈련 계획 수립' },
    { week: '4-6주차', content: '핵심 문제 행동 집중 교정' },
    { week: '7-9주차', content: '심화 훈련 및 가족 교육' },
    { week: '10-12주차', content: '자립 훈련 및 장기 사후 관리 체계 구축' },
  ],
};

export default function PremiumProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dogName: '',
    dogBreed: '',
    problem: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewKey, setReviewKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createConsultation({
        name: formData.name,
        phone: formData.phone,
        dogName: formData.dogName,
        dogBreed: formData.dogBreed,
        message: formData.problem,
        address: formData.address,
        product: productData.name,
        productSlug: 'premium',
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('상담 신청 오류:', error);
      alert('상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-purple-950/30 to-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Link href="/#products" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
                <ArrowLeft className="h-4 w-4" />
                상품 목록으로 돌아가기
              </Link>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Product Info */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                    <Crown className="h-4 w-4 fill-current" />
                    프리미엄 서비스
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {productData.name}
                  </h1>
                  <p className="text-xl text-gray-400 mb-6">
                    {productData.description}
                  </p>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="h-5 w-5" />
                      <span>{productData.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Home className="h-5 w-5" />
                      <span>가정 방문 훈련</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/20 border border-amber-500/50 rounded-2xl p-6 mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-gray-500 line-through text-xl">{productData.originalPrice}원</span>
                      <span className="text-amber-400 text-sm font-bold">25% 할인</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-5xl font-bold text-white">{productData.price}</span>
                      <span className="text-gray-400 text-xl">원</span>
                    </div>
                    <Link href="/payment?product=premium">
                      <Button className="w-full py-4 text-lg bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/30">
                        <CreditCard className="h-5 w-5 mr-2" />
                        바로 결제하기
                      </Button>
                    </Link>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">포함 서비스</h3>
                    {productData.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-white font-medium">{feature.text}</p>
                          <p className="text-gray-500 text-sm">{feature.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry Form */}
                <div className="bg-gradient-to-br from-amber-900/20 to-yellow-900/10 border border-amber-500/50 rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">상담 신청</h2>

                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">신청이 완료되었습니다</h3>
                      <p className="text-gray-400">빠른 시일 내에 연락드리겠습니다.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2">보호자 성함</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
                          placeholder="홍길동"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">연락처</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
                          placeholder="010-1234-5678"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">주소 (방문 훈련용)</label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
                          placeholder="서울시 강남구..."
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">반려견 이름</label>
                        <input
                          type="text"
                          required
                          value={formData.dogName}
                          onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
                          placeholder="초코"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">견종</label>
                        <input
                          type="text"
                          value={formData.dogBreed}
                          onChange={(e) => setFormData({ ...formData, dogBreed: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
                          placeholder="말티즈"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">문제 행동</label>
                        <textarea
                          value={formData.problem}
                          onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none resize-none"
                          placeholder="강아지의 문제 행동을 간단히 설명해주세요"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 text-lg bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/30"
                      >
                        {isSubmitting ? '신청 중...' : '프리미엄 상담 신청하기'}
                      </Button>
                    </form>
                  )}

                  <div className="mt-6 pt-6 border-t border-amber-500/20">
                    <p className="text-gray-400 text-sm text-center mb-4">빠른 상담을 원하시면</p>
                    <div className="flex gap-3">
                      <a href="tel:010-1234-5678" className="flex-1 flex items-center justify-center gap-2 py-3 border border-amber-500/30 rounded-xl text-amber-400 hover:bg-amber-500/10 transition-colors">
                        <Phone className="h-4 w-4" />
                        전화 상담
                      </a>
                      <a href="#" className="flex-1 flex items-center justify-center gap-2 py-3 border border-amber-500/30 rounded-xl text-amber-400 hover:bg-amber-500/10 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        카톡 상담
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Suitable For */}
              <div className="bg-gradient-to-br from-amber-900/20 to-transparent border border-amber-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">이런 분께 추천합니다</h3>
                <ul className="space-y-3">
                  {productData.suitable.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule */}
              <div className="bg-gradient-to-br from-amber-900/20 to-transparent border border-amber-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">훈련 일정</h3>
                <div className="space-y-4">
                  {productData.schedule.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-20 text-amber-400 font-medium">{item.week}</div>
                      <div className="text-gray-300">{item.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 bg-gradient-to-b from-black to-amber-950/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">고객 후기</h2>

              {showReviewForm ? (
                <div className="mb-8">
                  <ReviewForm
                    productSlug="premium"
                    productName={productData.name}
                    onSuccess={() => {
                      setShowReviewForm(false);
                      setReviewKey(prev => prev + 1);
                    }}
                    onCancel={() => setShowReviewForm(false)}
                  />
                </div>
              ) : null}

              <ReviewList
                key={reviewKey}
                productSlug="premium"
                onWriteReview={() => setShowReviewForm(true)}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

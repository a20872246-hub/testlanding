'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check, Clock, Users, Phone, MessageCircle, ArrowLeft, Star, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createConsultation } from '@/lib/services/consultations';

const productData = {
  name: '집중 교정 프로그램',
  price: '890,000',
  originalPrice: '1,190,000',
  duration: '8주 과정',
  description: '심각한 문제 행동을 집중적으로 교정하는 프리미엄 과정입니다. 공격성, 분리불안, 심한 짖음 등 복잡한 문제 행동도 체계적으로 해결합니다.',
  features: [
    { text: '1:1 맞춤 훈련 (주 3회)', detail: '주 3회 집중 훈련으로 빠른 효과 기대' },
    { text: '심층 행동 분석 리포트', detail: '문제 행동의 근본 원인까지 분석하는 상세 리포트' },
    { text: '보호자 교육 3회', detail: '가정에서도 일관된 훈련이 가능하도록 교육' },
    { text: '24시간 카카오톡 상담', detail: '긴급 상황 시 24시간 상담 가능' },
    { text: '수료 후 3개월 관리', detail: '훈련 종료 후 3개월간 철저한 사후 관리' },
    { text: '무료 재훈련 1회', detail: '필요 시 1회 무료 재훈련 제공' },
  ],
  suitable: [
    '공격성 문제가 있는 강아지',
    '분리불안이 심한 강아지',
    '다른 훈련으로 효과를 보지 못한 경우',
    '빠른 시간 내 교정이 필요한 보호자',
    '심각한 짖음 문제가 있는 강아지',
  ],
  schedule: [
    { week: '1-2주차', content: '심층 행동 분석 및 맞춤 훈련 계획 수립' },
    { week: '3-4주차', content: '핵심 문제 행동 집중 교정' },
    { week: '5-6주차', content: '심화 훈련 및 상황별 대응 훈련' },
    { week: '7-8주차', content: '보호자 교육 및 자립 훈련, 사후 관리 안내' },
  ],
};

export default function IntensiveProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dogName: '',
    dogBreed: '',
    problem: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        product: productData.name,
        productSlug: 'intensive',
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
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                    <Star className="h-4 w-4 fill-current" />
                    가장 인기 있는 프로그램
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
                      <Users className="h-5 w-5" />
                      <span>1:1 집중 훈련</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500 rounded-2xl p-6 mb-8 shadow-lg shadow-purple-500/20">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-gray-500 line-through text-xl">{productData.originalPrice}원</span>
                      <span className="text-pink-400 text-sm font-bold">25% 할인</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-5xl font-bold text-white">{productData.price}</span>
                      <span className="text-gray-400 text-xl">원</span>
                    </div>
                    <Link href="/payment?product=intensive">
                      <Button className="w-full py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg shadow-purple-500/30">
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
                        <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-white font-medium">{feature.text}</p>
                          <p className="text-gray-500 text-sm">{feature.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry Form */}
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/10 border border-purple-500 rounded-3xl p-8 shadow-lg shadow-purple-500/20">
                  <h2 className="text-2xl font-bold text-white mb-6">상담 신청</h2>

                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-purple-400" />
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
                          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
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
                          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                          placeholder="010-1234-5678"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">반려견 이름</label>
                        <input
                          type="text"
                          required
                          value={formData.dogName}
                          onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                          placeholder="초코"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">견종</label>
                        <input
                          type="text"
                          value={formData.dogBreed}
                          onChange={(e) => setFormData({ ...formData, dogBreed: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                          placeholder="말티즈"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">문제 행동</label>
                        <textarea
                          value={formData.problem}
                          onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
                          placeholder="강아지의 문제 행동을 간단히 설명해주세요"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg shadow-purple-500/30"
                      >
                        {isSubmitting ? '신청 중...' : '상담 신청하기'}
                      </Button>
                    </form>
                  )}

                  <div className="mt-6 pt-6 border-t border-purple-500/20">
                    <p className="text-gray-400 text-sm text-center mb-4">빠른 상담을 원하시면</p>
                    <div className="flex gap-3">
                      <a href="tel:010-1234-5678" className="flex-1 flex items-center justify-center gap-2 py-3 border border-purple-500/30 rounded-xl text-purple-400 hover:bg-purple-500/10 transition-colors">
                        <Phone className="h-4 w-4" />
                        전화 상담
                      </a>
                      <a href="#" className="flex-1 flex items-center justify-center gap-2 py-3 border border-purple-500/30 rounded-xl text-purple-400 hover:bg-purple-500/10 transition-colors">
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
              <div className="bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">이런 분께 추천합니다</h3>
                <ul className="space-y-3">
                  {productData.suitable.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule */}
              <div className="bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">훈련 일정</h3>
                <div className="space-y-4">
                  {productData.schedule.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-20 text-purple-400 font-medium">{item.week}</div>
                      <div className="text-gray-300">{item.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

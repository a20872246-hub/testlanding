'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check, Clock, Users, Phone, MessageCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createConsultation } from '@/lib/services/consultations';

const productData = {
  name: '기본 교정 프로그램',
  price: '490,000',
  originalPrice: '690,000',
  duration: '4주 과정',
  description: '일반적인 문제 행동 교정에 적합한 기본 프로그램입니다. 짖음, 산책 문제, 기본 복종 훈련 등 일상적인 문제 행동을 체계적으로 교정합니다.',
  features: [
    { text: '1:1 맞춤 훈련 (주 2회)', detail: '전문 훈련사가 직접 방문하여 1:1 맞춤 훈련 진행' },
    { text: '행동 분석 리포트', detail: '강아지의 문제 행동 원인 분석 및 개선 방향 제시' },
    { text: '보호자 교육 1회', detail: '효과적인 훈련 방법과 일상 관리법 교육' },
    { text: '카카오톡 상담 지원', detail: '평일 10:00-18:00 카카오톡 문의 가능' },
    { text: '수료 후 1개월 관리', detail: '훈련 종료 후 1개월간 사후 관리 지원' },
  ],
  suitable: [
    '가벼운 짖음 문제가 있는 강아지',
    '산책 시 끌림이 심한 강아지',
    '기본 명령어 훈련이 필요한 강아지',
    '처음 훈련을 시작하는 보호자',
  ],
  schedule: [
    { week: '1주차', content: '행동 분석 및 훈련 계획 수립' },
    { week: '2주차', content: '기본 명령어 및 문제 행동 교정 시작' },
    { week: '3주차', content: '심화 훈련 및 보호자 교육' },
    { week: '4주차', content: '훈련 마무리 및 사후 관리 안내' },
  ],
};

export default function BasicProductPage() {
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
    console.log('폼 제출 시작:', formData);
    setIsSubmitting(true);

    try {
      console.log('createConsultation 호출 전');
      const result = await createConsultation({
        name: formData.name,
        phone: formData.phone,
        dogName: formData.dogName,
        dogBreed: formData.dogBreed,
        message: formData.problem,
        product: productData.name,
        productSlug: 'basic',
      });
      console.log('createConsultation 결과:', result);
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
                      <span>1:1 맞춤 훈련</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6 mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-gray-500 line-through text-xl">{productData.originalPrice}원</span>
                      <span className="text-purple-400 text-sm">29% 할인</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-5xl font-bold text-white">{productData.price}</span>
                      <span className="text-gray-400 text-xl">원</span>
                    </div>
                    <Link href="/payment?product=basic">
                      <Button className="w-full py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl">
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
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/10 border border-purple-500/30 rounded-3xl p-8">
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
                        className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl"
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
                      <div className="flex-shrink-0 w-16 text-purple-400 font-medium">{item.week}</div>
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

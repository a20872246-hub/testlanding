'use client';

import { Check, Star } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: '기본 교정 프로그램',
    slug: 'basic',
    price: '490,000',
    originalPrice: '690,000',
    duration: '4주 과정',
    description: '일반적인 문제 행동 교정에 적합한 기본 프로그램',
    features: [
      '1:1 맞춤 훈련 (주 2회)',
      '행동 분석 리포트',
      '보호자 교육 1회',
      '카카오톡 상담 지원',
      '수료 후 1개월 관리',
    ],
    popular: false,
  },
  {
    id: 2,
    name: '집중 교정 프로그램',
    slug: 'intensive',
    price: '890,000',
    originalPrice: '1,190,000',
    duration: '8주 과정',
    description: '심각한 문제 행동을 집중적으로 교정하는 프리미엄 과정',
    features: [
      '1:1 맞춤 훈련 (주 3회)',
      '심층 행동 분석 리포트',
      '보호자 교육 3회',
      '24시간 카카오톡 상담',
      '수료 후 3개월 관리',
      '무료 재훈련 1회',
    ],
    popular: true,
  },
  {
    id: 3,
    name: '프리미엄 홈 케어',
    slug: 'premium',
    price: '1,490,000',
    originalPrice: '1,990,000',
    duration: '12주 과정',
    description: '가정 방문 훈련으로 실제 환경에서 완벽한 교정',
    features: [
      '가정 방문 훈련 (주 2회)',
      '전문가 행동 분석 리포트',
      '보호자 교육 무제한',
      '24시간 긴급 상담',
      '수료 후 6개월 관리',
      '무료 재훈련 무제한',
      '영양 상담 포함',
    ],
    popular: false,
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-gradient-to-b from-black to-purple-950/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                훈련 프로그램
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              우리 강아지에게 맞는 최적의 프로그램을 선택하세요
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`
                  relative rounded-3xl p-8
                  bg-gradient-to-br from-purple-900/30 to-pink-900/20
                  border transition-all duration-300
                  ${product.popular
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-105'
                    : 'border-purple-500/30 hover:border-purple-500/60'
                  }
                `}
              >
                {/* Popular Badge */}
                {product.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      <Star className="h-4 w-4 fill-current" />
                      인기
                    </div>
                  </div>
                )}

                {/* Product Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-gray-500 line-through text-lg">
                      {product.originalPrice}원
                    </span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{product.price}</span>
                    <span className="text-gray-400">원</span>
                  </div>
                  <p className="text-purple-400 mt-2">{product.duration}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={`/products/${product.slug}`}
                  className={`
                    block w-full py-4 text-lg rounded-xl transition-all text-center font-medium
                    ${product.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-purple-500/20 hover:bg-purple-500/30 text-white border border-purple-500/50'
                    }
                  `}
                >
                  상담 신청하기
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-12">
            <p className="text-gray-500">
              * 모든 프로그램은 100% 환불 보장제가 적용됩니다
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { CheckCircle2, Award, BookOpen, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Solution() {
  const credentials = [
    {
      icon: Award,
      title: '국제 공인 훈련사',
      description: 'KKC, AKC 인증 전문 자격',
    },
    {
      icon: BookOpen,
      title: '저서 출간',
      description: '베스트셀러 반려견 훈련서 저자',
    },
    {
      icon: MapPin,
      title: '전국 10개 센터',
      description: '집 근처에서 편하게',
    },
  ];

  const features = [
    '1:1 맞춤형 훈련 프로그램',
    '행동 분석 및 원인 진단',
    '보호자 교육 포함',
    '평생 사후관리 서비스',
    '100% 환불 보장제',
    '무료 재훈련 지원',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-950/10 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                대한민국 1위
              </span>
              <br />
              강아지 행동 교정 전문가
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              15년간 1,500마리 이상의 문제견을 교정한 경험으로<br />
              여러분의 강아지도 변화시킬 수 있습니다.
            </p>
          </div>

          {/* Credentials */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {credentials.map((cred, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 p-6 text-center hover:border-purple-500/60 transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-full bg-purple-500/20 mb-4">
                  <cred.icon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cred.title}</h3>
                <p className="text-gray-400">{cred.description}</p>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🐕</div>
                  <p className="text-gray-400 text-sm">
                    전문 훈련사와 함께하는<br />
                    체계적인 행동 교정 프로그램
                  </p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg shadow-purple-500/50 rotate-12">
                <p className="font-bold">98% 성공률</p>
              </div>
            </div>

            {/* Right: Features */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-8">
                왜 우리 센터를 선택해야 할까요?
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <p className="text-lg text-gray-300 group-hover:text-white transition-colors">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl">
                <p className="text-white font-semibold mb-2">지금 신청하시면</p>
                <p className="text-2xl font-bold text-purple-400 mb-1">초기 상담 무료</p>
                <p className="text-gray-400 text-sm">+ 행동 분석 리포트 제공</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

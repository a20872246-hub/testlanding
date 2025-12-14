'use client';

import { ClipboardCheck, Search, Target, Trophy } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      number: '01',
      icon: ClipboardCheck,
      title: '무료 상담 신청',
      description: '간단한 정보 입력 후 24시간 내 연락드립니다',
      color: 'from-purple-500 to-purple-600',
    },
    {
      number: '02',
      icon: Search,
      title: '행동 분석',
      description: '전문가가 강아지의 문제 행동 원인을 정확히 진단합니다',
      color: 'from-pink-500 to-pink-600',
    },
    {
      number: '03',
      icon: Target,
      title: '맞춤 훈련',
      description: '1:1 개인별 맞춤 프로그램으로 체계적인 교정 시작',
      color: 'from-purple-600 to-pink-600',
    },
    {
      number: '04',
      icon: Trophy,
      title: '성공적인 변화',
      description: '평생 사후관리로 행복한 반려생활을 지원합니다',
      color: 'from-pink-600 to-purple-600',
    },
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(107,70,193,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                간단한 4단계
              </span>
              로 시작하세요
            </h2>
            <p className="text-xl text-gray-400">
              복잡한 절차 없이 오늘 바로 시작할 수 있습니다
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connector line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent -z-10" />
                )}

                <div className="relative">
                  {/* Step number */}
                  <div className="text-8xl font-bold text-transparent bg-gradient-to-br from-purple-500/20 to-pink-500/20 bg-clip-text mb-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
              <p className="text-white text-lg mb-2">
                평균 <span className="text-purple-400 font-bold text-2xl">7일</span>이면 눈에 띄는 변화를 경험하실 수 있습니다
              </p>
              <p className="text-gray-400">
                더 이상 미루지 마세요. 지금 바로 시작하세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

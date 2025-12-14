'use client';

import { Heart, Home, Users, Smile } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Benefits() {
  const benefits = [
    {
      icon: Heart,
      title: '평화로운 일상',
      description: '더 이상 짖음이나 문제 행동으로 스트레스 받지 않습니다',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: Home,
      title: '이웃과의 관계',
      description: '민원 걱정 없이 편안한 주거 생활을 즐길 수 있습니다',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      title: '사회성 향상',
      description: '다른 강아지, 사람들과 편하게 어울릴 수 있습니다',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Smile,
      title: '행복한 반려생활',
      description: '강아지와 보호자 모두 행복한 삶을 살 수 있습니다',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-950/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              훈련 후 얻게 되는
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                놀라운 변화들
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              단순한 훈련이 아닙니다.<br />
              여러분과 강아지의 삶 전체가 바뀝니다.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-zinc-900/50 border-zinc-800 p-8 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${benefit.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Before/After Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30">
                  <span className="text-red-400 font-bold">훈련 전</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>끊임없는 짖음과 공격성</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>이웃 민원과 스트레스</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>산책도 제대로 못하는 답답함</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>강아지와의 관계 악화</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30">
                  <span className="text-purple-400 font-bold">훈련 후</span>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>조용하고 온순한 행동</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>편안한 주거 환경</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>즐거운 산책과 외출</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>행복한 반려생활</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

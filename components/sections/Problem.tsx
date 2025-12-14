'use client';

import { AlertCircle, Volume2, Shield, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Problem() {
  const problems = [
    {
      icon: Volume2,
      title: '멈추지 않는 짖음',
      description: '낮이든 밤이든 계속되는 짖음 때문에 이웃 민원이 걱정되시나요?',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Shield,
      title: '공격적인 행동',
      description: '산책 중 다른 강아지나 사람에게 으르렁거리고 공격적인가요?',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: Heart,
      title: '분리불안 증상',
      description: '혼자 두면 집을 난장판으로 만들거나 계속 울어대나요?',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: AlertCircle,
      title: '산책 거부',
      description: '산책을 싫어하거나 리드줄을 당기며 통제가 안 되나요?',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-950/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              이런 고민,{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
                하고 계신가요?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              매일 반복되는 문제 행동 때문에 스트레스 받으시죠?<br />
              이제는 전문가의 도움을 받을 때입니다.
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <Card
                key={index}
                className="bg-zinc-900/50 border-zinc-800 p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
              >
                <div className={`inline-flex p-4 rounded-2xl ${problem.bgColor} mb-6 group-hover:scale-110 transition-transform`}>
                  <problem.icon className={`h-8 w-8 ${problem.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{problem.title}</h3>
                <p className="text-gray-400 leading-relaxed">{problem.description}</p>
              </Card>
            ))}
          </div>

          {/* Pain Point Amplification */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 max-w-3xl">
              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-red-400 font-bold">"유튜브 영상을 봐도, 책을 읽어봐도 안 되더라..."</span>
                <br />
                혼자서는 해결하기 어려운 문제 행동,<br />
                전문가의 체계적인 훈련이 필요합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

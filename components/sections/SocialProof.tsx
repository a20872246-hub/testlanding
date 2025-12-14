'use client';

import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      name: '김민지',
      dog: '골든 리트리버 (3세)',
      rating: 5,
      text: '2년간 짖음 때문에 너무 힘들었는데, 단 일주일만에 완전히 달라졌어요. 이웃분들도 깜짝 놀라실 정도예요. 정말 감사합니다!',
      image: '👩',
    },
    {
      name: '박준호',
      dog: '시바견 (2세)',
      rating: 5,
      text: '공격성이 심해서 산책도 못했는데, 이제는 자유롭게 다른 강아지들과 놀 수 있어요. 전문가의 손길이 정말 대단하다는 걸 느꼈습니다.',
      image: '👨',
    },
    {
      name: '이수연',
      dog: '말티즈 (4세)',
      rating: 5,
      text: '분리불안이 너무 심해서 외출도 못했어요. 지금은 혼자서도 잘 있고, 저희 가족 모두 행복해졌습니다. 100% 추천합니다!',
      image: '👩‍🦰',
    },
    {
      name: '정우진',
      dog: '비글 (1.5세)',
      rating: 5,
      text: '어릴 때부터 물어뜯고 난폭했는데, 지금은 완전히 온순해졌어요. 1:1 맞춤 교육이 정말 효과적이었습니다. 진작 할걸 후회돼요.',
      image: '👨‍💼',
    },
  ];

  const stats = [
    { value: '1,500+', label: '교육 완료' },
    { value: '98%', label: '만족도' },
    { value: '4.9/5.0', label: '평균 평점' },
    { value: '200+', label: '이달의 신청' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-950/10 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                1,500명의 보호자
              </span>
              가<br />
              이미 변화를 경험했습니다
            </h2>
            <p className="text-xl text-gray-400">
              실제 수강생들의 생생한 후기를 확인해보세요
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-zinc-900/50 border-zinc-800 p-8 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 h-12 w-12 text-purple-500/10 group-hover:text-purple-500/20 transition-colors" />

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.dog}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Video testimonial placeholder */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 p-12">
              <div className="max-w-3xl mx-auto">
                <div className="aspect-video rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center mb-6 overflow-hidden">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎥</div>
                    <p className="text-gray-400">
                      실제 훈련 과정과 Before/After 영상
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg">
                  "보호자 교육 없이는 효과가 없다고 생각했는데,<br />
                  전문가의 체계적인 시스템에 완전히 만족했습니다!"
                </p>
                <p className="text-purple-400 font-bold mt-2">- 서울 강남구, 윤지혜 님</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

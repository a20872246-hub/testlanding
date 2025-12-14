'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [dimensions, setDimensions] = useState({
    radius: 480,
    cardSize: 120,
  });
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // 강아지 훈련 관련 이미지들 - 더블 배열로 무한 스크롤
  const dogImages = [
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop', // 골든 리트리버
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', // 강아지 훈련
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop', // 시바견
    'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=400&fit=crop', // 비글
    'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=crop', // 강아지 산책
    'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&h=400&fit=crop', // 말티즈
    'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop', // 강아지 교육
    'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&h=400&fit=crop', // 강아지
  ];

  // 무한 스크롤을 위해 이미지 배열을 2배로 확장
  const infiniteImages = [...dogImages, ...dogImages];

  const startAngle = 20;
  const endAngle = 160;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: 260, cardSize: 80 });
      } else if (width < 1024) {
        setDimensions({ radius: 360, cardSize: 100 });
      } else {
        setDimensions({ radius: 480, cardSize: 120 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 부드러운 자동 회전 애니메이션
  useEffect(() => {
    const animate = () => {
      // 1초에 약 0.5도씩 회전 (느리고 부드러운 회전)
      const rotationSpeed = 0.02; // 속도 조절 (숫자가 클수록 빠름)
      setRotation((prev) => {
        const newRotation = prev + rotationSpeed;
        // 한 바퀴(360도 / 이미지 개수) 돌면 리셋
        const anglePerImage = 360 / dogImages.length;
        if (newRotation >= anglePerImage) {
          return newRotation - anglePerImage;
        }
        return newRotation;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dogImages.length]);

  const count = dogImages.length;
  const anglePerImage = (endAngle - startAngle) / (count - 1);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,70,193,0.1),transparent_50%)]" />

      {/* Arc Gallery of Dog Training Images */}
      <div
        className="relative mx-auto w-full"
        style={{
          height: dimensions.radius * 1.2,
        }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {infiniteImages.map((src, i) => {
            // 현재 회전 각도를 적용하여 각 이미지의 위치 계산
            const baseAngle = startAngle + anglePerImage * (i % count);
            const currentAngle = baseAngle - (rotation * anglePerImage);

            // 각도가 범위를 벗어나면 반대편에서 나타나도록
            let adjustedAngle = currentAngle;
            const totalRange = endAngle - startAngle;

            if (currentAngle < startAngle - totalRange) {
              adjustedAngle = currentAngle + totalRange * 2;
            } else if (currentAngle > endAngle + totalRange) {
              adjustedAngle = currentAngle - totalRange * 2;
            }

            // 보이는 범위 내의 이미지만 렌더링 (성능 최적화)
            const isVisible = adjustedAngle >= startAngle - 30 && adjustedAngle <= endAngle + 30;

            if (!isVisible) return null;

            const angleRad = (adjustedAngle * Math.PI) / 180;
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;

            // 거리에 따른 투명도 계산 (중앙에 가까울수록 선명)
            const distanceFromCenter = Math.abs(adjustedAngle - (startAngle + endAngle) / 2);
            const maxDistance = (endAngle - startAngle) / 2;
            const opacity = 1 - (distanceFromCenter / maxDistance) * 0.4;

            return (
              <div
                key={`${i}-${src}`}
                className="absolute transition-opacity duration-500 ease-out"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  opacity: opacity,
                  zIndex: Math.floor((endAngle - adjustedAngle) * 10),
                }}
              >
                <div
                  className="rounded-2xl shadow-xl overflow-hidden ring-2 ring-purple-500/30 bg-zinc-900 transition-all duration-300 hover:scale-110 hover:ring-purple-500/60 w-full h-full"
                  style={{
                    transform: `rotate(${adjustedAngle / 4}deg)`,
                  }}
                >
                  <img
                    src={src}
                    alt={`강아지 훈련 ${(i % count) + 1}`}
                    className="block w-full h-full object-cover"
                    draggable={false}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x400/1f2937/9333ea?text=Dog+${(i % count) + 1}`;
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content positioned below the arc */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-40 md:-mt-52 lg:-mt-64">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-sm text-purple-300">200명 한정 무료 특강</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
            단 7일만에
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              문제견 행동 완벽 교정
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
            짖음, 공격성, 분리불안까지<br />
            전문가의 1:1 맞춤 훈련으로 우리 강아지를 바꿔보세요
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}>
            <Button
              size="lg"
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all transform hover:-translate-y-0.5 group"
            >
              무료 상담 신청하기
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToForm}
              className="w-full sm:w-auto border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500 px-8 py-6 text-lg rounded-full transition-all"
            >
              성공 사례 보기
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1,500+</div>
              <div className="text-sm text-gray-400">교정 성공</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-sm text-gray-400">만족도</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">15년</div>
              <div className="text-sm text-gray-400">전문 경력</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-0 animate-fade-in" style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}>
        <div className="w-6 h-10 rounded-full border-2 border-purple-500/50 flex justify-center">
          <div className="w-1 h-3 bg-purple-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translate(-50%, 60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 50%);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation-name: fade-in-up;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }

        .animate-fade-in {
          animation-name: fade-in;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
      `}</style>
    </section>
  );
}

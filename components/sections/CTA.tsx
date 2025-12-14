'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function CTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dogBreed: '',
    issue: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybrlI_nwI5Q6uVUyCJmhkQP8PpCPAeyyiNwhQn2Wo0UduraMCBcHbpQytz_FXjj0nW/exec';

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dogBreed: formData.dogBreed,
        issue: formData.issue,
        timestamp: new Date().toISOString(),
      };

      console.log('📤 전송 데이터:', payload);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('✅ 전송 완료:', response);

      // no-cors 모드에서는 response를 읽을 수 없으므로 성공으로 간주
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        dogBreed: '',
        issue: '',
      });
    } catch (error) {
      console.error('❌ 전송 에러:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <section id="lead-form" className="py-20 bg-gradient-to-b from-black to-purple-950/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 p-12 text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mb-6">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                신청이 완료되었습니다!
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                24시간 내로 연락드리겠습니다.<br />
                감사합니다!
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
              >
                돌아가기
              </Button>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-20 bg-gradient-to-b from-black to-purple-950/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,70,193,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm text-purple-300">한정 200명 무료 상담</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                지금 바로 시작
              </span>
              하세요
            </h2>
            <p className="text-xl text-gray-400">
              무료 상담 신청 후 24시간 내 연락드립니다
            </p>
          </div>

          {/* Form */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    이름 <span className="text-red-400">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    연락처 <span className="text-red-400">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-1234-5678"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  이메일 <span className="text-red-400">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="dogBreed" className="block text-sm font-medium text-gray-300 mb-2">
                  강아지 품종 및 나이 <span className="text-red-400">*</span>
                </label>
                <Input
                  id="dogBreed"
                  name="dogBreed"
                  type="text"
                  required
                  value={formData.dogBreed}
                  onChange={handleChange}
                  placeholder="예: 골든 리트리버, 3세"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-gray-300 mb-2">
                  문제 행동 설명 <span className="text-red-400">*</span>
                </label>
                <Textarea
                  id="issue"
                  name="issue"
                  required
                  value={formData.issue}
                  onChange={handleChange}
                  placeholder="어떤 문제 행동으로 고민하고 계신지 자세히 적어주세요 (예: 낯선 사람을 보면 계속 짖어요)"
                  rows={4}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-purple-500 resize-none"
                />
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="font-medium mb-1">신청하시면 다음 혜택을 받으실 수 있습니다:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>무료 초기 상담 (1회, 30분)</li>
                      <li>강아지 행동 분석 리포트 제공</li>
                      <li>맞춤형 훈련 프로그램 추천</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-full shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    신청 중...
                  </>
                ) : (
                  '무료 상담 신청하기'
                )}
              </Button>

              <p className="text-center text-sm text-gray-500">
                개인정보는 상담 목적으로만 사용되며, 안전하게 보호됩니다.
              </p>
            </form>
          </Card>

          {/* Bottom trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-purple-400 font-bold">100% 환불 보장</div>
              <div className="text-sm text-gray-500">만족하지 않으시면 전액 환불</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold">무료 재훈련</div>
              <div className="text-sm text-gray-500">효과가 없으면 무료로 재교육</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold">평생 사후관리</div>
              <div className="text-sm text-gray-500">교육 후에도 계속 지원</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

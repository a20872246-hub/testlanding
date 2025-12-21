'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dog, Mail, Lock, Eye, EyeOff, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signUpWithEmail, signInWithGoogle } from '@/lib/services/auth';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '이용약관에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const user = await signUpWithEmail(formData.email, formData.password, formData.name);

      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        provider: 'email',
      }));

      router.push('/');
      router.refresh();
    } catch (error: unknown) {
      console.error('회원가입 오류:', error);
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        setErrors({ submit: '이미 사용 중인 이메일입니다.' });
      } else {
        setErrors({ submit: '회원가입 중 오류가 발생했습니다.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);

    try {
      const user = await signInWithGoogle();

      if (user) {
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          provider: 'google',
        }));

        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Google 회원가입 오류:', error);
      setErrors({ submit: 'Google 로그인 중 오류가 발생했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoSignup = async () => {
    setIsLoading(true);
    // Kakao OAuth는 별도 설정 필요 (Firebase에서 지원하지 않음)
    alert('카카오 로그인은 준비 중입니다.');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950/30 to-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Dog className="h-10 w-10 text-purple-500" />
            <span className="text-2xl font-bold text-white">Dog Training</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-white">회원가입</h1>
          <p className="mt-2 text-gray-400">새 계정을 만들어보세요</p>
        </div>

        {/* Signup Card */}
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8">
          {/* Social Signup Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google로 가입
            </button>

            <button
              onClick={handleKakaoSignup}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#FEE500] hover:bg-[#FDD800] text-[#000000] font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  d="M12 3C6.48 3 2 6.48 2 10.5c0 2.55 1.64 4.78 4.09 6.08l-.82 3.05c-.07.26.02.54.24.7.13.1.28.15.44.15.12 0 .24-.03.35-.09l3.72-2.02c.64.1 1.3.15 1.98.15 5.52 0 10-3.48 10-7.77C22 6.48 17.52 3 12 3z"
                />
              </svg>
              카카오로 가입
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-purple-500/30"></div>
            <span className="text-gray-500 text-sm">또는</span>
            <div className="flex-1 h-px bg-purple-500/30"></div>
          </div>

          {/* Email Signup Form */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            {errors.submit && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {errors.submit}
              </div>
            )}

            <div>
              <label className="block text-gray-300 mb-2 text-sm">이름</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none ${
                    errors.name ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                  }`}
                  placeholder="홍길동"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                  }`}
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none ${
                    errors.password ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                  }`}
                  placeholder="8자 이상 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">비밀번호 확인</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none ${
                    errors.confirmPassword ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                  }`}
                  placeholder="비밀번호를 다시 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
            </div>

            {/* Agreement Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border ${formData.agreeTerms ? 'bg-purple-500 border-purple-500' : 'border-purple-500/30 bg-black/50'} flex items-center justify-center`}>
                    {formData.agreeTerms && <Check className="h-3 w-3 text-white" />}
                  </div>
                </div>
                <span className="text-gray-400 text-sm">
                  <span className="text-purple-400">[필수]</span> 이용약관 및 개인정보처리방침에 동의합니다.
                </span>
              </label>
              {errors.agreeTerms && <p className="text-sm text-red-400 ml-8">{errors.agreeTerms}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.agreeMarketing}
                    onChange={(e) => setFormData({ ...formData, agreeMarketing: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border ${formData.agreeMarketing ? 'bg-purple-500 border-purple-500' : 'border-purple-500/30 bg-black/50'} flex items-center justify-center`}>
                    {formData.agreeMarketing && <Check className="h-3 w-3 text-white" />}
                  </div>
                </div>
                <span className="text-gray-400 text-sm">
                  <span className="text-gray-500">[선택]</span> 마케팅 정보 수신에 동의합니다.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl disabled:opacity-50"
            >
              {isLoading ? '가입 중...' : '회원가입'}
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-400">
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

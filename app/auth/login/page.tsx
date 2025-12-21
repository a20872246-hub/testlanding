'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dog, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signInWithEmail, signInWithGoogle, adminSignIn } from '@/lib/services/auth';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 관리자 계정 확인
      const isAdmin = await adminSignIn(formData.email, formData.password);
      if (isAdmin) {
        router.push('/admin');
        router.refresh();
        return;
      }

      // 일반 사용자 로그인
      const user = await signInWithEmail(formData.email, formData.password);

      if (!user) {
        setError('사용자를 찾을 수 없습니다.');
        return;
      }

      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        provider: 'email',
      }));

      router.push('/');
      router.refresh();
    } catch (error: unknown) {
      const firebaseError = error as { code?: string };
      if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (firebaseError.code === 'auth/invalid-credential') {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (firebaseError.code === 'auth/too-many-requests') {
        setError('너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const user = await signInWithGoogle();

      if (!user) {
        setError('사용자를 찾을 수 없습니다.');
        return;
      }

      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        provider: 'google',
      }));

      router.push('/');
      router.refresh();
    } catch (error: unknown) {
      console.error('Google login error:', error);
      const firebaseError = error as { code?: string; message?: string };
      if (firebaseError.code === 'auth/popup-closed-by-user') {
        // 사용자가 팝업을 닫음 - 에러 메시지 표시하지 않음
      } else if (firebaseError.code === 'auth/popup-blocked') {
        setError('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
      } else if (firebaseError.code === 'auth/cancelled-popup-request') {
        // 중복 팝업 요청 - 무시
      } else if (firebaseError.code === 'auth/unauthorized-domain') {
        setError('이 도메인에서는 Google 로그인을 사용할 수 없습니다. Firebase Console에서 도메인을 추가해주세요.');
      } else {
        setError(`Google 로그인 중 오류가 발생했습니다: ${firebaseError.message || firebaseError.code || '알 수 없는 오류'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    setIsLoading(true);
    // 카카오 로그인은 별도 설정 필요
    setError('카카오 로그인은 준비 중입니다.');
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
          <h1 className="mt-6 text-3xl font-bold text-white">로그인</h1>
          <p className="mt-2 text-gray-400">계정에 로그인하세요</p>
        </div>

        {/* Login Card */}
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
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
              Google로 로그인
            </button>

            <button
              onClick={handleKakaoLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#FEE500] hover:bg-[#FDD800] text-[#000000] font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  d="M12 3C6.48 3 2 6.48 2 10.5c0 2.55 1.64 4.78 4.09 6.08l-.82 3.05c-.07.26.02.54.24.7.13.1.28.15.44.15.12 0 .24-.03.35-.09l3.72-2.02c.64.1 1.3.15 1.98.15 5.52 0 10-3.48 10-7.77C22 6.48 17.52 3 12 3z"
                />
              </svg>
              카카오로 로그인
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-purple-500/30"></div>
            <span className="text-gray-500 text-sm">또는</span>
            <div className="flex-1 h-px bg-purple-500/30"></div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-300 mb-2 text-sm">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  placeholder="비밀번호를 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-purple-500/30 bg-black/50 text-purple-500 focus:ring-purple-500" />
                <span className="text-gray-400">로그인 상태 유지</span>
              </label>
              <Link href="/auth/forgot-password" className="text-purple-400 hover:text-purple-300">
                비밀번호 찾기
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl disabled:opacity-50"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-400">
            아직 계정이 없으신가요?{' '}
            <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 font-medium">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

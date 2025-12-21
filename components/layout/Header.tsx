'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Dog } from 'lucide-react';
import AuthButtons from '@/components/auth/AuthButtons';

const baseNavigation = [
  { name: '회사소개', href: '#about' },
  { name: '상품', href: '#products' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // TODO: 실제 인증 상태 관리 (Context 또는 상태관리 라이브러리 사용)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 로컬스토리지에서 로그인 상태 확인 (임시)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserName(user.name);
    }
  }, []);

  // 로그인 상태에 따른 네비게이션 메뉴 구성
  const navigation = isLoggedIn
    ? [...baseNavigation, { name: '마이페이지', href: '/mypage' }]
    : baseNavigation;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName(undefined);
    window.location.href = '/';
  };

  return (
    <header
      className={`
        sticky top-0 left-0 right-0 z-50
        h-20 px-6 lg:px-8
        backdrop-blur-md bg-white/80
        border-b border-white/20
        shadow-lg shadow-black/5
        transition-all duration-300
        ${scrolled ? 'bg-white/90 shadow-lg shadow-black/10' : ''}
      `}
      style={{
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <nav className="flex items-center justify-between h-full max-w-7xl mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
          <Dog className="h-8 w-8 text-purple-600" />
          <span className="font-bold text-xl text-gray-900">Dog Training</span>
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 px-8">
          <div className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  font-medium text-gray-900/90
                  px-3 py-2 rounded-lg
                  hover:text-blue-600 hover:bg-white/20
                  transition-colors duration-200
                "
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center">
          <AuthButtons
            isLoggedIn={isLoggedIn}
            userName={userName}
            onLogout={handleLogout}
          />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-900" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`
          md:hidden
          absolute top-20 left-0 right-0
          backdrop-blur-xl bg-white/95
          border border-white/20
          shadow-2xl
          transition-all duration-300 ease-out
          ${mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
          }
        `}
        style={{
          WebkitBackdropFilter: 'blur(24px)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="px-6 py-4 space-y-2">
          {/* Navigation Links */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                block font-medium text-gray-900/90
                px-4 py-3 rounded-lg
                hover:text-blue-600 hover:bg-white/30
                transition-colors duration-200
              "
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-200 my-4" />

          {/* Auth Buttons (Mobile) */}
          {isLoggedIn && userName ? (
            <>
              <div className="px-4 py-2">
                <p className="text-sm text-gray-500">로그인됨</p>
                <p className="font-medium text-gray-900">{userName}</p>
              </div>
              <Link
                href="/mypage/profile"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                내 정보
              </Link>
              <Link
                href="/mypage/orders"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                주문내역
              </Link>
              <Link
                href="/mypage/settings"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                설정
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
              >
                로그아웃
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 px-4">
              <Link
                href="/auth/login"
                className="block text-center py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                로그인
              </Link>
              <Link
                href="/auth/signup"
                className="block text-center bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-gray-900 font-medium px-4 py-3 rounded-lg transition-all shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

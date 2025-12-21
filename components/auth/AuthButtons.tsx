'use client';

import Link from 'next/link';
import UserDropdown from './UserDropdown';

interface AuthButtonsProps {
  isLoggedIn: boolean;
  userName?: string;
  onLogout?: () => void;
}

export default function AuthButtons({ isLoggedIn, userName, onLogout }: AuthButtonsProps) {
  if (isLoggedIn && userName) {
    return (
      <UserDropdown
        userName={userName}
        onLogout={onLogout || (() => {})}
      />
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/auth/login"
        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
      >
        로그인
      </Link>
      <Link
        href="/auth/signup"
        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-gray-900 font-medium px-4 py-2 rounded-lg transition-all shadow-sm"
      >
        회원가입
      </Link>
    </div>
  );
}

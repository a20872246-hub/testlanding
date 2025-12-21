'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, ShoppingBag, Settings, ChevronRight } from 'lucide-react';

const sidebarItems = [
  {
    title: '마이페이지',
    href: '/mypage',
    icon: Home,
  },
  {
    title: '내 정보',
    href: '/mypage/profile',
    icon: User,
  },
  {
    title: '주문내역',
    href: '/mypage/orders',
    icon: ShoppingBag,
  },
  {
    title: '설정',
    href: '/mypage/settings',
    icon: Settings,
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <nav className="sticky top-24 bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${isActive
                        ? 'bg-purple-500/20 text-purple-300 border-l-2 border-purple-500'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                    {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Tab Navigation */}
      <nav className="lg:hidden mb-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap
                  ${isActive
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-500/20 text-gray-400 hover:text-white'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

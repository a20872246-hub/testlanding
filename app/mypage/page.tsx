'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, Settings, Bell, ChevronRight, Gift, Star, Calendar } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  joinDate?: string;
  grade?: string;
  points?: number;
}

interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: string;
  productName: string;
  totalAmount: number;
}

export default function MypageDashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        ...userData,
        joinDate: userData.joinDate || new Date().toISOString().split('T')[0],
        grade: userData.grade || '일반',
        points: userData.points || 0,
      });
    }

    // 임시 주문 데이터
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setRecentOrders(JSON.parse(storedOrders).slice(0, 3));
    }
  }, []);

  const quickActions = [
    { title: '내 정보', href: '/mypage/profile', icon: User, description: '프로필 및 계정 관리' },
    { title: '주문내역', href: '/mypage/orders', icon: ShoppingBag, description: '주문 및 배송 조회' },
    { title: '설정', href: '/mypage/settings', icon: Settings, description: '알림 및 개인정보 설정' },
  ];

  const notifications = [
    { id: 1, title: '12월 특별 할인 이벤트', date: '2024-12-20', isNew: true },
    { id: 2, title: '신규 프로그램 오픈 안내', date: '2024-12-15', isNew: false },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white">마이페이지</h1>

      {/* User Summary Card */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          {/* Profile Image */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <span className="px-2 py-0.5 bg-purple-500/30 text-purple-300 text-xs rounded-full">
                {user.grade}
              </span>
            </div>
            <p className="text-gray-400">{user.email}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                가입일: {user.joinDate}
              </span>
            </div>
          </div>

          {/* Points */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 text-center">
            <div className="flex items-center gap-2 justify-center mb-1">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-gray-400 text-sm">포인트</span>
            </div>
            <p className="text-2xl font-bold text-white">{user.points?.toLocaleString() || 0}P</p>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">빠른 메뉴</h3>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-xl hover:bg-black/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{action.title}</p>
                    <p className="text-gray-500 text-sm">{action.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-400" />
              알림
            </h3>
          </div>
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 bg-black/30 rounded-xl"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.isNew ? 'bg-purple-500' : 'bg-gray-600'}`} />
                  <div className="flex-1">
                    <p className="text-white text-sm">{notification.title}</p>
                    <p className="text-gray-500 text-xs">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">새로운 알림이 없습니다</p>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">최근 주문</h3>
          <Link href="/mypage/orders" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
            전체 보기 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-black/30 rounded-xl"
              >
                <div>
                  <p className="text-white font-medium">{order.productName}</p>
                  <p className="text-gray-500 text-sm">{order.orderDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{order.totalAmount.toLocaleString()}원</p>
                  <span className="text-xs px-2 py-1 bg-purple-500/30 text-purple-300 rounded-full">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Gift className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">아직 주문 내역이 없습니다</p>
            <Link
              href="/#products"
              className="inline-block mt-4 px-6 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
            >
              프로그램 둘러보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

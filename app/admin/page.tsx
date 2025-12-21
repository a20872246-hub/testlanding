'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  MessageSquare,
  Package,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { getAllOrders } from '@/lib/services/orders';
import { getAllConsultations } from '@/lib/services/consultations';
import { getAllUsers } from '@/lib/services/users';

interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  totalUsers: number;
  usersChange: number;
  pendingConsultations: number;
  consultationsChange: number;
}

interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: string;
  date: string;
}

interface RecentConsultation {
  id: string;
  name: string;
  phone: string;
  product: string;
  date: string;
  status: string;
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    revenueChange: 0,
    totalOrders: 0,
    ordersChange: 0,
    totalUsers: 0,
    usersChange: 0,
    pendingConsultations: 0,
    consultationsChange: 0,
  });

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [recentConsultations, setRecentConsultations] = useState<RecentConsultation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orders, consultations, users] = await Promise.all([
          getAllOrders(),
          getAllConsultations(),
          getAllUsers(),
        ]);

        // 총 매출 계산
        const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

        // 대기 상담 수
        const pendingConsultations = consultations.filter(c => c.status === 'pending').length;

        setStats({
          totalRevenue,
          revenueChange: 12.5,
          totalOrders: orders.length,
          ordersChange: 8.2,
          totalUsers: users.length,
          usersChange: 15.3,
          pendingConsultations,
          consultationsChange: -5.1,
        });

        // 최근 주문 5개
        const formattedOrders = orders.slice(0, 5).map(order => ({
          id: order.id || '',
          customer: order.customer?.name || '알 수 없음',
          product: order.product?.name || '상품',
          amount: order.amount || 0,
          status: order.status === 'paid' ? '결제완료' :
                  order.status === 'pending' ? '준비중' :
                  order.status === 'cancelled' ? '취소' : '처리중',
          date: order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('ko-KR') : '',
        }));
        setRecentOrders(formattedOrders);

        // 최근 상담 3개
        const formattedConsultations = consultations.slice(0, 3).map(consultation => ({
          id: consultation.id || '',
          name: consultation.name || '',
          phone: consultation.phone || '',
          product: consultation.product || '',
          date: consultation.createdAt ? new Date(consultation.createdAt.seconds * 1000).toLocaleString('ko-KR') : '',
          status: consultation.status === 'pending' ? '대기' :
                  consultation.status === 'completed' ? '완료' : '처리중',
        }));
        setRecentConsultations(formattedConsultations);

      } catch (error) {
        console.error('데이터 로딩 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    prefix = '',
    suffix = '',
  }: {
    title: string;
    value: string | number;
    change: number;
    icon: React.ElementType;
    prefix?: string;
    suffix?: string;
  }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <Icon className="h-6 w-6 text-purple-400" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white mt-1">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case '결제완료':
      case '완료':
        return 'bg-green-500/20 text-green-400';
      case '배송중':
      case '대기':
        return 'bg-yellow-500/20 text-yellow-400';
      case '준비중':
        return 'bg-blue-500/20 text-blue-400';
      case '취소':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-12 lg:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">대시보드</h1>
        <p className="text-gray-400 mt-1">비즈니스 현황을 한눈에 확인하세요</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="총 매출"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.revenueChange}
          icon={DollarSign}
        />
        <StatCard
          title="총 주문"
          value={stats.totalOrders}
          change={stats.ordersChange}
          icon={ShoppingCart}
          suffix="건"
        />
        <StatCard
          title="총 회원"
          value={stats.totalUsers}
          change={stats.usersChange}
          icon={Users}
          suffix="명"
        />
        <StatCard
          title="대기 상담"
          value={stats.pendingConsultations}
          change={stats.consultationsChange}
          icon={MessageSquare}
          suffix="건"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">최근 주문</h2>
            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
            >
              전체보기 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="text-white font-medium">{order.customer}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{formatCurrency(order.amount)}</p>
                  <p className="text-gray-500 text-sm">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">최근 상담 신청</h2>
            <Link
              href="/admin/consultations"
              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
            >
              전체보기 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentConsultations.map((consultation) => (
              <div
                key={consultation.id}
                className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="text-white font-medium">{consultation.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(consultation.status)}`}>
                      {consultation.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{consultation.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">{consultation.product}</p>
                  <p className="text-gray-500 text-sm">{consultation.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">빠른 실행</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/products"
            className="flex flex-col items-center gap-3 p-6 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-colors"
          >
            <Package className="h-8 w-8 text-purple-400" />
            <span className="text-white">상품 추가</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex flex-col items-center gap-3 p-6 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-colors"
          >
            <ShoppingCart className="h-8 w-8 text-blue-400" />
            <span className="text-white">주문 관리</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex flex-col items-center gap-3 p-6 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-colors"
          >
            <Users className="h-8 w-8 text-green-400" />
            <span className="text-white">회원 관리</span>
          </Link>
          <Link
            href="/admin/consultations"
            className="flex flex-col items-center gap-3 p-6 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-colors"
          >
            <MessageSquare className="h-8 w-8 text-yellow-400" />
            <span className="text-white">상담 확인</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

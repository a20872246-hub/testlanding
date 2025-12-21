'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Mail, Phone, Calendar, Eye, Ban, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllUsers, updateUser } from '@/lib/services/users';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  lastLogin: string;
  orderCount: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'banned';
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        const formattedData = data.map(user => ({
          id: user.id || '',
          name: user.name || '알 수 없음',
          email: user.email || '',
          phone: user.phone || '',
          joinDate: user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString('ko-KR') : '',
          lastLogin: user.lastLoginAt ? new Date(user.lastLoginAt.seconds * 1000).toLocaleDateString('ko-KR') : '',
          orderCount: 0,
          totalSpent: 0,
          status: (user.status || 'active') as 'active' | 'inactive' | 'banned',
        }));
        setUsers(formattedData);
      } catch (error) {
        console.error('회원 데이터 로딩 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'inactive':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'banned':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '활성';
      case 'inactive':
        return '비활성';
      case 'banned':
        return '차단됨';
      default:
        return status;
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleBanUser = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const newStatus = user.status === 'banned' ? 'active' : 'banned';
    try {
      await updateUser(userId, { status: newStatus });
      setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
    } catch (error) {
      console.error('상태 업데이트 오류:', error);
      alert('상태 업데이트 중 오류가 발생했습니다.');
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
    <div className="space-y-6 pt-12 lg:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">회원 관리</h1>
          <p className="text-gray-400 mt-1">총 {users.length}명의 회원</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="이름, 이메일, 전화번호 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">전체 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="banned">차단됨</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium px-6 py-4">회원정보</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">연락처</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">가입일</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">주문</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">총 결제액</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">상태</th>
                <th className="text-right text-gray-400 font-medium px-6 py-4">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.phone}</td>
                  <td className="px-6 py-4 text-gray-300">{user.joinDate}</td>
                  <td className="px-6 py-4 text-gray-300">{user.orderCount}건</td>
                  <td className="px-6 py-4 text-white font-medium">{formatCurrency(user.totalSpent)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusBadge(user.status)}`}>
                      {getStatusText(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        title="상세보기"
                      >
                        <Eye className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleBanUser(user.id)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        title={user.status === 'banned' ? '차단 해제' : '차단'}
                      >
                        <Ban className={`h-4 w-4 ${user.status === 'banned' ? 'text-red-400' : 'text-gray-400'}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">회원 상세 정보</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-purple-400">{selectedUser.name[0]}</span>
                </div>
                <div>
                  <p className="text-white font-medium text-lg">{selectedUser.name}</p>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusBadge(selectedUser.status)}`}>
                    {getStatusText(selectedUser.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900/50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">이메일</span>
                  </div>
                  <p className="text-white">{selectedUser.email}</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">전화번호</span>
                  </div>
                  <p className="text-white">{selectedUser.phone}</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">가입일</span>
                  </div>
                  <p className="text-white">{selectedUser.joinDate}</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">마지막 로그인</span>
                  </div>
                  <p className="text-white">{selectedUser.lastLogin}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl">
                <p className="text-gray-400 text-sm mb-2">구매 통계</p>
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">총 주문</p>
                    <p className="text-white font-medium">{selectedUser.orderCount}건</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">총 결제액</p>
                    <p className="text-white font-medium">{formatCurrency(selectedUser.totalSpent)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDetailModal(false)}
                className="flex-1 border-gray-600 text-gray-300"
              >
                닫기
              </Button>
              <Button
                onClick={() => {
                  handleBanUser(selectedUser.id);
                  setShowDetailModal(false);
                }}
                className={`flex-1 ${selectedUser.status === 'banned' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
              >
                {selectedUser.status === 'banned' ? '차단 해제' : '회원 차단'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

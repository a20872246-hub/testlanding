'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Truck, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllOrders, updateOrderStatus, OrderStatus as ServiceOrderStatus } from '@/lib/services/orders';

type OrderStatus = 'pending' | 'paid' | 'preparing' | 'shipping' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  product: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  address?: string;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: '결제대기', color: 'bg-gray-500/20 text-gray-400', icon: Clock },
  paid: { label: '결제완료', color: 'bg-blue-500/20 text-blue-400', icon: CheckCircle },
  preparing: { label: '준비중', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  shipping: { label: '배송중', color: 'bg-purple-500/20 text-purple-400', icon: Truck },
  delivered: { label: '배송완료', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  cancelled: { label: '취소', color: 'bg-red-500/20 text-red-400', icon: XCircle },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        const formattedData: Order[] = data.map((order) => ({
          id: order.id || '',
          orderNumber: order.orderNumber || '',
          customer: {
            name: order.customer?.name || '알 수 없음',
            email: order.customer?.email || '',
            phone: order.customer?.phone || '',
          },
          product: order.product?.name || '상품',
          amount: order.amount || 0,
          status: (order.status || 'pending') as OrderStatus,
          paymentMethod: order.paymentMethod || '카드',
          createdAt: order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString('ko-KR') : '',
          updatedAt: order.updatedAt ? new Date(order.updatedAt.seconds * 1000).toLocaleString('ko-KR') : '',
          address: order.address,
        }));
        setOrders(formattedData);
      } catch (error) {
        console.error('주문 데이터 로딩 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(
        orders.map((o) =>
          o.id === orderId
            ? { ...o, status: newStatus, updatedAt: new Date().toLocaleString('ko-KR') }
            : o
        )
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error('상태 업데이트 오류:', error);
      alert('상태 업데이트 중 오류가 발생했습니다.');
    }
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const flow: Record<OrderStatus, OrderStatus | null> = {
      pending: 'paid',
      paid: 'preparing',
      preparing: 'shipping',
      shipping: 'delivered',
      delivered: null,
      cancelled: null,
    };
    return flow[currentStatus];
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
      <div>
        <h1 className="text-3xl font-bold text-white">주문 관리</h1>
        <p className="text-gray-400 mt-1">총 {orders.length}건의 주문</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="주문번호, 고객명, 이메일 검색..."
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
            <option value="pending">결제대기</option>
            <option value="paid">결제완료</option>
            <option value="preparing">준비중</option>
            <option value="shipping">배송중</option>
            <option value="delivered">배송완료</option>
            <option value="cancelled">취소</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium px-6 py-4">주문번호</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">고객</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">상품</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">금액</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">상태</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">주문일시</th>
                <th className="text-right text-gray-400 font-medium px-6 py-4">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <tr key={order.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{order.orderNumber}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white">{order.customer.name}</p>
                      <p className="text-gray-500 text-sm">{order.customer.email}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{order.product}</td>
                    <td className="px-6 py-4 text-white font-medium">{formatCurrency(order.amount)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${statusConfig[order.status].color}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">{order.createdAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                          title="상세보기"
                        >
                          <Eye className="h-4 w-4 text-gray-400" />
                        </button>
                        {getNextStatus(order.status) && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, getNextStatus(order.status)!)}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition-colors"
                          >
                            {statusConfig[getNextStatus(order.status)!].label}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">주문 상세</h3>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${statusConfig[selectedOrder.status].color}`}
              >
                {statusConfig[selectedOrder.status].label}
              </span>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="p-4 bg-gray-900/50 rounded-xl">
                <p className="text-gray-400 text-sm mb-2">주문 정보</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">주문번호</p>
                    <p className="text-white">{selectedOrder.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">결제수단</p>
                    <p className="text-white">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">주문일시</p>
                    <p className="text-white">{selectedOrder.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">최종 업데이트</p>
                    <p className="text-white">{selectedOrder.updatedAt}</p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="p-4 bg-gray-900/50 rounded-xl">
                <p className="text-gray-400 text-sm mb-2">고객 정보</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">이름</p>
                    <p className="text-white">{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">이메일</p>
                    <p className="text-white">{selectedOrder.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">전화번호</p>
                    <p className="text-white">{selectedOrder.customer.phone}</p>
                  </div>
                  {selectedOrder.address && (
                    <div>
                      <p className="text-gray-500 text-sm">배송주소</p>
                      <p className="text-white">{selectedOrder.address}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 bg-gray-900/50 rounded-xl">
                <p className="text-gray-400 text-sm mb-2">상품 정보</p>
                <div className="flex justify-between items-center">
                  <p className="text-white">{selectedOrder.product}</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(selectedOrder.amount)}</p>
                </div>
              </div>

              {/* Status Update */}
              {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                <div className="p-4 bg-gray-900/50 rounded-xl">
                  <p className="text-gray-400 text-sm mb-3">상태 변경</p>
                  <div className="flex flex-wrap gap-2">
                    {(['pending', 'paid', 'preparing', 'shipping', 'delivered', 'cancelled'] as OrderStatus[]).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                            selectedOrder.status === status
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {statusConfig[status].label}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDetailModal(false)}
                className="flex-1 border-gray-600 text-gray-300"
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

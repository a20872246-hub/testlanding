'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Search, ChevronLeft, ChevronRight, Eye, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

type OrderStatus = 'pending' | 'paid' | 'shipping' | 'delivered' | 'cancelled';

interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
}

const statusLabels: Record<OrderStatus, string> = {
  pending: '결제 대기',
  paid: '결제 완료',
  shipping: '배송중',
  delivered: '배송 완료',
  cancelled: '취소됨',
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  paid: 'bg-blue-500/20 text-blue-400',
  shipping: 'bg-purple-500/20 text-purple-400',
  delivered: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<'all' | OrderStatus>('all');
  const [dateFilter, setDateFilter] = useState<'1m' | '3m' | '6m' | '1y'>('3m');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // 샘플 주문 데이터 생성
    const sampleOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'ORD-2024-001',
        orderDate: '2024-12-15',
        status: 'delivered',
        items: [
          { productId: '1', productName: '기본 교정 프로그램', productImage: '', quantity: 1, price: 490000 }
        ],
        totalAmount: 490000,
        shippingAddress: '서울시 강남구 역삼동 123-45',
      },
      {
        id: '2',
        orderNumber: 'ORD-2024-002',
        orderDate: '2024-12-18',
        status: 'shipping',
        items: [
          { productId: '2', productName: '집중 교정 프로그램', productImage: '', quantity: 1, price: 890000 }
        ],
        totalAmount: 890000,
        shippingAddress: '서울시 서초구 서초동 456-78',
      },
      {
        id: '3',
        orderNumber: 'ORD-2024-003',
        orderDate: '2024-12-20',
        status: 'paid',
        items: [
          { productId: '3', productName: '프리미엄 홈 케어', productImage: '', quantity: 1, price: 1490000 }
        ],
        totalAmount: 1490000,
        shippingAddress: '서울시 송파구 잠실동 789-12',
      },
    ];

    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      setOrders(sampleOrders);
      localStorage.setItem('orders', JSON.stringify(sampleOrders));
    }
  }, []);

  useEffect(() => {
    let filtered = orders;

    // 상태 필터
    if (filter !== 'all') {
      filtered = filtered.filter(order => order.status === filter);
    }

    // 날짜 필터
    const now = new Date();
    const monthsAgo = {
      '1m': 1,
      '3m': 3,
      '6m': 6,
      '1y': 12,
    }[dateFilter];
    const filterDate = new Date(now.setMonth(now.getMonth() - monthsAgo));

    filtered = filtered.filter(order => new Date(order.orderDate) >= filterDate);

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orders, filter, dateFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white">주문내역</h1>

      {/* Filters */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Date Filter */}
          <div className="flex gap-2">
            {(['1m', '3m', '6m', '1y'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setDateFilter(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateFilter === period
                    ? 'bg-purple-500 text-white'
                    : 'bg-black/30 text-gray-400 hover:text-white'
                }`}
              >
                {period === '1m' ? '1개월' : period === '3m' ? '3개월' : period === '6m' ? '6개월' : '1년'}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-500 text-white'
                  : 'bg-black/30 text-gray-400 hover:text-white'
              }`}
            >
              전체
            </button>
            {(Object.keys(statusLabels) as OrderStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-purple-500 text-white'
                    : 'bg-black/30 text-gray-400 hover:text-white'
                }`}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {paginatedOrders.length > 0 ? (
          paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-white font-medium">{order.orderNumber}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{order.orderDate}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(order)}
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  상세보기
                </Button>
              </div>

              {/* Order Items */}
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-xl"
                >
                  <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Package className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.productName}</p>
                    <p className="text-gray-500 text-sm">수량: {item.quantity}</p>
                  </div>
                  <p className="text-white font-bold">{item.price.toLocaleString()}원</p>
                </div>
              ))}

              <div className="flex justify-end mt-4 pt-4 border-t border-purple-500/20">
                <div className="text-right">
                  <p className="text-gray-400 text-sm">총 결제금액</p>
                  <p className="text-2xl font-bold text-white">{order.totalAmount.toLocaleString()}원</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-12 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">주문 내역이 없습니다</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                currentPage === page
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-500/20 text-gray-400 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/80 border border-purple-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">주문 상세</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Order Info */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">주문번호</span>
                <span className="text-white">{selectedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">주문일시</span>
                <span className="text-white">{selectedOrder.orderDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">주문상태</span>
                <span className={`px-2 py-1 rounded-full text-xs ${statusColors[selectedOrder.status]}`}>
                  {statusLabels[selectedOrder.status]}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-purple-500/20 pt-6 mb-6">
              <h4 className="text-white font-medium mb-4">주문 상품</h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-black/30 rounded-xl"
                  >
                    <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.productName}</p>
                      <p className="text-gray-500 text-sm">수량: {item.quantity}</p>
                    </div>
                    <p className="text-white font-bold">{item.price.toLocaleString()}원</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border-t border-purple-500/20 pt-6 mb-6">
              <h4 className="text-white font-medium mb-4">배송지 정보</h4>
              <p className="text-gray-400">{selectedOrder.shippingAddress}</p>
            </div>

            {/* Total */}
            <div className="border-t border-purple-500/20 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">총 결제금액</span>
                <span className="text-2xl font-bold text-white">{selectedOrder.totalAmount.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

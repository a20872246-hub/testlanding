'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { Dog, CreditCard, Smartphone, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';

interface Product {
  slug: string;
  name: string;
  price: number;
  description: string;
}

const products: Record<string, Product> = {
  test: {
    slug: 'test',
    name: '테스트 상품',
    price: 100,
    description: '결제 테스트용 상품 (100원)',
  },
  basic: {
    slug: 'basic',
    name: '기본 교정 프로그램',
    price: 490000,
    description: '반려견의 기본적인 행동 교정을 위한 입문 프로그램',
  },
  intensive: {
    slug: 'intensive',
    name: '집중 교정 프로그램',
    price: 890000,
    description: '문제 행동을 집중적으로 교정하는 심화 프로그램',
  },
  premium: {
    slug: 'premium',
    name: '프리미엄 홈 케어',
    price: 1490000,
    description: '전문 훈련사가 직접 방문하여 교육하는 VIP 프로그램',
  },
};

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productSlug = searchParams.get('product') || 'basic';
  const product = products[productSlug] || products.basic;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tossPayments, setTossPayments] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<'CARD' | 'TRANSFER' | 'VIRTUAL_ACCOUNT' | 'MOBILE_PHONE'>('CARD');
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setCustomerName(userData.name || '');
      setCustomerEmail(userData.email || '');
    }
  }, []);

  useEffect(() => {
    const initTossPayments = async () => {
      try {
        const tp = await loadTossPayments(clientKey);
        setTossPayments(tp);
      } catch (error) {
        console.error('Failed to load TossPayments:', error);
      }
    };
    initTossPayments();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `ORDER-${timestamp}-${random}`;
  };

  const handlePayment = async () => {
    if (!tossPayments) {
      alert('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!customerName || !customerEmail || !customerPhone) {
      alert('주문자 정보를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);

    const orderId = generateOrderId();

    // 결제 완료 후 사용할 상품 정보 임시 저장
    localStorage.setItem('pendingProductName', product.name);
    localStorage.setItem('pendingProductSlug', product.slug);

    try {
      const payment = tossPayments.payment({ customerKey: customerEmail });

      await payment.requestPayment({
        method: selectedMethod,
        amount: {
          value: product.price,
          currency: 'KRW',
        },
        orderId,
        orderName: product.name,
        customerName,
        customerEmail,
        customerMobilePhone: customerPhone.replace(/-/g, ''),
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Payment error:', error);
        alert(`결제 중 오류가 발생했습니다: ${error.message}`);
      }
      // 결제 실패 시 임시 저장 정보 삭제
      localStorage.removeItem('pendingProductName');
      localStorage.removeItem('pendingProductSlug');
    } finally {
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'CARD' as const, label: '카드', icon: CreditCard },
    { id: 'TRANSFER' as const, label: '계좌이체', icon: Building2 },
    { id: 'VIRTUAL_ACCOUNT' as const, label: '가상계좌', icon: Building2 },
    { id: 'MOBILE_PHONE' as const, label: '휴대폰', icon: Smartphone },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950/30 to-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Dog className="h-10 w-10 text-purple-500" />
            <span className="text-2xl font-bold text-white">Dog Training</span>
          </Link>
          <h1 className="text-3xl font-bold text-white">결제하기</h1>
        </div>

        {/* Back Button */}
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          상품으로 돌아가기
        </Link>

        {/* Order Summary */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">주문 상품</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-medium">{product.name}</p>
              <p className="text-gray-400 text-sm">{product.description}</p>
            </div>
            <p className="text-2xl font-bold text-white">{formatCurrency(product.price)}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">주문자 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">이름</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                placeholder="홍길동"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">이메일</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                placeholder="example@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">휴대폰 번호</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                placeholder="010-1234-5678"
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">결제 수단</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    selectedMethod === method.id
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{method.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center text-lg">
            <span className="text-gray-400">총 결제 금액</span>
            <span className="text-2xl font-bold text-white">{formatCurrency(product.price)}</span>
          </div>
        </div>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={isLoading || !tossPayments}
          className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl disabled:opacity-50"
        >
          {isLoading ? '결제 처리 중...' : `${formatCurrency(product.price)} 결제하기`}
        </Button>

        {/* Notice */}
        <p className="text-gray-500 text-sm text-center mt-4">
          결제 버튼을 클릭하면 토스페이먼츠 결제창으로 이동합니다.
        </p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">로딩 중...</p>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}

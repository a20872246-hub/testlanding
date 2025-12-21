'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle, Dog, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

function FailContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('code') || 'UNKNOWN_ERROR';
  const errorMessage = searchParams.get('message') || '결제 중 오류가 발생했습니다.';
  const orderId = searchParams.get('orderId');

  const getErrorDescription = (code: string) => {
    const errorDescriptions: Record<string, string> = {
      PAY_PROCESS_CANCELED: '사용자가 결제를 취소했습니다.',
      PAY_PROCESS_ABORTED: '결제가 중단되었습니다.',
      REJECT_CARD_COMPANY: '카드사에서 결제를 거절했습니다.',
      INVALID_CARD_EXPIRATION: '카드 유효기간이 올바르지 않습니다.',
      INVALID_STOPPED_CARD: '정지된 카드입니다.',
      INVALID_CARD_LOST: '분실 신고된 카드입니다.',
      EXCEED_MAX_DAILY_PAYMENT_COUNT: '일일 결제 한도를 초과했습니다.',
      EXCEED_MAX_PAYMENT_AMOUNT: '결제 금액 한도를 초과했습니다.',
      INVALID_CARD_NUMBER: '카드 번호가 올바르지 않습니다.',
      UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
    };
    return errorDescriptions[code] || errorDescriptions.UNKNOWN_ERROR;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950/30 to-black py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Dog className="h-10 w-10 text-purple-500" />
            <span className="text-2xl font-bold text-white">Dog Training</span>
          </Link>
        </div>

        {/* Fail Card */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-12 w-12 text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">결제에 실패했습니다</h1>
          <p className="text-gray-400 mb-8">{getErrorDescription(errorCode)}</p>

          {/* Error Details */}
          <div className="bg-gray-900/50 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-lg font-bold text-white mb-4">오류 정보</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">오류 코드</span>
                <span className="text-white font-mono text-sm">{errorCode}</span>
              </div>
              {orderId && (
                <div className="flex justify-between">
                  <span className="text-gray-400">주문번호</span>
                  <span className="text-white font-mono text-sm">{orderId}</span>
                </div>
              )}
              <div>
                <span className="text-gray-400 block mb-1">상세 메시지</span>
                <span className="text-white text-sm">{decodeURIComponent(errorMessage)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              다시 시도하기
            </button>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                <Home className="h-5 w-5 mr-2" />
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </div>

        {/* Help */}
        <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
          <p className="text-gray-400 text-sm text-center">
            결제에 문제가 계속되면 고객센터로 문의해 주세요.
            <br />
            <a href="tel:02-1234-5678" className="text-purple-400 hover:text-purple-300">
              02-1234-5678
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">로딩 중...</p>
        </div>
      </div>
    }>
      <FailContent />
    </Suspense>
  );
}

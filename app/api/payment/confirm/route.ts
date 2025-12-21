import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.TOSS_SECRET_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, paymentKey } = await request.json();

    // 토스페이먼츠 결제 승인 API 호출
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        amount: parseInt(amount),
        paymentKey,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || '결제 승인에 실패했습니다.',
          code: data.code
        },
        { status: response.status }
      );
    }

    // 결제 성공 - 여기서 주문 정보를 데이터베이스에 저장할 수 있습니다
    // 예: await saveOrder({ orderId, amount, paymentKey, ...data });

    return NextResponse.json({
      success: true,
      data: {
        orderId: data.orderId,
        totalAmount: data.totalAmount,
        method: data.method,
        approvedAt: data.approvedAt,
        receipt: data.receipt,
      },
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

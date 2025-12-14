import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Vercel Cron Job을 위한 엔드포인트
// 3시간마다 자동으로 뉴스를 업데이트합니다
export async function GET(request: NextRequest) {
  try {
    // Vercel Cron Secret 검증 (프로덕션 환경)
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production') {
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    console.log('Cron job: 뉴스 자동 업데이트 시작...');

    // 뉴스 API 호출
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const response = await axios.post(`${baseUrl}/api/news`);

    console.log('Cron job 완료:', response.data);

    return NextResponse.json({
      success: true,
      message: '뉴스가 성공적으로 업데이트되었습니다.',
      data: response.data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron job 에러:', error);
    return NextResponse.json(
      {
        error: '뉴스 업데이트 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
}

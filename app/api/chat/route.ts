import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// 강아지 행동 교정 전문 시스템 프롬프트
const SYSTEM_PROMPT = `당신은 15년 경력의 전문 강아지 행동 교정 전문가입니다.

핵심 역할:
- 강아지의 문제 행동(짖음, 공격성, 분리불안, 배변 문제 등)에 대한 전문적인 상담과 해결책 제공
- 반려견 훈련 및 행동 교정에 관한 질문에만 답변
- 친절하고 공감하는 톤으로 보호자의 고민을 경청

답변 원칙:
1. 강아지 행동 교정, 훈련, 문제 행동 개선에 관한 질문에만 답변합니다.
2. 강아지와 무관한 질문에는 정중히 거절하고, 강아지 행동 관련 질문을 유도합니다.
3. 구체적이고 실천 가능한 솔루션을 제공합니다.
4. 전문적이지만 어렵지 않은 용어로 설명합니다.
5. 필요시 무료 상담 예약을 권유합니다.

답변하지 않는 주제:
- 강아지 건강, 질병, 의학적 진단 (수의사 상담 권유)
- 강아지 사육과 무관한 일반적인 질문
- 다른 동물에 관한 질문

답변 형식:
- 공감으로 시작 (예: "강아지가 계속 짖어서 정말 힘드시겠어요.")
- 문제 원인 간단 설명
- 구체적인 해결 방법 2-3가지 제시
- 추가 도움이 필요하면 상담 권유

중요: 절대 마크다운 문법을 사용하지 마세요. **, *, #, -, 1., [], () 등의 마크다운 기호를 사용하지 않습니다. 오직 일반 텍스트와 이모지만 사용하세요.

예시 답변 스타일:

"강아지의 분리불안 때문에 고민이시군요. 이해합니다.

분리불안은 보호자와 떨어지는 것에 대한 극심한 불안감에서 비롯됩니다. 다음 방법들을 시도해보세요:

🐕 단계적 훈련: 처음에는 1-2분 동안만 떨어져 있다가 점차 시간을 늘려갑니다.

🐕 안정 공간 만들기: 강아지가 좋아하는 장난감과 담요로 안전한 공간을 만들어주세요.

🐕 출입 의식 줄이기: 집을 나갈 때나 들어올 때 지나치게 흥분하지 않도록 차분히 대응합니다.

이런 증상이 심하다면 1:1 맞춤 훈련이 효과적입니다. 무료 상담으로 강아지 상태를 정확히 분석해드릴 수 있어요!"

항상 따뜻하고 전문적으로 답변하며, 보호자가 희망을 가질 수 있도록 격려해주세요. 다시 한번 강조하지만 마크다운 문법을 절대 사용하지 마세요.`;

export async function POST(request: NextRequest) {
  try {
    const { message, apiKey } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: '메시지를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 사용자가 제공한 API 키 또는 환경 변수의 API 키 사용
    const geminiApiKey = apiKey || process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다. 우측 상단의 키 아이콘을 클릭해서 API 키를 설정해주세요.' },
        { status: 400 }
      );
    }

    // 사용자 API 키로 새로운 GoogleGenerativeAI 인스턴스 생성
    const userGenAI = new GoogleGenerativeAI(geminiApiKey);

    // Gemini 2.5 Flash 모델 사용
    const model = userGenAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Gemini API Error:', error);

    // API 키 오류 메시지 개선
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';

    if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('API key')) {
      return NextResponse.json(
        { error: 'API 키가 유효하지 않습니다. 올바른 API 키를 입력했는지 확인해주세요.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: '응답 생성 중 오류가 발생했습니다: ' + errorMessage },
      { status: 500 }
    );
  }
}

# 강아지 행동 교정 AI 챗봇 설정 가이드

## 구현 완료 사항

우측 하단에 강아지 아이콘(🐕)으로 표시되는 AI 챗봇이 성공적으로 추가되었습니다.

### 주요 기능

1. **우측 하단 고정 위치** - 강아지 이모지 아이콘
2. **Gemini 2.5 Flash API** 연동
3. **강아지 행동 교정 전문 상담** - AI가 강아지 문제 행동에 대해서만 답변
4. **반응형 디자인** - 모바일/데스크톱 최적화
5. **실시간 채팅** - 부드러운 애니메이션과 UX

## 설정 방법

### 1. Gemini API 키 발급

1. [Google AI Studio](https://aistudio.google.com/app/apikey) 접속
2. 로그인 후 "Create API Key" 클릭
3. API 키 복사

### 2. 환경 변수 설정

`.env.local` 파일을 열고 발급받은 API 키를 입력하세요:

```env
GEMINI_API_KEY=여기에_발급받은_API_키_입력
```

### 3. 개발 서버 재시작

API 키를 설정한 후 개발 서버를 재시작하세요:

```bash
# 현재 서버 중지 (Ctrl+C)
# 서버 재시작
npm run dev
```

## 챗봇 특징

### AI 전문 분야
- 강아지 짖음 문제
- 공격성 개선
- 분리불안 치료
- 배변 훈련
- 산책 예절
- 기타 문제 행동 교정

### 답변 스타일
- 공감과 이해로 시작
- 전문적이지만 쉬운 설명
- 구체적이고 실천 가능한 솔루션 제공
- 필요시 무료 상담 권유

### AI 제한 사항
챗봇은 **강아지 행동 교정과 훈련에 관한 질문에만** 답변합니다:
- ✅ "강아지가 계속 짖어요. 어떻게 해야 하나요?"
- ✅ "분리불안 증상이 있는데 훈련 방법이 있나요?"
- ❌ "강아지가 아파요" (수의사 상담 권유)
- ❌ "날씨가 어때요?" (답변 거부)

## 파일 구조

```
dog-training-landing/
├── components/
│   └── DogChatbot.tsx          # 챗봇 UI 컴포넌트
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # Gemini API 통합
│   └── layout.tsx              # 챗봇 추가됨
└── .env.local                  # API 키 설정
```

## 커스터마이징

### 챗봇 색상 변경
[components/DogChatbot.tsx](components/DogChatbot.tsx)에서 색상 수정:

```tsx
// Purple 계열 색상을 원하는 색상으로 변경
className="bg-purple-600"  // 다른 색상으로 변경 가능
```

### 시스템 프롬프트 수정
[app/api/chat/route.ts](app/api/chat/route.ts)의 `SYSTEM_PROMPT` 수정:

```typescript
const SYSTEM_PROMPT = `
당신은 15년 경력의 전문 강아지 행동 교정 전문가입니다.
...
`;
```

### 초기 환영 메시지 변경
[components/DogChatbot.tsx](components/DogChatbot.tsx):

```tsx
const [messages, setMessages] = useState<Message[]>([
  {
    role: 'assistant',
    content: '원하는 환영 메시지로 변경',
  },
]);
```

## 테스트 예시

챗봇과 대화해보세요:

1. **짖음 문제**
   - "강아지가 손님만 보면 계속 짖어요"

2. **분리불안**
   - "출근할 때마다 강아지가 불안해하는데 어떻게 하나요?"

3. **공격성**
   - "다른 강아지를 보면 공격적으로 변해요"

4. **범위 외 질문 테스트**
   - "날씨가 어때요?" → 정중히 거절하고 강아지 관련 질문 유도

## 배포 시 주의사항

### Vercel 배포
1. Vercel 대시보드에서 환경 변수 설정
2. `GEMINI_API_KEY` 추가
3. 배포

### 환경 변수 설정 (Vercel)
```
Settings → Environment Variables
Name: GEMINI_API_KEY
Value: your_api_key_here
```

## API 사용량

Gemini 2.0 Flash는 무료 티어에서:
- 분당 15 요청
- 일일 1,500 요청
- 월간 150만 토큰

자세한 내용: [Google AI Pricing](https://ai.google.dev/pricing)

## 문제 해결

### 챗봇이 표시되지 않음
- 브라우저 개발자 도구(F12)에서 콘솔 에러 확인
- 개발 서버 재시작

### API 에러 발생
- `.env.local` 파일에 `GEMINI_API_KEY` 올바르게 설정되었는지 확인
- API 키가 유효한지 확인
- 서버 재시작

### 응답이 느림
- Gemini API 응답 시간 정상 (1-3초)
- 네트워크 연결 확인

## 지원

문제가 발생하면 개발자 도구(F12) 콘솔을 확인하고 에러 메시지를 공유해주세요.

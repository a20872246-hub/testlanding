# 🎯 빠른 시작 가이드

강아지 훈련 랜딩 페이지를 5분 안에 실행하는 방법입니다.

## ⚡ 빠른 시작 (3단계)

### 1단계: 프로젝트 실행

```bash
# 프로젝트 폴더로 이동
cd dog-training-landing

# 의존성 설치 (처음 한 번만)
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 열기

### 2단계: Google Sheets 연동 (필수)

리드를 수집하려면 반드시 설정해야 합니다:

1. **Google Sheets 생성**
   - [sheets.google.com](https://sheets.google.com) 접속
   - 새 스프레드시트 생성

2. **Apps Script 배포**
   - 확장 프로그램 > Apps Script
   - `google-apps-script.gs` 파일 내용 복사/붙여넣기
   - 배포 > 새 배포 > 웹 앱
   - 실행: 나 / 액세스: 모든 사용자
   - URL 복사

3. **프론트엔드 연결**
   - `components/sections/CTA.tsx` 열기
   - 17번 라인의 URL을 실제 URL로 변경

### 3단계: Vercel 배포 (선택)

```bash
# GitHub에 푸시
git init
git add .
git commit -m "Initial commit"
git push

# Vercel.com에서 Import
```

## 📁 프로젝트 구조

```
dog-training-landing/
├── app/
│   ├── page.tsx              # 메인 페이지
│   ├── layout.tsx            # 레이아웃 및 SEO 설정
│   └── globals.css           # 전역 스타일
├── components/
│   ├── sections/             # 페이지 섹션들
│   │   ├── Hero.tsx         # 히어로 섹션
│   │   ├── Problem.tsx      # 문제 제기
│   │   ├── Solution.tsx     # 솔루션 제시
│   │   ├── Process.tsx      # 프로세스
│   │   ├── Benefits.tsx     # 혜택
│   │   ├── SocialProof.tsx  # 사회적 증거
│   │   ├── CTA.tsx          # 리드 폼
│   │   └── Footer.tsx       # 푸터
│   └── ui/                   # Shadcn UI 컴포넌트
├── google-apps-script.gs     # Google Sheets 연동 코드
└── README.md                 # 상세 문서
```

## 🎨 커스터마이징

### 콘텐츠 변경

각 섹션 파일(`components/sections/*.tsx`)을 열어서 텍스트를 수정하세요.

**예시 - Hero 섹션 헤드라인 변경:**

```tsx
// components/sections/Hero.tsx
<h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
  단 7일만에  {/* 👈 여기 수정 */}
  <br />
  <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
    문제견 행동 완벽 교정  {/* 👈 여기 수정 */}
  </span>
</h1>
```

### 색상 변경

`app/globals.css`에서 CSS 변수를 수정하세요:

```css
:root {
  --primary: oklch(0.205 0 0);  /* 메인 색상 */
  /* ... */
}

.dark {
  --primary: oklch(0.922 0 0);  /* 다크모드 메인 색상 */
  /* ... */
}
```

### 이미지 추가

`public/` 폴더에 이미지를 추가하고 섹션에서 사용:

```tsx
import Image from 'next/image';

<Image
  src="/your-image.jpg"
  alt="설명"
  width={500}
  height={300}
/>
```

## 🔧 주요 설정 파일

### 1. Google Sheets URL
**파일:** `components/sections/CTA.tsx`
**라인:** 17
```typescript
const GOOGLE_SCRIPT_URL = 'YOUR_URL_HERE';
```

### 2. Google Analytics ID
**파일:** `app/layout.tsx`
**라인:** 47, 55
```typescript
src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
gtag('config', 'G-XXXXXXXXXX');
```

### 3. 연락처 정보
**파일:** `components/sections/Footer.tsx`
```typescript
<Phone /> 1588-0000
<Mail /> info@dogtraining.com
<MapPin /> 서울시 강남구 테헤란로 123
```

## 📊 데이터 확인

### Google Sheets에서 리드 확인

1. Google Sheets 스프레드시트 열기
2. 제출된 리드가 자동으로 추가됨
3. 열 구성:
   - 타임스탬프
   - 이름
   - 이메일
   - 연락처
   - 강아지 품종/나이
   - 문제 행동 설명

### Google Analytics에서 트래픽 확인

1. [analytics.google.com](https://analytics.google.com) 접속
2. 해당 속성 선택
3. 실시간 리포트에서 방문자 확인

## 🚀 배포하기

### Vercel 배포 (추천)

1. GitHub에 코드 푸시
2. [vercel.com](https://vercel.com) 접속
3. Import Project
4. 저장소 선택
5. Deploy 클릭

자동으로 배포되며 URL을 받습니다: `https://your-project.vercel.app`

### 상세 배포 가이드

전체 배포 과정은 `DEPLOYMENT.md` 파일을 참조하세요.

## 🎯 성능 최적화 팁

1. **이미지 최적화**
   - WebP 형식 사용
   - Next.js Image 컴포넌트 활용
   - 적절한 크기로 압축

2. **폰트 최적화**
   - Next.js 폰트 최적화 사용 중
   - 필요한 폰트만 로드

3. **번들 크기 최적화**
   - 사용하지 않는 컴포넌트 제거
   - Dynamic Import 고려

## ✅ 테스트 체크리스트

배포 전 확인사항:

- [ ] 모든 섹션이 올바르게 표시됨
- [ ] CTA 버튼 클릭 시 폼으로 스크롤
- [ ] 폼 제출 시 Google Sheets에 저장됨
- [ ] 모바일에서 정상 작동
- [ ] 모든 링크가 작동함
- [ ] SEO 메타 태그 확인
- [ ] Google Analytics 작동 확인
- [ ] 빌드 에러 없음 (`npm run build`)

## 🐛 문제 해결

### 빌드 에러

```bash
npm run build
# 에러 메시지 확인 후 수정
```

### 폼이 작동하지 않음

- Google Apps Script URL 확인
- 브라우저 개발자 도구 콘솔 확인
- Apps Script 권한 설정 확인

### 스타일이 깨짐

```bash
# 캐시 삭제 후 재시작
rm -rf .next
npm run dev
```

## 📚 추가 리소스

- [Next.js 문서](https://nextjs.org/docs)
- [TailwindCSS 문서](https://tailwindcss.com/docs)
- [Shadcn UI 문서](https://ui.shadcn.com)
- [Vercel 문서](https://vercel.com/docs)

## 💡 다음 단계

1. **A/B 테스팅**: 다양한 헤드라인 테스트
2. **전환율 최적화**: 히트맵 도구 설치
3. **이메일 자동화**: Zapier로 자동 응답 설정
4. **카카오톡 연동**: 카카오톡 채널 추가
5. **광고 연동**: Facebook/Google Ads 픽셀 추가

---

🎉 준비 완료! 성공적인 리드 수집을 기원합니다!

질문이 있으시면 GitHub Issues에 등록해주세요.

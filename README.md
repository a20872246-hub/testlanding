# 🐕 Dog Training Landing Page

강아지 산책 훈련 교육을 소개하고 이메일/카카오톡 리드를 수집하는 원스크롤 랜딩 페이지입니다.

## 📋 프로젝트 개요

- **목적**: 교육 프로그램에 관심 있는 반려견 보호자를 리드로 확보하고 신청률을 높입니다
- **타깃**: 문제성 행동을 하는 강아지를 키우는 보호자
- **목표 KPI**:
  - CTA 클릭률 25% 이상
  - 폼 제출 전환율 15% 이상
  - 평균 체류시간 1분 이상

## 🚀 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript
- **Styling**: TailwindCSS, Shadcn UI
- **Icons**: Lucide React
- **Backend**: Google Apps Script + Google Sheets
- **Deploy**: Vercel
- **Analytics**: Google Analytics 4

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 🔧 Google Sheets 연동 설정

### 1. Google Sheets 준비

1. [Google Sheets](https://sheets.google.com) 접속
2. 새 스프레드시트 생성
3. 원하는 이름으로 저장

### 2. Apps Script 설정

1. 스프레드시트에서 **확장 프로그램 > Apps Script** 클릭
2. `google-apps-script.gs` 파일의 내용을 복사하여 붙여넣기
3. 저장 (💾 아이콘 클릭)

### 3. 웹 앱 배포

1. Apps Script 에디터에서 **배포 > 새 배포** 클릭
2. 유형 선택: **웹 앱**
3. 설정:
   - 설명: "Dog Training Lead Collection"
   - 실행 계정: **나**
   - 액세스 권한: **모든 사용자**
4. **배포** 클릭
5. 권한 승인 (Google 계정 로그인 필요)
6. **웹 앱 URL** 복사

### 4. 프론트엔드에 URL 연결

`components/sections/CTA.tsx` 파일을 열고:

```typescript
// 이 부분을 찾아서
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// 복사한 URL로 변경
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

## 📊 Google Analytics 설정

1. [Google Analytics](https://analytics.google.com) 접속
2. 새 속성 생성 (GA4)
3. 측정 ID (G-XXXXXXXXXX) 복사
4. `app/layout.tsx` 파일에서 `G-XXXXXXXXXX`를 실제 측정 ID로 변경

## 🎨 섹션 구조

랜딩 페이지는 다음 섹션으로 구성되어 있습니다:

1. **Hero** - 강렬한 헤드라인과 CTA 버튼
2. **Problem** - 고객의 문제점 제시
3. **Solution** - 전문가 소개 및 해결책
4. **Process** - 4단계 프로세스 설명
5. **Benefits** - 훈련 후 얻는 혜택
6. **Social Proof** - 고객 후기 및 통계
7. **CTA** - 리드 수집 폼
8. **Footer** - 연락처 및 링크

## 🎯 커스터마이징

### 컬러 변경

`app/globals.css`에서 CSS 변수를 수정하여 브랜드 컬러를 변경할 수 있습니다.

### 콘텐츠 수정

각 섹션은 `components/sections/` 디렉토리에 있습니다:

- `Hero.tsx` - 메인 헤드라인
- `Problem.tsx` - 문제점 카드
- `Solution.tsx` - 전문가 소개
- `Process.tsx` - 프로세스 단계
- `Benefits.tsx` - 혜택 리스트
- `SocialProof.tsx` - 고객 후기
- `CTA.tsx` - 리드 수집 폼
- `Footer.tsx` - 푸터 정보

## 🚀 Vercel 배포

### 1. GitHub 저장소 생성

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Vercel 연결

1. [Vercel](https://vercel.com) 접속 및 로그인
2. **New Project** 클릭
3. GitHub 저장소 선택
4. **Deploy** 클릭

### 3. 환경 변수 설정 (선택사항)

Vercel 프로젝트 설정에서 환경 변수를 추가할 수 있습니다:

- `NEXT_PUBLIC_GA_ID`: Google Analytics 측정 ID
- `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`: Google Apps Script URL

## 📱 모바일 최적화

모바일 퍼스트 디자인으로 제작되었으며, 모든 섹션이 반응형입니다.

## 🎉 주요 기능

- ✅ 원스크롤 랜딩 페이지
- ✅ 다크 모드 디자인
- ✅ 애니메이션 효과
- ✅ Google Sheets 자동 저장
- ✅ SEO 최적화
- ✅ Google Analytics 연동
- ✅ 완전 반응형
- ✅ TypeScript 지원

## 📄 라이선스

MIT License

## 🙋‍♂️ 문의

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.

---

Made with ❤️ for Dog Training Center

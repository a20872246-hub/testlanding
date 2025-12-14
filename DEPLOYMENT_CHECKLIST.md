# 🚀 배포 전 최종 체크리스트

## ✅ 완료된 작업

### 1. 프로젝트 설정
- ✅ Next.js 14 (App Router) 프로젝트 생성
- ✅ TailwindCSS 설정
- ✅ Shadcn UI 컴포넌트 설치
- ✅ TypeScript 설정

### 2. 랜딩 페이지 개발
- ✅ Hero 섹션 (Arc Gallery with 무한 회전 이미지)
- ✅ Problem 섹션
- ✅ Solution 섹션
- ✅ Process 섹션
- ✅ Benefits 섹션
- ✅ SocialProof 섹션
- ✅ CTA 섹션 (리드 수집 폼)
- ✅ Footer 섹션

### 3. Google Sheets 연동
- ✅ Google Apps Script 코드 작성
- ✅ 배포 URL 연동
- ✅ 테스트 폼 (test-form.html) 생성
- ✅ 헤더 자동 생성 및 스타일링
- ✅ 한국 시간 (Asia/Seoul) 설정
- ✅ 이메일 알림 기능 (선택적)

### 4. SEO 최적화
- ✅ Open Graph 이미지 설정
- ✅ Twitter Card 설정
- ✅ 구글/네이버 메타데이터
- ✅ JSON-LD 구조화 데이터
- ✅ sitemap.xml 자동 생성
- ✅ robots.txt 자동 생성

---

## 🔧 배포 전 필수 변경 사항

### 1. 도메인 URL 변경 (3개 파일)

현재: `https://dogtraining.vercel.app`
→ 실제 배포 URL로 변경

#### 파일 1: [app/layout.tsx](app/layout.tsx)
```typescript
// 16번 라인
metadataBase: new URL('https://YOUR-DOMAIN.com'),
```

#### 파일 2: [app/sitemap.ts](app/sitemap.ts)
```typescript
// 4번 라인
const baseUrl = 'https://YOUR-DOMAIN.com'
```

#### 파일 3: [app/robots.ts](app/robots.ts)
```typescript
// 4번 라인
const baseUrl = 'https://YOUR-DOMAIN.com'
```

### 2. Google Apps Script URL (이미 완료)
- ✅ [components/sections/CTA.tsx](components/sections/CTA.tsx) - 27번 라인
- ✅ 현재 URL: `https://script.google.com/macros/s/AKfycbybrlI_nwI5Q6uVUyCJmhkQP8PpCPAeyyiNwhQn2Wo0UduraMCBcHbpQytz_FXjj0nW/exec`

### 3. Google Analytics ID (선택사항)

#### [app/layout.tsx](app/layout.tsx)
```typescript
// 92번 라인
src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"

// 100번 라인
gtag('config', 'G-YOUR-ID');
```

### 4. 비즈니스 정보 (선택사항)

#### [app/layout.tsx](app/layout.tsx)
```typescript
// 116번 라인 - 전화번호
telephone: '02-1234-5678',

// 122번 라인 - 주소
addressLocality: '서울시 강남구',
```

---

## 📦 배포 방법

### Vercel 배포 (권장)

1. **GitHub에 푸시**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Dog training landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/dog-training.git
   git push -u origin main
   ```

2. **Vercel 배포**
   - [Vercel](https://vercel.com) 접속
   - "New Project" 클릭
   - GitHub 저장소 선택
   - "Deploy" 클릭

3. **배포 완료**
   - Vercel이 자동으로 URL 생성 (예: `https://dog-training-xxx.vercel.app`)
   - 위의 "배포 전 필수 변경 사항"에서 URL 업데이트

### 커스텀 도메인 연결 (선택사항)

1. Vercel 프로젝트 → Settings → Domains
2. 도메인 입력 (예: `dogtraining.com`)
3. DNS 설정 안내에 따라 설정
4. 위의 URL들을 커스텀 도메인으로 변경

---

## 🧪 배포 후 테스트

### 1. 기능 테스트

- [ ] 페이지 로딩 확인
- [ ] 이미지 회전 애니메이션 작동 확인
- [ ] 폼 제출 테스트
  - 테스트 데이터 입력
  - 제출 버튼 클릭
  - Google Sheets에 데이터 저장 확인
- [ ] 반응형 디자인 확인 (모바일, 태블릿, 데스크톱)

### 2. SEO 테스트

- [ ] `/sitemap.xml` 접속 확인
- [ ] `/robots.txt` 접속 확인
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) 테스트
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 테스트
- [ ] [Google PageSpeed Insights](https://pagespeed.web.dev/) 점수 확인

### 3. 검색 엔진 등록

- [ ] [Google Search Console](https://search.google.com/search-console) 등록
  - 사이트 추가
  - 소유권 확인
  - 사이트맵 제출: `https://YOUR-DOMAIN.com/sitemap.xml`

- [ ] [네이버 서치어드바이저](https://searchadvisor.naver.com/) 등록
  - 사이트 등록
  - 소유권 확인
  - 사이트맵 제출

---

## 📊 모니터링

### Google Sheets 확인
- 구글 시트 URL: `https://docs.google.com/spreadsheets/d/1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs/edit`
- 리드 데이터 실시간 확인
- 상태 관리 (신규/진행중/완료)

### Google Analytics (설정 시)
- 방문자 수 확인
- 전환율 측정
- 유입 경로 분석

---

## 📁 프로젝트 파일 구조

```
dog-training-landing/
├── app/
│   ├── layout.tsx          # 메타데이터, SEO, Analytics
│   ├── page.tsx            # 메인 페이지
│   ├── sitemap.ts          # 사이트맵 생성
│   ├── robots.ts           # robots.txt 생성
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Hero.tsx        # Arc Gallery 히어로
│   │   ├── Problem.tsx
│   │   ├── Solution.tsx
│   │   ├── Process.tsx
│   │   ├── Benefits.tsx
│   │   ├── SocialProof.tsx
│   │   ├── CTA.tsx         # 리드 수집 폼
│   │   └── Footer.tsx
│   └── ui/                 # Shadcn UI 컴포넌트
├── public/
├── test-form.html          # 테스트용 HTML
├── google-apps-script.gs   # Google Sheets 연동 스크립트
├── GOOGLE_SHEETS_SETUP.md  # Google Sheets 설정 가이드
├── SEO_SETUP_GUIDE.md      # SEO 설정 가이드
└── DEPLOYMENT_CHECKLIST.md # 이 파일
```

---

## 🎯 런칭 후 할 일

### 1주차
- [ ] 테스트 리드 데이터 확인
- [ ] Google Search Console 크롤링 상태 확인
- [ ] 페이지 속도 최적화

### 1개월차
- [ ] 검색 순위 확인
- [ ] 전환율 분석
- [ ] A/B 테스트 (헤드라인, CTA 등)

### 지속적
- [ ] 콘텐츠 업데이트 (블로그, FAQ)
- [ ] 백링크 구축
- [ ] 소셜 미디어 활동
- [ ] 고객 후기 수집 및 업데이트

---

## 📞 문의 및 지원

### 문제 해결 문서
- [README_DATABASE_FIX.md](README_DATABASE_FIX.md) - 데이터베이스 문제 해결
- [SETUP_INSTRUCTIONS_KR.md](SETUP_INSTRUCTIONS_KR.md) - 상세 설정 가이드
- [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md) - Google Sheets 연동
- [SEO_SETUP_GUIDE.md](SEO_SETUP_GUIDE.md) - SEO 최적화 가이드

### 빠른 시작
- [QUICK_FIX.md](QUICK_FIX.md) - 5분 빠른 해결 가이드

---

## 🎉 완료!

모든 준비가 완료되었습니다!

**다음 단계:**
1. 위의 "배포 전 필수 변경 사항" 완료
2. Vercel에 배포
3. 실제 도메인 URL로 모든 URL 업데이트
4. Google Search Console & 네이버 서치어드바이저 등록
5. 테스트 및 모니터링 시작

**성공을 기원합니다! 🚀**

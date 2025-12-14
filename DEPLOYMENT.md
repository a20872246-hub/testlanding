# 🚀 배포 가이드

이 문서는 강아지 훈련 랜딩 페이지를 Vercel에 배포하는 전체 과정을 설명합니다.

## 📋 배포 전 체크리스트

배포하기 전에 다음 항목들을 확인하세요:

- [ ] Google Sheets와 Apps Script 설정 완료
- [ ] Google Analytics 측정 ID 설정
- [ ] 모든 콘텐츠 확인 및 수정
- [ ] 연락처 정보 업데이트
- [ ] 로컬에서 빌드 테스트 완료 (`npm run build`)

## 1️⃣ Google Sheets 설정

### 1.1 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com) 접속
2. **새로 만들기** 클릭
3. 스프레드시트 이름: "Dog Training Leads"

### 1.2 Apps Script 배포

1. 스프레드시트에서 **확장 프로그램 > Apps Script** 클릭
2. 프로젝트의 `google-apps-script.gs` 파일 내용 복사
3. Apps Script 에디터에 붙여넣기
4. **저장** (Ctrl+S 또는 💾 아이콘)
5. **배포 > 새 배포** 클릭
6. **유형 선택 > 웹 앱** 클릭
7. 다음 설정 입력:
   - **설명**: "Dog Training Lead Collection"
   - **실행 계정**: 나
   - **액세스 권한**: 모든 사용자
8. **배포** 클릭
9. 권한 승인 (Google 계정 로그인)
10. **웹 앱 URL** 복사 (형식: `https://script.google.com/macros/s/.../exec`)

### 1.3 프론트엔드 연결

`components/sections/CTA.tsx` 파일 수정:

```typescript
// 17번 라인 근처
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// 👇 복사한 URL로 변경
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
```

## 2️⃣ Google Analytics 설정

### 2.1 GA4 속성 생성

1. [Google Analytics](https://analytics.google.com) 접속
2. **관리** 클릭
3. **속성 만들기** 클릭
4. 속성 이름 입력: "Dog Training Landing"
5. 시간대: 대한민국 (GMT+09:00)
6. 통화: 대한민국 원 (KRW)
7. **다음** 클릭
8. 비즈니스 정보 입력
9. **만들기** 클릭

### 2.2 데이터 스트림 설정

1. **데이터 스트림 > 웹** 클릭
2. 웹사이트 URL 입력 (나중에 Vercel URL로 업데이트)
3. 스트림 이름: "Dog Training Website"
4. **스트림 만들기** 클릭
5. **측정 ID** 복사 (형식: `G-XXXXXXXXXX`)

### 2.3 프론트엔드 연결

`app/layout.tsx` 파일 수정:

```typescript
// 45-47번 라인과 55번 라인
src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
// 👆 여기와 아래 gtag('config', 'G-XXXXXXXXXX')를 실제 측정 ID로 변경
```

## 3️⃣ GitHub 저장소 생성 및 Push

### 3.1 Git 초기화

```bash
cd dog-training-landing
git init
```

### 3.2 GitHub 저장소 생성

1. [GitHub](https://github.com) 접속
2. **New repository** 클릭
3. Repository 이름: `dog-training-landing`
4. 설명: "Dog training landing page for lead collection"
5. **Public** 또는 **Private** 선택
6. **Create repository** 클릭

### 3.3 코드 푸시

```bash
git add .
git commit -m "Initial commit: Dog training landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dog-training-landing.git
git push -u origin main
```

## 4️⃣ Vercel 배포

### 4.1 Vercel 계정 연결

1. [Vercel](https://vercel.com) 접속
2. **Sign Up** 또는 **Log In**
3. GitHub 계정으로 로그인 권장

### 4.2 프로젝트 Import

1. Vercel 대시보드에서 **Add New... > Project** 클릭
2. GitHub 저장소 목록에서 `dog-training-landing` 찾기
3. **Import** 클릭

### 4.3 프로젝트 설정

1. **Project Name**: `dog-training-landing` (또는 원하는 이름)
2. **Framework Preset**: Next.js (자동 감지)
3. **Root Directory**: `./`
4. **Build Command**: `npm run build` (기본값)
5. **Output Directory**: `.next` (기본값)

### 4.4 환경 변수 설정 (선택사항)

환경 변수를 사용하려면:

1. **Environment Variables** 섹션 펼치기
2. 다음 변수 추가:
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX` (실제 GA 측정 ID)
   - Name: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - Value: `https://script.google.com/...` (실제 Apps Script URL)

### 4.5 배포 시작

1. **Deploy** 버튼 클릭
2. 배포 진행 상황 모니터링
3. 배포 완료 (약 1-2분 소요)
4. **Visit** 버튼 클릭하여 사이트 확인

## 5️⃣ 배포 후 설정

### 5.1 도메인 연결 (선택사항)

커스텀 도메인을 사용하려면:

1. Vercel 프로젝트 대시보드에서 **Settings > Domains** 클릭
2. **Add** 버튼 클릭
3. 도메인 입력 (예: `dogtraining.com`)
4. DNS 설정 안내에 따라 도메인 제공업체에서 레코드 추가
5. 확인 완료 후 자동으로 SSL 인증서 발급

### 5.2 Google Analytics 데이터 스트림 업데이트

1. Google Analytics 관리 페이지 접속
2. 데이터 스트림 선택
3. **웹 스트림 세부정보** 클릭
4. URL을 Vercel 배포 URL로 업데이트

### 5.3 기능 테스트

배포 후 다음 항목들을 테스트하세요:

- [ ] 모든 섹션이 올바르게 표시되는지
- [ ] CTA 버튼이 폼으로 스크롤되는지
- [ ] 폼 제출 시 Google Sheets에 데이터가 저장되는지
- [ ] 모바일 반응형이 제대로 작동하는지
- [ ] 애니메이션이 부드럽게 작동하는지

## 6️⃣ 지속적인 배포 (CI/CD)

Vercel은 자동 배포를 지원합니다:

- **main** 브랜치에 push하면 자동으로 프로덕션 배포
- 다른 브랜치에 push하면 프리뷰 배포 생성
- Pull Request 시 자동으로 프리뷰 URL 생성

### 업데이트 배포 방법

```bash
# 코드 수정 후
git add .
git commit -m "Update: 설명"
git push

# Vercel이 자동으로 감지하고 배포 시작
```

## 7️⃣ 모니터링 및 분석

### 7.1 Vercel Analytics

1. Vercel 프로젝트 대시보드에서 **Analytics** 탭 클릭
2. 페이지 성능, 방문자 수 등 확인

### 7.2 Google Analytics

1. [Google Analytics](https://analytics.google.com) 접속
2. 실시간 리포트에서 방문자 확인
3. 전환율, 이탈률 등 KPI 모니터링

### 7.3 Google Sheets 리드 확인

1. Google Sheets 스프레드시트 열기
2. 신규 리드 데이터 확인
3. 필요시 자동화 도구(Zapier 등)로 이메일 알림 설정

## 🔧 문제 해결

### 빌드 실패 시

```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 확인 후 수정
# Vercel에 다시 push
```

### 폼 제출이 작동하지 않을 때

1. Google Apps Script URL이 올바른지 확인
2. Apps Script 권한이 "모든 사용자"로 설정되었는지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### GA가 작동하지 않을 때

1. 측정 ID가 올바른지 확인
2. 광고 차단기가 비활성화되어 있는지 확인
3. 실시간 리포트에서 데이터 확인 (최대 24시간 소요)

## 📞 추가 지원

문제가 계속되면:

- Vercel 문서: https://vercel.com/docs
- Next.js 문서: https://nextjs.org/docs
- GitHub Issues: 프로젝트 저장소에 이슈 등록

---

축하합니다! 🎉 랜딩 페이지가 성공적으로 배포되었습니다!

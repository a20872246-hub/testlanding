# 🚀 Vercel 배포 가이드

## 방법 1: GitHub를 통한 배포 (권장 ⭐)

가장 쉽고 자동화된 방법입니다.

### 1단계: GitHub 저장소 생성

1. [GitHub](https://github.com) 접속 후 로그인
2. 우측 상단 **+** 클릭 → **New repository**
3. Repository 이름: `dog-training-landing`
4. **Public** 또는 **Private** 선택
5. **Create repository** 클릭

### 2단계: 로컬 프로젝트를 GitHub에 푸시

```bash
cd /Users/palla/Desktop/ai/dog-training-landing

# Git 초기화 (아직 안 했다면)
git init

# .gitignore 확인 (이미 있음)
# node_modules, .next 등이 제외되어 있어야 함

# 모든 파일 스테이징
git add .

# 커밋
git commit -m "Initial commit: Dog training landing page with SEO optimization"

# GitHub 원격 저장소 연결 (YOUR-USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR-USERNAME/dog-training-landing.git

# 메인 브랜치로 변경 (필요시)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

### 3단계: Vercel에 배포

1. [Vercel](https://vercel.com) 접속
2. **Sign Up** 또는 **Log In** (GitHub 계정으로 로그인 권장)
3. **Add New...** → **Project** 클릭
4. **Import Git Repository** 섹션에서 방금 만든 저장소 선택
5. **Import** 클릭
6. 프로젝트 설정:
   - **Project Name**: `dog-training-landing` (또는 원하는 이름)
   - **Framework Preset**: Next.js (자동 감지됨)
   - **Root Directory**: `./` (그대로)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
7. **Deploy** 클릭

### 4단계: 배포 완료 및 URL 확인

- 배포가 완료되면 URL이 생성됩니다 (예: `https://dog-training-landing-xxx.vercel.app`)
- **Visit** 버튼을 클릭하여 사이트 확인

---

## 방법 2: Vercel CLI를 통한 배포

터미널을 통해 직접 배포하는 방법입니다.

### 1단계: Vercel CLI 설치

```bash
npm install -g vercel
```

### 2단계: Vercel 로그인

```bash
vercel login
```

이메일 주소를 입력하면 확인 메일이 발송됩니다.

### 3단계: 배포

```bash
cd /Users/palla/Desktop/ai/dog-training-landing

# 프로덕션 배포
vercel --prod
```

대화형 프롬프트가 나타나면:
- **Set up and deploy**: Y
- **Which scope**: 계정 선택
- **Link to existing project**: N (처음이라면)
- **Project name**: dog-training-landing
- **Directory**: `./`
- 나머지는 기본값 (Enter)

---

## 배포 후 필수 작업 ✅

### 1. 배포 URL 확인

배포가 완료되면 URL을 받게 됩니다:
```
https://dog-training-landing-xxx.vercel.app
```

또는 커스텀 도메인:
```
https://your-domain.com
```

### 2. URL 업데이트 (3개 파일)

#### 📁 app/layout.tsx
```typescript
// 16번 라인
metadataBase: new URL('https://dog-training-landing-xxx.vercel.app'),

// 71번 라인 (JSON-LD)
'@id': 'https://dog-training-landing-xxx.vercel.app',
url: 'https://dog-training-landing-xxx.vercel.app',

// 116번 라인 (JSON-LD)
url: 'https://dog-training-landing-xxx.vercel.app',
```

#### 📁 app/sitemap.ts
```typescript
// 4번 라인
const baseUrl = 'https://dog-training-landing-xxx.vercel.app'
```

#### 📁 app/robots.ts
```typescript
// 4번 라인
const baseUrl = 'https://dog-training-landing-xxx.vercel.app'
```

### 3. 변경사항 푸시 (GitHub 방법 사용 시)

```bash
git add .
git commit -m "Update URLs to production domain"
git push
```

Vercel이 자동으로 재배포합니다!

### 4. 재배포 확인

- Vercel 대시보드에서 배포 진행 상황 확인
- 완료되면 사이트 방문하여 테스트

---

## 커스텀 도메인 연결 (선택사항)

### 1. Vercel에서 도메인 추가

1. Vercel 프로젝트 대시보드
2. **Settings** → **Domains**
3. 도메인 입력 (예: `dogtraining.com`)
4. **Add** 클릭

### 2. DNS 설정

Vercel이 제공하는 DNS 레코드를 도메인 등록 업체에 추가:

**A 레코드:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME 레코드 (www):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. 도메인 확인

- DNS 전파는 최대 48시간 소요 (보통 몇 분~몇 시간)
- Vercel에서 자동으로 SSL 인증서 발급

### 4. URL 업데이트

커스텀 도메인을 사용한다면 위의 "URL 업데이트" 단계에서
`https://your-domain.com`으로 변경하세요.

---

## 배포 후 테스트 체크리스트 ✅

### 기능 테스트
- [ ] 페이지가 정상적으로 로드됨
- [ ] 이미지 회전 애니메이션 작동
- [ ] 폼 제출 테스트
  - [ ] 테스트 데이터 입력
  - [ ] 제출 버튼 클릭
  - [ ] [구글 시트](https://docs.google.com/spreadsheets/d/1eURuprOb-jWrsBTXVdeUYkV-tV8g3wC6KCIeZGHw3Qs/edit)에 데이터 저장 확인
- [ ] 모바일 반응형 확인

### SEO 테스트
- [ ] `/sitemap.xml` 접속 확인
- [ ] `/robots.txt` 접속 확인
- [ ] 페이지 소스에서 메타 태그 확인
- [ ] Open Graph 미리보기
  - [ ] [Facebook Debugger](https://developers.facebook.com/tools/debug/)
  - [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] [Google PageSpeed Insights](https://pagespeed.web.dev/)

### 검색 엔진 등록
- [ ] [Google Search Console](https://search.google.com/search-console)
  - [ ] 속성 추가
  - [ ] 소유권 확인
  - [ ] Sitemap 제출: `https://your-domain.com/sitemap.xml`
- [ ] [네이버 서치어드바이저](https://searchadvisor.naver.com/)
  - [ ] 사이트 등록
  - [ ] 소유권 확인
  - [ ] Sitemap 제출

---

## 자동 배포 설정 (GitHub 방법)

GitHub에 푸시할 때마다 자동으로 배포됩니다!

```bash
# 코드 수정 후
git add .
git commit -m "Update: 메시지"
git push

# Vercel이 자동으로 배포 시작!
```

### 배포 상태 확인
- Vercel 대시보드에서 실시간 로그 확인
- GitHub 커밋에 Vercel 봇 댓글로 배포 링크 제공

---

## 환경 변수 설정 (필요시)

Google Analytics ID 등을 환경 변수로 관리하려면:

### 1. Vercel 대시보드
1. 프로젝트 → **Settings** → **Environment Variables**
2. 변수 추가:
   ```
   Name: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
   ```
3. **Save**

### 2. 코드 수정
```typescript
// app/layout.tsx
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
```

### 3. 재배포
- 환경 변수 변경 시 자동 재배포
- 또는 수동으로 **Deployments** → **Redeploy**

---

## 문제 해결

### 빌드 실패
- Vercel 대시보드 → **Deployments** → 실패한 배포 클릭
- **Build Logs** 확인
- 로컬에서 `npm run build` 테스트

### 404 에러
- `next.config.js` 확인
- 라우팅 설정 확인

### 환경 변수 적용 안 됨
- `NEXT_PUBLIC_` 접두사 확인
- 재배포 필요

---

## 유용한 링크

- **Vercel 문서**: https://vercel.com/docs
- **Next.js 배포 가이드**: https://nextjs.org/docs/deployment
- **도메인 설정**: https://vercel.com/docs/custom-domains

---

## 🎉 배포 완료!

축하합니다! 이제 전 세계에서 접속 가능한 웹사이트가 되었습니다!

**다음 단계:**
1. URL 업데이트 (3개 파일)
2. 재배포
3. 테스트
4. Google Search Console & 네이버 등록
5. 모니터링 시작

**성공을 기원합니다! 🚀**

# 🚀 지금 바로 배포하기 (5분 완성)

## 방법 선택

### 옵션 1: GitHub → Vercel (가장 추천! ⭐)
- ✅ 가장 쉬움
- ✅ 자동 배포 (코드 푸시하면 자동 재배포)
- ✅ 무료 SSL 인증서
- ✅ 전 세계 CDN

### 옵션 2: Vercel CLI
- 터미널에서 직접 배포
- 권한 문제로 `sudo` 필요할 수 있음

---

## 🎯 옵션 1: GitHub → Vercel (권장)

### 1단계: GitHub 저장소 만들기 (2분)

1. https://github.com/new 접속
2. Repository name: `dog-training-landing`
3. **Public** 선택 (또는 Private)
4. **Create repository** 클릭

### 2단계: 코드 푸시하기 (1분)

터미널에서 다음 명령어 실행:

```bash
cd /Users/palla/Desktop/ai/dog-training-landing

# Git 초기화 (이미 했다면 skip)
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Dog training landing page"

# GitHub 연결 (YOUR-USERNAME을 본인 GitHub 아이디로 변경!)
git remote add origin https://github.com/YOUR-USERNAME/dog-training-landing.git

# 브랜치 이름 변경
git branch -M main

# 푸시
git push -u origin main
```

**GitHub 인증 방법:**
- Personal Access Token 사용 (권장)
- 또는 SSH 키 사용

### 3단계: Vercel에 배포하기 (2분)

1. https://vercel.com 접속
2. **Sign Up** (GitHub 계정으로 로그인 권장)
3. **Add New...** → **Project** 클릭
4. 방금 만든 `dog-training-landing` 저장소 찾기
5. **Import** 클릭
6. 설정 확인:
   - Framework Preset: Next.js ✅
   - Root Directory: `./` ✅
   - Build Command: `npm run build` ✅
7. **Deploy** 클릭!

### 4단계: 배포 URL 받기

- 배포 완료 후 URL 확인 (예: `https://dog-training-landing-xxx.vercel.app`)
- **Visit** 클릭하여 사이트 확인!

---

## 🔧 옵션 2: Vercel CLI (터미널 선호 시)

### 1단계: Vercel CLI 설치

```bash
# sudo 사용하여 설치
sudo npm install -g vercel

# 또는 로컬 설치
cd /Users/palla/Desktop/ai/dog-training-landing
npx vercel
```

### 2단계: 로그인

```bash
vercel login
```

이메일 입력 → 확인 메일 클릭

### 3단계: 배포

```bash
cd /Users/palla/Desktop/ai/dog-training-landing
vercel --prod
```

대화형 질문 답변:
- Set up and deploy: **Y**
- Which scope: (본인 계정 선택)
- Link to existing project: **N**
- Project name: **dog-training-landing**
- Directory: **./** (Enter)
- Override settings: **N** (Enter)

---

## ✅ 배포 완료 후 필수 작업

### 배포 URL 확인

예시: `https://dog-training-landing-abc123.vercel.app`

### URL 업데이트 (3개 파일 수정)

#### 1. app/layout.tsx
```typescript
// 16번 라인
metadataBase: new URL('https://dog-training-landing-abc123.vercel.app'),

// 39번 라인
url: 'https://dog-training-landing-abc123.vercel.app',

// 74번 라인
'@id': 'https://dog-training-landing-abc123.vercel.app',
url: 'https://dog-training-landing-abc123.vercel.app',

// 116번 라인
url: 'https://dog-training-landing-abc123.vercel.app',
```

#### 2. app/sitemap.ts
```typescript
// 4번 라인
const baseUrl = 'https://dog-training-landing-abc123.vercel.app'
```

#### 3. app/robots.ts
```typescript
// 4번 라인
const baseUrl = 'https://dog-training-landing-abc123.vercel.app'
```

### 재배포

**GitHub 방법:**
```bash
git add .
git commit -m "Update production URLs"
git push
```
→ Vercel이 자동으로 재배포!

**CLI 방법:**
```bash
vercel --prod
```

---

## 🧪 테스트하기

### 기본 테스트
- [ ] 사이트 접속: `https://your-url.vercel.app`
- [ ] 이미지 회전 확인
- [ ] 폼 제출 테스트
- [ ] 구글 시트 데이터 확인

### SEO 테스트
- [ ] `/sitemap.xml` 접속
- [ ] `/robots.txt` 접속
- [ ] 페이지 소스 보기 (Cmd+U)
- [ ] Open Graph 확인: https://developers.facebook.com/tools/debug/

---

## 📈 검색 엔진 등록

### Google Search Console
1. https://search.google.com/search-console 접속
2. **속성 추가** → URL 입력
3. 소유권 확인 (메타 태그 또는 DNS)
4. **Sitemaps** → `https://your-url.vercel.app/sitemap.xml` 제출

### 네이버 서치어드바이저
1. https://searchadvisor.naver.com/ 접속
2. **사이트 등록** → URL 입력
3. 소유권 확인
4. **사이트맵 제출** → `https://your-url.vercel.app/sitemap.xml`

---

## 🎨 커스텀 도메인 (선택사항)

### Vercel에서 도메인 추가
1. Vercel 프로젝트 → **Settings** → **Domains**
2. 도메인 입력 (예: `dogtraining.com`)
3. **Add** 클릭

### DNS 설정
도메인 등록 업체에서 다음 레코드 추가:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL 자동 발급
- Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
- HTTPS 자동 적용

---

## 🔥 문제 해결

### Git 푸시 실패
```bash
# GitHub Personal Access Token 필요
# Settings → Developer settings → Personal access tokens
# 생성 후 비밀번호 대신 입력
```

### 빌드 실패
```bash
# 로컬에서 먼저 테스트
npm run build

# 성공하면 푸시
git add .
git commit -m "Fix build"
git push
```

### 폼 제출 안 됨
- Google Apps Script URL 확인
- 구글 시트 권한 확인
- 브라우저 Console 확인 (F12)

---

## 📞 추가 도움말

### Vercel 문서
- https://vercel.com/docs

### GitHub 가이드
- https://docs.github.com/en/get-started

### Next.js 배포
- https://nextjs.org/docs/deployment

---

## 🎉 완료!

배포가 완료되면:
1. ✅ 전 세계에서 접속 가능
2. ✅ 자동 HTTPS
3. ✅ 빠른 로딩 (CDN)
4. ✅ 무료 호스팅

**축하합니다! 🎊**

이제 리드 수집을 시작하세요!

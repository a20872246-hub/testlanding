# 📊 SEO 최적화 설정 가이드

## ✅ 완료된 SEO 작업

### 1. 메타데이터 최적화
- ✅ Open Graph 이미지 설정
- ✅ Twitter Card 설정
- ✅ 구글/네이버 검색 최적화 키워드
- ✅ JSON-LD 구조화 데이터
- ✅ Robots 메타태그
- ✅ 다국어 설정 (ko_KR)

### 2. 자동 생성 파일
- ✅ `/sitemap.xml` - 사이트맵 자동 생성
- ✅ `/robots.txt` - 검색 엔진 크롤러 설정

### 3. 구조화 데이터 (Schema.org)
- ✅ LocalBusiness 스키마
- ✅ Service 스키마
- ✅ AggregateRating 스키마
- ✅ OpeningHours 스키마

---

## 🔧 배포 전 필수 수정 사항

### 1. URL 변경하기

다음 파일에서 `https://dogtraining.vercel.app`를 실제 배포 URL로 변경하세요:

#### `app/layout.tsx` (16번 라인)
```typescript
metadataBase: new URL('https://your-actual-domain.com'),
```

#### `app/sitemap.ts` (4번 라인)
```typescript
const baseUrl = 'https://your-actual-domain.com'
```

#### `app/robots.ts` (4번 라인)
```typescript
const baseUrl = 'https://your-actual-domain.com'
```

### 2. Google Search Console 설정

1. [Google Search Console](https://search.google.com/search-console) 접속
2. 속성 추가 → 도메인 입력
3. 소유권 확인 코드 받기
4. `app/layout.tsx` 70번 라인 수정:
   ```typescript
   google: 'your-google-verification-code',
   ```

### 3. 네이버 웹마스터도구 설정

1. [네이버 서치어드바이저](https://searchadvisor.naver.com/) 접속
2. 웹마스터 도구 → 사이트 등록
3. 소유권 확인 코드 받기
4. `app/layout.tsx` 71번 라인 주석 해제 및 수정:
   ```typescript
   naver: 'your-naver-verification-code',
   ```
5. `app/layout.tsx` 190번 라인도 수정:
   ```typescript
   <meta name="naver-site-verification" content="your-naver-verification-code" />
   ```

### 4. Google Analytics 설정

1. [Google Analytics](https://analytics.google.com/) 접속
2. 새 속성 만들기
3. 측정 ID 받기 (예: G-XXXXXXXXXX)
4. `app/layout.tsx` 92번, 100번 라인 수정:
   ```typescript
   src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"
   gtag('config', 'G-YOUR-ACTUAL-ID');
   ```

### 5. 비즈니스 정보 업데이트

`app/layout.tsx`의 JSON-LD 데이터 수정:

```typescript
// 116번 라인
telephone: '02-1234-5678', // 실제 전화번호

// 122번 라인
addressLocality: '서울시 강남구', // 실제 주소
```

---

## 🚀 배포 후 해야 할 일

### 1. Google Search Console 설정

1. **사이트맵 제출**
   ```
   https://your-domain.com/sitemap.xml
   ```

2. **URL 검사**
   - 홈페이지 URL로 색인 요청

3. **크롤링 통계 확인**
   - 1-2일 후 크롤링 상태 확인

### 2. 네이버 서치어드바이저 설정

1. **사이트 등록**
   - 사이트 URL 등록
   - 소유권 확인

2. **사이트맵 제출**
   ```
   https://your-domain.com/sitemap.xml
   ```

3. **수집 요청**
   - 메인 페이지 수집 요청

### 3. 소셜 미디어 미리보기 테스트

#### Facebook/Kakao 미리보기
1. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 접속
2. URL 입력 후 테스트
3. 캐시 새로고침

#### Twitter 미리보기
1. [Twitter Card Validator](https://cards-dev.twitter.com/validator) 접속
2. URL 입력 후 테스트

---

## 📊 SEO 체크리스트

### 기본 SEO
- [x] 메타 타이틀 설정 (60자 이내)
- [x] 메타 디스크립션 설정 (160자 이내)
- [x] 키워드 최적화
- [x] Open Graph 태그
- [x] Twitter Card 태그
- [x] Canonical URL
- [x] 언어 설정 (lang="ko")

### 기술적 SEO
- [x] robots.txt 설정
- [x] sitemap.xml 생성
- [x] 구조화 데이터 (JSON-LD)
- [x] 모바일 반응형
- [x] 페이지 로딩 속도 최적화
- [x] HTTPS (배포 시 자동)

### 콘텐츠 SEO
- [x] 제목 태그 (H1, H2, H3)
- [x] 이미지 alt 태그
- [x] 내부 링크
- [x] 명확한 CTA

### 검색 엔진 등록
- [ ] Google Search Console 등록
- [ ] 네이버 서치어드바이저 등록
- [ ] 구글 애널리틱스 설정
- [ ] 사이트맵 제출

---

## 🎯 주요 키워드

현재 최적화된 키워드들:

### 메인 키워드
- 강아지 훈련
- 반려견 교육
- 문제견 교정
- 강아지 행동교정

### 서브 키워드
- 강아지 짖음
- 공격성 개선
- 분리불안 치료
- 애견 훈련
- 펫 트레이닝

### 롱테일 키워드
- 강아지 문제 행동
- 애견 행동 교정
- 반려견 훈련
- dog training

---

## 📈 성과 측정

### Google Analytics에서 확인할 지표

1. **트래픽 지표**
   - 세션 수
   - 페이지뷰
   - 평균 세션 시간
   - 이탈률

2. **전환 지표**
   - 폼 제출 수
   - 전화 클릭 수
   - 버튼 클릭 수

3. **유입 경로**
   - 검색 엔진 (Organic)
   - 직접 방문 (Direct)
   - 소셜 미디어
   - 광고

### Google Search Console에서 확인할 지표

1. **검색 성과**
   - 클릭 수
   - 노출 수
   - 평균 CTR
   - 평균 게재순위

2. **검색어 분석**
   - 상위 검색어
   - 클릭률 높은 검색어

3. **페이지 색인 상태**
   - 색인된 페이지 수
   - 크롤링 오류

---

## 🔍 SEO 점검 도구

### 자동 점검 도구
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [네이버 웹마스터도구](https://searchadvisor.naver.com/)

### 수동 점검
1. 브라우저에서 페이지 소스 보기
2. Meta 태그 확인
3. JSON-LD 구조 확인
4. 이미지 alt 태그 확인

---

## ⚡ 추가 최적화 팁

### 1. 페이지 속도 개선
- 이미지 최적화 (WebP 형식 사용)
- 코드 스플리팅
- CDN 사용

### 2. 콘텐츠 강화
- 블로그 섹션 추가
- FAQ 섹션 추가
- 고객 후기 강화

### 3. 백링크 구축
- 반려동물 커뮤니티 활동
- 관련 블로그 게스트 포스팅
- 소셜 미디어 활동

### 4. 로컬 SEO
- Google My Business 등록
- 네이버 플레이스 등록
- 지역 키워드 최적화

---

## 📝 참고 자료

- [Google SEO 가이드](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [네이버 검색 가이드](https://searchadvisor.naver.com/guide)
- [Schema.org 문서](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

---

## 🎉 완료!

모든 SEO 설정이 완료되었습니다!

배포 후 1-2주 내에 검색 엔진에 색인되기 시작하며,
꾸준한 콘텐츠 업데이트와 백링크 구축으로 검색 순위를 높일 수 있습니다.

**중요**: 위의 "배포 전 필수 수정 사항"을 반드시 완료하세요!

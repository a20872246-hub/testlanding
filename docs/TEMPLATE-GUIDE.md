# 랜딩페이지 템플릿 재사용 가이드

이 문서는 현재 강아지 훈련 랜딩페이지를 다른 비즈니스 아이템으로 재사용하기 위한 가이드입니다.

---

## 목차

1. [프로젝트 구조](#프로젝트-구조)
2. [필수 수정 파일](#필수-수정-파일)
3. [환경변수 설정](#환경변수-설정)
4. [Firebase 설정](#firebase-설정)
5. [커스터마이징 가이드](#커스터마이징-가이드)
6. [배포 가이드](#배포-가이드)

---

## 프로젝트 구조

```
├── app/                      # Next.js App Router 페이지
│   ├── page.tsx              # 메인 랜딩페이지
│   ├── admin/                # 관리자 페이지
│   ├── auth/                 # 로그인/회원가입
│   ├── mypage/               # 마이페이지
│   ├── payment/              # 결제 페이지
│   ├── products/             # 상품 상세 페이지
│   └── api/                  # API 라우트
├── components/               # 재사용 컴포넌트
│   ├── sections/             # 랜딩페이지 섹션
│   ├── reviews/              # 리뷰 컴포넌트
│   ├── ui/                   # UI 컴포넌트 (shadcn/ui)
│   └── admin/                # 관리자 컴포넌트
├── lib/                      # 유틸리티 및 서비스
│   ├── firebase.ts           # Firebase 설정
│   └── services/             # Firebase 서비스 함수
├── public/                   # 정적 파일
└── scripts/                  # 시드 데이터 스크립트
```

---

## 필수 수정 파일

### 1. 브랜딩 및 메타데이터

**`app/layout.tsx`**
```typescript
// 수정 항목:
- title: "새로운 비즈니스명"
- description: "새로운 비즈니스 설명"
- keywords: ["키워드1", "키워드2"]
- openGraph 이미지
```

### 2. 메인 페이지 콘텐츠

**`components/sections/` 폴더 내 파일들:**

| 파일 | 설명 | 수정 항목 |
|------|------|----------|
| `Hero.tsx` | 메인 히어로 섹션 | 제목, 부제목, CTA 버튼, 배경 이미지 |
| `Features.tsx` | 특징/장점 섹션 | 특징 목록, 아이콘, 설명 |
| `Products.tsx` | 상품/서비스 섹션 | 상품명, 가격, 설명, 특징 |
| `Testimonials.tsx` | 고객 후기 섹션 | 후기 내용, 고객 정보 |
| `FAQ.tsx` | FAQ 섹션 | 질문과 답변 |
| `CTA.tsx` | 상담 신청 폼 | 폼 필드, 안내 문구 |
| `NewsSection.tsx` | 뉴스 섹션 | 뉴스 API 소스 변경 |

### 3. 상품 페이지

**`app/products/` 폴더:**
- `basic/page.tsx` - 기본 상품
- `intensive/page.tsx` - 중급 상품
- `premium/page.tsx` - 프리미엄 상품

각 페이지에서 수정:
- 상품명, 가격, 설명
- 특징 목록
- 이미지

### 4. 관리자 페이지

**`app/admin/` 폴더:**
- 로고 및 브랜딩
- 사이드바 메뉴
- 대시보드 통계

---

## 환경변수 설정

`.env.local` 파일을 생성하고 다음 값들을 설정:

```env
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# 토스페이먼츠 결제
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_xxxxx
TOSS_SECRET_KEY=test_sk_xxxxx

# OpenAI (챗봇용)
OPENAI_API_KEY=your_openai_key

# 뉴스 크롤링 (선택)
NEWS_API_KEY=your_news_api_key
```

---

## Firebase 설정

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com) 접속
2. 새 프로젝트 생성
3. 웹 앱 추가 및 설정값 복사

### 2. Firestore 컬렉션 구조

```
firestore/
├── users/           # 사용자 정보
│   └── {userId}
│       ├── name
│       ├── email
│       ├── phone
│       └── createdAt
├── orders/          # 주문 정보
│   └── {orderId}
│       ├── customer
│       ├── product
│       ├── amount
│       └── status
├── consultations/   # 상담 신청
│   └── {consultationId}
│       ├── name
│       ├── phone
│       ├── message
│       └── status
├── reviews/         # 리뷰
│   └── {reviewId}
│       ├── productSlug
│       ├── userName
│       ├── rating
│       ├── content
│       └── images
└── products/        # 상품 정보
    └── {productId}
        ├── name
        ├── price
        └── features
```

### 3. Firestore 보안 규칙

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // 개발용 (프로덕션에서는 수정 필요)
    }
  }
}
```

### 4. Storage 보안 규칙

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;  // 개발용
    }
  }
}
```

### 5. 필요한 인덱스

리뷰 쿼리용 복합 인덱스:
- Collection: `reviews`
- Fields: `productSlug (Ascending)`, `status (Ascending)`, `createdAt (Descending)`

---

## 커스터마이징 가이드

### 색상 테마 변경

**`tailwind.config.ts`**
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // 보라색 → 원하는 색상으로 변경
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
      }
    }
  }
}
```

**그라데이션 변경 (자주 사용되는 패턴):**
```typescript
// 현재: from-purple-600 to-pink-600
// 변경 예시: from-blue-600 to-cyan-600
```

### 폰트 변경

**`app/layout.tsx`**
```typescript
import { Noto_Sans_KR } from 'next/font/google';
// 다른 폰트로 변경 가능
```

### 아이콘 변경

현재 사용 중인 아이콘 라이브러리: `lucide-react`

```typescript
import { Dog, Heart, Star } from 'lucide-react';
// 비즈니스에 맞는 아이콘으로 변경
```

---

## 배포 가이드

### Vercel 배포

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com) 에서 프로젝트 연결
3. 환경변수 설정 (Settings > Environment Variables)
4. 자동 배포 완료

### 환경변수 설정 (Vercel)

Vercel 대시보드에서 다음 환경변수 추가:
- `NEXT_PUBLIC_FIREBASE_*` - Firebase 설정
- `NEXT_PUBLIC_TOSS_CLIENT_KEY` - 토스페이먼츠 클라이언트 키
- `TOSS_SECRET_KEY` - 토스페이먼츠 시크릿 키
- `OPENAI_API_KEY` - OpenAI API 키

---

## 체크리스트

새 프로젝트 시작 시 확인할 항목:

- [ ] Firebase 새 프로젝트 생성
- [ ] 환경변수 설정 (.env.local)
- [ ] Firestore/Storage 보안 규칙 설정
- [ ] 필요한 인덱스 생성
- [ ] 브랜딩 변경 (로고, 색상, 폰트)
- [ ] 메타데이터 변경 (title, description)
- [ ] 상품 정보 수정
- [ ] CTA 폼 필드 수정
- [ ] 결제 테스트
- [ ] Vercel 배포 및 환경변수 설정

---

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 16.x | React 프레임워크 |
| TypeScript | 5.x | 타입 안전성 |
| Tailwind CSS | 3.x | 스타일링 |
| Firebase | 11.x | 백엔드 (Auth, Firestore, Storage) |
| shadcn/ui | - | UI 컴포넌트 |
| TossPayments | - | 결제 시스템 |
| Lucide React | - | 아이콘 |

---

## 문의

개발 관련 문의나 버그 리포트는 GitHub Issues를 이용해주세요.

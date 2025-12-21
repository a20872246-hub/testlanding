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
dog-training-landing/
├── app/                          # Next.js App Router 페이지
│   ├── page.tsx                  # 메인 랜딩페이지
│   ├── layout.tsx                # 루트 레이아웃 (SEO, 폰트)
│   ├── globals.css               # 전역 스타일
│   ├── admin/                    # 관리자 페이지
│   │   ├── page.tsx              # 관리자 대시보드
│   │   ├── login/                # 관리자 로그인
│   │   ├── consultations/        # 상담 관리
│   │   ├── orders/               # 주문 관리
│   │   ├── products/             # 상품 관리
│   │   ├── users/                # 사용자 관리
│   │   └── settings/             # 설정
│   ├── auth/                     # 인증 페이지
│   │   ├── login/                # 로그인
│   │   └── signup/               # 회원가입
│   ├── mypage/                   # 마이페이지
│   │   ├── page.tsx              # 마이페이지 메인
│   │   ├── orders/               # 주문 내역
│   │   ├── profile/              # 프로필 수정
│   │   └── settings/             # 설정
│   ├── payment/                  # 결제 페이지
│   │   ├── page.tsx              # 결제 메인
│   │   ├── success/              # 결제 성공
│   │   └── fail/                 # 결제 실패
│   ├── products/                 # 상품 상세 페이지
│   │   ├── basic/                # 기본 상품
│   │   ├── intensive/            # 집중 상품
│   │   └── premium/              # 프리미엄 상품
│   └── api/                      # API 라우트
│       ├── chat/                 # AI 챗봇 API
│       ├── news/                 # 뉴스 API
│       ├── payment/confirm/      # 결제 승인 API
│       └── cron/update-news/     # 뉴스 크롤링 (Cron)
├── components/                   # 재사용 컴포넌트
│   ├── sections/                 # 랜딩페이지 섹션
│   │   ├── Hero.tsx              # 히어로 섹션
│   │   ├── Problem.tsx           # 문제 제기 섹션
│   │   ├── Solution.tsx          # 솔루션 섹션
│   │   ├── Benefits.tsx          # 혜택 섹션
│   │   ├── Products.tsx          # 상품 섹션
│   │   ├── Process.tsx           # 프로세스 섹션
│   │   ├── SocialProof.tsx       # 소셜 증명 섹션
│   │   ├── NewsSection.tsx       # 뉴스 섹션
│   │   ├── CTA.tsx               # 상담 신청 폼
│   │   └── Footer.tsx            # 푸터
│   ├── reviews/                  # 리뷰 컴포넌트
│   │   ├── ReviewForm.tsx        # 리뷰 작성 폼
│   │   └── ReviewList.tsx        # 리뷰 목록
│   ├── admin/                    # 관리자 컴포넌트
│   │   ├── AdminSidebar.tsx      # 사이드바
│   │   └── AdminHeader.tsx       # 헤더
│   ├── auth/                     # 인증 컴포넌트
│   ├── layout/                   # 레이아웃 컴포넌트
│   ├── ui/                       # UI 컴포넌트 (shadcn/ui)
│   └── DogChatbot.tsx            # AI 챗봇
├── lib/                          # 유틸리티 및 서비스
│   ├── firebase.ts               # Firebase 초기화
│   ├── utils.ts                  # 유틸리티 함수
│   └── services/                 # Firebase 서비스 함수
│       ├── index.ts              # 서비스 export
│       ├── users.ts              # 사용자 서비스
│       ├── orders.ts             # 주문 서비스
│       ├── consultations.ts      # 상담 서비스
│       ├── products.ts           # 상품 서비스
│       ├── reviews.ts            # 리뷰 서비스
│       └── auth.ts               # 인증 서비스
├── scripts/                      # 유틸리티 스크립트
│   ├── seed-database.ts          # 테스트 데이터 삽입
│   ├── seed-reviews.ts           # 리뷰 데이터 삽입
│   └── test-firebase.ts          # Firebase 연결 테스트
├── public/                       # 정적 파일
└── docs/                         # 문서
    ├── TEMPLATE-GUIDE.md         # 템플릿 가이드 (현재 문서)
    ├── CONTENT-TEMPLATE.md       # 콘텐츠 템플릿
    └── API-REFERENCE.md          # API 레퍼런스
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

### 2. 메인 페이지 섹션

**`components/sections/` 폴더 내 파일들:**

| 파일 | 설명 | 수정 항목 |
|------|------|----------|
| `Hero.tsx` | 메인 히어로 섹션 | 제목, 부제목, CTA 버튼, 배경 이미지, 통계 |
| `Problem.tsx` | 문제 제기 섹션 | 고객이 겪는 문제점 설명 |
| `Solution.tsx` | 솔루션 섹션 | 제공하는 해결책 설명 |
| `Benefits.tsx` | 혜택 섹션 | 서비스 이용 혜택 |
| `Products.tsx` | 상품/서비스 섹션 | 상품명, 가격, 설명, 특징 |
| `Process.tsx` | 프로세스 섹션 | 서비스 진행 과정 |
| `SocialProof.tsx` | 소셜 증명 섹션 | 고객 후기, 통계 |
| `NewsSection.tsx` | 뉴스 섹션 | 뉴스 API 소스 변경 |
| `CTA.tsx` | 상담 신청 폼 | 폼 필드, 안내 문구 |
| `Footer.tsx` | 푸터 | 회사 정보, 연락처, 링크 |

### 3. 상품 페이지

**`app/products/` 폴더:**
- `basic/page.tsx` - 기본 상품 (49만원)
- `intensive/page.tsx` - 집중 상품 (89만원)
- `premium/page.tsx` - 프리미엄 상품 (149만원)

각 페이지에서 수정:
- 상품명, 가격, 설명
- 특징 목록 (features)
- 포함 서비스
- 이미지

### 4. 관리자 페이지

**`app/admin/` 폴더:**
- 로고 및 브랜딩
- 사이드바 메뉴 (`components/admin/AdminSidebar.tsx`)
- 대시보드 통계

### 5. 결제 페이지

**`app/payment/page.tsx`**
- 상품 목록
- 가격 정보
- 테스트 상품 (100원)

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
```

---

## Firebase 설정

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com) 접속
2. 새 프로젝트 생성
3. 웹 앱 추가 및 설정값 복사

### 2. Authentication 설정

1. Firebase Console > Authentication > Sign-in method
2. 다음 제공업체 활성화:
   - 이메일/비밀번호
   - Google
3. 승인된 도메인 추가:
   - `localhost`
   - `your-domain.vercel.app`

### 3. Firestore 컬렉션 구조

```
firestore/
├── users/               # 사용자 정보
│   └── {userId}
│       ├── id
│       ├── name
│       ├── email
│       ├── phone
│       ├── provider      # 'email' | 'google'
│       ├── profileImage
│       ├── status        # 'active' | 'inactive'
│       ├── createdAt
│       ├── updatedAt
│       └── lastLoginAt
├── orders/              # 주문 정보
│   └── {orderId}
│       ├── id
│       ├── orderNumber
│       ├── userId
│       ├── customer      # { name, email, phone }
│       ├── product       # { id, name, slug, price }
│       ├── amount
│       ├── status        # 'pending' | 'paid' | 'preparing' | 'shipping' | 'delivered' | 'cancelled'
│       ├── paymentMethod
│       ├── paymentKey
│       ├── createdAt
│       └── updatedAt
├── consultations/       # 상담 신청
│   └── {consultationId}
│       ├── id
│       ├── name
│       ├── phone
│       ├── email
│       ├── dogName
│       ├── dogBreed
│       ├── product
│       ├── productSlug
│       ├── message
│       ├── status        # 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'
│       ├── notes
│       ├── createdAt
│       └── updatedAt
├── reviews/             # 리뷰
│   └── {reviewId}
│       ├── id
│       ├── productSlug
│       ├── userId
│       ├── userName
│       ├── rating        # 1-5
│       ├── title
│       ├── content
│       ├── images[]      # Firebase Storage URLs
│       ├── dogName
│       ├── dogBreed
│       ├── isVerifiedPurchase
│       ├── helpfulCount
│       ├── status        # 'pending' | 'approved' | 'rejected'
│       ├── createdAt
│       └── updatedAt
└── products/            # 상품 정보
    └── {productId}
        ├── id
        ├── name
        ├── slug
        ├── price
        ├── originalPrice
        ├── description
        ├── duration
        ├── features[]
        ├── isActive
        ├── order
        ├── createdAt
        └── updatedAt
```

### 4. Firestore 보안 규칙

**개발용 (테스트 시):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**프로덕션용 (배포 시):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자: 본인만 읽기/쓰기
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 주문: 본인만 읽기, 생성 가능
    match /orders/{orderId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }

    // 상담: 누구나 생성, 읽기는 관리자만
    match /consultations/{consultationId} {
      allow create: if true;
      allow read, update: if request.auth != null;
    }

    // 리뷰: 누구나 읽기, 로그인 사용자만 생성
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    // 상품: 누구나 읽기
    match /products/{productId} {
      allow read: if true;
    }
  }
}
```

### 5. Storage 보안 규칙

**개발용:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

**프로덕션용:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /reviews/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

### 6. 필요한 인덱스

리뷰 쿼리용 복합 인덱스 (Firebase Console에서 생성):
- Collection: `reviews`
- Fields:
  - `productSlug` (Ascending)
  - `status` (Ascending)
  - `createdAt` (Descending)

---

## 커스터마이징 가이드

### 색상 테마 변경

**`tailwind.config.ts`**
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // 현재: 보라색 계열
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
// 변경 예시:
// - from-blue-600 to-cyan-600 (테크/IT)
// - from-green-600 to-emerald-600 (헬스/웰니스)
// - from-orange-600 to-red-600 (음식/레스토랑)
```

### 폰트 변경

**`app/layout.tsx`**
```typescript
import { Noto_Sans_KR } from 'next/font/google';

const font = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// 다른 폰트 예시:
// - Pretendard (한국어 최적화)
// - Inter (영문 위주)
// - Spoqa Han Sans Neo
```

### 아이콘 변경

현재 사용 중: `lucide-react`

```typescript
import {
  Dog,        // 강아지
  Heart,      // 하트
  Star,       // 별
  Clock,      // 시계
  Award,      // 상
  Phone,      // 전화
  Mail,       // 메일
  MapPin,     // 위치
  CheckCircle // 체크
} from 'lucide-react';

// 아이콘 목록: https://lucide.dev/icons
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

| 변수명 | 설명 |
|--------|------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API 키 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth 도메인 |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage 버킷 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase 메시징 ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase 앱 ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase 측정 ID |
| `NEXT_PUBLIC_TOSS_CLIENT_KEY` | 토스페이먼츠 클라이언트 키 |
| `TOSS_SECRET_KEY` | 토스페이먼츠 시크릿 키 |
| `OPENAI_API_KEY` | OpenAI API 키 |

### 커스텀 도메인 설정

1. Vercel 대시보드 > Settings > Domains
2. 도메인 추가
3. DNS 설정 (A 레코드 또는 CNAME)

---

## 스크립트 사용법

### 테스트 데이터 삽입

```bash
# Firebase 연결 테스트
npx tsx scripts/test-firebase.ts

# 사용자, 상담, 주문, 상품 데이터 삽입
npx tsx scripts/seed-database.ts

# 리뷰 데이터 삽입
npx tsx scripts/seed-reviews.ts
```

---

## 체크리스트

새 프로젝트 시작 시 확인할 항목:

### 초기 설정
- [ ] 프로젝트 클론 및 의존성 설치 (`npm install`)
- [ ] Firebase 새 프로젝트 생성
- [ ] 환경변수 설정 (`.env.local`)
- [ ] Firestore/Storage 보안 규칙 설정
- [ ] Authentication 제공업체 활성화
- [ ] 필요한 인덱스 생성

### 콘텐츠 수정
- [ ] 메타데이터 변경 (`app/layout.tsx`)
- [ ] Hero 섹션 수정
- [ ] 상품 정보 수정
- [ ] CTA 폼 필드 수정
- [ ] Footer 정보 수정

### 배포
- [ ] Vercel 프로젝트 연결
- [ ] Vercel 환경변수 설정
- [ ] Firebase 승인된 도메인 추가
- [ ] 결제 테스트

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
| OpenAI | - | AI 챗봇 |

---

## 관리자 계정

기본 관리자 로그인:
- URL: `/admin` 또는 `/auth/login` (admin@admin.com 입력 시 자동 리다이렉트)
- 이메일: `admin@admin.com`
- 비밀번호: `admin123`

---

## 문의

개발 관련 문의나 버그 리포트는 GitHub Issues를 이용해주세요.

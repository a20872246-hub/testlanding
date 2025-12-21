# API 및 서비스 레퍼런스

이 문서는 프로젝트에서 사용되는 Firebase 서비스 함수들과 API 엔드포인트를 정리한 문서입니다.

---

## 목차

1. [Firebase 서비스](#firebase-서비스)
2. [API 엔드포인트](#api-엔드포인트)
3. [데이터 타입](#데이터-타입)
4. [사용 예시](#사용-예시)

---

## Firebase 서비스

모든 서비스는 `lib/services/` 폴더에 위치하며, `lib/services/index.ts`에서 통합 export됩니다.

```typescript
import { createUser, signInWithGoogle, createOrder, ... } from '@/lib/services';
```

---

### Users 서비스 (`lib/services/users.ts`)

사용자 정보 관리

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `createUser` | `userData: Omit<User, 'id' \| 'createdAt' \| 'updatedAt' \| 'status'>` | `Promise<User>` | 새 사용자 생성 |
| `getUserById` | `userId: string` | `Promise<User \| null>` | ID로 사용자 조회 |
| `getUserByEmail` | `email: string` | `Promise<User \| null>` | 이메일로 사용자 조회 |
| `updateUser` | `userId: string, data: Partial<User>` | `Promise<void>` | 사용자 정보 업데이트 |
| `deleteUser` | `userId: string` | `Promise<void>` | 사용자 삭제 |
| `getAllUsers` | - | `Promise<User[]>` | 모든 사용자 조회 |
| `updateUserStatus` | `userId: string, status: User['status']` | `Promise<void>` | 사용자 상태 변경 |
| `updateLastLogin` | `userId: string` | `Promise<void>` | 마지막 로그인 시간 업데이트 |
| `addAddress` | `userId: string, address: Omit<Address, 'id'>` | `Promise<void>` | 배송지 추가 |
| `removeAddress` | `userId: string, addressId: string` | `Promise<void>` | 배송지 삭제 |

---

### Auth 서비스 (`lib/services/auth.ts`)

인증 관련 기능

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `signUpWithEmail` | `email: string, password: string, name: string` | `Promise<User>` | 이메일 회원가입 |
| `signInWithEmail` | `email: string, password: string` | `Promise<User \| null>` | 이메일 로그인 |
| `signInWithGoogle` | - | `Promise<User \| null>` | 구글 로그인 |
| `signOut` | - | `Promise<void>` | 로그아웃 |
| `getCurrentUser` | - | `FirebaseUser \| null` | 현재 로그인 사용자 |
| `onAuthStateChange` | `callback: (user: FirebaseUser \| null) => void` | `Unsubscribe` | 인증 상태 리스너 |
| `adminSignIn` | `email: string, password: string` | `Promise<boolean>` | 관리자 로그인 |
| `adminSignOut` | - | `Promise<void>` | 관리자 로그아웃 |
| `isAdmin` | - | `boolean` | 관리자 여부 확인 |

---

### Orders 서비스 (`lib/services/orders.ts`)

주문 관리

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `createOrder` | `orderData: Omit<Order, 'id' \| 'createdAt' \| 'updatedAt'>` | `Promise<Order>` | 새 주문 생성 |
| `getOrderById` | `orderId: string` | `Promise<Order \| null>` | ID로 주문 조회 |
| `getOrderByOrderNumber` | `orderNumber: string` | `Promise<Order \| null>` | 주문번호로 조회 |
| `getOrdersByUserId` | `userId: string` | `Promise<Order[]>` | 사용자별 주문 조회 |
| `getAllOrders` | - | `Promise<Order[]>` | 모든 주문 조회 |
| `updateOrder` | `orderId: string, data: Partial<Order>` | `Promise<void>` | 주문 업데이트 |
| `updateOrderStatus` | `orderId: string, status: Order['status']` | `Promise<void>` | 주문 상태 변경 |
| `generateOrderNumber` | - | `string` | 주문번호 생성 |

---

### Consultations 서비스 (`lib/services/consultations.ts`)

상담 신청 관리

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `createConsultation` | `data: Omit<Consultation, 'id' \| 'createdAt' \| 'updatedAt' \| 'status'>` | `Promise<Consultation>` | 상담 신청 생성 |
| `getConsultationById` | `id: string` | `Promise<Consultation \| null>` | ID로 상담 조회 |
| `getAllConsultations` | - | `Promise<Consultation[]>` | 모든 상담 조회 |
| `updateConsultation` | `id: string, data: Partial<Consultation>` | `Promise<void>` | 상담 정보 업데이트 |
| `updateConsultationStatus` | `id: string, status: Consultation['status']` | `Promise<void>` | 상담 상태 변경 |
| `scheduleConsultation` | `id: string, scheduledAt: Date` | `Promise<void>` | 상담 일정 예약 |
| `addConsultationNotes` | `id: string, notes: string` | `Promise<void>` | 상담 메모 추가 |

---

### Reviews 서비스 (`lib/services/reviews.ts`)

리뷰 관리

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `createReview` | `reviewData: Omit<Review, 'id' \| 'createdAt' \| 'updatedAt' \| 'helpfulCount' \| 'status'>` | `Promise<Review>` | 리뷰 생성 |
| `getReviewsByProduct` | `productSlug: string` | `Promise<Review[]>` | 상품별 리뷰 조회 (approved만) |
| `getProductAverageRating` | `productSlug: string` | `Promise<{average: number, count: number}>` | 평균 평점 조회 |
| `incrementHelpfulCount` | `reviewId: string` | `Promise<void>` | 도움됨 카운트 증가 |
| `uploadReviewImage` | `reviewId: string, file: File` | `Promise<string>` | 리뷰 이미지 업로드 |
| `deleteReviewImage` | `imageUrl: string` | `Promise<void>` | 리뷰 이미지 삭제 |
| `updateReviewStatus` | `reviewId: string, status: Review['status']` | `Promise<void>` | 리뷰 상태 변경 |
| `getAllReviews` | - | `Promise<Review[]>` | 모든 리뷰 조회 (관리자용) |

---

### Products 서비스 (`lib/services/products.ts`)

상품 관리

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `getProductBySlug` | `slug: string` | `Promise<Product \| null>` | slug로 상품 조회 |
| `getProductById` | `productId: string` | `Promise<Product \| null>` | ID로 상품 조회 |
| `getAllProducts` | - | `Promise<Product[]>` | 모든 상품 조회 |
| `getActiveProducts` | - | `Promise<Product[]>` | 활성 상품만 조회 |
| `createProduct` | `productData: Omit<Product, 'id' \| 'createdAt' \| 'updatedAt'>` | `Promise<Product>` | 상품 생성 |
| `updateProduct` | `productId: string, data: Partial<Product>` | `Promise<void>` | 상품 업데이트 |
| `deleteProduct` | `productId: string` | `Promise<void>` | 상품 삭제 |

---

## API 엔드포인트

### 결제 API

**POST `/api/payment/confirm`**

토스페이먼츠 결제 승인 요청

```typescript
// Request Body
{
  paymentKey: string;   // 토스 결제 키
  orderId: string;      // 주문 ID
  amount: number;       // 결제 금액
}

// Response (성공)
{
  success: true;
  payment: PaymentData;
}

// Response (실패)
{
  success: false;
  error: string;
}
```

---

### 뉴스 API

**GET `/api/news`**

뉴스 목록 조회

```typescript
// Response
{
  articles: Article[];
  lastUpdated: string;
}
```

**POST `/api/cron/update-news`**

뉴스 크롤링 (Vercel Cron 전용)

```typescript
// Headers
Authorization: Bearer ${CRON_SECRET}

// Response
{
  success: boolean;
  articlesCount: number;
}
```

---

### AI 챗봇 API

**POST `/api/chat`**

AI 챗봇 응답

```typescript
// Request Body
{
  message: string;
  conversationHistory?: {
    role: 'user' | 'assistant';
    content: string;
  }[];
}

// Response
{
  reply: string;
}
```

---

## 데이터 타입

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  provider?: 'email' | 'google' | 'kakao';
  profileImage?: string;
  addresses?: Address[];
  status: 'active' | 'inactive' | 'banned';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
}

interface Address {
  id: string;
  name: string;
  recipient: string;
  phone: string;
  address: string;
  addressDetail?: string;
  zipCode: string;
  isDefault: boolean;
}
```

### Order

```typescript
interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
  };
  amount: number;
  status: 'pending' | 'paid' | 'preparing' | 'shipping' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentKey?: string;
  address?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
  shippedAt?: Timestamp;
  deliveredAt?: Timestamp;
  cancelledAt?: Timestamp;
}
```

### Consultation

```typescript
interface Consultation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  dogName?: string;
  dogBreed?: string;
  product: string;
  productSlug: string;
  message: string;
  address?: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  scheduledAt?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Review

```typescript
interface Review {
  id: string;
  productSlug: string;
  userId: string;
  userName: string;
  userEmail?: string;
  rating: number;  // 1-5
  title: string;
  content: string;
  images: string[];  // Firebase Storage URLs
  dogName?: string;
  dogBreed?: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Product

```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  duration: string;
  features: string[];
  isActive: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## 사용 예시

### 회원가입 및 로그인

```typescript
import { signUpWithEmail, signInWithEmail, signInWithGoogle } from '@/lib/services';

// 이메일 회원가입
const newUser = await signUpWithEmail('user@email.com', 'password123', '홍길동');

// 이메일 로그인
const user = await signInWithEmail('user@email.com', 'password123');

// 구글 로그인
const googleUser = await signInWithGoogle();
```

### 상담 신청 생성

```typescript
import { createConsultation } from '@/lib/services';

const consultation = await createConsultation({
  name: '홍길동',
  phone: '010-1234-5678',
  email: 'hong@email.com',
  dogName: '뽀삐',
  dogBreed: '푸들',
  product: '기본 교정 프로그램',
  productSlug: 'basic',
  message: '짖음 문제가 있어요',
});

console.log('상담 신청 ID:', consultation.id);
```

### 리뷰 작성 (이미지 포함)

```typescript
import { createReview, uploadReviewImage } from '@/lib/services';

// 1. 리뷰 생성
const review = await createReview({
  productSlug: 'basic',
  userId: 'user123',
  userName: '김철수',
  rating: 5,
  title: '정말 효과가 있었어요!',
  content: '3주 만에 짖는 습관이 많이 줄었어요.',
  images: [],
  dogName: '뽀삐',
  dogBreed: '푸들',
  isVerifiedPurchase: true,
});

// 2. 이미지 업로드 (선택)
const imageFile = /* File object */;
const imageUrl = await uploadReviewImage(review.id, imageFile);
console.log('이미지 URL:', imageUrl);
```

### 주문 생성 및 상태 업데이트

```typescript
import { createOrder, updateOrderStatus, generateOrderNumber } from '@/lib/services';

// 주문 생성
const order = await createOrder({
  orderNumber: generateOrderNumber(),
  userId: 'user123',
  customer: {
    name: '홍길동',
    email: 'hong@email.com',
    phone: '010-1234-5678',
  },
  product: {
    id: 'basic',
    name: '기본 교정 프로그램',
    slug: 'basic',
    price: 490000,
  },
  amount: 490000,
  status: 'pending',
  paymentMethod: '카드',
});

// 상태 업데이트
await updateOrderStatus(order.id, 'paid');
```

### 결제 승인 요청

```typescript
const confirmPayment = async (paymentKey: string, orderId: string, amount: number) => {
  const response = await fetch('/api/payment/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  const result = await response.json();

  if (result.success) {
    console.log('결제 성공:', result.payment);
    return result.payment;
  } else {
    throw new Error(result.error);
  }
};
```

### 관리자 로그인

```typescript
import { adminSignIn, isAdmin } from '@/lib/services';

// 관리자 로그인
const success = await adminSignIn('admin@admin.com', 'admin123');

if (success) {
  // 관리자 페이지로 이동
  router.push('/admin');
}

// 관리자 여부 확인
if (isAdmin()) {
  // 관리자 전용 기능 표시
}
```

---

## Firebase 초기화

**`lib/firebase.ts`**

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
```

---

## 에러 처리

모든 서비스 함수는 에러 발생 시 예외를 throw합니다. try-catch로 처리하세요.

```typescript
try {
  const user = await signInWithGoogle();
  console.log('로그인 성공:', user);
} catch (error) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        console.log('사용자가 팝업을 닫았습니다.');
        break;
      case 'permission-denied':
        console.log('권한이 없습니다.');
        break;
      default:
        console.error('로그인 오류:', error.message);
    }
  }
}
```

# API 및 서비스 레퍼런스

이 문서는 프로젝트에서 사용되는 Firebase 서비스 함수들과 API 엔드포인트를 정리한 문서입니다.

---

## 목차

1. [Firebase 서비스](#firebase-서비스)
2. [API 엔드포인트](#api-엔드포인트)
3. [데이터 타입](#데이터-타입)

---

## Firebase 서비스

모든 서비스는 `lib/services/` 폴더에 위치합니다.

### Users 서비스 (`lib/services/users.ts`)

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `createUser` | `userData: User` | `Promise<User>` | 새 사용자 생성 |
| `getUserById` | `userId: string` | `Promise<User \| null>` | ID로 사용자 조회 |
| `getUserByEmail` | `email: string` | `Promise<User \| null>` | 이메일로 사용자 조회 |
| `updateUser` | `userId: string, data: Partial<User>` | `Promise<void>` | 사용자 정보 업데이트 |
| `getAllUsers` | - | `Promise<User[]>` | 모든 사용자 조회 |

### Orders 서비스 (`lib/services/orders.ts`)

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `createOrder` | `orderData: Order` | `Promise<Order>` | 새 주문 생성 |
| `getOrderById` | `orderId: string` | `Promise<Order \| null>` | ID로 주문 조회 |
| `getOrdersByUserId` | `userId: string` | `Promise<Order[]>` | 사용자별 주문 조회 |
| `updateOrderStatus` | `orderId: string, status: string` | `Promise<void>` | 주문 상태 업데이트 |
| `getAllOrders` | - | `Promise<Order[]>` | 모든 주문 조회 |

### Consultations 서비스 (`lib/services/consultations.ts`)

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `createConsultation` | `data: ConsultationData` | `Promise<Consultation>` | 상담 신청 생성 |
| `getConsultationById` | `id: string` | `Promise<Consultation \| null>` | ID로 상담 조회 |
| `getAllConsultations` | - | `Promise<Consultation[]>` | 모든 상담 조회 |
| `updateConsultation` | `id: string, data: Partial` | `Promise<void>` | 상담 정보 업데이트 |
| `updateConsultationStatus` | `id: string, status: string` | `Promise<void>` | 상담 상태 업데이트 |

### Reviews 서비스 (`lib/services/reviews.ts`)

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `createReview` | `reviewData: ReviewData` | `Promise<Review>` | 리뷰 생성 |
| `getReviewsByProduct` | `productSlug: string` | `Promise<Review[]>` | 상품별 리뷰 조회 |
| `getProductAverageRating` | `productSlug: string` | `Promise<{average, count}>` | 평균 평점 조회 |
| `incrementHelpfulCount` | `reviewId: string` | `Promise<void>` | 도움됨 카운트 증가 |
| `uploadReviewImage` | `reviewId: string, file: File` | `Promise<string>` | 리뷰 이미지 업로드 |
| `deleteReviewImage` | `imageUrl: string` | `Promise<void>` | 리뷰 이미지 삭제 |

### Products 서비스 (`lib/services/products.ts`)

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `getProductBySlug` | `slug: string` | `Promise<Product \| null>` | slug로 상품 조회 |
| `getAllProducts` | - | `Promise<Product[]>` | 모든 상품 조회 |
| `createProduct` | `productData: Product` | `Promise<Product>` | 상품 생성 |
| `updateProduct` | `id: string, data: Partial` | `Promise<void>` | 상품 업데이트 |

### Auth 서비스 (`lib/services/auth.ts`)

| 함수명 | 파라미터 | 반환값 | 설명 |
|--------|----------|--------|------|
| `signUpWithEmail` | `email, password, name` | `Promise<User>` | 이메일 회원가입 |
| `signInWithEmail` | `email, password` | `Promise<User>` | 이메일 로그인 |
| `signInWithGoogle` | - | `Promise<User>` | 구글 로그인 |
| `signOut` | - | `Promise<void>` | 로그아웃 |
| `getCurrentUser` | - | `User \| null` | 현재 로그인 사용자 |

---

## API 엔드포인트

### 결제 API

**POST `/api/payment/confirm`**

토스페이먼츠 결제 승인

```typescript
// Request Body
{
  paymentKey: string;
  orderId: string;
  amount: number;
}

// Response
{
  success: boolean;
  payment?: PaymentData;
  error?: string;
}
```

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

뉴스 크롤링 (Vercel Cron용)

```typescript
// Response
{
  success: boolean;
  articlesCount: number;
}
```

### 챗봇 API

**POST `/api/chat`**

AI 챗봇 응답

```typescript
// Request Body
{
  message: string;
  conversationHistory?: Message[];
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
  provider: 'email' | 'google';
  status: 'active' | 'inactive';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
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

### 상담 신청 생성

```typescript
import { createConsultation } from '@/lib/services/consultations';

const handleSubmit = async (formData) => {
  try {
    const consultation = await createConsultation({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      product: '무료 상담',
      productSlug: 'free-consultation',
    });
    console.log('상담 신청 완료:', consultation.id);
  } catch (error) {
    console.error('상담 신청 실패:', error);
  }
};
```

### 리뷰 생성 with 이미지

```typescript
import { createReview, uploadReviewImage } from '@/lib/services/reviews';

const handleReviewSubmit = async (reviewData, imageFiles) => {
  try {
    // 1. 리뷰 먼저 생성
    const review = await createReview({
      productSlug: 'basic',
      userId: 'user123',
      userName: '홍길동',
      rating: 5,
      title: '좋은 서비스',
      content: '만족합니다!',
    });

    // 2. 이미지 업로드
    const imageUrls = [];
    for (const file of imageFiles) {
      const url = await uploadReviewImage(review.id, file);
      imageUrls.push(url);
    }

    console.log('리뷰 작성 완료:', review.id);
  } catch (error) {
    console.error('리뷰 작성 실패:', error);
  }
};
```

### 결제 승인 요청

```typescript
const confirmPayment = async (paymentKey, orderId, amount) => {
  const response = await fetch('/api/payment/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  const result = await response.json();

  if (result.success) {
    console.log('결제 성공:', result.payment);
  } else {
    console.error('결제 실패:', result.error);
  }
};
```

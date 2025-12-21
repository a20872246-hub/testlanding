// Firebase 테스트 데이터 삽입 스크립트
// 실행: npx tsx scripts/seed-database.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { config } from 'dotenv';

// .env.local 파일 로드
config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.projectId) {
  console.error('❌ Firebase 환경변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.');
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 테스트 사용자 데이터
const users = [
  {
    id: 'user1',
    name: '김철수',
    email: 'kim@email.com',
    phone: '010-1234-5678',
    provider: 'email',
    status: 'active',
    createdAt: Timestamp.fromDate(new Date('2024-01-01')),
    updatedAt: Timestamp.now(),
    lastLoginAt: Timestamp.fromDate(new Date('2024-12-20')),
  },
  {
    id: 'user2',
    name: '이영희',
    email: 'lee@email.com',
    phone: '010-2345-6789',
    provider: 'google',
    status: 'active',
    createdAt: Timestamp.fromDate(new Date('2024-01-05')),
    updatedAt: Timestamp.now(),
    lastLoginAt: Timestamp.fromDate(new Date('2024-12-19')),
  },
  {
    id: 'user3',
    name: '박민수',
    email: 'park@email.com',
    phone: '010-3456-7890',
    provider: 'email',
    status: 'active',
    createdAt: Timestamp.fromDate(new Date('2024-01-08')),
    updatedAt: Timestamp.now(),
    lastLoginAt: Timestamp.fromDate(new Date('2024-12-18')),
  },
  {
    id: 'user4',
    name: '최지현',
    email: 'choi@email.com',
    phone: '010-4567-8901',
    provider: 'email',
    status: 'inactive',
    createdAt: Timestamp.fromDate(new Date('2024-01-10')),
    updatedAt: Timestamp.now(),
    lastLoginAt: Timestamp.fromDate(new Date('2024-12-10')),
  },
  {
    id: 'user5',
    name: '정다은',
    email: 'jung@email.com',
    phone: '010-5678-9012',
    provider: 'google',
    status: 'active',
    createdAt: Timestamp.fromDate(new Date('2024-01-12')),
    updatedAt: Timestamp.now(),
    lastLoginAt: Timestamp.fromDate(new Date('2024-12-21')),
  },
];

// 테스트 상담 데이터
const consultations = [
  {
    id: 'con1',
    name: '홍길동',
    phone: '010-1111-2222',
    email: 'hong@email.com',
    dogName: '몽이',
    dogBreed: '골든 리트리버',
    product: '집중 교정 프로그램',
    productSlug: 'intensive',
    message: '산책 시 다른 강아지에게 짖는 문제가 있습니다.',
    status: 'pending',
    createdAt: Timestamp.fromDate(new Date('2024-12-20T14:30:00')),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'con2',
    name: '김미영',
    phone: '010-3333-4444',
    email: 'mieyoung@email.com',
    dogName: '초코',
    dogBreed: '말티즈',
    product: '프리미엄 홈 케어',
    productSlug: 'premium',
    message: '분리불안이 심해요. 집을 비울 때마다 짖고 물건을 망가뜨립니다.',
    address: '서울시 강남구 테헤란로 123',
    status: 'contacted',
    notes: '12/22 오후 2시 방문 상담 예정',
    createdAt: Timestamp.fromDate(new Date('2024-12-19T11:20:00')),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'con3',
    name: '이준호',
    phone: '010-5555-6666',
    dogName: '시바',
    dogBreed: '시바 이누',
    product: '기본 교정 프로그램',
    productSlug: 'basic',
    message: '기본 명령어 훈련이 필요합니다.',
    status: 'scheduled',
    scheduledAt: '2024-12-23 10:00',
    createdAt: Timestamp.fromDate(new Date('2024-12-18T16:45:00')),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'con4',
    name: '박서연',
    phone: '010-7777-8888',
    email: 'seoyeon@email.com',
    dogName: '보리',
    dogBreed: '보더콜리',
    product: '집중 교정 프로그램',
    productSlug: 'intensive',
    message: '기본적인 복종 훈련이 필요합니다.',
    status: 'completed',
    notes: '기본 교정 프로그램 계약 완료',
    createdAt: Timestamp.fromDate(new Date('2024-12-15T09:00:00')),
    updatedAt: Timestamp.now(),
  },
];

// 테스트 주문 데이터
const orders = [
  {
    id: 'order1',
    orderNumber: 'ORD-20241220-ABC123',
    userId: 'user1',
    customer: {
      name: '김철수',
      email: 'kim@email.com',
      phone: '010-1234-5678',
    },
    product: {
      id: 'intensive',
      name: '집중 교정 프로그램',
      slug: 'intensive',
      price: 890000,
    },
    amount: 890000,
    status: 'paid',
    paymentMethod: '카드',
    paymentKey: 'pk_test_123456',
    createdAt: Timestamp.fromDate(new Date('2024-12-20T14:30:00')),
    updatedAt: Timestamp.now(),
    paidAt: Timestamp.fromDate(new Date('2024-12-20T14:32:00')),
  },
  {
    id: 'order2',
    orderNumber: 'ORD-20241219-DEF456',
    userId: 'user2',
    customer: {
      name: '이영희',
      email: 'lee@email.com',
      phone: '010-2345-6789',
    },
    product: {
      id: 'basic',
      name: '기본 교정 프로그램',
      slug: 'basic',
      price: 490000,
    },
    amount: 490000,
    status: 'preparing',
    paymentMethod: '카드',
    paymentKey: 'pk_test_789012',
    createdAt: Timestamp.fromDate(new Date('2024-12-19T11:20:00')),
    updatedAt: Timestamp.now(),
    paidAt: Timestamp.fromDate(new Date('2024-12-19T11:22:00')),
  },
  {
    id: 'order3',
    orderNumber: 'ORD-20241218-GHI789',
    userId: 'user3',
    customer: {
      name: '박민수',
      email: 'park@email.com',
      phone: '010-3456-7890',
    },
    product: {
      id: 'premium',
      name: '프리미엄 홈 케어',
      slug: 'premium',
      price: 1490000,
    },
    amount: 1490000,
    status: 'shipping',
    paymentMethod: '계좌이체',
    paymentKey: 'pk_test_345678',
    address: '경기도 성남시 분당구 판교로 789',
    createdAt: Timestamp.fromDate(new Date('2024-12-18T16:45:00')),
    updatedAt: Timestamp.now(),
    paidAt: Timestamp.fromDate(new Date('2024-12-18T16:50:00')),
    shippedAt: Timestamp.fromDate(new Date('2024-12-19T10:00:00')),
  },
  {
    id: 'order4',
    orderNumber: 'ORD-20241215-JKL012',
    userId: 'user4',
    customer: {
      name: '최지현',
      email: 'choi@email.com',
      phone: '010-4567-8901',
    },
    product: {
      id: 'intensive',
      name: '집중 교정 프로그램',
      slug: 'intensive',
      price: 890000,
    },
    amount: 890000,
    status: 'delivered',
    paymentMethod: '카드',
    paymentKey: 'pk_test_901234',
    address: '인천시 연수구 송도대로 321',
    createdAt: Timestamp.fromDate(new Date('2024-12-15T09:15:00')),
    updatedAt: Timestamp.now(),
    paidAt: Timestamp.fromDate(new Date('2024-12-15T09:17:00')),
    shippedAt: Timestamp.fromDate(new Date('2024-12-16T10:00:00')),
    deliveredAt: Timestamp.fromDate(new Date('2024-12-17T14:30:00')),
  },
  {
    id: 'order5',
    orderNumber: 'ORD-20241210-MNO345',
    userId: 'user5',
    customer: {
      name: '정다은',
      email: 'jung@email.com',
      phone: '010-5678-9012',
    },
    product: {
      id: 'basic',
      name: '기본 교정 프로그램',
      slug: 'basic',
      price: 490000,
    },
    amount: 490000,
    status: 'cancelled',
    paymentMethod: '카드',
    paymentKey: 'pk_test_567890',
    createdAt: Timestamp.fromDate(new Date('2024-12-10T18:00:00')),
    updatedAt: Timestamp.now(),
    cancelledAt: Timestamp.fromDate(new Date('2024-12-10T19:30:00')),
  },
];

// 테스트 상품 데이터
const products = [
  {
    id: 'basic',
    name: '기본 교정 프로그램',
    slug: 'basic',
    price: 490000,
    originalPrice: 690000,
    description: '일반적인 문제 행동 교정에 적합한 기본 프로그램입니다.',
    duration: '4주 과정',
    features: ['1:1 맞춤 훈련 (주 2회)', '행동 분석 리포트', '보호자 교육 1회', '카카오톡 상담 지원', '수료 후 1개월 관리'],
    isActive: true,
    order: 1,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'intensive',
    name: '집중 교정 프로그램',
    slug: 'intensive',
    price: 890000,
    originalPrice: 1190000,
    description: '심각한 문제 행동을 집중적으로 교정하는 심화 프로그램입니다.',
    duration: '8주 과정',
    features: ['1:1 맞춤 훈련 (주 3회)', '심층 행동 분석 리포트', '보호자 교육 3회', '24시간 상담 지원', '수료 후 3개월 관리', '무료 재훈련 1회'],
    isActive: true,
    order: 2,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'premium',
    name: '프리미엄 홈 케어',
    slug: 'premium',
    price: 1490000,
    originalPrice: 1990000,
    description: '가정 방문 훈련으로 실제 환경에서 완벽한 교정을 진행합니다.',
    duration: '12주 과정',
    features: ['가정 방문 훈련 (주 2회)', '전문가 행동 분석 리포트', '보호자 교육 무제한', '24시간 긴급 상담', '수료 후 6개월 관리', '무료 재훈련 무제한', '영양 상담 포함'],
    isActive: true,
    order: 3,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

async function seedDatabase() {
  console.log('🌱 Firebase 데이터베이스 시드 시작...\n');

  try {
    // 사용자 데이터 삽입
    console.log('👤 사용자 데이터 삽입 중...');
    for (const user of users) {
      await setDoc(doc(db, 'users', user.id), user);
      console.log(`  ✓ ${user.name} 추가됨`);
    }

    // 상담 데이터 삽입
    console.log('\n💬 상담 데이터 삽입 중...');
    for (const consultation of consultations) {
      await setDoc(doc(db, 'consultations', consultation.id), consultation);
      console.log(`  ✓ ${consultation.name} 상담 추가됨`);
    }

    // 주문 데이터 삽입
    console.log('\n📦 주문 데이터 삽입 중...');
    for (const order of orders) {
      await setDoc(doc(db, 'orders', order.id), order);
      console.log(`  ✓ ${order.orderNumber} 추가됨`);
    }

    // 상품 데이터 삽입
    console.log('\n🏷️ 상품 데이터 삽입 중...');
    for (const product of products) {
      await setDoc(doc(db, 'products', product.id), product);
      console.log(`  ✓ ${product.name} 추가됨`);
    }

    console.log('\n✅ 모든 테스트 데이터가 성공적으로 삽입되었습니다!');
    console.log('\n📊 삽입된 데이터 요약:');
    console.log(`  - 사용자: ${users.length}명`);
    console.log(`  - 상담: ${consultations.length}건`);
    console.log(`  - 주문: ${orders.length}건`);
    console.log(`  - 상품: ${products.length}개`);

  } catch (error) {
    console.error('\n❌ 에러 발생:', error);
    process.exit(1);
  }

  process.exit(0);
}

seedDatabase();

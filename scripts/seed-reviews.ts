// Firebase 테스트 리뷰 데이터 삽입 스크립트
// 실행: npx tsx scripts/seed-reviews.ts

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

// 테스트 리뷰 데이터
const reviews = [
  {
    id: 'review1',
    productSlug: 'basic',
    userId: 'user1',
    userName: '김철수',
    userEmail: 'kim@email.com',
    rating: 5,
    title: '정말 효과가 있었어요!',
    content: '3주 만에 우리 강아지의 짖는 습관이 많이 줄었어요. 훈련사분이 친절하시고 전문적이셨습니다. 보호자 교육도 받아서 집에서도 꾸준히 훈련할 수 있게 되었어요. 강력 추천합니다!',
    images: [],
    dogName: '뽀삐',
    dogBreed: '푸들',
    isVerifiedPurchase: true,
    helpfulCount: 15,
    status: 'approved',
    createdAt: Timestamp.fromDate(new Date('2024-12-15T10:30:00')),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'review2',
    productSlug: 'basic',
    userId: 'user2',
    userName: '이영희',
    userEmail: 'lee@email.com',
    rating: 4,
    title: '산책이 편해졌어요',
    content: '산책할 때 끌림이 심했는데 훈련 후 많이 나아졌습니다. 아직 완벽하진 않지만 계속 연습 중이에요. 훈련사님이 알려주신 방법대로 하니까 점점 좋아지고 있어요.',
    images: [],
    dogName: '코코',
    dogBreed: '비숑',
    isVerifiedPurchase: true,
    helpfulCount: 8,
    status: 'approved',
    createdAt: Timestamp.fromDate(new Date('2024-12-10T14:20:00')),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'review3',
    productSlug: 'intensive',
    userId: 'user3',
    userName: '박민수',
    userEmail: 'park@email.com',
    rating: 5,
    title: '공격성이 사라졌어요',
    content: '다른 강아지를 보면 공격적으로 변하던 우리 시바가 이제는 차분해졌어요. 8주 과정이 길다고 생각했는데, 확실히 효과가 있었습니다. 투자한 시간과 비용이 아깝지 않아요. 정말 감사합니다!',
    images: [],
    dogName: '시로',
    dogBreed: '시바 이누',
    isVerifiedPurchase: true,
    helpfulCount: 23,
    status: 'approved',
    createdAt: Timestamp.fromDate(new Date('2024-12-08T09:15:00')),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'review4',
    productSlug: 'intensive',
    userId: 'user4',
    userName: '최지현',
    userEmail: 'choi@email.com',
    rating: 5,
    title: '분리불안이 많이 좋아졌어요',
    content: '집을 비울 때마다 짖고 물건을 망가뜨리던 우리 강아지가 이제는 혼자 있어도 괜찮아졌어요. 훈련사님이 원인을 정확히 분석해주시고 맞춤 훈련을 진행해주셨어요. 24시간 상담 지원도 정말 큰 도움이 됐습니다.',
    images: [],
    dogName: '몽이',
    dogBreed: '말티즈',
    isVerifiedPurchase: true,
    helpfulCount: 31,
    status: 'approved',
    createdAt: Timestamp.fromDate(new Date('2024-12-05T16:45:00')),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'review5',
    productSlug: 'premium',
    userId: 'user5',
    userName: '정다은',
    userEmail: 'jung@email.com',
    rating: 5,
    title: '최고의 선택이었습니다',
    content: '프리미엄 홈 케어는 정말 다릅니다. 집에서 직접 훈련을 받으니 실제 생활 환경에서 바로 적용할 수 있었어요. 문제 행동이 발생하는 상황에서 바로 교정해주시니 효과가 빨랐습니다. 영양 상담까지 받아서 건강 관리도 함께 할 수 있었어요. 가격이 비싸지만 그만한 가치가 있습니다!',
    images: [],
    dogName: '보리',
    dogBreed: '골든 리트리버',
    isVerifiedPurchase: true,
    helpfulCount: 45,
    status: 'approved',
    createdAt: Timestamp.fromDate(new Date('2024-12-01T11:00:00')),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'review6',
    productSlug: 'basic',
    userId: 'user6',
    userName: '강지민',
    rating: 4,
    title: '기본기를 잘 잡아줘요',
    content: '처음 훈련을 시작하는 보호자에게 추천합니다. 기본 명령어부터 차근차근 알려주셔서 저도 훈련 방법을 배울 수 있었어요. 다만 4주가 조금 짧게 느껴지긴 했어요.',
    images: [],
    dogName: '루루',
    dogBreed: '포메라니안',
    isVerifiedPurchase: false,
    helpfulCount: 5,
    status: 'approved',
    createdAt: Timestamp.fromDate(new Date('2024-11-28T13:30:00')),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'review7',
    productSlug: 'premium',
    userId: 'user7',
    userName: '윤서연',
    rating: 5,
    title: 'VIP 서비스 받는 기분이에요',
    content: '훈련사님이 직접 집에 오셔서 우리 강아지의 생활 환경을 파악하고 맞춤 훈련을 진행해주셨어요. 무제한 보호자 교육 덕분에 제가 직접 훈련할 수 있는 자신감도 생겼습니다. 사후 관리도 철저해서 6개월 동안 문제가 생기면 바로 상담받을 수 있어요.',
    images: [],
    dogName: '해피',
    dogBreed: '래브라도 리트리버',
    isVerifiedPurchase: true,
    helpfulCount: 28,
    status: 'approved',
    createdAt: Timestamp.fromDate(new Date('2024-11-25T10:00:00')),
    updatedAt: Timestamp.now(),
  },
];

async function seedReviews() {
  console.log('🌟 리뷰 데이터 시드 시작...\n');

  try {
    console.log('📝 리뷰 데이터 삽입 중...');
    for (const review of reviews) {
      await setDoc(doc(db, 'reviews', review.id), review);
      console.log(`  ✓ ${review.userName}님의 "${review.title}" 리뷰 추가됨`);
    }

    console.log('\n✅ 모든 리뷰 데이터가 성공적으로 삽입되었습니다!');
    console.log(`\n📊 삽입된 리뷰 요약:`);
    console.log(`  - 기본 교정 프로그램: ${reviews.filter(r => r.productSlug === 'basic').length}개`);
    console.log(`  - 집중 교정 프로그램: ${reviews.filter(r => r.productSlug === 'intensive').length}개`);
    console.log(`  - 프리미엄 홈 케어: ${reviews.filter(r => r.productSlug === 'premium').length}개`);

  } catch (error) {
    console.error('\n❌ 에러 발생:', error);
    process.exit(1);
  }

  process.exit(0);
}

seedReviews();

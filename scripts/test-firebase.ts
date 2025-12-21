// Firebase 연결 테스트 스크립트
// 실행: npx tsx scripts/test-firebase.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, Timestamp } from 'firebase/firestore';
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

async function testFirebase() {
  console.log('🔥 Firebase 연결 테스트 시작...\n');

  try {
    // 1. 테스트 상담 데이터 저장
    console.log('1️⃣ 상담 데이터 저장 테스트...');
    const testConsultation = {
      id: 'test-' + Date.now(),
      name: '테스트 사용자',
      phone: '010-0000-0000',
      product: '테스트 상품',
      productSlug: 'test',
      dogName: '테스트 강아지',
      dogBreed: '테스트 견종',
      message: '테스트 메시지',
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const consultationRef = doc(db, 'consultations', testConsultation.id);
    await setDoc(consultationRef, testConsultation);
    console.log('   ✅ 상담 데이터 저장 성공!');

    // 2. 저장된 데이터 읽기
    console.log('\n2️⃣ 저장된 상담 데이터 읽기 테스트...');
    const querySnapshot = await getDocs(collection(db, 'consultations'));
    console.log(`   ✅ 총 ${querySnapshot.size}개의 상담 데이터 조회됨`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`   - ${data.name} (${data.phone})`);
    });

    // 3. 주문 데이터 읽기
    console.log('\n3️⃣ 주문 데이터 읽기 테스트...');
    const ordersSnapshot = await getDocs(collection(db, 'orders'));
    console.log(`   ✅ 총 ${ordersSnapshot.size}개의 주문 데이터 조회됨`);

    // 4. 사용자 데이터 읽기
    console.log('\n4️⃣ 사용자 데이터 읽기 테스트...');
    const usersSnapshot = await getDocs(collection(db, 'users'));
    console.log(`   ✅ 총 ${usersSnapshot.size}개의 사용자 데이터 조회됨`);

    console.log('\n✅ 모든 Firebase 테스트 성공!');
    console.log('\n📋 Firebase Console에서 확인하세요:');
    console.log('   https://console.firebase.google.com/project/test-jm-fae9a/firestore');

  } catch (error) {
    console.error('\n❌ 에러 발생:', error);
    console.log('\n⚠️ Firestore 보안 규칙을 확인하세요:');
    console.log('   1. Firebase Console > Firestore Database > Rules');
    console.log('   2. 다음 규칙으로 변경:');
    console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
`);
  }

  process.exit(0);
}

testFirebase();

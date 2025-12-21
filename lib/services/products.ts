import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: ProductFeature[];
  suitable?: string[];
  schedule?: ProductSchedule[];
  duration?: string;
  isActive: boolean;
  isPopular?: boolean;
  isPremium?: boolean;
  salesCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductFeature {
  text: string;
  detail: string;
}

export interface ProductSchedule {
  week: string;
  content: string;
}

const COLLECTION_NAME = 'products';

// 상품 생성
export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'salesCount'>): Promise<Product> => {
  const productRef = doc(collection(db, COLLECTION_NAME));
  const now = Timestamp.now();

  const product: Product = {
    ...productData,
    id: productRef.id,
    salesCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(productRef, product);
  return product;
};

// 상품 조회 (ID)
export const getProductById = async (productId: string): Promise<Product | null> => {
  const productRef = doc(db, COLLECTION_NAME, productId);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    return productSnap.data() as Product;
  }
  return null;
};

// 상품 조회 (Slug)
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data() as Product;
  }
  return null;
};

// 모든 상품 조회
export const getAllProducts = async (): Promise<Product[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as Product);
};

// 활성 상품만 조회
export const getActiveProducts = async (): Promise<Product[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as Product);
};

// 상품 업데이트
export const updateProduct = async (productId: string, data: Partial<Product>): Promise<void> => {
  const productRef = doc(db, COLLECTION_NAME, productId);
  await updateDoc(productRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

// 상품 삭제
export const deleteProduct = async (productId: string): Promise<void> => {
  const productRef = doc(db, COLLECTION_NAME, productId);
  await deleteDoc(productRef);
};

// 상품 활성/비활성 토글
export const toggleProductActive = async (productId: string): Promise<void> => {
  const product = await getProductById(productId);
  if (product) {
    await updateProduct(productId, { isActive: !product.isActive });
  }
};

// 판매 수량 증가
export const incrementSalesCount = async (productId: string): Promise<void> => {
  const product = await getProductById(productId);
  if (product) {
    await updateProduct(productId, { salesCount: product.salesCount + 1 });
  }
};

// 초기 상품 데이터 시딩
export const seedInitialProducts = async (): Promise<void> => {
  const products = await getAllProducts();
  if (products.length > 0) return; // 이미 상품이 있으면 스킵

  const initialProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'salesCount'>[] = [
    {
      name: '기본 교정 프로그램',
      slug: 'basic',
      price: 490000,
      originalPrice: 690000,
      description: '반려견의 기본적인 행동 교정을 위한 입문 프로그램',
      duration: '4주 과정',
      features: [
        { text: '1:1 맞춤 훈련 (주 2회)', detail: '전문 훈련사가 직접 방문하여 1:1 맞춤 훈련 진행' },
        { text: '행동 분석 리포트', detail: '강아지의 문제 행동 원인 분석 및 개선 방향 제시' },
        { text: '보호자 교육 1회', detail: '효과적인 훈련 방법과 일상 관리법 교육' },
        { text: '카카오톡 상담 지원', detail: '평일 10:00-18:00 카카오톡 문의 가능' },
        { text: '수료 후 1개월 관리', detail: '훈련 종료 후 1개월간 사후 관리 지원' },
      ],
      suitable: [
        '가벼운 짖음 문제가 있는 강아지',
        '산책 시 끌림이 심한 강아지',
        '기본 명령어 훈련이 필요한 강아지',
        '처음 훈련을 시작하는 보호자',
      ],
      schedule: [
        { week: '1주차', content: '행동 분석 및 훈련 계획 수립' },
        { week: '2주차', content: '기본 명령어 및 문제 행동 교정 시작' },
        { week: '3주차', content: '심화 훈련 및 보호자 교육' },
        { week: '4주차', content: '훈련 마무리 및 사후 관리 안내' },
      ],
      isActive: true,
      isPopular: false,
      isPremium: false,
    },
    {
      name: '집중 교정 프로그램',
      slug: 'intensive',
      price: 890000,
      originalPrice: 1190000,
      description: '문제 행동을 집중적으로 교정하는 심화 프로그램',
      duration: '8주 과정',
      features: [
        { text: '1:1 맞춤 훈련 (주 3회)', detail: '주 3회 집중 훈련으로 빠른 효과 기대' },
        { text: '심층 행동 분석 리포트', detail: '문제 행동의 근본 원인까지 분석하는 상세 리포트' },
        { text: '보호자 교육 3회', detail: '가정에서도 일관된 훈련이 가능하도록 교육' },
        { text: '24시간 카카오톡 상담', detail: '긴급 상황 시 24시간 상담 가능' },
        { text: '수료 후 3개월 관리', detail: '훈련 종료 후 3개월간 철저한 사후 관리' },
        { text: '무료 재훈련 1회', detail: '필요 시 1회 무료 재훈련 제공' },
      ],
      suitable: [
        '공격성 문제가 있는 강아지',
        '분리불안이 심한 강아지',
        '다른 훈련으로 효과를 보지 못한 경우',
        '빠른 시간 내 교정이 필요한 보호자',
        '심각한 짖음 문제가 있는 강아지',
      ],
      schedule: [
        { week: '1-2주차', content: '심층 행동 분석 및 맞춤 훈련 계획 수립' },
        { week: '3-4주차', content: '핵심 문제 행동 집중 교정' },
        { week: '5-6주차', content: '심화 훈련 및 상황별 대응 훈련' },
        { week: '7-8주차', content: '보호자 교육 및 자립 훈련, 사후 관리 안내' },
      ],
      isActive: true,
      isPopular: true,
      isPremium: false,
    },
    {
      name: '프리미엄 홈 케어',
      slug: 'premium',
      price: 1490000,
      originalPrice: 1990000,
      description: '전문 훈련사가 직접 방문하여 교육하는 VIP 프로그램',
      duration: '12주 과정',
      features: [
        { text: '가정 방문 훈련 (주 2회)', detail: '집으로 직접 방문하여 실제 환경에서 훈련' },
        { text: '전문가 행동 분석 리포트', detail: '가정 환경까지 고려한 종합 행동 분석' },
        { text: '보호자 교육 무제한', detail: '가족 모두가 일관된 훈련이 가능하도록 교육' },
        { text: '24시간 긴급 상담', detail: '언제든 긴급 상황 시 즉시 상담 가능' },
        { text: '수료 후 6개월 관리', detail: '장기간 사후 관리로 완벽한 교정 유지' },
        { text: '무료 재훈련 무제한', detail: '필요 시 무제한 재훈련 제공' },
        { text: '영양 상담 포함', detail: '행동에 영향을 주는 영양 상태까지 관리' },
      ],
      suitable: [
        '집에서 특히 문제 행동을 보이는 강아지',
        '외출이 어려운 보호자',
        '여러 마리를 함께 키우는 가정',
        '최고 수준의 서비스를 원하는 보호자',
        '완벽한 교정과 장기 관리가 필요한 경우',
      ],
      schedule: [
        { week: '1-3주차', content: '가정 환경 분석 및 맞춤 훈련 계획 수립' },
        { week: '4-6주차', content: '핵심 문제 행동 집중 교정' },
        { week: '7-9주차', content: '심화 훈련 및 가족 교육' },
        { week: '10-12주차', content: '자립 훈련 및 장기 사후 관리 체계 구축' },
      ],
      isActive: true,
      isPopular: false,
      isPremium: true,
    },
  ];

  for (const product of initialProducts) {
    await createProduct(product);
  }
};

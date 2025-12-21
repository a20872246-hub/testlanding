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
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';

export interface Review {
  id: string;
  productSlug: string;
  userId: string;
  userName: string;
  userEmail?: string;
  rating: number; // 1-5
  title: string;
  content: string;
  images: string[]; // Firebase Storage URLs
  dogName?: string;
  dogBreed?: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const COLLECTION_NAME = 'reviews';

// 이미지 업로드
export const uploadReviewImage = async (file: File, reviewId: string): Promise<string> => {
  const timestamp = Date.now();
  const fileName = `reviews/${reviewId}/${timestamp}_${file.name}`;
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

// 이미지 삭제
export const deleteReviewImage = async (imageUrl: string): Promise<void> => {
  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('이미지 삭제 오류:', error);
  }
};

// 리뷰 생성
export const createReview = async (
  reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpfulCount' | 'status'>,
  imageFiles?: File[]
): Promise<Review> => {
  const reviewRef = doc(collection(db, COLLECTION_NAME));
  const now = Timestamp.now();

  // 이미지 업로드
  let imageUrls: string[] = [];
  if (imageFiles && imageFiles.length > 0) {
    for (const file of imageFiles) {
      const url = await uploadReviewImage(file, reviewRef.id);
      imageUrls.push(url);
    }
  }

  const review: Review = {
    ...reviewData,
    id: reviewRef.id,
    images: imageUrls,
    helpfulCount: 0,
    status: 'approved', // 자동 승인 (관리자 검토 필요시 'pending'으로 변경)
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(reviewRef, review);
  return review;
};

// 리뷰 조회 (ID)
export const getReviewById = async (reviewId: string): Promise<Review | null> => {
  const reviewRef = doc(db, COLLECTION_NAME, reviewId);
  const reviewSnap = await getDoc(reviewRef);

  if (reviewSnap.exists()) {
    return reviewSnap.data() as Review;
  }
  return null;
};

// 상품별 리뷰 조회
export const getReviewsByProduct = async (productSlug: string): Promise<Review[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('productSlug', '==', productSlug),
    where('status', '==', 'approved'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as Review);
};

// 사용자별 리뷰 조회
export const getReviewsByUser = async (userId: string): Promise<Review[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as Review);
};

// 모든 리뷰 조회 (관리자용)
export const getAllReviews = async (): Promise<Review[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as Review);
};

// 상품별 평균 평점 계산
export const getProductAverageRating = async (productSlug: string): Promise<{ average: number; count: number }> => {
  const reviews = await getReviewsByProduct(productSlug);

  if (reviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
  };
};

// 리뷰 업데이트
export const updateReview = async (reviewId: string, data: Partial<Review>): Promise<void> => {
  const reviewRef = doc(db, COLLECTION_NAME, reviewId);
  await updateDoc(reviewRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

// 리뷰 삭제
export const deleteReview = async (reviewId: string): Promise<void> => {
  const review = await getReviewById(reviewId);

  // 이미지 삭제
  if (review && review.images.length > 0) {
    for (const imageUrl of review.images) {
      await deleteReviewImage(imageUrl);
    }
  }

  const reviewRef = doc(db, COLLECTION_NAME, reviewId);
  await deleteDoc(reviewRef);
};

// 리뷰 상태 변경 (관리자용)
export const updateReviewStatus = async (reviewId: string, status: Review['status']): Promise<void> => {
  await updateReview(reviewId, { status });
};

// 도움이 됐어요 카운트 증가
export const incrementHelpfulCount = async (reviewId: string): Promise<void> => {
  const review = await getReviewById(reviewId);
  if (review) {
    await updateReview(reviewId, { helpfulCount: review.helpfulCount + 1 });
  }
};

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
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface User {
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

export interface Address {
  id: string;
  name: string;
  recipient: string;
  phone: string;
  address: string;
  addressDetail?: string;
  zipCode: string;
  isDefault: boolean;
}

const COLLECTION_NAME = 'users';

// 사용자 생성
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<User> => {
  const userRef = doc(collection(db, COLLECTION_NAME));
  const now = Timestamp.now();

  const user: User = {
    ...userData,
    id: userRef.id,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(userRef, user);
  return user;
};

// 사용자 조회 (ID)
export const getUserById = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, COLLECTION_NAME, userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as User;
  }
  return null;
};

// 사용자 조회 (이메일)
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const q = query(collection(db, COLLECTION_NAME), where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data() as User;
  }
  return null;
};

// 모든 사용자 조회
export const getAllUsers = async (): Promise<User[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as User);
};

// 사용자 업데이트
export const updateUser = async (userId: string, data: Partial<User>): Promise<void> => {
  const userRef = doc(db, COLLECTION_NAME, userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

// 사용자 삭제
export const deleteUser = async (userId: string): Promise<void> => {
  const userRef = doc(db, COLLECTION_NAME, userId);
  await deleteDoc(userRef);
};

// 사용자 상태 변경
export const updateUserStatus = async (userId: string, status: User['status']): Promise<void> => {
  await updateUser(userId, { status });
};

// 마지막 로그인 시간 업데이트
export const updateLastLogin = async (userId: string): Promise<void> => {
  await updateUser(userId, { lastLoginAt: Timestamp.now() });
};

// 배송지 추가
export const addAddress = async (userId: string, address: Omit<Address, 'id'>): Promise<void> => {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');

  const newAddress: Address = {
    ...address,
    id: Date.now().toString(),
  };

  const addresses = user.addresses || [];

  // 기본 배송지로 설정하면 다른 배송지 기본값 해제
  if (newAddress.isDefault) {
    addresses.forEach(addr => addr.isDefault = false);
  }

  await updateUser(userId, { addresses: [...addresses, newAddress] });
};

// 배송지 삭제
export const removeAddress = async (userId: string, addressId: string): Promise<void> => {
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');

  const addresses = (user.addresses || []).filter(addr => addr.id !== addressId);
  await updateUser(userId, { addresses });
};

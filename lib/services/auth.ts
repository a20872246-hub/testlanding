import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';
import { createUser, getUserByEmail, updateLastLogin, User } from './users';
import { Timestamp } from 'firebase/firestore';

// Google Provider
const googleProvider = new GoogleAuthProvider();

// 이메일/비밀번호 회원가입
export const signUpWithEmail = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Firebase Auth 프로필 업데이트
  await updateProfile(userCredential.user, { displayName: name });

  // Firestore에 사용자 정보 저장
  const user = await createUser({
    name,
    email,
    provider: 'email',
  });

  return user;
};

// 이메일/비밀번호 로그인
export const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  // Firestore에서 사용자 정보 가져오기
  let user = await getUserByEmail(email);

  if (!user) {
    // Firestore에 사용자가 없으면 생성
    user = await createUser({
      name: userCredential.user.displayName || email.split('@')[0],
      email,
      provider: 'email',
    });
  }

  // 마지막 로그인 시간 업데이트
  await updateLastLogin(user.id);

  return user;
};

// Google 로그인
export const signInWithGoogle = async (): Promise<User | null> => {
  const result = await signInWithPopup(auth, googleProvider);
  const { user: firebaseUser } = result;

  // Firestore에서 사용자 정보 가져오기
  let user = await getUserByEmail(firebaseUser.email!);

  if (!user) {
    // Firestore에 사용자가 없으면 생성
    user = await createUser({
      name: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
      email: firebaseUser.email!,
      provider: 'google',
      profileImage: firebaseUser.photoURL || undefined,
    });
  }

  // 마지막 로그인 시간 업데이트
  await updateLastLogin(user.id);

  return user;
};

// 로그아웃
export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
  localStorage.removeItem('user');
};

// 현재 사용자 가져오기
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

// 인증 상태 변경 리스너
export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// 관리자 로그인 (별도 처리)
export const adminSignIn = async (email: string, password: string): Promise<boolean> => {
  // 간단한 관리자 인증 (실제로는 더 안전한 방법 사용 권장)
  const adminEmail = 'admin@admin.com';
  const adminPassword = 'admin123';

  if (email === adminEmail && password === adminPassword) {
    localStorage.setItem('adminUser', JSON.stringify({
      email,
      name: '관리자',
      role: 'admin',
    }));
    return true;
  }

  return false;
};

// 관리자 로그아웃
export const adminSignOut = async (): Promise<void> => {
  localStorage.removeItem('adminUser');
};

// 관리자 확인
export const isAdmin = (): boolean => {
  const adminUser = localStorage.getItem('adminUser');
  return !!adminUser;
};

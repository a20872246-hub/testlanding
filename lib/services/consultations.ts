import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

export type ConsultationStatus = 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';

export interface Consultation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product: string;
  productSlug?: string;
  dogName?: string;
  dogBreed?: string;
  dogAge?: string;
  message?: string;
  address?: string;
  status: ConsultationStatus;
  scheduledAt?: Timestamp;
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const COLLECTION_NAME = 'consultations';

// 상담 신청 생성
export const createConsultation = async (consultationData: Omit<Consultation, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Consultation> => {
  console.log('Creating consultation with data:', consultationData);

  const consultationRef = doc(collection(db, COLLECTION_NAME));
  const now = Timestamp.now();

  const consultation: Consultation = {
    ...consultationData,
    id: consultationRef.id,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  console.log('Consultation object:', consultation);

  try {
    await setDoc(consultationRef, consultation);
    console.log('Consultation saved successfully with ID:', consultationRef.id);
  } catch (error) {
    console.error('Firebase setDoc error:', error);
    throw error;
  }

  return consultation;
};

// 상담 신청 조회 (ID)
export const getConsultationById = async (consultationId: string): Promise<Consultation | null> => {
  const consultationRef = doc(db, COLLECTION_NAME, consultationId);
  const consultationSnap = await getDoc(consultationRef);

  if (consultationSnap.exists()) {
    return consultationSnap.data() as Consultation;
  }
  return null;
};

// 모든 상담 신청 조회
export const getAllConsultations = async (): Promise<Consultation[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as Consultation);
};

// 상태별 상담 신청 조회
export const getConsultationsByStatus = async (status: ConsultationStatus): Promise<Consultation[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as Consultation);
};

// 대기 중인 상담 신청 개수
export const getPendingConsultationsCount = async (): Promise<number> => {
  const consultations = await getConsultationsByStatus('pending');
  return consultations.length;
};

// 상담 신청 업데이트
export const updateConsultation = async (consultationId: string, data: Partial<Consultation>): Promise<void> => {
  const consultationRef = doc(db, COLLECTION_NAME, consultationId);
  await updateDoc(consultationRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

// 상담 상태 변경
export const updateConsultationStatus = async (consultationId: string, status: ConsultationStatus): Promise<void> => {
  await updateConsultation(consultationId, { status });
};

// 상담 일정 예약
export const scheduleConsultation = async (consultationId: string, scheduledAt: Date): Promise<void> => {
  await updateConsultation(consultationId, {
    status: 'scheduled',
    scheduledAt: Timestamp.fromDate(scheduledAt),
  });
};

// 상담 메모 추가
export const addConsultationNotes = async (consultationId: string, notes: string): Promise<void> => {
  await updateConsultation(consultationId, { notes });
};

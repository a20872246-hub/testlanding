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

export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'shipping' | 'delivered' | 'cancelled';

export interface Order {
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
  status: OrderStatus;
  paymentMethod?: string;
  paymentKey?: string;
  address?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
  shippedAt?: Timestamp;
  deliveredAt?: Timestamp;
  cancelledAt?: Timestamp;
}

const COLLECTION_NAME = 'orders';

// 주문번호 생성
const generateOrderNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${year}${month}${day}-${random}`;
};

// 주문 생성
export const createOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Order> => {
  const orderRef = doc(collection(db, COLLECTION_NAME));
  const now = Timestamp.now();

  const order: Order = {
    ...orderData,
    id: orderRef.id,
    orderNumber: generateOrderNumber(),
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(orderRef, order);
  return order;
};

// 주문 조회 (ID)
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const orderRef = doc(db, COLLECTION_NAME, orderId);
  const orderSnap = await getDoc(orderRef);

  if (orderSnap.exists()) {
    return orderSnap.data() as Order;
  }
  return null;
};

// 주문 조회 (주문번호)
export const getOrderByOrderNumber = async (orderNumber: string): Promise<Order | null> => {
  const q = query(collection(db, COLLECTION_NAME), where('orderNumber', '==', orderNumber));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data() as Order;
  }
  return null;
};

// 모든 주문 조회
export const getAllOrders = async (): Promise<Order[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as Order);
};

// 사용자별 주문 조회
export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as Order);
};

// 상태별 주문 조회
export const getOrdersByStatus = async (status: OrderStatus): Promise<Order[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as Order);
};

// 주문 업데이트
export const updateOrder = async (orderId: string, data: Partial<Order>): Promise<void> => {
  const orderRef = doc(db, COLLECTION_NAME, orderId);
  await updateDoc(orderRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

// 주문 상태 변경
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  const updateData: Partial<Order> = { status };

  // 상태에 따른 시간 기록
  switch (status) {
    case 'paid':
      updateData.paidAt = Timestamp.now();
      break;
    case 'shipping':
      updateData.shippedAt = Timestamp.now();
      break;
    case 'delivered':
      updateData.deliveredAt = Timestamp.now();
      break;
    case 'cancelled':
      updateData.cancelledAt = Timestamp.now();
      break;
  }

  await updateOrder(orderId, updateData);
};

// 결제 완료 처리
export const completePayment = async (orderId: string, paymentKey: string, paymentMethod: string): Promise<void> => {
  await updateOrder(orderId, {
    status: 'paid',
    paymentKey,
    paymentMethod,
    paidAt: Timestamp.now(),
  });
};

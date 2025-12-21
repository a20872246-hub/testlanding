'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Phone, Calendar, MessageSquare, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllConsultations, updateConsultationStatus } from '@/lib/services/consultations';

type ConsultationStatus = 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';

interface Consultation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product: string;
  dogBreed?: string;
  dogAge?: string;
  dogName?: string;
  message?: string;
  status: ConsultationStatus;
  createdAt: string;
  scheduledAt?: string;
  notes?: string;
  address?: string;
}

const statusConfig: Record<ConsultationStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: '대기', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  contacted: { label: '연락완료', color: 'bg-blue-500/20 text-blue-400', icon: Phone },
  scheduled: { label: '일정확정', color: 'bg-purple-500/20 text-purple-400', icon: Calendar },
  completed: { label: '완료', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  cancelled: { label: '취소', color: 'bg-red-500/20 text-red-400', icon: XCircle },
};

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const data = await getAllConsultations();
        const formattedData: Consultation[] = data.map(c => ({
          id: c.id || '',
          name: c.name || '',
          phone: c.phone || '',
          email: c.email,
          product: c.product || '',
          dogBreed: c.dogBreed,
          dogAge: c.dogAge,
          dogName: c.dogName,
          message: c.message,
          status: (c.status || 'pending') as ConsultationStatus,
          createdAt: c.createdAt ? new Date(c.createdAt.seconds * 1000).toLocaleString('ko-KR') : '',
          scheduledAt: typeof c.scheduledAt === 'string' ? c.scheduledAt : undefined,
          notes: c.notes,
          address: c.address,
        }));
        setConsultations(formattedData);
      } catch (error) {
        console.error('상담 데이터 로딩 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = consultations.filter((c) => c.status === 'pending').length;

  const handleViewConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setNotes(consultation.notes || '');
    setShowDetailModal(true);
  };

  const handleUpdateStatus = async (consultationId: string, newStatus: ConsultationStatus) => {
    try {
      await updateConsultationStatus(consultationId, newStatus);
      setConsultations(
        consultations.map((c) =>
          c.id === consultationId ? { ...c, status: newStatus, notes } : c
        )
      );
      if (selectedConsultation?.id === consultationId) {
        setSelectedConsultation({ ...selectedConsultation, status: newStatus, notes });
      }
    } catch (error) {
      console.error('상태 업데이트 오류:', error);
      alert('상태 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleSaveNotes = () => {
    if (selectedConsultation) {
      setConsultations(
        consultations.map((c) =>
          c.id === selectedConsultation.id ? { ...c, notes } : c
        )
      );
      setSelectedConsultation({ ...selectedConsultation, notes });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">상담 신청</h1>
          <p className="text-gray-400 mt-1">
            총 {consultations.length}건 · 대기 중 {pendingCount}건
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="이름, 전화번호 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">전체 상태</option>
            <option value="pending">대기</option>
            <option value="contacted">연락완료</option>
            <option value="scheduled">일정확정</option>
            <option value="completed">완료</option>
            <option value="cancelled">취소</option>
          </select>
        </div>
      </div>

      {/* Consultations List */}
      <div className="space-y-4">
        {filteredConsultations.map((consultation) => {
          const StatusIcon = statusConfig[consultation.status].icon;
          return (
            <div
              key={consultation.id}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-white">{consultation.name}</h3>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${statusConfig[consultation.status].color}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig[consultation.status].label}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {consultation.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {consultation.product}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {consultation.createdAt}
                    </span>
                  </div>
                  {consultation.message && (
                    <p className="mt-3 text-gray-300 text-sm line-clamp-2">{consultation.message}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleViewConsultation(consultation)}
                    className="border-gray-600 text-gray-300"
                  >
                    상세보기
                  </Button>
                  {consultation.status === 'pending' && (
                    <Button
                      onClick={() => handleUpdateStatus(consultation.id, 'contacted')}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      연락완료
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Consultation Detail Modal */}
      {showDetailModal && selectedConsultation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">상담 신청 상세</h3>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${statusConfig[selectedConsultation.status].color}`}
              >
                {statusConfig[selectedConsultation.status].label}
              </span>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div className="p-4 bg-gray-900/50 rounded-xl">
                <p className="text-gray-400 text-sm mb-3">고객 정보</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">이름</p>
                    <p className="text-white">{selectedConsultation.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">전화번호</p>
                    <p className="text-white">{selectedConsultation.phone}</p>
                  </div>
                  {selectedConsultation.email && (
                    <div>
                      <p className="text-gray-500 text-sm">이메일</p>
                      <p className="text-white">{selectedConsultation.email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-500 text-sm">관심 상품</p>
                    <p className="text-white">{selectedConsultation.product}</p>
                  </div>
                </div>
              </div>

              {/* Dog Info */}
              {(selectedConsultation.dogBreed || selectedConsultation.dogAge) && (
                <div className="p-4 bg-gray-900/50 rounded-xl">
                  <p className="text-gray-400 text-sm mb-3">반려견 정보</p>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedConsultation.dogBreed && (
                      <div>
                        <p className="text-gray-500 text-sm">견종</p>
                        <p className="text-white">{selectedConsultation.dogBreed}</p>
                      </div>
                    )}
                    {selectedConsultation.dogAge && (
                      <div>
                        <p className="text-gray-500 text-sm">나이</p>
                        <p className="text-white">{selectedConsultation.dogAge}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Message */}
              {selectedConsultation.message && (
                <div className="p-4 bg-gray-900/50 rounded-xl">
                  <p className="text-gray-400 text-sm mb-2">문의 내용</p>
                  <p className="text-white">{selectedConsultation.message}</p>
                </div>
              )}

              {/* Schedule */}
              {selectedConsultation.scheduledAt && (
                <div className="p-4 bg-purple-900/30 border border-purple-500/30 rounded-xl">
                  <p className="text-purple-400 text-sm mb-2">예약 일정</p>
                  <p className="text-white font-medium">{selectedConsultation.scheduledAt}</p>
                </div>
              )}

              {/* Notes */}
              <div className="p-4 bg-gray-900/50 rounded-xl">
                <p className="text-gray-400 text-sm mb-2">메모</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 min-h-[100px]"
                  placeholder="상담 메모를 입력하세요..."
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-2 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                >
                  메모 저장
                </button>
              </div>

              {/* Status Update */}
              <div className="p-4 bg-gray-900/50 rounded-xl">
                <p className="text-gray-400 text-sm mb-3">상태 변경</p>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'contacted', 'scheduled', 'completed', 'cancelled'] as ConsultationStatus[]).map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(selectedConsultation.id, status)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          selectedConsultation.status === status
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {statusConfig[status].label}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDetailModal(false)}
                className="flex-1 border-gray-600 text-gray-300"
              >
                닫기
              </Button>
              <a
                href={`tel:${selectedConsultation.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 transition-colors"
              >
                <Phone className="h-4 w-4" />
                전화하기
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

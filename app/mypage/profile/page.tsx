'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Camera, Plus, MapPin, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  profileImage?: string;
}

interface Address {
  id: string;
  name: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
  });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: '',
    address: '',
    detailAddress: '',
    zipCode: '',
    isDefault: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setProfile({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        birthDate: userData.birthDate || '',
        profileImage: userData.profileImage,
      });
    }

    const storedAddresses = localStorage.getItem('addresses');
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : {};
    localStorage.setItem('user', JSON.stringify({ ...userData, ...profile }));

    setIsEditing(false);
    setIsSaving(false);
  };

  const handleAddAddress = () => {
    const address: Address = {
      ...newAddress,
      id: Date.now().toString(),
    };

    if (address.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })));
    }

    const updatedAddresses = [...addresses, address];
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));

    setNewAddress({
      name: '',
      address: '',
      detailAddress: '',
      zipCode: '',
      isDefault: false,
    });
    setShowAddressModal(false);
  };

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter(a => a.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  const handleSetDefaultAddress = (id: string) => {
    const updatedAddresses = addresses.map(a => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white">내 정보</h1>

      {/* Profile Section */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">기본 정보</h2>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            >
              수정
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl text-white font-bold">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                  <Camera className="h-5 w-5 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <User className="h-4 w-4" />
                  이름
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-white font-medium">{profile.name || '-'}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <Mail className="h-4 w-4" />
                  이메일
                </label>
                <p className="text-white font-medium">{profile.email}</p>
                {isEditing && (
                  <p className="text-gray-500 text-xs mt-1">이메일은 변경할 수 없습니다</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <Phone className="h-4 w-4" />
                  전화번호
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                    placeholder="010-1234-5678"
                  />
                ) : (
                  <p className="text-white font-medium">{profile.phone || '-'}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <Calendar className="h-4 w-4" />
                  생년월일
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profile.birthDate}
                    onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-white font-medium">{profile.birthDate || '-'}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="border-gray-500/50 text-gray-400 hover:bg-gray-500/10"
                >
                  취소
                </Button>
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {isSaving ? '저장 중...' : '저장하기'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-400" />
            배송지 관리
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddressModal(true)}
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
          >
            <Plus className="h-4 w-4 mr-1" />
            새 주소 추가
          </Button>
        </div>

        {addresses.length > 0 ? (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-start justify-between p-4 bg-black/30 rounded-xl"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium">{address.name}</p>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 bg-purple-500/30 text-purple-300 text-xs rounded-full">
                        기본 배송지
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">[{address.zipCode}]</p>
                  <p className="text-gray-400 text-sm">{address.address} {address.detailAddress}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefaultAddress(address.id)}
                      className="p-2 text-gray-500 hover:text-purple-400 transition-colors"
                      title="기본 배송지로 설정"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">등록된 배송지가 없습니다</p>
        )}
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/80 border border-purple-500/30 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-6">새 배송지 추가</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">배송지명</label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="집, 회사 등"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">우편번호</label>
                <input
                  type="text"
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="12345"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">주소</label>
                <input
                  type="text"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="서울시 강남구 역삼동"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">상세주소</label>
                <input
                  type="text"
                  value={newAddress.detailAddress}
                  onChange={(e) => setNewAddress({ ...newAddress, detailAddress: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="123동 456호"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                  className="w-4 h-4 rounded border-purple-500/30 bg-black/50 text-purple-500"
                />
                <span className="text-gray-400 text-sm">기본 배송지로 설정</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddressModal(false)}
                className="flex-1 border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                취소
              </Button>
              <Button
                onClick={handleAddAddress}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                추가
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

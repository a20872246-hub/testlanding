'use client';

import { useState } from 'react';
import { Save, Bell, Shield, CreditCard, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Dog Training',
    siteDescription: '전문 반려견 행동 교정 서비스',
    contactEmail: 'contact@dogtraining.com',
    contactPhone: '02-1234-5678',
    notifyNewOrder: true,
    notifyNewConsultation: true,
    notifyLowStock: false,
    tossClientKey: '',
    tossSecretKey: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    setSaveMessage('설정이 저장되었습니다.');
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div
      className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
        checked ? 'bg-purple-500' : 'bg-gray-600'
      }`}
      onClick={onChange}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </div>
  );

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">설정</h1>
          <p className="text-gray-400 mt-1">관리자 설정을 관리하세요</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Save className="h-5 w-5 mr-2" />
          {isSaving ? '저장 중...' : '저장'}
        </Button>
      </div>

      {saveMessage && (
        <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
          {saveMessage}
        </div>
      )}

      {/* General Settings */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">일반 설정</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">사이트 이름</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">사이트 설명</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 min-h-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Contact Settings */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">연락처 설정</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">이메일</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">전화번호</label>
            <input
              type="tel"
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">알림 설정</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
            <div>
              <p className="text-white font-medium">새 주문 알림</p>
              <p className="text-gray-500 text-sm">새로운 주문이 들어오면 알림을 받습니다</p>
            </div>
            <ToggleSwitch
              checked={settings.notifyNewOrder}
              onChange={() => setSettings({ ...settings, notifyNewOrder: !settings.notifyNewOrder })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
            <div>
              <p className="text-white font-medium">새 상담 신청 알림</p>
              <p className="text-gray-500 text-sm">새로운 상담 신청이 들어오면 알림을 받습니다</p>
            </div>
            <ToggleSwitch
              checked={settings.notifyNewConsultation}
              onChange={() => setSettings({ ...settings, notifyNewConsultation: !settings.notifyNewConsultation })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
            <div>
              <p className="text-white font-medium">재고 부족 알림</p>
              <p className="text-gray-500 text-sm">상품 재고가 부족하면 알림을 받습니다</p>
            </div>
            <ToggleSwitch
              checked={settings.notifyLowStock}
              onChange={() => setSettings({ ...settings, notifyLowStock: !settings.notifyLowStock })}
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">결제 설정 (토스페이먼츠)</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Client Key</label>
            <input
              type="text"
              value={settings.tossClientKey}
              onChange={(e) => setSettings({ ...settings, tossClientKey: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white font-mono focus:outline-none focus:border-purple-500"
              placeholder="test_ck_xxxxxxxxxxxxxxxxxx"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Secret Key</label>
            <input
              type="password"
              value={settings.tossSecretKey}
              onChange={(e) => setSettings({ ...settings, tossSecretKey: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white font-mono focus:outline-none focus:border-purple-500"
              placeholder="test_sk_xxxxxxxxxxxxxxxxxx"
            />
          </div>
          <p className="text-gray-500 text-sm">
            * 토스페이먼츠 개발자센터에서 발급받은 키를 입력하세요.
            테스트 환경에서는 test_ 접두사가 붙은 키를 사용합니다.
          </p>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">보안 설정</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
            <div>
              <p className="text-white font-medium">관리자 비밀번호 변경</p>
              <p className="text-gray-500 text-sm">관리자 계정의 비밀번호를 변경합니다</p>
            </div>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              변경
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
            <div>
              <p className="text-white font-medium">2단계 인증</p>
              <p className="text-gray-500 text-sm">추가 보안을 위한 2단계 인증 설정</p>
            </div>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              설정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Lock, Trash2, AlertTriangle, Shield, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Settings {
  notifications: {
    orderEmail: boolean;
    shippingEmail: boolean;
    marketingEmail: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    termsAgreed: boolean;
    marketingAgreed: boolean;
    thirdPartyAgreed: boolean;
  };
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; provider?: string } | null>(null);
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      orderEmail: true,
      shippingEmail: true,
      marketingEmail: false,
      sms: false,
      push: true,
    },
    privacy: {
      termsAgreed: true,
      marketingAgreed: false,
      thirdPartyAgreed: false,
    },
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedSettings = localStorage.getItem('userSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setIsSaving(false);
  };

  const handlePasswordChange = async () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (passwordData.new.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    alert('비밀번호가 변경되었습니다.');
    setShowPasswordModal(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    router.push('/');
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
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white">설정</h1>

      {/* Notification Settings */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">알림 설정</h2>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-white font-medium">주문 알림 (이메일)</p>
                <p className="text-gray-500 text-sm">주문 접수 및 결제 완료 알림</p>
              </div>
            </div>
            <ToggleSwitch
              checked={settings.notifications.orderEmail}
              onChange={() => setSettings({
                ...settings,
                notifications: { ...settings.notifications, orderEmail: !settings.notifications.orderEmail }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-white font-medium">배송 알림 (이메일)</p>
                <p className="text-gray-500 text-sm">배송 시작 및 완료 알림</p>
              </div>
            </div>
            <ToggleSwitch
              checked={settings.notifications.shippingEmail}
              onChange={() => setSettings({
                ...settings,
                notifications: { ...settings.notifications, shippingEmail: !settings.notifications.shippingEmail }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-white font-medium">마케팅 알림 (이메일)</p>
                <p className="text-gray-500 text-sm">이벤트, 할인 정보 안내</p>
              </div>
            </div>
            <ToggleSwitch
              checked={settings.notifications.marketingEmail}
              onChange={() => setSettings({
                ...settings,
                notifications: { ...settings.notifications, marketingEmail: !settings.notifications.marketingEmail }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-white font-medium">SMS 알림</p>
                <p className="text-gray-500 text-sm">문자로 주요 알림 수신</p>
              </div>
            </div>
            <ToggleSwitch
              checked={settings.notifications.sms}
              onChange={() => setSettings({
                ...settings,
                notifications: { ...settings.notifications, sms: !settings.notifications.sms }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-white font-medium">푸시 알림</p>
                <p className="text-gray-500 text-sm">브라우저 푸시 알림</p>
              </div>
            </div>
            <ToggleSwitch
              checked={settings.notifications.push}
              onChange={() => setSettings({
                ...settings,
                notifications: { ...settings.notifications, push: !settings.notifications.push }
              })}
            />
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">개인정보 설정</h2>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">개인정보 처리방침 동의</p>
              <p className="text-gray-500 text-sm">서비스 이용을 위한 필수 동의</p>
            </div>
            <span className="text-purple-400 text-sm">필수</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">마케팅 정보 수신 동의</p>
              <p className="text-gray-500 text-sm">프로모션 및 이벤트 정보 수신</p>
            </div>
            <ToggleSwitch
              checked={settings.privacy.marketingAgreed}
              onChange={() => setSettings({
                ...settings,
                privacy: { ...settings.privacy, marketingAgreed: !settings.privacy.marketingAgreed }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">제3자 정보제공 동의</p>
              <p className="text-gray-500 text-sm">파트너사 정보 공유</p>
            </div>
            <ToggleSwitch
              checked={settings.privacy.thirdPartyAgreed}
              onChange={() => setSettings({
                ...settings,
                privacy: { ...settings.privacy, thirdPartyAgreed: !settings.privacy.thirdPartyAgreed }
              })}
            />
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">계정 관리</h2>
        </div>

        <div className="space-y-4">
          {user?.provider !== 'google' && user?.provider !== 'kakao' && (
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <div>
                <p className="text-white font-medium">비밀번호 변경</p>
                <p className="text-gray-500 text-sm">계정 비밀번호를 변경합니다</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(true)}
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                변경
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
            <div>
              <p className="text-white font-medium">연결된 계정</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
              연결됨
            </span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSaveSettings}
        disabled={isSaving}
        className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl"
      >
        {isSaving ? '저장 중...' : '설정 저장'}
      </Button>

      {/* Danger Zone */}
      <div className="bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-400" />
          <h2 className="text-xl font-bold text-red-400">위험 구역</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">회원 탈퇴</p>
            <p className="text-gray-500 text-sm">모든 데이터가 영구적으로 삭제됩니다</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowDeleteModal(true)}
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            탈퇴
          </Button>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/80 border border-purple-500/30 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-6">비밀번호 변경</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">현재 비밀번호</label>
                <input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">새 비밀번호</label>
                <input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="8자 이상"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">새 비밀번호 확인</label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 border-purple-500/50 text-purple-400"
              >
                취소
              </Button>
              <Button
                onClick={handlePasswordChange}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              >
                변경
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-red-900/90 to-red-900/80 border border-red-500/30 rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-400" />
              <h3 className="text-xl font-bold text-white">회원 탈퇴</h3>
            </div>
            <p className="text-gray-300 mb-6">
              정말로 탈퇴하시겠습니까? 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border-gray-500/50 text-gray-400"
              >
                취소
              </Button>
              <Button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                탈퇴하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Bell, Lock, Trash2, Moon, Globe, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Settings {
  notifications: {
    email: boolean;
    sms: boolean;
    marketing: boolean;
  };
  privacy: {
    profilePublic: boolean;
    showActivity: boolean;
  };
  appearance: {
    darkMode: boolean;
    language: string;
  };
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; provider?: string } | null>(null);
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      sms: false,
      marketing: false,
    },
    privacy: {
      profilePublic: false,
      showActivity: true,
    },
    appearance: {
      darkMode: true,
      language: 'ko',
    },
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    // 저장된 설정 불러오기
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, [router]);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem('settings', JSON.stringify(settings));
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
    // TODO: 실제 비밀번호 변경 API 호출
    alert('비밀번호가 변경되었습니다.');
    setShowPasswordModal(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('settings');
    localStorage.removeItem('pet');
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-white mb-8">설정</h1>

            <div className="space-y-6">
              {/* Notifications */}
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">알림 설정</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="text-white font-medium">이메일 알림</p>
                      <p className="text-gray-500 text-sm">훈련 일정 및 중요 공지를 이메일로 받습니다</p>
                    </div>
                    <div
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.notifications.email ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, email: !settings.notifications.email },
                        })
                      }
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.notifications.email ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="text-white font-medium">SMS 알림</p>
                      <p className="text-gray-500 text-sm">긴급 알림을 문자로 받습니다</p>
                    </div>
                    <div
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.notifications.sms ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, sms: !settings.notifications.sms },
                        })
                      }
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.notifications.sms ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="text-white font-medium">마케팅 알림</p>
                      <p className="text-gray-500 text-sm">이벤트, 할인 정보를 받습니다</p>
                    </div>
                    <div
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.notifications.marketing ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, marketing: !settings.notifications.marketing },
                        })
                      }
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.notifications.marketing ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Privacy */}
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">개인정보 설정</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="text-white font-medium">프로필 공개</p>
                      <p className="text-gray-500 text-sm">다른 사용자가 내 프로필을 볼 수 있습니다</p>
                    </div>
                    <div
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.privacy.profilePublic ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          privacy: { ...settings.privacy, profilePublic: !settings.privacy.profilePublic },
                        })
                      }
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.privacy.profilePublic ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="text-white font-medium">활동 내역 표시</p>
                      <p className="text-gray-500 text-sm">훈련 진행 상황을 프로필에 표시합니다</p>
                    </div>
                    <div
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.privacy.showActivity ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          privacy: { ...settings.privacy, showActivity: !settings.privacy.showActivity },
                        })
                      }
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.privacy.showActivity ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Appearance */}
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Moon className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">화면 설정</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="text-white font-medium">다크 모드</p>
                      <p className="text-gray-500 text-sm">어두운 테마를 사용합니다</p>
                    </div>
                    <div
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.appearance.darkMode ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, darkMode: !settings.appearance.darkMode },
                        })
                      }
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.appearance.darkMode ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </label>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">언어</p>
                        <p className="text-gray-500 text-sm">사이트 표시 언어를 선택합니다</p>
                      </div>
                    </div>
                    <select
                      value={settings.appearance.language}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, language: e.target.value },
                        })
                      }
                      className="px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="ko">한국어</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">보안</h2>
                </div>

                <div className="space-y-4">
                  {user.provider === 'email' && (
                    <div className="flex items-center justify-between">
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

                  {(user.provider === 'google' || user.provider === 'kakao') && (
                    <div className="p-4 bg-purple-500/10 rounded-lg">
                      <p className="text-purple-300 text-sm">
                        {user.provider === 'google' ? 'Google' : '카카오'} 계정으로 로그인 중입니다.
                        비밀번호 변경은 해당 서비스에서 가능합니다.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
                    <div>
                      <p className="text-white font-medium">연결된 계정</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
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
                    <p className="text-white font-medium">계정 삭제</p>
                    <p className="text-gray-500 text-sm">모든 데이터가 영구적으로 삭제됩니다</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(true)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    삭제
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Password Change Modal */}
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
                className="flex-1 border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                취소
              </Button>
              <Button
                onClick={handlePasswordChange}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                변경
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-red-900/90 to-red-900/80 border border-red-500/30 rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-400" />
              <h3 className="text-xl font-bold text-white">계정 삭제</h3>
            </div>

            <p className="text-gray-300 mb-6">
              정말로 계정을 삭제하시겠습니까? 이 작업은 취소할 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border-gray-500/50 text-gray-400 hover:bg-gray-500/10"
              >
                취소
              </Button>
              <Button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                삭제하기
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

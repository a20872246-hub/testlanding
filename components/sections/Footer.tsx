'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Dog Training Center
                </span>
              </h3>
              <p className="text-gray-400 mb-4">
                대한민국 1위 강아지 행동 교정 전문센터
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="Instagram"
                >
                  <span className="text-xl">📷</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="YouTube"
                >
                  <span className="text-xl">▶️</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label="KakaoTalk"
                >
                  <span className="text-xl">💬</span>
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">연락처</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-400 hover:text-purple-400 transition-colors">
                  <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>1588-0000</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400 hover:text-purple-400 transition-colors">
                  <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>info@dogtraining.com</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400 hover:text-purple-400 transition-colors">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>서울시 강남구 테헤란로 123</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">바로가기</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    프로그램 소개
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    성공 사례
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    센터 찾기
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    자주 묻는 질문
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-zinc-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2024 Dog Training Center. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                  개인정보처리방침
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                  이용약관
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

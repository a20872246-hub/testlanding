'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Key, ExternalLink, Check } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function DogChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [tempApiKey, setTempApiKey] = useState('');
  const [showApiKeySetup, setShowApiKeySetup] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '안녕하세요! 강아지 행동 교정 전문 상담사입니다. 어떤 문제 행동으로 고민이신가요?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem('gemini_api_key', tempApiKey.trim());
      setApiKey(tempApiKey.trim());
      setShowApiKeySetup(false);
      setMessages([
        {
          role: 'assistant',
          content: 'API 키가 저장되었습니다! 이제 강아지 행동 문제에 대해 질문해주세요. 😊',
        },
      ]);
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setTempApiKey('');
    setMessages([
      {
        role: 'assistant',
        content: 'API 키가 삭제되었습니다. 다시 설정하려면 우측 상단의 키 아이콘을 클릭하세요.',
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '먼저 API 키를 설정해주세요. 우측 상단의 키 아이콘을 클릭하세요.',
        },
      ]);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          apiKey: apiKey
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `오류가 발생했습니다: ${errorMessage}\n\nAPI 키가 올바른지 확인해주세요.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button - Dog Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="강아지 상담 챗봇"
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <div className="text-4xl animate-bounce">🐕</div>
        )}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
            !
          </div>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🐕</div>
                <div>
                  <h3 className="font-bold text-lg">강아지 행동 전문가</h3>
                  <p className="text-xs text-purple-100">
                    문제 행동 상담 전문
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowApiKeySetup(!showApiKeySetup)}
                className="p-2 hover:bg-purple-700 rounded-lg transition-colors"
                aria-label="API 키 설정"
              >
                {apiKey ? (
                  <Check className="w-5 h-5 text-green-300" />
                ) : (
                  <Key className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* API Key Setup Panel */}
          {showApiKeySetup && (
            <div className="p-4 bg-purple-50 border-b border-purple-200">
              <h4 className="font-bold text-sm mb-2 text-purple-900">
                🔑 Gemini API 키 설정
              </h4>

              {!apiKey ? (
                <>
                  <p className="text-xs text-gray-600 mb-3">
                    무료로 AI 챗봇을 사용하려면 Google Gemini API 키가 필요합니다.
                  </p>

                  <div className="bg-white p-3 rounded-lg mb-3 text-xs space-y-2">
                    <p className="font-semibold text-purple-900">📝 API 키 발급 방법:</p>
                    <ol className="list-decimal ml-4 space-y-1 text-gray-700">
                      <li>아래 버튼을 클릭해 Google AI Studio 접속</li>
                      <li>구글 계정으로 로그인</li>
                      <li>"Get API key" 또는 "Create API key" 클릭</li>
                      <li>생성된 API 키를 복사</li>
                      <li>아래 입력창에 붙여넣기</li>
                    </ol>
                  </div>

                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium mb-3 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Google AI Studio 열기
                  </a>

                  <div className="space-y-2">
                    <input
                      type="password"
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      placeholder="API 키를 입력하세요 (예: AIzaSy...)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={handleSaveApiKey}
                      disabled={!tempApiKey.trim()}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      저장하고 시작하기
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    💡 API 키는 브라우저에만 저장되며 외부로 전송되지 않습니다.
                  </p>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <Check className="w-4 h-4" />
                    <span>API 키가 설정되었습니다!</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    키: {apiKey.substring(0, 10)}...{apiKey.substring(apiKey.length - 4)}
                  </p>
                  <button
                    onClick={handleRemoveApiKey}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    API 키 삭제
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {!apiKey && !showApiKeySetup && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                <p className="font-semibold text-yellow-900 mb-1">
                  ⚠️ API 키가 설정되지 않았습니다
                </p>
                <p className="text-yellow-800 text-xs">
                  우측 상단의 키 아이콘을 클릭해서 API 키를 설정해주세요.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white border-t border-gray-200"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={apiKey ? "강아지 문제 행동을 입력하세요..." : "먼저 API 키를 설정하세요"}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                disabled={isLoading || !apiKey}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || !apiKey}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors"
                aria-label="메시지 전송"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

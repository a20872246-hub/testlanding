import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dog-training2025.vercel.app'),
  title: {
    default: "강아지 행동 교정 전문 - 단 7일만에 문제견 완벽 교정 | Dog Training Center",
    template: "%s | Dog Training Center"
  },
  description: "짖음, 공격성, 분리불안까지 전문가의 1:1 맞춤 훈련으로 해결하세요. 15년 경력, 1,500마리+ 교정 성공, 98% 만족도. 무료 상담 신청하고 행동 분석 리포트 받아가세요!",
  keywords: [
    "강아지 훈련", "반려견 교육", "문제견 교정", "강아지 짖음",
    "공격성 개선", "분리불안 치료", "애견 훈련", "펫 트레이닝",
    "dog training", "pet training", "강아지 행동교정", "반려견 훈련",
    "강아지 교육", "애견 행동 교정", "강아지 문제 행동"
  ],
  authors: [{ name: "Dog Training Center" }],
  creator: "Dog Training Center",
  publisher: "Dog Training Center",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "단 7일만에 문제견 행동 완벽 교정",
    description: "짖음, 공격성, 분리불안까지 전문가의 1:1 맞춤 훈련으로 해결하세요. 15년 경력, 1,500마리+ 교정 성공, 98% 만족도",
    url: 'https://dog-training2025.vercel.app',
    siteName: "Dog Training Center",
    images: [
      {
        url: 'https://dog-training2025.vercel.app/tt.png',
        width: 1200,
        height: 630,
        alt: '강아지 행동 교정 전문 - Dog Training Center',
      }
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "단 7일만에 문제견 행동 완벽 교정",
    description: "짖음, 공격성, 분리불안까지 전문가의 1:1 맞춤 훈련으로 해결하세요",
    images: ['https://dog-training2025.vercel.app/tt.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'a62e618bbdf5f473',
    other: {
      'naver-site-verification': '78fc0f7d557dfd39f66216aa9d0b261d',
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6B46C1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        {/* JSON-LD 구조화 데이터 - 구글/네이버 SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://dog-training2025.vercel.app',
              name: 'Dog Training Center',
              description: '강아지 행동 교정 전문 센터 - 짖음, 공격성, 분리불안 완벽 해결',
              url: 'https://dog-training2025.vercel.app',
              telephone: '010-1234-5678', // 실제 전화번호로 변경
              priceRange: '₩₩',
              image: 'https://dog-training2025.vercel.app/tt.png',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'KR',
                addressLocality: '서울', // 실제 주소로 변경
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '18:00',
                },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '1500',
              },
              offers: {
                '@type': 'Offer',
                description: '강아지 행동 교정 훈련 프로그램',
                priceCurrency: 'KRW',
              },
            }),
          }}
        />

        {/* 서비스 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: '강아지 행동 교정 훈련',
              provider: {
                '@type': 'Organization',
                name: 'Dog Training Center',
                url: 'https://dog-training2025.vercel.app',
              },
              areaServed: {
                '@type': 'Country',
                name: 'South Korea',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: '강아지 훈련 서비스',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: '문제견 행동 교정',
                      description: '짖음, 공격성, 분리불안 등 문제 행동 완벽 교정',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: '1:1 맞춤 훈련',
                      description: '전문가의 개별 맞춤 훈련 프로그램',
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* 네이버 검색 어드바이저 메타태그 */}
        <meta name="naver-site-verification" content="78fc0f7d557dfd39f66216aa9d0b261d" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

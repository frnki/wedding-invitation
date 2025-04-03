import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const happinessSans = localFont({
  src: [
    {
      path: "../public/fonts/Happiness-Sans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Happiness-Sans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Happiness-Sans-Title.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-happiness-sans",
});

export const metadata: Metadata = {
  title: "청첩장",
  description:
    "안상영과 김민선의 결혼식에 초대합니다. 2025년 5월 17일 토요일 오후 4시, 논현2동 성당",
  openGraph: {
    title: "안상영과 김민선의 결혼식에 초대합니다",
    description:
      "안상영과 김민선의 결혼식에 초대합니다. 2025년 5월 17일 토요일 오후 4시, 논현2동 성당",
    siteName: "안상영과 김민선의 청첩장",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/og-invitation.png",
        width: 1200,
        height: 630,
        alt: "안상영과 김민선의 청첩장",
      },
    ],
  },
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="overflow-x-hidden">
      <body
        className={`${happinessSans.variable} font-sans antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

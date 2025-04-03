"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GALLERY_IMAGES = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/11.jpg",
];

function FadeInImage({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -50px 0px",
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        y: {
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
        },
        opacity: {
          duration: 2.2,
          ease: [0.25, 0.1, 0.2, 0.94],
        },
        delay: index * 0.08,
      }}
      style={{
        marginTop: `var(--image-${index}-top-margin, 0)`,
        marginBottom: `var(--image-${index}-bottom-margin, 0)`,
        marginLeft: `var(--image-${index}-left-margin, 0)`,
        marginRight: `var(--image-${index}-right-margin, 0)`,
        width: `var(--image-${index}-width, 100%)`,
      }}
      className="relative w-full overflow-visible"
    >
      <Image
        src={src}
        alt={`Wedding photo ${index + 1}`}
        width={1600}
        height={2400}
        className="object-cover w-full h-auto max-w-full"
      />
    </motion.div>
  );
}

// FadeInText 컴포넌트 추가
function FadeInText({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -50px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        y: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        },
        opacity: {
          duration: 1.6,
          ease: [0.25, 0.1, 0.2, 0.94],
        },
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// 계좌 정보 컴포넌트
function AccountInfo({
  label,
  bank,
  accountNumber,
  holder,
}: {
  label: string;
  bank: string;
  accountNumber: string;
  holder: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg mb-4">
      <div className="mb-2 font-semibold">{label}</div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-700">{bank}</div>
          <div className="text-lg font-medium">{accountNumber}</div>
          <div className="text-sm text-gray-700">{holder}</div>
        </div>
        <button
          onClick={copyToClipboard}
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  // 드로어가 열리기 전 스크롤 위치 저장
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isGiftDrawerOpen, setIsGiftDrawerOpen] = useState(false);

  // 드로어 상태가 변경될 때 스크롤 위치 처리
  useEffect(() => {
    if (isDrawerOpen || isGiftDrawerOpen) {
      // 드로어가 열릴 때 현재 스크롤 위치 저장
      setScrollPosition(window.scrollY);
    } else if (scrollPosition > 0) {
      // 드로어가 닫힐 때 이전 스크롤 위치로 복원
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 100);
    }
  }, [isDrawerOpen, isGiftDrawerOpen, scrollPosition]);

  // 전체 페이지 가로 스크롤 방지
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-white break-keep overflow-hidden">
      {/* Hero Section */}
      <div className="min-h-screen w-full flex items-center justify-center">
        <Image
          src="/images/home.png"
          alt="Wedding invitation hero image"
          className="object-cover w-[80vw]"
          width={1963}
          height={3082}
          priority
        />
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col bg-white">
        {/* Text Content */}
        <div className="bg-white text-black pt-20 pb-20 flex flex-col items-center ">
          <div className="my-16 mb-56 max-w-2xl mx-auto px-16 w-full">
            <FadeInText delay={0.1}>
              <p className="text-lg leading-[2.5] whitespace-pre-line">
                서로를 알아가는 일은 사랑이 되고 <br />
                서로를 지켜내는 일은 삶이 되었습니다. <br />
                함께 살아가는 시간 속에서 <br />
                조금씩 서로를 닮아가려 합니다. <br />그 시작에 함께해 주세요.
              </p>
            </FadeInText>

            <FadeInText delay={0.6}>
              <p className="text-lg leading-[2.5] whitespace-pre-line mt-6">
                신랑 안상영, 신부 김민선 드림
              </p>
            </FadeInText>

            <div className="flex flex-col space-y-4 mt-96 mb-16 text-lg">
              <FadeInText delay={0.2}>
                <p className="mt-8">2025년 5월 17일 토요일 오후 4시</p>
              </FadeInText>
              <FadeInText delay={0.3}>
                <Drawer onOpenChange={setIsDrawerOpen}>
                  <DrawerTrigger asChild>
                    <button className="text-left hover:underline">
                      논현2동 성당 ↗
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-lg">
                      <DrawerHeader>
                        <DrawerTitle className="text-center">
                          논현2동 성당
                        </DrawerTitle>
                      </DrawerHeader>
                      <div className="p-4 pb-8 space-y-4">
                        <div className="text-center text-sm">
                          서울특별시 강남구 선릉로145길 17
                        </div>
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.451169021161!2d127.035835276452!3d37.52086067205044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca38a210578b3%3A0x2527cc31a9067eae!2z7LKc7KO86rWQIOuFvO2YhDLrj5kg7ISx64u5!5e0!3m2!1sko!2skr!4v1743637969057!5m2!1sko!2skr"
                          width="100%"
                          height="450"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </FadeInText>
              <FadeInText delay={0.4}>
                <div className="mt-8 text-sm flex-col space-y-2 leading-[2]">
                  <p>
                    * 주차공간이 협소하오니 가급적 대중교통을 이용해 주기시
                    바랍니다.
                  </p>
                  <p>
                    * 성당은 종교시설인 관계로 화환반입이 금지되오니 양해 부탁드립니다.
                  </p>
                </div>
              </FadeInText>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mt-16 w-full">
            {GALLERY_IMAGES.map((src, index) => (
              <FadeInImage key={src} src={src} index={index} />
            ))}
          </div>
        </div>

        {/* 마음 전하기 버튼 영역 */}
        <div className="w-full">
          <div className="relative w-full max-w-[430px] mx-auto">
            <div className="w-full flex justify-end">
              <FadeInText delay={0.4}>
                <Drawer onOpenChange={setIsGiftDrawerOpen}>
                  <DrawerTrigger asChild>
                    <button className="text-lg leading-[2.5] mr-12 mb-12 hover:underline cursor-pointer">
                      마음 전하기↗
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-lg">
                      <DrawerHeader>
                        <DrawerTitle className="text-center text-xl">
                          마음 전하기
                        </DrawerTitle>
                      </DrawerHeader>
                      <div className="p-4 pb-8 space-y-2">
                        <div className="text-center text-sm mb-6">
                          축하의 마음을 전해주셔서 감사합니다
                        </div>

                        <AccountInfo
                          label="신랑측 계좌번호"
                          bank="신한은행"
                          accountNumber="110-305-119429"
                          holder="안상영"
                        />

                        <AccountInfo
                          label="신부측 계좌번호"
                          bank="국민은행"
                          accountNumber="424002-01-010947"
                          holder="이희정"
                        />
                      </div>
                      <DrawerFooter>
                        <DrawerClose className="w-full">
                          <button className="w-full py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                            닫기
                          </button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </FadeInText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  Drawer,
  DrawerContent,
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
      className="relative w-full overflow-hidden"
    >
      <Image
        src={src}
        alt={`Wedding photo ${index + 1}`}
        width={1600}
        height={2400}
        className="object-cover w-full h-auto"
      />
    </motion.div>
  );
}

export default function Home() {
  // 드로어가 열리기 전 스크롤 위치 저장
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 드로어 상태가 변경될 때 스크롤 위치 처리
  useEffect(() => {
    if (isDrawerOpen) {
      // 드로어가 열릴 때 현재 스크롤 위치 저장
      setScrollPosition(window.scrollY);
    } else if (scrollPosition > 0) {
      // 드로어가 닫힐 때 이전 스크롤 위치로 복원
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 100);
    }
  }, [isDrawerOpen, scrollPosition]);

  // 전체 페이지 가로 스크롤 방지
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-white break-keep overflow-x-hidden">
      {/* Hero Section with Fixed Background */}
      <div className="fixed top-0 left-0 right-0 h-screen max-w-[430px] mx-auto flex items-center justify-center overflow-hidden">
        <Image
          src="/images/home.png"
          alt="Wedding invitation hero image"
          className="object-cover w-[80vw]"
          width={1963}
          height={3082}
          priority
        />
      </div>

      {/* Content Section that overlays the hero image on scroll */}
      <div className="relative min-h-screen flex flex-col overflow-x-hidden">
        {/* Spacer to push content below hero */}
        <div className="h-screen" />

        {/* Text Content */}
        <div className="relative bg-white text-black pt-32 pb-20 flex flex-col items-center overflow-x-hidden">
          <div className="my-16 mb-56 max-w-2xl mx-auto px-4 w-full">
            <p className="text-lg leading-[2.5] whitespace-pre-line">
              서로를 알아가는 일은 사랑이 되고 <br />
              서로를 지켜내는 일은 삶이 되었습니다. <br />
              함께 살아가는 시간 속에서 <br />
              조금씩 서로를 닮아가려 합니다. <br />그 시작에 함께해 주세요.
              <br />
              <br />
              신랑 안상영, 신부 김민선 드림
            </p>
            <p></p>

            <div className="flex flex-col space-y-4 mt-96 mb-16 text-lg">
              <p className="mt-8">2025년 5월 17일 토요일 오후 4시</p>
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
              {/* <p>교통 및 주차 안내 ↗</p> */}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mt-16 w-full px-4 max-w-full overflow-x-hidden">
            {GALLERY_IMAGES.map((src, index) => (
              <FadeInImage key={src} src={src} index={index} />
            ))}
          </div>
        </div>
        <p className="text-lg leading-[2.5] text-right mr-12 mb-12">마음 전하기↗</p>
      </div>
    </div>
  );
}

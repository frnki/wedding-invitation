// src/app/after-party/page.tsx
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Image from "next/image";
// import { AfterPartyForm } from './_components/after-party-form';

export const metadata: Metadata = {
  title: "Minseon & Frank's After Party",
  description: "민선 & 프랭크의 애프터 파티에 초대합니다.",
  openGraph: {
    images: [
      {
        url: "/images/lerici.webp",
        width: 1200,
        height: 630,
        alt: "레리치 아뜰리에",
      },
    ],
  },
};

export default function AfterPartyPage() {
  const partyDate = "2025년 5월 17일 토요일, 저녁 7시";

  const locationLink =
    "https://lerici.co/blogs/news/croquis-%EC%8B%9C%EC%9D%B8%EA%B3%BC-%EB%91%90%ED%85%81%EB%B0%94%EC%9C%84-%EC%82%AC%EC%9D%B4%EC%97%90";

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-white  max-w-md mx-auto my-8">
      {/* Content */}
      <div className="flex flex-col  p-4">
        <div className="mb-4">
          <h1 className="text-8xl font-bold">Let&apos;s party!</h1>
          <h2 className="text-4xl  mt-12">
            Minseon &amp; Frank&apos;s Wedding After Party
          </h2>
          <div className="mt-8 space-y-1 font-normal">
            <p className="text-md">{partyDate}</p>
            <div className="flex items-end gap-1">
              <span className="text-md pretendard">@레리치</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                (소월로 138, 주차 공간 없음)
              </p>
            </div>
            <div className="flex items-end gap-1 text-md">
              Sips & Bites
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                (Catering by{" "}
                <a
                  className="underline"
                  href="https://www.instagram.com/achim.provision/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @Achim.provision
                </a>)
              </p>
            </div>
          </div>

          {/* <div className="mt-8 flex flex-col gap-2">
            <span className="text-md">RSVP</span>
            <RsvpDialog />
          </div> */}
        </div>

        <div className="mt-8 w-full space-y-8 ">
          <a
            href={locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
              <Image
                src="/images/lerici.webp"
                alt="After Party"
                width={1920}
                height={1080}
                className="object-cover"
              />
              <div className="p-4  pretendard relative">
                <h3 className="text-sm font-semibold pretendard">
                  레리치 아뜰리에
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  소월로 138, 건축가 김수근 설계.
                </p>
                <div className="flex items-center justify-between absolute bottom-4 right-4">
                  <span className="text-md font-bold"></span>
                  <Button className="text-xs" variant="outline">
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </a>
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/2NwksFckOG7UmmL8K9cnTK?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

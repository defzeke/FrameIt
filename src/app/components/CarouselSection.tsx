"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import FrameCard from '@/app/components/FrameCard';

export default function CarouselSection() {
  const frames = [
    { title: "Title", caption: "Caption" },
    { title: "Title", caption: "Caption" },
    { title: "Title", caption: "Caption" },
    { title: "Title", caption: "Caption" },
    { title: "Title", caption: "Caption" },
  ];

  return (
    <section className="bg-[#4A90E2] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Try Out More!</h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {frames.map((frame, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                <FrameCard 
                  title={frame.title}
                  caption={frame.caption}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white border-white hover:bg-white/20" />
          <CarouselNext className="text-white border-white hover:bg-white/20" />
        </Carousel>
      </div>
    </section>
  );
}

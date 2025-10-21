import { StarIcon } from "@/Icons/StarIcon";
import { WatchTrailerIcon } from "@/Icons/WatchTrailerIcon";

export const HeroSection = () => {
  return (
    <div className="relative bg-cover bg-center bg-no-repeat h-[600px] w-full bg-[url('/FeatureImage.jpg')]">
      <div className=" flex flex-col items-start gap-4 absolute left-35 bottom-40 w-[404px]">
        <div>
          <span className="text-white font-inter text-base font-normal leading-6">
            Now Playing:
          </span>
          <p className="text-white font-inter text-4xl font-bold leading-[40px] tracking-[-0.9px]">
            Wicked
          </p>
          <div className="flex gap-1 items-center">
            <StarIcon />
            <p className="text-[#FAFAFA] font-inter text-lg font-semibold leading-7">
              6.9
            </p>
            <p className=" text-[#71717A] font-inter text-base font-normal leading-6">
              /10
            </p>
          </div>
        </div>
        <div className="text-[#FAFAFA] font-inter text-xs font-normal leading-4 w-[302px]">
          Elphaba, a misunderstood young woman because of her green skin, and
          Glinda, a popular girl, become friends at Shiz University in the Land
          of Oz. After an encounter with the Wonderful Wizard of Oz, their
          friendship reaches a crossroads.
        </div>
        <div className="flex h-[40px] py-2 px-4 justify-center items-center gap-2 rounded-md bg-[#F4F4F5] ">
          <WatchTrailerIcon />
          <button className="text-[var(--text-text-secondary-foreground)] font-inter text-sm font-medium leading-5">
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};
// import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// export function HeroSection() {
//   return (
//     <div className="flex justify-center items-center w-full h-[600px]">
//       <Carousel className="w-full h-[600px]">
//         <CarouselContent>
//           {Array.from({ length: 5 }).map((_, index) => (
//             <CarouselItem key={index}>
//               <div className="p-1">
//                 <Card>
//                   <CardContent>
//                     <span className="text-4xl font-semibold">{index + 1}</span>
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// }

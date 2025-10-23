"use client";

import { StarIcon } from "@/Icons/StarIcon";
import { WatchTrailerIcon } from "@/Icons/WatchTrailerIcon";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function HeroSection() {
  {
    const [heroSectionData, setHeroSectionData] = useState([]);
    const getHeroSectionData = async () => {
      const herosectionEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;
      const response = await fetch(herosectionEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setHeroSectionData(data.results);
    };
    useEffect(() => {
      getHeroSectionData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(heroSectionData);

    return (
      <div className="flex justify-center items-center w-full ">
        <Carousel className="w-full ">
          <CarouselContent>
            {heroSectionData.slice(0, 5).map((movie, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card>
                    <CardContent>
                      <div
                        className="relative bg-cover bg-center bg-no-repeat h-[600px] w-full"
                        style={{
                          backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                        }}
                      >
                        <div className=" flex flex-col items-start gap-4 absolute left-35 bottom-40 w-[404px]">
                          <div>
                            <span className="text-white font-inter text-base font-normal leading-6">
                              Now Playing:
                            </span>
                            <p className="text-white font-inter text-4xl font-bold leading-[40px] tracking-[-0.9px]">
                              {movie.title}
                            </p>
                            <div className="flex gap-1 items-center">
                              <StarIcon />
                              <p className="text-[#FAFAFA] font-inter text-lg font-semibold leading-7">
                                {movie.vote_average}
                              </p>
                              <p className=" text-[#71717A] font-inter text-base font-normal leading-6">
                                /10
                              </p>
                            </div>
                          </div>
                          <div className="text-[#FAFAFA] font-inter text-xs font-normal leading-4 w-[302px]">
                            {movie.overview}
                          </div>
                          <div className="flex h-[40px] py-2 px-4 justify-center items-center gap-2 rounded-md bg-[#F4F4F5] ">
                            <WatchTrailerIcon />
                            <button className="text-[var(--text-text-secondary-foreground)] font-inter text-sm font-medium leading-5">
                              Watch Trailer
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
}

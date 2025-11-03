"use client";

import { StarIcon } from "@/Icons/StarIcon";
import { MovieCard } from "@/app/_components/MovieCard";
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

export function MovieDetail() {
  const [detailData, setDetailData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDetailData = async () => {
    setLoading(true);
    const detailEndpoint = `${BASE_URL} /movie/${id}/videos?language=en-US`;
    const response = await fetch(detailEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("data", data);
    setDetailData(data.results);
    setTimeout(() => {
      setLoading(false);
    }, "2000");
  };

  useEffect(() => {
    getDetailData();
  }, []);
  if (loading) return <div></div>;
  console.log(detailData);

  return (
    <div className="flex justify-center items-center w-full h-[524px]">
      <Carousel className="w-full ">
        <CarouselContent>
          {detailData.map((movie, index) => (
            <CarouselItem key={index}>
              <div>
                <Card>
                  <CardContent>
                    <MovieCard
                      image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    />
                    <div
                      className="relative bg-cover bg-center bg-no-repeat h-[428px] w-[760px]"
                      style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                      }}
                    >
                      <div className=" flex flex-col items-start gap-4 absolute left-35 bottom-40 w-[404px]">
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
//  <div>
//         {movie.name}
//         {date}
//       </div>
//       <div>
//         <p>Rating</p>
//         <div className="flex gap-1 items-center">
//           <StarIcon />
//           <p className="text-[#FAFAFA] font-inter text-lg font-semibold leading-7">
//             {movie.vote_average}
//           </p>
//           <p className=" text-[#71717A] font-inter text-base font-normal leading-6">
//             /10
//           </p>
//         </div>
//         <div>
//           <MovieCard
//             image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
//           />
//         </div>
//       </div>

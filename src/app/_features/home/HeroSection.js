"use client";

import { StarIcon } from "@/Icons/StarIcon";
import { WatchTrailerIcon } from "@/Icons/WatchTrailerIcon";
import { useRouter } from "next/navigation";
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
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function HeroSection() {
  const [heroSectionData, setHeroSectionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const getHeroSectionData = async () => {
    setLoading(true);
    const herosectionEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;
    const response = await fetch(herosectionEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setHeroSectionData(data.results);

    setTimeout(() => {
      setLoading(false);
    }, "2000");
  };

  useEffect(() => {
    getHeroSectionData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMovieVideoData = async () => {
    setTrailerLoading(true);
    const trailerEndpoint = `${BASE_URL}/movie/${selectedMovieId}/videos?language=en-US`;
    const response = await fetch(trailerEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const officialTrailer = data.results.find((result) => {
      if (result.name.includes("Official Trailer")) {
        return result;
      }
    });

    setMovieTrailer(officialTrailer || results[0]);

    setTimeout(() => {
      setTrailerLoading(false);
    }, "1000");
  };

  useEffect(() => {
    if (selectedMovieId) {
      getMovieVideoData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMovieId]);

  const handleWatchTrailerButton = (id) => {
    setSelectedMovieId(id);
    setOpen(true);
  };

  if (loading)
    return (
      <div>
        <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
          <Skeleton className="w-[1440px] h-[600px]"></Skeleton>
        </SkeletonTheme>
      </div>
    );
  console.log(
    movieTrailer,
    "movieTrailermovieTrailermovieTrailermovieTrailermovieTrailer"
  );

  const handleMovieDetailButton = (id) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="flex justify-center items-center w-full ">
      <Carousel className="w-full ">
        <CarouselContent>
          {heroSectionData?.slice(0, 5).map((movie, index) => (
            <CarouselItem key={index}>
              <div>
                <Card>
                  <CardContent>
                    <div
                      onClick={(e) => {
                        if (e.target.tagName !== "BUTTON") {
                          handleMovieDetailButton(movie.id);
                        }
                      }}
                      className="p-40 bg-cover bg-center bg-no-repeat h-[600px] w-full"
                      style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                      }}
                    >
                      <div className=" flex flex-col items-start gap-4 w-[404px]">
                        {/* <div className=" flex flex-col items-start gap-4 absolute left-35 bottom-40 w-[404px]"> */}
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
                          <button
                            onClick={() => {
                              handleWatchTrailerButton(movie.id);
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                            className="text-[var(--text-text-secondary-foreground)] font-inter text-sm font-medium leading-5 cursor-pointer"
                          >
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

      <Dialog open={open}>
        <DialogContent setOpen={setOpen}>
          {selectedMovieId && trailerLoading && <div>trailer loading</div>}
          {selectedMovieId && !trailerLoading && movieTrailer && (
            <iframe
              width="997px"
              height="561px"
              src={`https://www.youtube.com/embed/${movieTrailer.key}`}
            ></iframe>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

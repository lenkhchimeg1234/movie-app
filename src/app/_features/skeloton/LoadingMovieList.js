"use client";

import { MovieCard } from "@/app/_components/MovieCard";
export const MovieList = () => {
  return (
    <div className="flex flex-col px-[80px] gap-x-8 gap-8 bg-muted">
      <div className="flex items-center justify-between">
        <p className="text-[var(--text-text-foreground)] font-inter text-2xl font-semibold leading-8 tracking-[-0.6px] bg-muted"></p>
        <div className="flex w-[250px] h-[36px] py-2 px-4 justify-center items-center gap-2 rounded-md bg-muted ">
          <button className="text-[var(--text-text-foreground)] font-inter text-sm font-medium leading-5 w-[px] h-[36px]">
            See more
          </button>
        </div>
      </div>
      <div className="flex items-start content-start self-stretch flex-wrap gap-x-8 gap-y-8">
        {movieData.slice(0, 10).map((movie, index) => {
          return (
            <MovieCard
              key={index}
              point={movie.vote_average}
              name={movie.title}
              image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
          );
        })}
      </div>
    </div>
  );
};

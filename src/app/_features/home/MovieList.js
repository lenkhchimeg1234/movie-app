"use client";
import { SeeMoreIcon } from "@/Icons/SeeMoreIcon";
import { useState, useEffect } from "react";
import { MovieCard } from "@/app/_components/MovieCard";
import { useRouter } from "next/navigation";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
export const MovieList = ({ type, title }) => {
  const router = useRouter();
  //   const [loading, setLoading] = useState(false);

  const [movieData, setMovieData] = useState([]);
  const getMovieData = async () => {
    const MovieEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
    const response = await fetch(MovieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setMovieData(data.results);
  };
  useEffect(() => {
    getMovieData();
  }, []);
  const handleSeeMoreButton = () => {
    router.push(`/movies/${type}`);
  };
  return (
    <div className="flex flex-col px-[80px] gap-x-8 gap-8">
      <div className="flex items-center justify-between">
        <p className="text-[var(--text-text-foreground)] font-inter text-2xl font-semibold leading-8 tracking-[-0.6px]">
          {title}
        </p>
        <div className="flex h-[36px] py-2 px-4 justify-center items-center gap-2 rounded-md border border-[#E4E4E7] bg-white shadow-sm ">
          <button
            onClick={handleSeeMoreButton}
            className="text-[var(--text-text-foreground)] font-inter text-sm font-medium leading-5"
          >
            See more
          </button>
          <SeeMoreIcon />
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

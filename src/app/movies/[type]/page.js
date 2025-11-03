"use client";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { useState, useEffect } from "react";
import { MovieCard } from "@/app/_components/MovieCard";
import { useParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const titles = {
  upcoming: "Upcoming",
  popular: "Popular",
  top_rated: "Top Rated",
};

export default function Upcoming() {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();
  console.log("params", params);
  const router = useRouter();
  //   const [loading, setLoading] = useState(false);
  const [upcomingData, setUpcomingData] = useState([]);

  const getUpcomingData = async () => {
    const upcomingEndpoint = `${BASE_URL}/movie/${params.type}?language=en-US&page=${page}`;
    const response = await fetch(upcomingEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setUpcomingData(data.results);
  };

  useEffect(() => {
    getUpcomingData();
  }, [page]);

  const handleClickNextButton = (page) => {
    setPage(page + 1);
    setCurrentPage(page + 1);
  };

  const handleClickPreviousButton = (page) => {
    if (page > 1) {
      setPage(page - 1);
      setCurrentPage(page - 1);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="w-[1440px] flex flex-col  gap-[52px] ">
        <Header />
        <div className="flex flex-col px-[80px] gap-x-8 gap-8">
          <div className="flex items-center justify-between">
            <p className="text-[var(--text-text-foreground)] font-inter text-2xl font-semibold leading-8 tracking-[-0.6px]">
              {titles[params.type]}
            </p>
          </div>
          <div className="flex items-start content-start self-stretch flex-wrap gap-x-8 gap-y-8">
            {upcomingData.slice(0, 20).map((movie, index) => {
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
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => {
                    handleClickPreviousButton(page);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={currentPage === page + 1}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={currentPage === page + 2}>
                  {page + 2}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => {
                    handleClickNextButton(page);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <Footer />
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MovieCard } from "@/app/_components/MovieCard";
import { Badge } from "@/components/ui/badge";
import { GenreRigthIcon } from "@/Icons/GenreRigthIcon";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
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

export default function SearchResult() {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { searchValue } = useParams();
  console.log("searchValue", searchValue);
  const [page, setPage] = useState(1);

  const SearchResultList = async () => {
    if (!searchValue) return;
    setLoading(true);
    const SearchDataEndpoint = `${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`;

    const response = await fetch(SearchDataEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("data", data);
    setSearchData(data.results || []);
    setLoading(false);
  };

  useEffect(() => {
    SearchResultList();
  }, [searchValue]);

  const [genreData, setGenreData] = useState([]);

  const getGenreData = async () => {
    const genreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;
    const response = await fetch(genreEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setGenreData(data.genres);
  };

  useEffect(() => {
    getGenreData();
  }, []);
  const handlePageClick = (p) => {
    if (p !== page) setPage(p);
  };

  const handleClickPreviousButton = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleClickNextButton = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };
  const totalPages = 50;
  const visiblePages = 3;

  const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  return (
    <div>
      <Header />
      <div className="flex flex-row justify-between gap-10 px-[80px] py-10">
        {/* LEFT — search results */}
        <div className="flex flex-col gap-6 w-3/4">
          <h1 className="text-[28px] font-semibold text-[#09090B]">
            Search results
          </h1>
          <p className="text-[#71717A] text-[16px]">
            {searchData.length} results for “{searchValue}”
          </p>

          {loading ? (
            <p>Loading...</p>
          ) : searchData.length === 0 ? (
            <div className="border border-[#E4E4E7] rounded-lg p-10 text-center text-gray-500">
              No results found.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {searchData.slice(0, 10).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  name={movie.title}
                  point={movie.vote_average}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              ))}
            </div>
          )}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={handleClickPreviousButton}
                  className={page === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                const pageNum = startPage + i;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      isActive={pageNum === page}
                      onClick={() => handlePageClick(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              {endPage < totalPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={handleClickNextButton}
                  className={
                    page === totalPages ? "opacity-50 pointer-events-none" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="w-px bg-[#E4E4E7] self-stretch" />

        {/* RIGHT — genres list */}
        <div className="flex flex-col gap-2 ">
          <p className="w-[577px] font-inter font-semibold text-[24px] leading-[32px] tracking-[-0.025em] ">
            Genres
          </p>
          <p className="font-inter font-normal text-[16px] leading-[24px] tracking-[0em]">
            See lists of movies by genre
          </p>

          <div className="w-[537px] h-[33px] opacity-100 gap-[10px] py-1 flex items-center">
            <div className="w-[537px] h-[1px] opacity-100 border border-[#E4E4E7]"></div>
          </div>
          <div className="w-[537px] h-[200px] flex flex-wrap gap-4">
            {genreData?.map((genre, index) => (
              <Badge variant="outline" key={index}>
                {genre.name}
                <GenreRigthIcon />
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

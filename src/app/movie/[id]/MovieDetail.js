"use client";

import { StarIcon } from "@/Icons/StarIcon";
import { WatchTrailerIcon } from "@/Icons/WatchTrailerIcon";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

import { OfficialTrailer } from "@/app/_components/OfficialTrailer";
import { LoadingMovieDetail } from "@/app/MovieLoading/MovieDetailLoading";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function MovieDetail() {
  const [detailData, setDetailData] = useState({});
  const [creditData, setCreditData] = useState({});
  const [directorName, setDirectorName] = useState([]);
  const [writers, setWriters] = useState([]);
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const getDetailData = async () => {
    setLoading(true);
    const detailEndpoint = `${BASE_URL}/movie/${id}?language=en-US`;
    const response = await fetch(detailEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    const creditDataEndpoint = `${BASE_URL}/movie/${id}/credits?language=en-US`;
    const creditResponse = await fetch(creditDataEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const creditData = await creditResponse.json();

    const Director = creditData.crew.find(
      (employee) => employee.job === "Director"
    );

    const Writers = creditData.crew.filter(
      (employee) => employee.job === "Writer"
    );

    const stars = creditData?.cast
      ?.filter((c) => c.known_for_department.toLowerCase().includes("acting"))
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3);

    console.log("creditData", creditData);

    setDirectorName(Director || null);
    setWriters(Writers || null);
    setStars(stars || null);

    setDetailData(data);
    setCreditData(creditData.result);
    setTimeout(() => {
      setLoading(false);
    }, "1000");
  };

  useEffect(() => {
    getDetailData();
  }, [id]);
  if (loading)
    return (
      <div>
        <LoadingMovieDetail />
      </div>
    );

  console.log("directorNme", directorName);
  const handleWatchTrailerButton = (id) => {
    setSelectedMovieId(id);
    setOpen(true);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-6  w-[1080px] ">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-4xl font-bold text-black">{detailData.title}</p>
            <p className="font-normal text-lg">{detailData.release_date}·</p>
          </div>
          <div className="flex flex-col">
            <p>Rating</p>
            <div className="flex items-center gap-1">
              <StarIcon />
              <p className="font-semibold text-lg text-[#09090B] flex items-center gap-1">
                {detailData.vote_average}
                <span className="text-base font-normal text-[#71717A]">
                  /10
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-row gap-8 items-center justify-center "
          onClick={() => {
            setSelectedMovieId(id);
          }}
        >
          {/* <div className="flex flex-row gap-8 items-center justify-center "> hereeee */}
          <img
            src={`https://image.tmdb.org/t/p/original/${detailData.poster_path}`}
            className="w-[290px] h-[428px]"
          />
          <div
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%),url('https://image.tmdb.org/t/p/original${detailData.backdrop_path}')`,
            }}
            className=" bg-cover bg-center p-6 flex justify-start items-end w-[760px] h-[428px]"
            // onClick={(e) => {
            //   e.stopPropagation();
            //   setSelectedMovieId(detailData.id);
            // }}
          >
            <div className=" flex items-center justify-center h-10 gap-3">
              <div
                onClick={() => handleWatchTrailerButton(id)}
                className="bg-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-white/80"
              >
                <WatchTrailerIcon />
              </div>
              <p className="text-white">Play trailer </p>
            </div>
          </div>
          <OfficialTrailer
            selectedMovieId={selectedMovieId}
            open={open}
            setOpen={setOpen}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-full flex flex-wrap gap-4 text-[#09090B] font-inter text-[12px] not-italic font-semibold leading-[16px]">
            {detailData?.genres?.map((genre, index) => (
              <Badge variant="outline" key={index}>
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="text-[#09090B] font-inter text-base font-normal leading-6">
            {detailData.overview}
          </div>
          <div className="flex gap-[53px]">
            <p className="text-[#09090B] font-inter text-[16px] not-italic font-bold leading-[28px]">
              Director
            </p>
            <div className="text-[#09090B] font-inter text-[16px] not-italic font-normal leading-[24px]">
              {directorName?.name}
            </div>
          </div>
          <div className="w-full h-[10px] opacity-100 gap-[10px] py-1 flex items-center">
            <div className="w-full h-[1px] opacity-100 border border-[#E4E4E7]"></div>
          </div>

          <div className="flex gap-[53px]">
            <p className="text-[#09090B] font-inter text-[16px] not-italic font-bold leading-[28px]">
              Writers
            </p>
            {writers.map((writer, index) => (
              <div
                key={index}
                className="text-[#09090B] font-inter text-[16px] not-italic font-normal leading-[24px]"
              >
                {writer.name}
              </div>
            ))}
          </div>
          <div className="w-full h-[10px] opacity-100 gap-[10px] py-1 flex items-center">
            <div className="w-full h-[1px] opacity-100 border border-[#E4E4E7]"></div>
          </div>

          <div className="flex gap-[53px]">
            <p className="text-[#09090B] font-inter text-[16px] not-italic font-bold leading-[28px]">
              Stars
            </p>

            <div className="text-[#09090B] font-inter text-[16px] not-italic font-normal leading-[24px]">
              {stars?.map((acting) => acting.name).join(" · ")}
            </div>
          </div>
          <div className="w-full h-[10px] opacity-100 gap-[10px] py-1 flex items-center">
            <div className="w-full h-[1px] opacity-100 border border-[#E4E4E7]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

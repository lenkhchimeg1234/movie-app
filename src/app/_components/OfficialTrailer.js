"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function OfficialTrailer({ selectedMovieId, open, setOpen }) {
  const [trailerLoading, setTrailerLoading] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState(null);

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

    console.log(data, "datadatadatadata");
    console.log(data.results, "datadatadatadata");

    const officialTrailer = data?.results.find((result) => {
      if (result.name.includes("Official Trailer")) {
        return result;
      }
    });

    console.log(
      officialTrailer,
      "officialTrailerofficialTrailerofficialTrailer"
    );

    setMovieTrailer(officialTrailer || data.results[0]);

    setTimeout(() => {
      setTrailerLoading(false);
    }, "1000");
  };

  useEffect(() => {
    if (selectedMovieId) {
      getMovieVideoData();
    }
  }, [selectedMovieId]);

  // const handleWatchTrailerButton = (id) => {
  //   setSelectedMovieId(id);
  //   setOpen(true);
  // };

  console.log("open", open);

  return (
    <Dialog open={open}>
      <DialogContent setOpen={setOpen}>
        {selectedMovieId && !trailerLoading && movieTrailer && (
          <iframe
            width="997px"
            height="561px"
            src={`https://www.youtube.com/embed/${movieTrailer.key}`}
          ></iframe>
        )}
      </DialogContent>
    </Dialog>
  );
}

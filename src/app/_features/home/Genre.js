"use client";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { SeeMoreIcon } from "@/Icons/SeeMoreIcon";
import { GenreRigthIcon } from "@/Icons/GenreRigthIcon";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const Genre = () => {
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

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Genre</NavigationMenuTrigger>

          <NavigationMenuContent>
            <NavigationMenuLink>
              <div className="flex flex-col gap-2">
                <p className="w-[577px] font-inter font-semibold text-[24px] leading-[32px] tracking-[-0.025em]">
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
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

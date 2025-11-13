"use client";
import { useEffect, useState } from "react";
import { MovieLogo } from "@/Icons/MovieLogo";
import { SearchLogo } from "@/Icons/SearchLogo";
import { GenreIcon } from "@/Icons/GenreIcon";
import { MoonIcon } from "@/Icons/MoonIcon";
import { SunIcon } from "lucide-react";
import { Search } from "../_components/Search";
import Link from "next/link";
import { Genre } from "./home/Genre";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);

  // Browser dark mode эсэхийг шалгаж default болгоно
  useEffect(() => {
    const darkPreference =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.classList.toggle(
      "dark",
      darkPreference === "dark"
    );
    setIsDark(darkPreference === "dark");
  }, []);

  // Toggle хийдэг функц
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <>
      <div className="flex w-auto h-[59px]  justify-between items-center flex-shrink-0 px-[80px]">
        <Link href="/" className="flex gap-2 items-center">
          <MovieLogo />
          <p className="text-[#4338CA] font-inter text-[16px] italic font-bold leading-[20px] tracking-[0.32px]">
            Movie Z
          </p>
        </Link>
        <div className="flex gap-2 items-center">
          <div className="flex w-[97px] h-[36px] p-[8px_16px] justify-center items-center gap-[8px] rounded-md border border-[#E4E4E7] bg-white shadow-sm">
            <GenreIcon />
            {/* <button className=" text-[#18181B] font-inter text-[14px] not-italic font-medium leading-[20px]"> */}
            <Genre />
            {/* </button> */}
          </div>
          {/* <div className="flex  px-[12px] items-center gap-[10px] rounded-md border border-[#E4E4E7] bg-white shadow-sm ">
            <SearchLogo /> */}
          {/* <input
              className="text-[#71717A] font-inter text-[14px] not-italic font-normal leading-[20px] focus:border-none focus:outline-none focus:ring-0"
              placeholder="Search .."
            />
             */}
          <Search />
          {/* </div> */}
        </div>
        <div className="flex w-[36px] h-[36px] justify-center items-center  rounded-[10px] border border-[#E4E4E7] bg-white shadow-sm">
          {/* <MoonIcon /> */}
          <button
            onClick={toggleTheme}
            className="flex w-[36px] h-[36px] justify-center items-center rounded-[10px] border border-[#E4E4E7] bg-white dark:bg-[#1e293b] shadow-sm transition"
          >
            {isDark ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

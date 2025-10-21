import { MovieLogo } from "@/Icons/MovieLogo";
import { SearchLogo } from "@/Icons/SearchLogo";
import { GenreIcon } from "@/Icons/GenreIcon";
import { MoonIcon } from "@/Icons/MoonIcon";
export const Header = () => {
  return (
    <>
      <div className="flex w-auto h-[59px]  justify-between items-center flex-shrink-0 px-[80px]">
        <div className="flex gap-2 items-center">
          <MovieLogo />
          <span className="text-[#4338CA] font-inter text-[16px] italic font-bold leading-[20px] tracking-[0.32px]">
            Movie Z
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex w-[97px] h-[36px] p-[8px_16px] justify-center items-center gap-[8px] rounded-md border border-[#E4E4E7] bg-white shadow-sm">
            <GenreIcon />
            <button className=" text-[#18181B] font-inter text-[14px] not-italic font-medium leading-[20px]">
              Genre
            </button>
          </div>
          <div className="flex w-[379px] h-[36px] px-[12px] items-center gap-[10px] rounded-md border border-[#E4E4E7] bg-white shadow-sm ">
            <SearchLogo />
            <input
              className="text-[#71717A] font-inter text-[14px] not-italic font-normal leading-[20px] focus:border-none focus:outline-none focus:ring-0"
              placeholder="Search .."
            />
          </div>
        </div>
        <div className="flex w-[36px] h-[36px] justify-center items-center  rounded-[10px] border border-[#E4E4E7] bg-white shadow-sm">
          <MoonIcon />
        </div>
      </div>
    </>
  );
};

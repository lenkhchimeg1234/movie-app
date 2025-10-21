import { StarIcon } from "@/Icons/StarIcon";
import { MovieRateStarIcon } from "@/Icons/MovieRateStarIcon";

export const MovieCard = (props) => {
  const { image, point, name } = props;
  return (
    <div className="flex flex-col items-start  gap-2 bg-[rgba(244,244,245,1)] w-[230px] h-[439px] rounded-lg">
      <div
        className="w-[230px] h-[340px] bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="flex flex-col px-2">
        <div className="flex gap-1 items-center">
          <MovieRateStarIcon />
          <p className="text-black font-inter text-lg font-semibold leading-7">
            {point}
          </p>
          <p className=" text-[#71717A] font-inter text-base font-normal leading-6">
            /10
          </p>
        </div>
        <p className="flex font-inter text-lg leading-7 text-black font-normal w-[230px]">
          {name}
        </p>
      </div>
    </div>
  );
};

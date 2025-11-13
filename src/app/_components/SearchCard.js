import { MovieRateStarIcon } from "@/Icons/MovieRateStarIcon";
import { useRouter } from "next/navigation";

export const SearchCard = (props) => {
  const { imageUrl, title, rating, id } = props;

  const router = useRouter();

  const handleMovieDetailButton = () => {
    router.push(`/movie/${id}`);
  };
  return (
    <div
      className="flex items-start  gap-2 bg-[rgba(244,244,245,1)] w-[537px] h-[100px] rounded-lg cursor-pointer
    "
      onClick={handleMovieDetailButton}
    >
      <div
        className="w-[67px] h-[100px] bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="flex flex-col px-2">
        <p className="flex font-inter text-lg leading-7 text-black font-normal w-[230px]">
          {title}
        </p>
        <div className="flex gap-1 items-center">
          <MovieRateStarIcon />
          <p className="text-black font-inter text-lg font-semibold leading-7">
            {rating}
          </p>
          <p className=" text-[#71717A] font-inter text-base font-normal leading-6">
            /10
          </p>
        </div>
      </div>
    </div>
  );
};

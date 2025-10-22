import { MovieIconWhite } from "@/Icons/MovieIconWhite";
import { EmailIcon } from "@/Icons/EmailIcon";
import { PhoneIcon } from "@/Icons/PhoneIcon";

export const Footer = () => {
  return (
    <div className="flex w-full h-[280px] py-10 justify-between gap-[120px] px-20 bg-[#4338CA]">
      <div className="flex flex-col items-start self-stretch gap-3 ">
        <div className="flex gap-2 items-center">
          <MovieIconWhite />
          <span className="text-white font-inter text-[16px] italic font-bold leading-[20px] tracking-[0.32px]">
            Movie Z
          </span>
        </div>
        <p className="text-[#FAFAFA] font-inter text-sm font-normal leading-5">
          © 2024 Movie Z. All Rights Reserved.
        </p>
      </div>
      <div className="flex gap-[96px]">
        <div>
          <p className="text-white">Contact Information</p>
          <div className="flex gap-[12px] justify-center items-center">
            <EmailIcon />
            <div className="flex flex-col">
              <p className="text-[#FAFAFA] font-inter text-sm font-normal leading-5">
                Email:
              </p>
              <p className="text-[#FAFAFA] font-inter text-sm font-normal leading-5">
                support@movieZ.com
              </p>
            </div>
          </div>
          <div className="flex gap-[12px] justify-center items-center">
            <PhoneIcon />
            <div className="flex flex-col">
              <p className="text-[#FAFAFA] font-inter text-sm font-normal leading-5">
                Phone:
              </p>
              <p className="text-[#FAFAFA] font-inter text-sm font-normal leading-5">
                +976 (11) 123-4567
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-white">Follow Us</p>
          <div className="flex gap-3 text-[#FAFAFA] font-inter text-sm font-normal leading-5">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>
    </div>
  );
};

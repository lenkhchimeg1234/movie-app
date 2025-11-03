import { Header } from "./_features/Header";
import { Footer } from "./_features/Footer";
import { MovieDetail } from "./_features/home/HeroSection";

import { MovieList } from "./_features/home/MovieList";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center">
      <Skeleton width={100} />
      <div className="w-[1440px] flex flex-col  gap-[52px] ">
        <Header />
        <MovieDetail />
        <MovieList type="upcoming" title="Upcoming" />
        <Footer />
      </div>
    </div>
  );
}
